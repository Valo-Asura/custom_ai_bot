from __future__ import annotations

from pathlib import Path
from typing import Any
from uuid import uuid4

from flask import current_app
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

from database.db import get_db
from services.chunking_service import split_text
from services.embedding_service import embed_texts
from services.pinecone_service import delete_document_vectors, upsert_vectors


def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']


def _upload_path() -> Path:
    upload_folder = current_app.config['UPLOAD_FOLDER']
    path = upload_folder if isinstance(upload_folder, Path) else Path(upload_folder)
    path.mkdir(parents=True, exist_ok=True)
    return path


def _extract_pdf_text(file_path: Path) -> str:
    from PyPDF2 import PdfReader
    reader = PdfReader(str(file_path))
    return '\n'.join((page.extract_text() or '') for page in reader.pages)


def _extract_docx_text(file_path: Path) -> str:
    from docx import Document
    document = Document(str(file_path))
    return '\n'.join(paragraph.text for paragraph in document.paragraphs)


def extract_text(file_path: Path, file_type: str) -> str:
    if file_type == 'txt':
        return file_path.read_text(encoding='utf-8', errors='ignore')
    if file_type == 'pdf':
        return _extract_pdf_text(file_path)
    if file_type == 'docx':
        return _extract_docx_text(file_path)
    raise ValueError(f'Unsupported file type: {file_type}')


def list_user_documents(user_id: int) -> list[dict[str, Any]]:
    db = get_db()
    # SECURITY:IDOR - always filter records by current user_id.
    rows = db.execute(
        'SELECT * FROM uploaded_documents WHERE user_id = ? ORDER BY uploaded_at DESC, id DESC',
        (user_id,),
    ).fetchall()
    return [dict(row) for row in rows]


def list_all_documents() -> list[dict[str, Any]]:
    db = get_db()
    rows = db.execute(
        '''
        SELECT uploaded_documents.*, users.email
        FROM uploaded_documents
        JOIN users ON users.id = uploaded_documents.user_id
        ORDER BY uploaded_at DESC, uploaded_documents.id DESC
        '''
    ).fetchall()
    return [dict(row) for row in rows]


def get_document_by_id(document_id: int) -> dict[str, Any] | None:
    db = get_db()
    row = db.execute('SELECT * FROM uploaded_documents WHERE id = ?', (document_id,)).fetchone()
    return dict(row) if row else None


def create_document_record(
    user_id: int,
    original_filename: str,
    stored_filename: str,
    file_type: str,
    pinecone_namespace: str,
) -> int:
    db = get_db()
    cursor = db.execute(
        '''
        INSERT INTO uploaded_documents (
            user_id,
            original_filename,
            stored_filename,
            file_type,
            pinecone_namespace,
            chunk_count
        ) VALUES (?, ?, ?, ?, ?, 0)
        ''',
        (user_id, original_filename, stored_filename, file_type, pinecone_namespace),
    )
    db.commit()
    return int(cursor.lastrowid)


def update_chunk_count(document_id: int, chunk_count: int) -> None:
    db = get_db()
    db.execute('UPDATE uploaded_documents SET chunk_count = ? WHERE id = ?', (chunk_count, document_id))
    db.commit()


def delete_document_record(document_id: int) -> None:
    db = get_db()
    db.execute('DELETE FROM uploaded_documents WHERE id = ?', (document_id,))
    db.commit()


def _remove_local_file(stored_filename: str) -> None:
    file_path = _upload_path() / stored_filename
    if file_path.exists():
        file_path.unlink()


def delete_document_assets(document: dict[str, Any]) -> None:
    delete_document_vectors(int(document['user_id']), int(document['id']))
    _remove_local_file(str(document['stored_filename']))
    delete_document_record(int(document['id']))


def ingest_document(user_id: int, uploaded_file: FileStorage, provider_config: dict[str, Any]) -> dict[str, Any]:
    filename = uploaded_file.filename or ''
    if not filename:
        raise ValueError('Please choose a file to upload.')
    if not allowed_file(filename):
        raise ValueError('Only PDF, TXT, and DOCX files are allowed.')

    safe_name = secure_filename(filename)
    if not safe_name:
        raise ValueError('Unable to safely store that filename.')

    extension = safe_name.rsplit('.', 1)[1].lower()
    stored_filename = f'{uuid4().hex}.{extension}'
    file_path = _upload_path() / stored_filename

    # SECURITY:FILE_UPLOAD - validate extension and secure filename before saving.
    # SECURITY: File upload validation prevents unsafe file types and path traversal.
    uploaded_file.save(file_path)

    text = extract_text(file_path, extension).strip()
    if not text:
        _remove_local_file(stored_filename)
        raise ValueError('The uploaded file did not contain readable text.')

    chunks = split_text(text)
    if not chunks:
        _remove_local_file(stored_filename)
        raise ValueError('Unable to generate chunks from the uploaded document.')

    namespace = f'user_{user_id}'
    document_id = create_document_record(user_id, safe_name, stored_filename, extension, namespace)

    try:
        embeddings = embed_texts(
            provider=str(provider_config['embedding_provider']),
            model=str(provider_config['embedding_model']),
            api_key=str(provider_config.get('embedding_api_key') or '').strip() or None,
            texts=chunks,
        )
        upsert_vectors(user_id, document_id, safe_name, chunks, embeddings)
        update_chunk_count(document_id, len(chunks))
    except Exception:
        delete_document_record(document_id)
        _remove_local_file(stored_filename)
        raise

    document = get_document_by_id(document_id)
    if not document:
        raise ValueError('Document metadata could not be reloaded after upload.')
    return document

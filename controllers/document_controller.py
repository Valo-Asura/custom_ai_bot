from __future__ import annotations

from flask import Flask, flash, redirect, render_template, request, url_for

from services.auth_service import get_current_user, login_required
from services.document_service import delete_document_assets, get_document_by_id, ingest_document, list_user_documents
from services.pinecone_service import delete_namespace
from services.provider_service import get_provider_config


def register_routes(app: Flask) -> None:
    @app.route('/upload', methods=['GET', 'POST'])
    @login_required
    def upload() -> str:
        current_user = get_current_user()
        assert current_user is not None
        user_id = int(current_user['id'])

        if request.method == 'POST':
            user_docs = list_user_documents(user_id)
            if len(user_docs) >= 2:
                flash('Account limit reached: You can only upload a maximum of 2 documents.', 'error')
                return redirect(url_for('upload'))

            uploaded_file = request.files.get('document')
            if uploaded_file is None:
                flash('Please choose a file.', 'error')
                return redirect(url_for('upload'))

            try:
                ingest_document(user_id, uploaded_file, get_provider_config(user_id))
                flash('Document uploaded and indexed successfully.', 'success')
            except Exception as exc:
                flash(f'Upload failed: {exc}', 'error')
            return redirect(url_for('upload'))

        return render_template('upload.html', documents=list_user_documents(user_id))

    @app.route('/upload/documents/<int:document_id>/delete', methods=['POST'])
    @login_required
    def upload_delete_document(document_id: int):
        current_user = get_current_user()
        assert current_user is not None
        document = get_document_by_id(document_id)
        if not document or int(document['user_id']) != int(current_user['id']):
            flash('Document not found.', 'error')
            return redirect(url_for('upload'))
        delete_document_assets(document)
        flash('Document deleted.', 'success')
        return redirect(url_for('upload'))

    @app.route('/upload/clear', methods=['POST'])
    @login_required
    def upload_clear():
        current_user = get_current_user()
        assert current_user is not None
        user_id = int(current_user['id'])
        for document in list_user_documents(user_id):
            delete_document_assets(document)
        delete_namespace(user_id)
        flash('Knowledge base fully cleared.', 'success')
        return redirect(url_for('upload'))

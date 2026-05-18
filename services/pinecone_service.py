from __future__ import annotations

from typing import Any

from flask import current_app


def _client() -> Any:
    from pinecone import Pinecone
    api_key = current_app.config['PINECONE_API_KEY']
    if not api_key:
        raise ValueError('Pinecone is not configured. Add PINECONE_API_KEY and index settings.')
    return Pinecone(api_key=api_key)


def ensure_index(dimension: int) -> Any:
    from pinecone import ServerlessSpec
    client = _client()
    index_name = current_app.config['PINECONE_INDEX_NAME']
    existing_indexes = client.list_indexes().names()

    if index_name not in existing_indexes:
        client.create_index(
            name=index_name,
            dimension=dimension,
            metric='cosine',
            spec=ServerlessSpec(
                cloud=current_app.config['PINECONE_CLOUD'],
                region=current_app.config['PINECONE_REGION'],
            ),
        )

    description = client.describe_index(index_name)
    actual_dimension = getattr(description, 'dimension', None)
    if isinstance(description, dict):
        actual_dimension = description.get('dimension', actual_dimension)
    if actual_dimension and int(actual_dimension) != int(dimension):
        raise ValueError(
            f'Pinecone index dimension mismatch. Expected {dimension}, found {actual_dimension}. '
            'Use a matching embedding model or a separate index.'
        )
    return client.Index(index_name)


def upsert_vectors(
    user_id: int,
    document_id: int,
    source_filename: str,
    chunks: list[str],
    embeddings: list[list[float]],
) -> str:
    if len(chunks) != len(embeddings):
        raise ValueError('Chunk count and embedding count must match before Pinecone upsert.')

    namespace = f'user_{user_id}'
    index = ensure_index(len(embeddings[0]))
    vectors = []
    for chunk_index, (chunk, embedding) in enumerate(zip(chunks, embeddings, strict=True)):
        vectors.append(
            {
                'id': f'doc-{document_id}-chunk-{chunk_index}',
                'values': embedding,
                'metadata': {
                    'user_id': user_id,
                    'document_id': document_id,
                    'source_filename': source_filename,
                    'chunk_index': chunk_index,
                    'text': chunk,
                },
            }
        )
    index.upsert(vectors=vectors, namespace=namespace)
    return namespace


def query_vectors(namespace: str, vector: list[float], top_k: int = 4) -> list[dict[str, Any]]:
    index = ensure_index(len(vector))
    response = index.query(namespace=namespace, vector=vector, top_k=top_k, include_metadata=True)
    matches = getattr(response, 'matches', None)
    if matches is None and isinstance(response, dict):
        matches = response.get('matches', [])

    items: list[dict[str, Any]] = []
    for match in matches or []:
        metadata = getattr(match, 'metadata', None)
        score = getattr(match, 'score', None)
        if isinstance(match, dict):
            metadata = match.get('metadata', metadata)
            score = match.get('score', score)
        items.append({'metadata': metadata or {}, 'score': score or 0.0})
    return items


def delete_document_vectors(user_id: int, document_id: int) -> None:
    try:
        index = _client().Index(current_app.config['PINECONE_INDEX_NAME'])
        namespace = f'user_{user_id}'
        ids = index.list(prefix=f'doc-{document_id}-chunk-', namespace=namespace)
        collected_ids = list(ids) if ids else []
        if collected_ids:
            index.delete(ids=collected_ids, namespace=namespace)
    except Exception:
        return


def delete_namespace(user_id: int) -> None:
    try:
        index = _client().Index(current_app.config['PINECONE_INDEX_NAME'])
        index.delete(delete_all=True, namespace=f'user_{user_id}')
    except Exception:
        return


def pinecone_health() -> dict[str, str]:
    if not current_app.config['PINECONE_API_KEY']:
        return {'status': 'missing', 'message': 'Pinecone configured or missing: missing API key'}
    try:
        client = _client()
        index_name = current_app.config['PINECONE_INDEX_NAME']
        exists = index_name in client.list_indexes().names()
        message = 'Pinecone configured' if exists else 'Pinecone configured, index will be created on first upload'
        return {'status': 'ok', 'message': message}
    except Exception as exc:  # pragma: no cover - defensive health path
        return {'status': 'error', 'message': f'Pinecone error: {exc}'}

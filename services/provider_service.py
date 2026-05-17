from typing import Any

from flask import current_app

from database.db import get_db


def get_provider_config(user_id: int) -> dict[str, Any]:
    db = get_db()
    # SECURITY:IDOR - always filter records by current user_id.
    row = db.execute('SELECT * FROM provider_configs WHERE user_id = ?', (user_id,)).fetchone()
    if row:
        return dict(row)
    return {
        'user_id': user_id,
        'chat_provider': current_app.config['DEFAULT_CHAT_PROVIDER'],
        'chat_model': current_app.config['DEFAULT_CHAT_MODEL'],
        'chat_api_key': '',
        'embedding_provider': current_app.config['DEFAULT_EMBEDDING_PROVIDER'],
        'embedding_model': current_app.config['DEFAULT_EMBEDDING_MODEL'],
        'embedding_api_key': '',
        'created_at': None,
        'updated_at': None,
    }


def upsert_provider_config(
    user_id: int,
    chat_provider: str,
    chat_model: str,
    chat_api_key: str,
    embedding_provider: str,
    embedding_model: str,
    embedding_api_key: str,
) -> None:
    db = get_db()
    existing = db.execute('SELECT * FROM provider_configs WHERE user_id = ?', (user_id,)).fetchone()
    # SECURITY: API keys are stored in plaintext for demo only. In production, encrypt secrets or use a managed secret store.
    # SECURITY:SECRETS - plaintext API key storage is demo-only; encrypt in production.
    if existing:
        final_chat_api_key = chat_api_key.strip() if chat_api_key.strip() else existing['chat_api_key']
        final_embedding_api_key = embedding_api_key.strip() if embedding_api_key.strip() else existing['embedding_api_key']
        db.execute(
            '''
            UPDATE provider_configs
            SET chat_provider = ?,
                chat_model = ?,
                chat_api_key = ?,
                embedding_provider = ?,
                embedding_model = ?,
                embedding_api_key = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?
            ''',
            (
                chat_provider,
                chat_model,
                final_chat_api_key,
                embedding_provider,
                embedding_model,
                final_embedding_api_key,
                user_id,
            ),
        )
    else:
        db.execute(
            '''
            INSERT INTO provider_configs (
                user_id,
                chat_provider,
                chat_model,
                chat_api_key,
                embedding_provider,
                embedding_model,
                embedding_api_key
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ''',
            (
                user_id,
                chat_provider,
                chat_model,
                chat_api_key.strip(),
                embedding_provider,
                embedding_model,
                embedding_api_key.strip(),
            ),
        )
    db.commit()


def mask_api_key(value: str | None) -> str:
    if not value:
        return 'Not set'
    if len(value) <= 8:
        return f'{value[:2]}****{value[-2:]}'
    return f'{value[:3]}-****{value[-4:]}'


def list_provider_overview() -> list[dict[str, Any]]:
    db = get_db()
    rows = db.execute(
        '''
        SELECT users.email,
               users.role,
               provider_configs.chat_provider,
               provider_configs.chat_model,
               provider_configs.embedding_provider,
               provider_configs.embedding_model,
               provider_configs.chat_api_key,
               provider_configs.embedding_api_key,
               provider_configs.updated_at
        FROM users
        LEFT JOIN provider_configs ON provider_configs.user_id = users.id
        ORDER BY users.created_at DESC, users.id DESC
        '''
    ).fetchall()
    items: list[dict[str, Any]] = []
    for row in rows:
        item = dict(row)
        item['chat_api_key_masked'] = mask_api_key(item.get('chat_api_key'))
        item['embedding_api_key_masked'] = mask_api_key(item.get('embedding_api_key'))
        items.append(item)
    return items

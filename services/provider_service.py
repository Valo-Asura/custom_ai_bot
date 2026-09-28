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


def _clean_input_key(val: str | None) -> str:
    if not val:
        return ''
    cleaned = str(val).strip().strip("'\"`")
    if cleaned.lower().startswith('bearer '):
        cleaned = cleaned[7:].strip().strip("'\"`")
    return cleaned


def upsert_provider_config(
    user_id: int,
    chat_provider: str,
    chat_model: str,
    chat_api_key: str,
    embedding_provider: str,
    embedding_model: str,
    embedding_api_key: str,
    clear_chat_key: bool = False,
    clear_embedding_key: bool = False,
) -> None:
    db = get_db()
    existing = db.execute('SELECT * FROM provider_configs WHERE user_id = ?', (user_id,)).fetchone()
    # SECURITY: API keys are stored in plaintext. In production, encrypt secrets or use a managed secret store.
    # SECURITY:SECRETS - plaintext API key storage is basic; encrypt in production.
    cleaned_chat_key = _clean_input_key(chat_api_key)
    cleaned_emb_key = _clean_input_key(embedding_api_key)

    if existing:
        if clear_chat_key:
            final_chat_api_key = ''
        else:
            final_chat_api_key = cleaned_chat_key if cleaned_chat_key else existing['chat_api_key']

        if clear_embedding_key:
            final_embedding_api_key = ''
        else:
            final_embedding_api_key = cleaned_emb_key if cleaned_emb_key else existing['embedding_api_key']

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
        final_chat_api_key = '' if clear_chat_key else cleaned_chat_key
        final_embedding_api_key = '' if clear_embedding_key else cleaned_emb_key
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
                final_chat_api_key,
                embedding_provider,
                embedding_model,
                final_embedding_api_key,
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

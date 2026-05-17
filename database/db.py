from __future__ import annotations

import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from flask import current_app, g
from werkzeug.security import generate_password_hash

try:
    from pymongo import ASCENDING, MongoClient, ReturnDocument
except ImportError:  # pragma: no cover - optional dependency for local SQLite-only runs
    ASCENDING = 1
    MongoClient = None
    ReturnDocument = None

_mongo_client: MongoClient | None = None
_mongo_unavailable_reason: str | None = None


def _now_timestamp() -> str:
    return datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')


def _normalize_query(query: str) -> str:
    return ' '.join(query.split())


def _strip_mongo_id(document: dict[str, Any] | None) -> dict[str, Any] | None:
    if document is None:
        return None
    item = dict(document)
    item.pop('_id', None)
    return item


class MongoCursor:
    def __init__(self, rows: list[dict[str, Any]] | None = None, *, lastrowid: int | None = None) -> None:
        self._rows = rows or []
        self.lastrowid = lastrowid

    def fetchone(self) -> dict[str, Any] | None:
        return self._rows[0] if self._rows else None

    def fetchall(self) -> list[dict[str, Any]]:
        return list(self._rows)


class MongoDatabase:
    def __init__(self, db: Any) -> None:
        self._db = db

    def commit(self) -> None:
        return None

    def close(self) -> None:
        return None

    def executescript(self, _: str) -> None:
        return None

    def _collection(self, name: str):
        return self._db[name]

    def _next_sequence(self, name: str) -> int:
        if ReturnDocument is None:
            raise RuntimeError('pymongo is required for MongoDB support.')
        row = self._collection('counters').find_one_and_update(
            {'_id': name},
            {'$inc': {'value': 1}},
            upsert=True,
            return_document=ReturnDocument.AFTER,
        )
        return int(row['value'])

    def _set_sequence_at_least(self, name: str, value: int) -> None:
        self._collection('counters').update_one({'_id': name}, {'$max': {'value': int(value)}}, upsert=True)

    def _cascade_delete_user(self, user_id: int) -> None:
        self._collection('bot_profiles').delete_many({'user_id': user_id})
        self._collection('provider_configs').delete_many({'user_id': user_id})
        self._collection('uploaded_documents').delete_many({'user_id': user_id})
        self._collection('chat_messages').delete_many({'user_id': user_id})
        self._collection('users').delete_one({'id': user_id, 'role': {'$ne': 'admin'}})

    def execute(self, query: str, params: tuple[Any, ...] = ()) -> MongoCursor:
        normalized = _normalize_query(query)

        if normalized == 'SELECT 1':
            return MongoCursor([{'1': 1}])

        if normalized == 'SELECT id, email, role, created_at FROM users WHERE id = ?':
            row = self._collection('users').find_one({'id': int(params[0])}, {'_id': 0, 'id': 1, 'email': 1, 'role': 1, 'created_at': 1})
            return MongoCursor([row] if row else [])

        if normalized == 'SELECT id, email, role, created_at FROM users WHERE email = ?':
            row = self._collection('users').find_one({'email': str(params[0])}, {'_id': 0, 'id': 1, 'email': 1, 'role': 1, 'created_at': 1})
            return MongoCursor([row] if row else [])

        if normalized == 'SELECT * FROM users WHERE email = ?':
            row = self._collection('users').find_one({'email': str(params[0])}, {'_id': 0})
            return MongoCursor([row] if row else [])

        if normalized == 'SELECT id FROM users WHERE email = ?':
            row = self._collection('users').find_one({'email': str(params[0])}, {'_id': 0, 'id': 1})
            return MongoCursor([row] if row else [])

        if normalized == 'INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)':
            user_id = int(params[0])
            row = {
                'id': user_id,
                'email': str(params[1]).strip().lower(),
                'password_hash': str(params[2]),
                'role': str(params[3]),
                'created_at': _now_timestamp(),
            }
            self._collection('users').update_one({'id': user_id}, {'$set': row}, upsert=True)
            self._set_sequence_at_least('users', user_id)
            return MongoCursor(lastrowid=user_id)

        if normalized == 'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)':
            user_id = self._next_sequence('users')
            row = {
                'id': user_id,
                'email': str(params[0]).strip().lower(),
                'password_hash': str(params[1]),
                'role': str(params[2]),
                'created_at': _now_timestamp(),
            }
            self._collection('users').insert_one(row)
            return MongoCursor(lastrowid=user_id)

        if normalized == 'SELECT id, email, role, created_at FROM users ORDER BY created_at DESC, id DESC':
            rows = list(
                self._collection('users')
                .find({}, {'_id': 0, 'id': 1, 'email': 1, 'role': 1, 'created_at': 1})
                .sort([('created_at', -1), ('id', -1)])
            )
            return MongoCursor(rows)

        if normalized == 'SELECT COUNT(*) AS total FROM users':
            total = self._collection('users').count_documents({})
            return MongoCursor([{'total': int(total)}])

        if normalized == "DELETE FROM users WHERE id = ? AND role != 'admin'":
            self._cascade_delete_user(int(params[0]))
            return MongoCursor()

        if normalized == 'SELECT * FROM bot_profiles WHERE user_id = ?':
            row = self._collection('bot_profiles').find_one({'user_id': int(params[0])}, {'_id': 0})
            return MongoCursor([row] if row else [])

        if normalized == 'SELECT id FROM bot_profiles WHERE user_id = ?':
            row = self._collection('bot_profiles').find_one({'user_id': int(params[0])}, {'_id': 0, 'id': 1})
            return MongoCursor([row] if row else [])

        if normalized == 'UPDATE bot_profiles SET bot_name = ?, personality_prompt = ?, tone = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?':
            self._collection('bot_profiles').update_one(
                {'user_id': int(params[4])},
                {
                    '$set': {
                        'bot_name': str(params[0]),
                        'personality_prompt': str(params[1]),
                        'tone': str(params[2]),
                        'description': str(params[3]),
                        'updated_at': _now_timestamp(),
                    }
                },
            )
            return MongoCursor()

        if normalized == 'INSERT INTO bot_profiles (user_id, bot_name, personality_prompt, tone, description) VALUES (?, ?, ?, ?, ?)':
            profile_id = self._next_sequence('bot_profiles')
            self._collection('bot_profiles').insert_one(
                {
                    'id': profile_id,
                    'user_id': int(params[0]),
                    'bot_name': str(params[1]),
                    'personality_prompt': str(params[2]),
                    'tone': str(params[3]),
                    'description': str(params[4]),
                    'created_at': _now_timestamp(),
                    'updated_at': _now_timestamp(),
                }
            )
            return MongoCursor(lastrowid=profile_id)

        if normalized == 'SELECT * FROM provider_configs WHERE user_id = ?':
            row = self._collection('provider_configs').find_one({'user_id': int(params[0])}, {'_id': 0})
            return MongoCursor([row] if row else [])

        if normalized == 'SELECT id FROM provider_configs WHERE user_id = ?':
            row = self._collection('provider_configs').find_one({'user_id': int(params[0])}, {'_id': 0, 'id': 1})
            return MongoCursor([row] if row else [])

        if normalized == 'UPDATE provider_configs SET chat_provider = ?, chat_model = ?, chat_api_key = ?, embedding_provider = ?, embedding_model = ?, embedding_api_key = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?':
            self._collection('provider_configs').update_one(
                {'user_id': int(params[6])},
                {
                    '$set': {
                        'chat_provider': str(params[0]),
                        'chat_model': str(params[1]),
                        'chat_api_key': str(params[2]),
                        'embedding_provider': str(params[3]),
                        'embedding_model': str(params[4]),
                        'embedding_api_key': str(params[5]),
                        'updated_at': _now_timestamp(),
                    }
                },
            )
            return MongoCursor()

        if normalized == 'INSERT INTO provider_configs ( user_id, chat_provider, chat_model, chat_api_key, embedding_provider, embedding_model, embedding_api_key ) VALUES (?, ?, ?, ?, ?, ?, ?)':
            provider_id = self._next_sequence('provider_configs')
            self._collection('provider_configs').insert_one(
                {
                    'id': provider_id,
                    'user_id': int(params[0]),
                    'chat_provider': str(params[1]),
                    'chat_model': str(params[2]),
                    'chat_api_key': str(params[3]),
                    'embedding_provider': str(params[4]),
                    'embedding_model': str(params[5]),
                    'embedding_api_key': str(params[6]),
                    'created_at': _now_timestamp(),
                    'updated_at': _now_timestamp(),
                }
            )
            return MongoCursor(lastrowid=provider_id)

        if normalized == 'SELECT users.email, users.role, provider_configs.chat_provider, provider_configs.chat_model, provider_configs.embedding_provider, provider_configs.embedding_model, provider_configs.chat_api_key, provider_configs.embedding_api_key, provider_configs.updated_at FROM users LEFT JOIN provider_configs ON provider_configs.user_id = users.id ORDER BY users.created_at DESC, users.id DESC':
            provider_by_user = {
                int(item['user_id']): _strip_mongo_id(item)
                for item in self._collection('provider_configs').find({}, {'_id': 0})
            }
            rows: list[dict[str, Any]] = []
            for user in self._collection('users').find({}, {'_id': 0}).sort([('created_at', -1), ('id', -1)]):
                provider = provider_by_user.get(int(user['id']), {})
                rows.append(
                    {
                        'email': user['email'],
                        'role': user['role'],
                        'chat_provider': provider.get('chat_provider'),
                        'chat_model': provider.get('chat_model'),
                        'embedding_provider': provider.get('embedding_provider'),
                        'embedding_model': provider.get('embedding_model'),
                        'chat_api_key': provider.get('chat_api_key'),
                        'embedding_api_key': provider.get('embedding_api_key'),
                        'updated_at': provider.get('updated_at'),
                    }
                )
            return MongoCursor(rows)

        if normalized == 'SELECT * FROM uploaded_documents WHERE user_id = ? ORDER BY uploaded_at DESC, id DESC':
            rows = list(
                self._collection('uploaded_documents')
                .find({'user_id': int(params[0])}, {'_id': 0})
                .sort([('uploaded_at', -1), ('id', -1)])
            )
            return MongoCursor(rows)

        if normalized == 'SELECT uploaded_documents.*, users.email FROM uploaded_documents JOIN users ON users.id = uploaded_documents.user_id ORDER BY uploaded_at DESC, uploaded_documents.id DESC':
            user_by_id = {
                int(item['id']): item['email']
                for item in self._collection('users').find({}, {'_id': 0, 'id': 1, 'email': 1})
            }
            rows: list[dict[str, Any]] = []
            for document in self._collection('uploaded_documents').find({}, {'_id': 0}).sort([('uploaded_at', -1), ('id', -1)]):
                item = dict(document)
                item['email'] = user_by_id.get(int(document['user_id']), '')
                rows.append(item)
            return MongoCursor(rows)

        if normalized == 'SELECT * FROM uploaded_documents WHERE id = ?':
            row = self._collection('uploaded_documents').find_one({'id': int(params[0])}, {'_id': 0})
            return MongoCursor([row] if row else [])

        if normalized == 'INSERT INTO uploaded_documents ( user_id, original_filename, stored_filename, file_type, pinecone_namespace, chunk_count ) VALUES (?, ?, ?, ?, ?, 0)':
            document_id = self._next_sequence('uploaded_documents')
            self._collection('uploaded_documents').insert_one(
                {
                    'id': document_id,
                    'user_id': int(params[0]),
                    'original_filename': str(params[1]),
                    'stored_filename': str(params[2]),
                    'file_type': str(params[3]),
                    'pinecone_namespace': str(params[4]),
                    'chunk_count': 0,
                    'uploaded_at': _now_timestamp(),
                }
            )
            return MongoCursor(lastrowid=document_id)

        if normalized == 'UPDATE uploaded_documents SET chunk_count = ? WHERE id = ?':
            self._collection('uploaded_documents').update_one(
                {'id': int(params[1])},
                {'$set': {'chunk_count': int(params[0])}},
            )
            return MongoCursor()

        if normalized == 'DELETE FROM uploaded_documents WHERE id = ?':
            self._collection('uploaded_documents').delete_one({'id': int(params[0])})
            return MongoCursor()

        if normalized == 'INSERT INTO chat_messages (user_id, role, content) VALUES (?, ?, ?)':
            message_id = self._next_sequence('chat_messages')
            self._collection('chat_messages').insert_one(
                {
                    'id': message_id,
                    'user_id': int(params[0]),
                    'role': str(params[1]),
                    'content': str(params[2]),
                    'created_at': _now_timestamp(),
                }
            )
            return MongoCursor(lastrowid=message_id)

        if normalized == 'SELECT id, role, content, created_at FROM chat_messages WHERE user_id = ? ORDER BY id DESC LIMIT ?':
            rows = list(
                self._collection('chat_messages')
                .find({'user_id': int(params[0])}, {'_id': 0, 'id': 1, 'role': 1, 'content': 1, 'created_at': 1})
                .sort([('id', -1)])
                .limit(int(params[1]))
            )
            return MongoCursor(rows)

        if normalized == 'SELECT EXISTS(SELECT 1 FROM uploaded_documents WHERE user_id = ?) AS has_documents':
            exists = self._collection('uploaded_documents').count_documents({'user_id': int(params[0])}, limit=1) > 0
            return MongoCursor([{'has_documents': 1 if exists else 0}])

        raise NotImplementedError(f'Unsupported MongoDB query: {normalized}')


def _using_mongodb() -> bool:
    return bool(current_app.config.get('MONGODB_URI'))


def _ensure_sqlite_supported() -> None:
    if _using_mongodb():
        return
    database_url = current_app.config.get('DATABASE_URL')
    if database_url and not database_url.startswith('sqlite'):
        raise RuntimeError(
            'DATABASE_URL is reserved as a deployment adapter placeholder. '
            'This interview demo ships with SQLite only unless MONGODB_URI is configured. '
            'Use MongoDB or extend an external SQL adapter for other engines.'
        )


def _database_path() -> Path:
    configured = current_app.config['DATABASE_PATH']
    if isinstance(configured, Path):
        return configured
    return Path(configured)


def _get_mongo_client() -> MongoClient:
    global _mongo_client
    if MongoClient is None:
        raise RuntimeError('pymongo is not installed. Add it to requirements before using MongoDB.')
    if _mongo_client is None:
        _mongo_client = MongoClient(current_app.config['MONGODB_URI'], serverSelectionTimeoutMS=10000)
    return _mongo_client


def _get_mongo_db() -> MongoDatabase:
    client = _get_mongo_client()
    db_name = current_app.config['MONGODB_DB_NAME']
    return MongoDatabase(client[db_name])


def _sqlite_connection() -> sqlite3.Connection:
    _ensure_sqlite_supported()
    database_path = _database_path()
    database_path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(database_path)
    connection.row_factory = sqlite3.Row
    connection.execute('PRAGMA foreign_keys = ON;')
    return connection


def get_db() -> Any:
    if 'db' not in g:
        if _using_mongodb():
            global _mongo_unavailable_reason
            try:
                mongo_db = _get_mongo_db()
                _get_mongo_client().admin.command('ping')
                _mongo_unavailable_reason = None
                g.db = mongo_db
            except Exception as exc:
                _mongo_unavailable_reason = str(exc)
                g.db = _sqlite_connection()
        else:
            g.db = _sqlite_connection()
    return g.db


def close_db(_: Any = None) -> None:
    connection = g.pop('db', None)
    if connection is not None and hasattr(connection, 'close'):
        connection.close()


def _init_mongo_indexes() -> None:
    db = _get_mongo_db()._db
    db['users'].create_index([('id', ASCENDING)], unique=True)
    db['users'].create_index([('email', ASCENDING)], unique=True)
    db['bot_profiles'].create_index([('id', ASCENDING)], unique=True)
    db['bot_profiles'].create_index([('user_id', ASCENDING)], unique=True)
    db['provider_configs'].create_index([('id', ASCENDING)], unique=True)
    db['provider_configs'].create_index([('user_id', ASCENDING)], unique=True)
    db['uploaded_documents'].create_index([('id', ASCENDING)], unique=True)
    db['uploaded_documents'].create_index([('user_id', ASCENDING)])
    db['chat_messages'].create_index([('id', ASCENDING)], unique=True)
    db['chat_messages'].create_index([('user_id', ASCENDING)])


def init_db() -> None:
    db = get_db()
    if isinstance(db, MongoDatabase):
        _init_mongo_indexes()
        ensure_default_admin()
        return

    schema_path = Path(current_app.root_path) / 'database' / 'schema.sql'
    db.executescript(schema_path.read_text(encoding='utf-8'))
    db.commit()
    ensure_default_admin()


def ensure_default_admin() -> None:
    db = get_db()
    admin_email = current_app.config['ADMIN_EMAIL'].strip().lower()
    admin_password = current_app.config['ADMIN_PASSWORD']

    existing_admin = db.execute('SELECT id FROM users WHERE email = ?', (admin_email,)).fetchone()
    if existing_admin:
        return

    password_hash = generate_password_hash(admin_password)
    db.execute(
        'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
        (admin_email, password_hash, 'admin'),
    )
    db.commit()


def database_health() -> dict[str, str]:
    try:
        if _using_mongodb() and _mongo_unavailable_reason is None:
            _get_mongo_client().admin.command('ping')
            return {'status': 'ok', 'message': 'MongoDB connection OK'}
        db = get_db()
        db.execute('SELECT 1').fetchone()
        if _using_mongodb() and _mongo_unavailable_reason:
            return {
                'status': 'error',
                'message': f'MongoDB unavailable, using SQLite fallback: {_mongo_unavailable_reason}',
            }
        return {'status': 'ok', 'message': 'SQLite connection OK'}
    except Exception as exc:  # pragma: no cover - defensive health path
        backend = 'MongoDB' if _using_mongodb() else 'SQLite'
        return {'status': 'error', 'message': f'{backend} error: {exc}'}

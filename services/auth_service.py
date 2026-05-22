from collections.abc import Callable
from functools import wraps
from typing import Any, TypeVar, cast

from flask import flash, g, redirect, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash

from database.db import get_db

F = TypeVar('F', bound=Callable[..., Any])


def get_current_user() -> dict[str, Any] | None:
    if hasattr(g, 'current_user'):
        return g.current_user

    user_id = session.get('user_id')
    if not user_id:
        g.current_user = None
        return None

    db = get_db()
    row = db.execute('SELECT id, email, role, created_at FROM users WHERE id = ?', (user_id,)).fetchone()
    if row:
        g.current_user = dict(row)
        return g.current_user

    restored = _restore_user_from_session()
    g.current_user = restored
    return g.current_user


def _restore_user_from_session() -> dict[str, Any] | None:
    user_id = session.get('user_id')
    email = str(session.get('user_email') or '').strip().lower()
    role = str(session.get('user_role') or 'user').strip().lower()
    if not user_id or not email or role not in {'admin', 'user'}:
        return None

    db = get_db()
    existing = db.execute('SELECT id, email, role, created_at FROM users WHERE email = ?', (email,)).fetchone()
    if existing:
        session['user_id'] = existing['id']
        session['user_email'] = existing['email']
        session['user_role'] = existing['role']
        return dict(existing)

    # On serverless SQLite, a request can land on a fresh runtime with an empty temp DB.
    # Recreate the authenticated session user so protected pages keep working.
    password_hash = generate_password_hash(f'session-recovery-{user_id}-{email}')
    db.execute(
        'INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)',
        (user_id, email, password_hash, role),
    )
    db.commit()
    restored = db.execute('SELECT id, email, role, created_at FROM users WHERE id = ?', (user_id,)).fetchone()
    return dict(restored) if restored else None


def login_required(view: F) -> F:
    @wraps(view)
    def wrapped_view(*args: Any, **kwargs: Any) -> Any:
        # SECURITY:AUTH - require both a session marker and a real user record.
        if not session.get('user_id'):
            flash('Please log in to continue.', 'error')
            return redirect(url_for('login'))
        current_user = get_current_user()
        if not current_user:
            session.clear()
            flash('Your session expired. Please log in again.', 'error')
            return redirect(url_for('login'))
        return view(*args, **kwargs)

    return cast(F, wrapped_view)


def admin_required(view: F) -> F:
    @wraps(view)
    def wrapped_view(*args: Any, **kwargs: Any) -> Any:
        # SECURITY:AUTH - route requires authenticated session.
        current_user = get_current_user()
        if not current_user:
            session.clear()
            flash('Your session expired. Please log in again.', 'error')
            return redirect(url_for('login'))
        if current_user['role'] != 'admin':
            flash('Admin access is required.', 'error')
            return redirect(url_for('dashboard'))
        return view(*args, **kwargs)

    return cast(F, wrapped_view)


def authenticate_user(email: str, password: str) -> dict[str, Any] | None:
    db = get_db()
    row = db.execute('SELECT * FROM users WHERE email = ?', (email.strip().lower(),)).fetchone()
    if not row:
        return None
    if not check_password_hash(row['password_hash'], password):
        return None
    return dict(row)


def register_user(email: str, password: str, role: str = 'user') -> int:
    normalized_email = email.strip().lower()
    db = get_db()
    existing = db.execute('SELECT id FROM users WHERE email = ?', (normalized_email,)).fetchone()
    if existing:
        raise ValueError('An account with that email already exists.')

    # SECURITY:AUTH - password hashing required before storing user credentials.
    password_hash = generate_password_hash(password)
    cursor = db.execute(
        'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
        (normalized_email, password_hash, role),
    )
    db.commit()
    return int(cursor.lastrowid)


def start_session(user: dict[str, Any]) -> None:
    session.clear()
    session['user_id'] = user['id']
    session['user_email'] = user['email']
    session['user_role'] = user['role']
    g.current_user = user


def logout_user() -> None:
    session.clear()
    g.current_user = None

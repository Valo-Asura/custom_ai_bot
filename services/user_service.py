from typing import Any

from database.db import get_db


def get_user_by_id(user_id: int) -> dict[str, Any] | None:
    db = get_db()
    row = db.execute('SELECT id, email, role, created_at FROM users WHERE id = ?', (user_id,)).fetchone()
    return dict(row) if row else None


def list_users() -> list[dict[str, Any]]:
    db = get_db()
    rows = db.execute(
        'SELECT id, email, role, created_at FROM users ORDER BY created_at DESC, id DESC'
    ).fetchall()
    return [dict(row) for row in rows]


def count_users() -> int:
    db = get_db()
    row = db.execute('SELECT COUNT(*) AS total FROM users').fetchone()
    return int(row['total'])


def delete_user(user_id: int) -> None:
    db = get_db()
    db.execute("DELETE FROM users WHERE id = ? AND role != 'admin'", (user_id,))
    db.commit()

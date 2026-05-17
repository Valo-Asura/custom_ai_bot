from typing import Any

from database.db import get_db

DEFAULT_PERSONALITY = {
    'bot_name': 'Personal AI Bot',
    'personality_prompt': "You are a helpful personal AI assistant grounded in the user's uploaded knowledge base.",
    'tone': 'Clear and practical',
    'description': 'A helpful personal AI assistant.',
}


def get_profile(user_id: int) -> dict[str, Any]:
    db = get_db()
    # SECURITY:IDOR - always filter records by current user_id.
    row = db.execute('SELECT * FROM bot_profiles WHERE user_id = ?', (user_id,)).fetchone()
    if row:
        return dict(row)
    return {
        'user_id': user_id,
        **DEFAULT_PERSONALITY,
        'created_at': None,
        'updated_at': None,
    }


def upsert_profile(
    user_id: int,
    bot_name: str,
    personality_prompt: str,
    tone: str,
    description: str,
) -> None:
    db = get_db()
    existing = db.execute('SELECT id FROM bot_profiles WHERE user_id = ?', (user_id,)).fetchone()
    if existing:
        db.execute(
            '''
            UPDATE bot_profiles
            SET bot_name = ?, personality_prompt = ?, tone = ?, description = ?, updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?
            ''',
            (bot_name, personality_prompt, tone, description, user_id),
        )
    else:
        db.execute(
            '''
            INSERT INTO bot_profiles (user_id, bot_name, personality_prompt, tone, description)
            VALUES (?, ?, ?, ?, ?)
            ''',
            (user_id, bot_name, personality_prompt, tone, description),
        )
    db.commit()

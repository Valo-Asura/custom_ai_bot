from __future__ import annotations

from typing import Any

from database.db import get_db
from services.embedding_service import embed_texts
from services.llm_service import generate_response
from services.personality_service import get_profile
from services.pinecone_service import query_vectors
from services.provider_service import get_provider_config

PROMPT_TEMPLATE = '''SYSTEM:
{personality_prompt}

CONTEXT:
{retrieved_chunks}

USER QUESTION:
{question}

INSTRUCTIONS:
Answer using the context where relevant. If the answer is not in the context, say that the uploaded knowledge base does not contain enough information.'''


def _store_message(user_id: int, role: str, content: str) -> None:
    db = get_db()
    db.execute(
        'INSERT INTO chat_messages (user_id, role, content) VALUES (?, ?, ?)',
        (user_id, role, content),
    )
    db.commit()


def list_chat_messages(user_id: int, limit: int = 30) -> list[dict[str, Any]]:
    db = get_db()
    # SECURITY:IDOR - always filter records by current user_id.
    rows = db.execute(
        '''
        SELECT id, role, content, created_at
        FROM chat_messages
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT ?
        ''',
        (user_id, limit),
    ).fetchall()
    return [dict(row) for row in reversed(rows)]


def build_prompt(personality_prompt: str, context_chunks: list[str], question: str) -> str:
    context = '\n\n'.join(context_chunks) if context_chunks else 'No relevant context found in the uploaded knowledge base.'
    return PROMPT_TEMPLATE.format(
        personality_prompt=personality_prompt,
        retrieved_chunks=context,
        question=question,
    )


def chat_with_bot(user_id: int, question: str) -> dict[str, Any]:
    cleaned_question = question.strip()
    if not cleaned_question:
        raise ValueError('Please enter a question before sending a message.')

    provider_config = get_provider_config(user_id)
    profile = get_profile(user_id)
    namespace = f'user_{user_id}'
    context_chunks: list[str] = []

    db = get_db()
    has_documents = db.execute(
        'SELECT EXISTS(SELECT 1 FROM uploaded_documents WHERE user_id = ?) AS has_documents',
        (user_id,),
    ).fetchone()

    if has_documents and int(has_documents['has_documents']) == 1:
        question_embedding = embed_texts(
            provider=str(provider_config['embedding_provider']),
            model=str(provider_config['embedding_model']),
            api_key=str(provider_config.get('embedding_api_key') or '').strip() or None,
            texts=[cleaned_question],
        )[0]
        matches = query_vectors(namespace=namespace, vector=question_embedding, top_k=4)
        context_chunks = [str(match['metadata'].get('text', '')) for match in matches if match.get('metadata')]

    prompt = build_prompt(str(profile['personality_prompt']), context_chunks, cleaned_question)

    _store_message(user_id, 'user', cleaned_question)
    answer = generate_response(
        provider=str(provider_config['chat_provider']),
        model=str(provider_config['chat_model']),
        api_key=str(provider_config.get('chat_api_key') or '').strip() or None,
        system_prompt=str(profile['personality_prompt']),
        user_prompt=prompt,
    )
    _store_message(user_id, 'assistant', answer)
    return {'answer': answer, 'context_chunks': context_chunks}

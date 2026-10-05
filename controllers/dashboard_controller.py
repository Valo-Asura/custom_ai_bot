from __future__ import annotations

from flask import Flask

from services.auth_service import get_current_user, login_required
from services.document_service import list_user_documents
from services.personality_service import get_profile
from services.provider_service import get_provider_config
from services.rag_service import list_chat_messages
from controllers.view_helpers import render_react_page


def register_routes(app: Flask) -> None:
    @app.route('/dashboard')
    @login_required
    def dashboard() -> str:
        current_user = get_current_user()
        assert current_user is not None
        user_id = int(current_user['id'])
        provider_config = get_provider_config(user_id)
        safe_providers = {
            key: provider_config[key]
            for key in ('chat_provider', 'chat_model', 'embedding_provider', 'embedding_model')
        }
        profile = get_profile(user_id)
        return render_react_page(
            'dashboard',
            'Dashboard | RAG Bot Builder',
            profile={key: profile[key] for key in ('bot_name', 'tone', 'description')},
            providers=safe_providers,
            documents=[
                {key: document[key] for key in ('id', 'original_filename', 'file_type', 'chunk_count')}
                for document in list_user_documents(user_id)
            ],
            messages=[
                {key: message[key] for key in ('id', 'role', 'content')}
                for message in list_chat_messages(user_id, limit=4)
            ],
        )

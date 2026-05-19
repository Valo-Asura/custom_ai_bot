from __future__ import annotations

from flask import Flask, render_template

from services.auth_service import get_current_user, login_required
from services.document_service import list_user_documents
from services.personality_service import get_profile
from services.provider_service import get_provider_config
from services.rag_service import list_chat_messages


def register_routes(app: Flask) -> None:
    @app.route('/dashboard')
    @login_required
    def dashboard() -> str:
        current_user = get_current_user()
        assert current_user is not None
        user_id = int(current_user['id'])
        return render_template(
            'dashboard.html',
            profile=get_profile(user_id),
            providers=get_provider_config(user_id),
            documents=list_user_documents(user_id),
            messages=list_chat_messages(user_id, limit=4),
        )

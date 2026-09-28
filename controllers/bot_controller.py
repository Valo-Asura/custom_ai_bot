from __future__ import annotations

from flask import Flask, current_app, flash, jsonify, redirect, render_template, request, url_for

from services.auth_service import get_current_user, login_required
from services.llm_service import test_chat_connection
from services.personality_service import get_profile, upsert_profile
from services.provider_service import get_provider_config, upsert_provider_config


def register_routes(app: Flask) -> None:
    @app.route('/personality', methods=['GET', 'POST'])
    @login_required
    def personality() -> str:
        current_user = get_current_user()
        assert current_user is not None
        user_id = int(current_user['id'])

        if request.method == 'POST':
            upsert_profile(
                user_id=user_id,
                bot_name=request.form.get('bot_name', '').strip() or 'Personal AI Bot',
                personality_prompt=request.form.get('personality_prompt', '').strip()
                or "You are a helpful personal AI assistant grounded in the user's uploaded knowledge base.",
                tone=request.form.get('tone', '').strip(),
                description=request.form.get('description', '').strip(),
            )
            flash('Bot personality saved.', 'success')
            return redirect(url_for('personality'))

        return render_template('personality.html', profile=get_profile(user_id))

    @app.route('/providers', methods=['GET', 'POST'])
    @login_required
    def providers() -> str:
        current_user = get_current_user()
        assert current_user is not None
        user_id = int(current_user['id'])

        if request.method == 'POST':
            clear_chat_key = bool(request.form.get('clear_chat_key'))
            clear_embedding_key = bool(request.form.get('clear_embedding_key'))
            upsert_provider_config(
                user_id=user_id,
                chat_provider=request.form.get('chat_provider', current_app.config['DEFAULT_CHAT_PROVIDER']).strip(),
                chat_model=request.form.get('chat_model', current_app.config['DEFAULT_CHAT_MODEL']).strip(),
                chat_api_key=request.form.get('chat_api_key', ''),
                embedding_provider=request.form.get(
                    'embedding_provider',
                    current_app.config['DEFAULT_EMBEDDING_PROVIDER'],
                ).strip(),
                embedding_model=request.form.get('embedding_model', current_app.config['DEFAULT_EMBEDDING_MODEL']).strip(),
                embedding_api_key=request.form.get('embedding_api_key', ''),
                clear_chat_key=clear_chat_key,
                clear_embedding_key=clear_embedding_key,
            )
            flash('Provider settings saved.', 'success')
            return redirect(url_for('providers'))

        return render_template(
            'providers.html',
            providers=get_provider_config(user_id),
            chat_providers=current_app.config['CHAT_PROVIDERS'],
            embedding_providers=current_app.config['EMBEDDING_PROVIDERS'],
        )

    @app.route('/providers/test', methods=['POST'])
    @login_required
    def test_provider():
        current_user = get_current_user()
        assert current_user is not None
        user_id = int(current_user['id'])

        payload = request.get_json(silent=True) or {}
        provider = str(payload.get('chat_provider', '')).strip()
        model = str(payload.get('chat_model', '')).strip()
        api_key = str(payload.get('chat_api_key', '')).strip()

        if not api_key:
            current_config = get_provider_config(user_id)
            if current_config.get('chat_provider') == provider:
                api_key = current_config.get('chat_api_key', '')

        success, message = test_chat_connection(provider, model, api_key or None)
        return jsonify({'ok': success, 'message': message}), (200 if success else 400)

from __future__ import annotations

from flask import Flask, flash, jsonify, redirect, render_template, request, url_for

from database.db import get_db
from services.auth_service import get_current_user, login_required
from services.rag_service import chat_with_bot, list_chat_messages


def _message_limit_error(is_json: bool, message: str):
    if is_json:
        return jsonify({'ok': False, 'error': message}), 400
    flash(message, 'error')
    return redirect(url_for('chat'))


def register_routes(app: Flask) -> None:
    @app.route('/chat')
    @login_required
    def chat() -> str:
        current_user = get_current_user()
        assert current_user is not None
        return render_template('chat.html', messages=list_chat_messages(int(current_user['id'])))

    @app.route('/chat/send', methods=['POST'])
    @login_required
    def chat_send():
        current_user = get_current_user()
        assert current_user is not None
        user_id = int(current_user['id'])

        if request.is_json:
            payload = request.get_json(silent=True) or {}
            question = str(payload.get('message', ''))
        else:
            question = request.form.get('message', '')

        if len(question.split()) > 40:
            return _message_limit_error(request.is_json, 'Message too long: Please keep your message under 40 words.')

        messages = list_chat_messages(user_id)
        user_message_count = sum(1 for message in messages if message.get('role') == 'user')
        if user_message_count >= 5:
            return _message_limit_error(request.is_json, 'Account limit reached: Maximum of 5 messages allowed per account.')

        try:
            result = chat_with_bot(user_id, question)
        except Exception as exc:
            if request.is_json:
                return jsonify({'ok': False, 'error': str(exc)}), 400
            flash(f'Chat failed: {exc}', 'error')
            return redirect(url_for('chat'))

        if request.is_json:
            return jsonify({'ok': True, 'answer': result['answer'], 'context_count': len(result['context_chunks'])})

        return redirect(url_for('chat'))

    @app.route('/chat/clear', methods=['POST'])
    @login_required
    def chat_clear():
        current_user = get_current_user()
        assert current_user is not None
        db = get_db()
        db.execute('DELETE FROM chat_messages WHERE user_id = ?', (int(current_user['id']),))
        db.commit()
        flash('Chat history cleared.', 'success')
        return redirect(url_for('chat'))

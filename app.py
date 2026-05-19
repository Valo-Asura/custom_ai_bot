from __future__ import annotations

from pathlib import Path

from flask import Flask, flash, jsonify, redirect, render_template, request, url_for

from config import Config
from database.db import close_db, database_health, get_db, init_db
from services.auth_service import (
    admin_required,
    authenticate_user,
    get_current_user,
    login_required,
    logout_user,
    register_user,
    start_session,
)
from services.document_service import (
    delete_document_assets,
    get_document_by_id,
    ingest_document,
    list_all_documents,
    list_user_documents,
)
from services.personality_service import get_profile, upsert_profile
from services.pinecone_service import delete_namespace, pinecone_health
from services.provider_service import get_provider_config, list_provider_overview, upsert_provider_config
from services.rag_service import chat_with_bot, list_chat_messages
from services.user_service import count_users, delete_user, get_user_by_id, list_users

app = Flask(__name__)
app.config.from_object(Config)
app.secret_key = app.config['SECRET_KEY']
app.teardown_appcontext(close_db)

app.config['UPLOAD_FOLDER'].mkdir(parents=True, exist_ok=True)
app.config['MAX_CONTENT_LENGTH'] = app.config['MAX_CONTENT_LENGTH_MB'] * 1024 * 1024

with app.app_context():
    init_db()


@app.context_processor
def inject_globals() -> dict[str, object]:
    return {'current_user': get_current_user()}


@app.after_request
def add_header(response):
    if request.path.startswith('/static/'):
        response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
    response.headers.setdefault('X-Content-Type-Options', 'nosniff')
    return response


@app.route('/')
def home() -> str:
    if get_current_user():
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))


@app.route('/healthz')
def healthz():
    deep_check = request.args.get('deep') == '1'
    return jsonify(
        {
            'status': 'ok',
            'database': database_health(check_remote=deep_check),
            'pinecone': pinecone_health(check_remote=deep_check),
        }
    )


@app.route('/login', methods=['GET', 'POST'])
def login() -> str:
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        user = authenticate_user(email, password)
        if not user:
            flash('Invalid credentials.', 'error')
            return render_template('login.html')
        start_session(user)
        flash('Logged in successfully.', 'success')
        return redirect(url_for('dashboard'))
    return render_template('login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup() -> str:
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')

        if not email or not password:
            flash('Email and password are required.', 'error')
            return render_template('signup.html')
        if password != confirm_password:
            flash('Passwords do not match.', 'error')
            return render_template('signup.html')

        try:
            register_user(email, password)
        except ValueError as exc:
            flash(str(exc), 'error')
            return render_template('signup.html')

        flash('Signup complete. You can log in now.', 'success')
        return redirect(url_for('login'))
    return render_template('signup.html')


@app.route('/logout')
@login_required
def logout() -> str:
    logout_user()
    flash('Logged out.', 'success')
    return redirect(url_for('login'))


@app.route('/dashboard')
@login_required
def dashboard() -> str:
    current_user = get_current_user()
    assert current_user is not None
    profile = get_profile(int(current_user['id']))
    providers = get_provider_config(int(current_user['id']))
    documents = list_user_documents(int(current_user['id']))
    messages = list_chat_messages(int(current_user['id']), limit=4)
    return render_template(
        'dashboard.html',
        profile=profile,
        providers=providers,
        documents=documents,
        messages=messages,
    )


@app.route('/personality', methods=['GET', 'POST'])
@login_required
def personality() -> str:
    current_user = get_current_user()
    assert current_user is not None

    if request.method == 'POST':
        upsert_profile(
            user_id=int(current_user['id']),
            bot_name=request.form.get('bot_name', '').strip() or 'Personal AI Bot',
            personality_prompt=request.form.get('personality_prompt', '').strip()
            or "You are a helpful personal AI assistant grounded in the user's uploaded knowledge base.",
            tone=request.form.get('tone', '').strip(),
            description=request.form.get('description', '').strip(),
        )
        flash('Bot personality saved.', 'success')
        return redirect(url_for('personality'))

    return render_template('personality.html', profile=get_profile(int(current_user['id'])))


@app.route('/providers', methods=['GET', 'POST'])
@login_required
def providers() -> str:
    current_user = get_current_user()
    assert current_user is not None

    if request.method == 'POST':
        upsert_provider_config(
            user_id=int(current_user['id']),
            chat_provider=request.form.get('chat_provider', app.config['DEFAULT_CHAT_PROVIDER']).strip(),
            chat_model=request.form.get('chat_model', app.config['DEFAULT_CHAT_MODEL']).strip(),
            chat_api_key=request.form.get('chat_api_key', ''),
            embedding_provider=request.form.get('embedding_provider', app.config['DEFAULT_EMBEDDING_PROVIDER']).strip(),
            embedding_model=request.form.get('embedding_model', app.config['DEFAULT_EMBEDDING_MODEL']).strip(),
            embedding_api_key=request.form.get('embedding_api_key', ''),
        )
        flash('Provider settings saved.', 'success')
        return redirect(url_for('providers'))

    return render_template(
        'providers.html',
        providers=get_provider_config(int(current_user['id'])),
        chat_providers=app.config['CHAT_PROVIDERS'],
        embedding_providers=app.config['EMBEDDING_PROVIDERS'],
    )


@app.route('/upload', methods=['GET', 'POST'])
@login_required
def upload() -> str:
    current_user = get_current_user()
    assert current_user is not None

    if request.method == 'POST':
        user_docs = list_user_documents(int(current_user['id']))
        if len(user_docs) >= 2:
            flash('Account limit reached: You can only upload a maximum of 2 documents.', 'error')
            return redirect(url_for('upload'))

        uploaded_file = request.files.get('document')
        if uploaded_file is None:
            flash('Please choose a file.', 'error')
            return redirect(url_for('upload'))

        try:
            ingest_document(int(current_user['id']), uploaded_file, get_provider_config(int(current_user['id'])))
            flash('Document uploaded and indexed successfully.', 'success')
        except Exception as exc:
            flash(f'Upload failed: {exc}', 'error')
        return redirect(url_for('upload'))

    return render_template('upload.html', documents=list_user_documents(int(current_user['id'])))


@app.route('/upload/documents/<int:document_id>/delete', methods=['POST'])
@login_required
def upload_delete_document(document_id: int):
    current_user = get_current_user()
    assert current_user is not None
    document = get_document_by_id(document_id)
    if not document or int(document['user_id']) != int(current_user['id']):
        flash('Document not found.', 'error')
        return redirect(url_for('upload'))
    delete_document_assets(document)
    flash('Document deleted.', 'success')
    return redirect(url_for('upload'))


@app.route('/upload/clear', methods=['POST'])
@login_required
def upload_clear():
    current_user = get_current_user()
    assert current_user is not None
    for document in list_user_documents(int(current_user['id'])):
        delete_document_assets(document)
    delete_namespace(int(current_user['id']))
    flash('Knowledge base fully cleared.', 'success')
    return redirect(url_for('upload'))


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

    question = ''
    if request.is_json:
        payload = request.get_json(silent=True) or {}
        question = str(payload.get('message', ''))
    else:
        question = request.form.get('message', '')

    if len(question.split()) > 40:
        error_msg = 'Message too long: Please keep your message under 40 words.'
        if request.is_json:
            return jsonify({'ok': False, 'error': error_msg}), 400
        flash(error_msg, 'error')
        return redirect(url_for('chat'))

    messages = list_chat_messages(int(current_user['id']))
    user_message_count = sum(1 for m in messages if m.get('role') == 'user')
    if user_message_count >= 5:
        error_msg = 'Account limit reached: Maximum of 5 messages allowed per account.'
        if request.is_json:
            return jsonify({'ok': False, 'error': error_msg}), 400
        flash(error_msg, 'error')
        return redirect(url_for('chat'))

    try:
        result = chat_with_bot(int(current_user['id']), question)
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


@app.route('/admin')
@admin_required
def admin() -> str:
    upload_folder = app.config['UPLOAD_FOLDER']
    upload_path = upload_folder if isinstance(upload_folder, Path) else Path(upload_folder)
    health = {
        'sqlite': database_health(),
        'pinecone': pinecone_health(),
        'uploads': {
            'status': 'ok' if upload_path.exists() and upload_path.is_dir() else 'error',
            'message': 'Upload folder writable locally' if upload_path.exists() else 'Upload folder is missing',
        },
    }
    return render_template(
        'admin.html',
        users=list_users(),
        user_count=count_users(),
        documents=list_all_documents(),
        provider_overview=list_provider_overview(),
        health=health,
    )


@app.route('/admin/users/<int:user_id>/delete', methods=['POST'])
@admin_required
def admin_delete_user(user_id: int) -> str:
    user = get_user_by_id(user_id)
    if not user:
        flash('User not found.', 'error')
        return redirect(url_for('admin'))
    if user['role'] == 'admin':
        flash('Admin users cannot be deleted.', 'error')
        return redirect(url_for('admin'))

    for document in list_user_documents(user_id):
        delete_document_assets(document)
    delete_namespace(user_id)
    delete_user(user_id)
    flash('Test user deleted.', 'success')
    return redirect(url_for('admin'))


@app.route('/admin/documents/<int:document_id>/delete', methods=['POST'])
@admin_required
def admin_delete_document(document_id: int) -> str:
    document = get_document_by_id(document_id)
    if not document:
        flash('Document not found.', 'error')
        return redirect(url_for('admin'))
    delete_document_assets(document)
    flash('Uploaded file metadata deleted.', 'success')
    return redirect(url_for('admin'))


if __name__ == '__main__':
    app.run(debug=True)

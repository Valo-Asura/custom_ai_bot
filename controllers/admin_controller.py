from __future__ import annotations

from pathlib import Path

from flask import Flask, flash, redirect, url_for

from database.db import database_health
from services.auth_service import admin_required
from services.document_service import delete_document_assets, get_document_by_id, list_all_documents, list_user_documents
from services.pinecone_service import delete_namespace, pinecone_health
from services.provider_service import list_provider_overview
from services.user_service import count_users, delete_user, get_user_by_id, list_users
from controllers.view_helpers import render_react_page


def register_routes(app: Flask) -> None:
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
        provider_overview = [
            {
                key: row[key]
                for key in (
                    'email',
                    'chat_provider',
                    'chat_model',
                    'embedding_provider',
                    'embedding_model',
                    'chat_api_key_masked',
                    'embedding_api_key_masked',
                )
            }
            for row in list_provider_overview()
        ]
        admin_documents = [
            {
                key: document[key]
                for key in ('id', 'email', 'original_filename', 'file_type', 'pinecone_namespace', 'chunk_count')
            }
            for document in list_all_documents()
        ]
        return render_react_page(
            'admin',
            'Admin | Personal AI Bot Builder',
            users=list_users(),
            user_count=count_users(),
            documents=admin_documents,
            provider_overview=provider_overview,
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

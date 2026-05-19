from __future__ import annotations

from flask import Flask, jsonify, redirect, request, url_for

from database.db import database_health
from services.auth_service import get_current_user
from services.pinecone_service import pinecone_health


def register_routes(app: Flask) -> None:
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

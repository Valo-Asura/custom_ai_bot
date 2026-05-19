from __future__ import annotations

from flask import Flask, request

from config import Config
from controllers import register_controllers
from database.db import close_db, init_db
from services.auth_service import get_current_user


def create_app(config_object: type[Config] = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_object)
    app.secret_key = app.config['SECRET_KEY']

    app.teardown_appcontext(close_db)
    app.config['UPLOAD_FOLDER'].mkdir(parents=True, exist_ok=True)
    app.config['MAX_CONTENT_LENGTH'] = app.config['MAX_CONTENT_LENGTH_MB'] * 1024 * 1024

    register_template_context(app)
    register_response_headers(app)
    register_controllers(app)

    with app.app_context():
        init_db()

    return app


def register_template_context(app: Flask) -> None:
    @app.context_processor
    def inject_globals() -> dict[str, object]:
        return {'current_user': get_current_user()}


def register_response_headers(app: Flask) -> None:
    @app.after_request
    def add_headers(response):
        if request.path.startswith('/static/'):
            response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
        response.headers.setdefault('X-Content-Type-Options', 'nosniff')
        return response


app = create_app()


if __name__ == '__main__':
    app.run(debug=True)

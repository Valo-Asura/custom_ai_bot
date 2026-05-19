from __future__ import annotations

from flask import Flask

from controllers import admin_controller, auth_controller, bot_controller, chat_controller, core_controller, dashboard_controller, document_controller


def register_controllers(app: Flask) -> None:
    core_controller.register_routes(app)
    auth_controller.register_routes(app)
    dashboard_controller.register_routes(app)
    bot_controller.register_routes(app)
    document_controller.register_routes(app)
    chat_controller.register_routes(app)
    admin_controller.register_routes(app)

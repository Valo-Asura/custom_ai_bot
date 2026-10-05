from __future__ import annotations

from flask import render_template

from services.auth_service import get_current_user


def render_react_page(page: str, title: str, **props: object) -> str:
    """Render the React application shell with page-specific server data."""
    user = get_current_user()
    return render_template(
        'react_page.html',
        react_page=page,
        react_props=props,
        react_user={'role': user['role']} if user else None,
        page_title=title,
    )

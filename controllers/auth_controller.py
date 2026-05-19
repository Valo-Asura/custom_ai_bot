from __future__ import annotations

from flask import Flask, flash, redirect, render_template, request, url_for

from services.auth_service import authenticate_user, login_required, logout_user, register_user, start_session


def register_routes(app: Flask) -> None:
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

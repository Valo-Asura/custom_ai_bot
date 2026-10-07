import React from 'react';

export function LoginPage() {
  return (
    <section className="auth-shell">
      <div className="card narrow-card">
        <h1 className="auth-title">Welcome back.</h1>
        <p className="muted auth-subtitle">Sign in to your personal AI workspace.</p>
        <form method="post" action="/login" className="stack-form">
          <label>Email<input type="email" name="email" required autoComplete="email" placeholder="you@example.com" /></label>
          <label>Password<input type="password" name="password" required autoComplete="current-password" placeholder="••••••••" /></label>
          <button type="submit">Login &rarr;</button>
        </form>
        <p className="inline-note auth-note">Need a test account? <a href="/signup">Create one</a>.</p>
      </div>
    </section>
  );
}

export function SignupPage() {
  return (
    <section className="auth-shell">
      <div className="card narrow-card">
        <h1 className="auth-title">Create account.</h1>
        <p className="muted auth-subtitle">Set up your personal AI knowledge base.</p>
        <form method="post" action="/signup" className="stack-form">
          <label>Email<input type="email" name="email" required autoComplete="email" placeholder="you@example.com" /></label>
          <label>Password<input type="password" name="password" required autoComplete="new-password" placeholder="Choose a strong password" /></label>
          <label>Confirm Password<input type="password" name="confirm_password" required autoComplete="new-password" placeholder="Repeat password" /></label>
          <button type="submit">Create Account &rarr;</button>
        </form>
        <p className="inline-note auth-note">Already have an account? <a href="/login">Login</a>.</p>
      </div>
    </section>
  );
}

import React from 'react';
import NavLink from './NavLink';

export default function AppShell({ currentUser, flashes = [], children }) {
  const loginHref = currentUser ? '/dashboard' : '/login';
  return <>
    <header className="site-header"><div className="container">
      <div className="masthead-meta" aria-label="Project edition metadata"><span>Sketchbook build</span><span>Flask · MongoDB · Pinecone</span><span>Personal AI workspace</span></div>
      <div className="nav-row">
        <a className="brand" href={loginHref}><span className="brand-kicker">Personal Knowledge Notes</span><span className="brand-title">RAG Bot Builder</span></a>
        <nav className="nav-links" aria-label="Primary navigation">{currentUser ? <>
          <NavLink href="/dashboard">Dashboard</NavLink><NavLink href="/personality">Personality</NavLink><NavLink href="/providers">Providers</NavLink><NavLink href="/upload">Upload</NavLink><NavLink href="/chat">Chat</NavLink>{currentUser.role === 'admin' && <NavLink href="/admin">Admin</NavLink>}<a href="/logout">Logout</a>
        </> : <><NavLink href="/login">Login</NavLink><NavLink href="/signup">Signup</NavLink></>}</nav>
      </div>
    </div></header>
    <main className="container page-shell">
      {flashes.length > 0 && <section className="flash-stack" aria-live="polite">{flashes.map(([category, message], index) => <div className={`flash flash-${category}`} key={`${category}-${index}`}>{message}</div>)}</section>}
      {children}
    </main>
  </>;
}

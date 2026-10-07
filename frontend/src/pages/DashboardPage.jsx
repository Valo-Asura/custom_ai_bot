import React from 'react';
import ChatBubble from '../components/ChatBubble';

export default function DashboardPage({ profile, providers, documents = [], messages = [] }) {
  return (
    <div className="dashboard-fit">
      <section className="page-header dashboard-header section-row">
        <div><h1>Dashboard</h1><p className="muted">Your RAG workspace — personality, providers, knowledge base, and chat history.</p></div>
        <a className="button-link" href="/chat">Open Chat &rarr;</a>
      </section>
      <section className="dashboard-metrics">
        <article className="card dashboard-card metric-card"><h2>Files</h2><p className="metric">{documents.length}</p><p className="muted">Indexed source documents.</p></article>
        <article className="card dashboard-card metric-card"><h2>Messages</h2><p className="metric">{messages.length}</p><p className="muted">Recent records for this account.</p></article>
        <article className="card dashboard-card metric-card"><h2>Mode</h2><p className="compact-mode-line"><strong>{providers.chat_provider}</strong> <span className="muted">chat</span></p><p className="compact-text"><strong>{providers.embedding_provider}</strong> <span className="muted">embed</span></p></article>
      </section>
      <section className="dashboard-details">
        <article className="card dashboard-card detail-card"><h2>Bot Personality</h2><p><strong>Name:</strong> {profile.bot_name}</p><p><strong>Tone:</strong> {profile.tone || 'Not set'}</p><p className="muted">{profile.description || 'No description set.'}</p><a className="button-link btn-secondary" href="/personality">Edit Personality</a></article>
        <article className="card dashboard-card detail-card"><h2>Providers</h2><p><strong>Chat:</strong> {providers.chat_provider} / {providers.chat_model}</p><p><strong>Embedding:</strong> {providers.embedding_provider} / {providers.embedding_model}</p><p className="muted">Chat and embeddings are configured separately.</p><a className="button-link btn-secondary" href="/providers">Edit Providers</a></article>
        <article className="card dashboard-card detail-card knowledge-card">
          <div className="section-row compact-section-row"><h2>Knowledge Base</h2><a href="/upload">Upload files &rarr;</a></div>
          {documents.length ? <table><thead><tr><th>File</th><th>Type</th><th>Chunks</th></tr></thead><tbody>{documents.map((doc) => <tr key={doc.id}><td>{doc.original_filename}</td><td>{doc.file_type}</td><td>{doc.chunk_count}</td></tr>)}</tbody></table> : <p className="muted">No files uploaded yet.</p>}
        </article>
        <article className="card dashboard-card detail-card">
          <div className="section-row compact-section-row"><h2>Recent Chat</h2><a href="/chat">Open chat &rarr;</a></div>
          {messages.length ? <div className="chat-preview">{messages.map((message) => <ChatBubble message={message} key={message.id ?? `${message.role}-${message.content}`} />)}</div> : <p className="muted">No chat history yet.</p>}
        </article>
      </section>
    </div>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../../static/style.css';

const MODEL_OPTIONS = {
  chat: {
    groq: ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b', 'meta-llama/llama-4-scout-17b-16e-instruct'],
    ollama: ['llama3.2', 'llama3.1', 'mistral', 'gemma2', 'phi3'],
    gemini: ['gemini-1.5-flash', 'gemini-1.5-pro'],
    openrouter: ['meta-llama/llama-3.1-8b-instruct', 'anthropic/claude-3.5-sonnet', 'google/gemini-pro-1.5'],
    huggingface: ['meta-llama/Meta-Llama-3-8B-Instruct', 'mistralai/Mistral-7B-Instruct-v0.2'],
  },
  embedding: {
    gemini: ['gemini-embedding-001', 'text-embedding-004', 'gemini-embedding-2'],
    huggingface: ['sentence-transformers/all-MiniLM-L6-v2', 'BAAI/bge-small-en-v1.5'],
    ollama: ['nomic-embed-text', 'mxbai-embed-large', 'all-minilm'],
    pinecone: ['multilingual-e5-large'],
    'sentence-transformers': ['all-MiniLM-L6-v2', 'all-mpnet-base-v2'],
  },
};

const DEPRECATED_MODELS = {
  'llama-3.3-70b-versatile': 'openai/gpt-oss-120b',
  'llama-3.1-8b-instant': 'openai/gpt-oss-20b',
  'gemma2-9b-it': 'openai/gpt-oss-20b',
  'llama3-8b-8192': 'openai/gpt-oss-20b',
  'llama3-70b-8192': 'openai/gpt-oss-120b',
};

function App({ bootstrap }) {
  const { page, props = {}, currentUser, flashes = [] } = bootstrap;
  const loginHref = currentUser ? '/dashboard' : '/login';

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="masthead-meta" aria-label="Project edition metadata">
            <span>Sketchbook build</span>
            <span>Flask · MongoDB · Pinecone</span>
            <span>Personal AI workspace</span>
          </div>
          <div className="nav-row">
            <a className="brand" href={loginHref}>
              <span className="brand-kicker">Personal Knowledge Notes</span>
              <span className="brand-title">RAG Bot Builder</span>
            </a>
            <nav className="nav-links" aria-label="Primary navigation">
              {currentUser ? (
                <>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                  <NavLink href="/personality">Personality</NavLink>
                  <NavLink href="/providers">Providers</NavLink>
                  <NavLink href="/upload">Upload</NavLink>
                  <NavLink href="/chat">Chat</NavLink>
                  {currentUser.role === 'admin' && <NavLink href="/admin">Admin</NavLink>}
                  <a href="/logout">Logout</a>
                </>
              ) : (
                <>
                  <NavLink href="/login">Login</NavLink>
                  <NavLink href="/signup">Signup</NavLink>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="container page-shell">
        {flashes.length > 0 && (
          <section className="flash-stack" aria-live="polite">
            {flashes.map(([category, message], index) => (
              <div className={`flash flash-${category}`} key={`${category}-${index}`}>{message}</div>
            ))}
          </section>
        )}
        <Page page={page} props={props} />
      </main>
    </>
  );
}

function NavLink({ href, children }) {
  const active = window.location.pathname === href;
  return <a href={href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined}>{children}</a>;
}

function Page({ page, props }) {
  switch (page) {
    case 'login': return <LoginPage />;
    case 'signup': return <SignupPage />;
    case 'dashboard': return <DashboardPage {...props} />;
    case 'personality': return <PersonalityPage {...props} />;
    case 'providers': return <ProvidersPage {...props} />;
    case 'upload': return <UploadPage {...props} />;
    case 'chat': return <ChatPage {...props} />;
    case 'admin': return <AdminPage {...props} />;
    default: return <section className="card"><h1>Page not found</h1><a href="/dashboard">Return to dashboard</a></section>;
  }
}

function LoginPage() {
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

function SignupPage() {
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

function DashboardPage({ profile, providers, documents = [], messages = [] }) {
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

function PersonalityPage({ profile }) {
  return (
    <>
      <section className="page-header"><div><h1>Bot Personality</h1><p className="muted">Configure how your personal assistant should behave.</p></div></section>
      <section className="card">
        <form method="post" action="/personality" className="stack-form">
          <div className="grid two-col">
            <label>Bot Name<input type="text" name="bot_name" defaultValue={profile.bot_name} required /></label>
            <label>Tone<input type="text" name="tone" defaultValue={profile.tone} placeholder="Clear, concise, friendly" /></label>
          </div>
          <label>Personality / System Prompt<textarea name="personality_prompt" rows="3" defaultValue={profile.personality_prompt} required /></label>
          <label>Short Description<textarea name="description" rows="2" defaultValue={profile.description} placeholder="What is this bot optimized for?" /></label>
          <div className="form-footer-row"><span className="muted inline-note">💡 Safety &amp; instruction rules are automatically applied to keep your bot schema clean.</span><button type="submit">Save Personality</button></div>
        </form>
      </section>
    </>
  );
}

function ProvidersPage({ providers, chat_providers: chatProviders, embedding_providers: embeddingProviders }) {
  const [chatProvider, setChatProvider] = useState(providers.chat_provider);
  const [chatModel, setChatModel] = useState(DEPRECATED_MODELS[providers.chat_model] || providers.chat_model);
  const [embeddingProvider, setEmbeddingProvider] = useState(providers.embedding_provider);
  const [embeddingModel, setEmbeddingModel] = useState(DEPRECATED_MODELS[providers.embedding_model] || providers.embedding_model);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const chatModels = useMemo(() => withCurrent(MODEL_OPTIONS.chat[chatProvider], chatModel), [chatProvider, chatModel]);
  const embeddingModels = useMemo(() => withCurrent(MODEL_OPTIONS.embedding[embeddingProvider], embeddingModel), [embeddingProvider, embeddingModel]);

  async function testConnection() {
    setTesting(true);
    setTestResult({ kind: 'pending', text: 'Contacting provider API...' });
    try {
      const response = await fetch('/providers/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_provider: chatProvider,
          chat_model: chatModel,
          chat_api_key: document.getElementById('chat_api_key')?.value || '',
        }),
      });
      const data = await response.json();
      setTestResult({ kind: response.ok && data.ok ? 'success' : 'error', text: `${response.ok && data.ok ? '✓' : '✗'} ${data.message || 'Connection test failed.'}` });
    } catch (error) {
      setTestResult({ kind: 'error', text: `✗ Request failed: ${error.message}` });
    } finally {
      setTesting(false);
    }
  }

  return (
    <>
      <section className="page-header"><div><h1>Providers</h1><p className="muted">Choose separate providers for generation and embeddings. API keys stay server-side only.</p></div></section>
      <section className="card">
        <details className="info-box-details">
          <summary>💡 View API Key &amp; Pricing Links</summary>
          <div className="info-box" style={{ marginTop: 10, marginBottom: 0 }}><strong>Pricing Tiers &amp; API Keys:</strong><ul>
            <li><strong>Groq:</strong> Free beta tier available. <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer">Get API Key</a></li>
            <li><strong>Gemini:</strong> Generous free tier available. <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">Get API Key</a></li>
            <li><strong>Pinecone:</strong> Free starter index, paid for scale. <a href="https://app.pinecone.io/" target="_blank" rel="noreferrer">Get API Key</a></li>
            <li><strong>Ollama:</strong> 100% Free and runs locally on your machine.</li>
            <li><strong>OpenRouter:</strong> Pay-per-token depending on the model. <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer">Get API Key</a></li>
            <li><strong>HuggingFace:</strong> Free inference API with rate limits. <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer">Get API Key</a></li>
          </ul></div>
        </details>
        <form method="post" action="/providers" className="stack-form" style={{ marginTop: 16 }}>
          <div className="grid two-col">
            <label>Chat Provider<select name="chat_provider" value={chatProvider} onChange={(event) => { setChatProvider(event.target.value); setChatModel(MODEL_OPTIONS.chat[event.target.value]?.[0] || ''); }} required>{chatProviders.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>
            <label>Chat Model<select name="chat_model" id="chat_model" value={chatModel} onChange={(event) => setChatModel(event.target.value)} required>{chatModels.map((model) => <option key={model} value={model}>{model}</option>)}</select></label>
          </div>
          <label>Chat API Key<input type="password" id="chat_api_key" name="chat_api_key" placeholder={providers.has_chat_api_key ? '•••••••••••••••• (leave blank to keep unchanged)' : 'Enter Chat API Key (e.g. from console.groq.com/keys)'} /></label>
          {providers.has_chat_api_key && <KeyClearOption name="clear_chat_key" label="Clear saved API key" />}
          <div className="grid two-col">
            <label>Embedding Provider<select name="embedding_provider" value={embeddingProvider} onChange={(event) => { setEmbeddingProvider(event.target.value); setEmbeddingModel(MODEL_OPTIONS.embedding[event.target.value]?.[0] || ''); }} required>{embeddingProviders.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>
            <label>Embedding Model<select name="embedding_model" id="embedding_model" value={embeddingModel} onChange={(event) => setEmbeddingModel(event.target.value)} required>{embeddingModels.map((model) => <option key={model} value={model}>{model}</option>)}</select></label>
          </div>
          <label>Embedding API Key<input type="password" id="embedding_api_key" name="embedding_api_key" placeholder={providers.has_embedding_api_key ? '•••••••••••••••• (leave blank to keep unchanged)' : 'Enter Embedding API Key (e.g. from aistudio.google.com)'} /></label>
          {providers.has_embedding_api_key && <KeyClearOption name="clear_embedding_key" label="Clear saved API key" />}
          <div className="form-footer-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span className="muted inline-note">💡 Chunking uses LangChain `RecursiveCharacterTextSplitter`, not the selected model provider.</span>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><button type="button" id="test-provider-btn" className="btn-secondary" style={{ padding: '10px 16px' }} onClick={testConnection} disabled={testing}>{testing ? 'Testing...' : 'Test Chat Connection'}</button><button type="submit">Save Provider Settings</button></div>
          </div>
          {testResult && <div id="test-result-box" role="status" style={{ marginTop: 14, padding: '12px 16px', borderRadius: 'var(--r-sm)', border: '2px solid', fontSize: '0.9rem', backgroundColor: resultColors[testResult.kind].background, borderColor: resultColors[testResult.kind].border, color: resultColors[testResult.kind].color }}>{testResult.text}</div>}
        </form>
      </section>
    </>
  );
}

function withCurrent(models = [], current) {
  return current && !models.includes(current) ? [current, ...models] : models;
}

function KeyClearOption({ name, label }) {
  return <div style={{ marginTop: -6, marginBottom: 12 }}><label style={{ fontSize: '0.85rem', fontWeight: 'normal', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><input type="checkbox" name={name} value="1" /> {label}</label></div>;
}

const resultColors = {
  pending: { background: '#EFF6FF', border: '#3B82F6', color: '#1E3A8A' },
  success: { background: '#ECFDF5', border: '#10B981', color: '#065F46' },
  error: { background: '#FEF2F2', border: '#EF4444', color: '#991B1B' },
};

function UploadPage({ documents = [] }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [uploading, setUploading] = useState(false);
  return (
    <>
      <section className="page-header section-row">
        <div><h1>Knowledge Base</h1><p className="muted">Upload PDF, TXT, or DOCX files — chunked and indexed into your private Pinecone namespace.</p><p className="limit-warning inline-limit">Account limit: <strong>2 documents max · 5 MB per file.</strong></p></div>
        <form action="/upload/clear" method="post" onSubmit={(event) => { if (!window.confirm('Wipe entire knowledge base and Pinecone vectors? This cannot be undone.')) event.preventDefault(); }}><button type="submit" className="danger-button">Clear Knowledge Base</button></form>
      </section>
      <div className="grid two-col upload-grid" style={{ alignItems: 'start' }}>
        <section className="card"><h2 className="heading-spaced" style={{ fontSize: '1.1rem', marginBottom: 12 }}>Upload Document</h2><form method="post" action="/upload" encType="multipart/form-data" className="stack-form" onSubmit={() => { setUploading(true); window.setTimeout(() => setShowOverlay(true), 50); }}>
          <label>Document<input type="file" name="document" accept=".pdf,.txt,.docx" required /></label>
          <button type="submit" disabled={uploading} style={{ width: '100%', justifyContent: 'center' }}>{uploading ? 'Indexing...' : 'Upload and Index →'}</button>
        </form></section>
        <section className="card"><h2 className="heading-spaced" style={{ fontSize: '1.1rem', marginBottom: 12 }}>Uploaded Files</h2>
          {documents.length ? <table style={{ fontSize: '0.82rem' }}><thead><tr><th style={{ width: '50%' }}>Filename</th><th style={{ width: '20%' }}>Type</th><th style={{ width: '15%', textAlign: 'right' }}>Chunks</th><th style={{ width: '15%', textAlign: 'right' }}>Action</th></tr></thead><tbody>{documents.map((document) => <tr key={document.id}><td title={document.original_filename} style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{document.original_filename}</td><td>{document.file_type}</td><td style={{ textAlign: 'right' }}>{document.chunk_count}</td><td style={{ textAlign: 'right' }}><form action={`/upload/documents/${document.id}/delete`} method="post" className="inline-form" onSubmit={(event) => { if (!window.confirm('Delete this document?')) event.preventDefault(); }}><button type="submit" className="danger-button small-danger-button" style={{ padding: '4px 8px', fontSize: '0.75rem', boxShadow: '2px 2px 0px 0px #EF4444' }}>Delete</button></form></td></tr>)}</tbody></table> : <p className="muted" style={{ marginTop: 10 }}>No documents uploaded yet.</p>}
        </section>
      </div>
      <div id="upload-overlay" className={`upload-overlay${showOverlay ? ' active' : ''}`} aria-live="polite"><div className="overlay-content"><div className="spinner-logo" /><h3>Indexing your document…</h3><p className="muted">Extracting text, generating embeddings, and indexing into Pinecone.</p></div></div>
    </>
  );
}

function ChatPage({ messages: initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  async function sendMessage(event) {
    event.preventDefault();
    const message = input.trim();
    if (!message || busy) return;
    setMessages((current) => [...current, { role: 'user', content: message }]);
    setInput('');
    setBusy(true);
    setStatus('Retrieving context...');
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        signal: controller.signal,
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.error || 'Chat request failed.');
      setMessages((current) => [...current, { role: 'assistant', content: payload.answer }]);
      setStatus(`${payload.context_count} context chunk(s) used.`);
    } catch (error) {
      const messageText = error.name === 'AbortError'
        ? 'The request took too long for the serverless time budget. Try a shorter question or use a faster provider.'
        : error.message;
      setMessages((current) => [...current, { role: 'assistant', content: `Error: ${messageText}` }]);
      setStatus('Chat failed.');
    } finally {
      window.clearTimeout(timeoutId);
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <section className="page-header section-row"><div><h1>Chat</h1><p className="muted">Ask questions against your bot personality and knowledge base.</p><p className="limit-warning inline-limit">Account limit: <strong>5 messages max.</strong></p></div><form action="/chat/clear" method="post" onSubmit={(event) => { if (!window.confirm('Clear your entire chat history?')) event.preventDefault(); }}><button type="submit" className="danger-button">Clear Chat History</button></form></section>
      <section className="card chat-card">
        <div id="chat-log" className="chat-log" ref={logRef} aria-live="polite">{messages.length ? messages.map((message, index) => <ChatBubble message={message} key={message.id ?? `${message.role}-${index}`} />) : <div className="chat-bubble assistant"><strong>Assistant</strong><p>No messages yet. Upload documents, then ask a question.</p></div>}</div>
        <form id="chat-form" className="chat-form" action="/chat/send" method="post" onSubmit={sendMessage}>
          <div className="chat-input-row"><textarea id="chat-input" name="message" ref={inputRef} rows="2" maxLength="280" placeholder="Ask a question. Enter sends, Shift+Enter adds a line." required value={input} disabled={busy} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} /><button type="submit" disabled={busy}>{busy ? 'Sending' : 'Send →'}</button></div>
          <div className="chat-actions"><span id="chat-status" className="muted" aria-live="polite">{status}</span></div>
        </form>
      </section>
    </>
  );
}

function ChatBubble({ message }) {
  const role = message.role === 'user' ? 'user' : 'assistant';
  const title = role === 'user' ? 'User' : 'Assistant';
  return <div className={`chat-bubble ${role}`}><strong>{title}</strong><p>{message.content}</p></div>;
}

function AdminPage({ users = [], user_count: userCount = 0, documents = [], provider_overview: providerOverview = [], health = {} }) {
  return (
    <>
      <section className="page-header"><div><h1>Admin Dashboard</h1><p className="muted">Review users, uploads, provider selections, and basic app health.</p></div></section>
      <section className="grid three-col"><article className="card"><h2>User Count</h2><p className="metric">{userCount}</p></article><article className="card"><h2>Database</h2><p>{health.sqlite?.message}</p></article><article className="card"><h2>Pinecone / Uploads</h2><p>{health.pinecone?.message}</p><p>{health.uploads?.message}</p></article></section>
      <section className="card"><h2>Users</h2><table><thead><tr><th>Email</th><th>Role</th><th>Created</th><th>Action</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td>{user.email}</td><td>{user.role}</td><td>{user.created_at}</td><td>{user.role !== 'admin' ? <form method="post" action={`/admin/users/${user.id}/delete`}><button type="submit" className="danger-button">Delete Test User</button></form> : <span className="muted">Protected</span>}</td></tr>)}</tbody></table></section>
      <section className="card"><h2>Provider Overview</h2><table><thead><tr><th>User</th><th>Chat</th><th>Embedding</th><th>Chat Key</th><th>Embedding Key</th></tr></thead><tbody>{providerOverview.map((row, index) => <tr key={`${row.email}-${index}`}><td>{row.email}</td><td>{row.chat_provider || 'Not set'} / {row.chat_model || 'Not set'}</td><td>{row.embedding_provider || 'Not set'} / {row.embedding_model || 'Not set'}</td><td>{row.chat_api_key_masked}</td><td>{row.embedding_api_key_masked}</td></tr>)}</tbody></table></section>
      <section className="card"><h2>Uploaded File Metadata</h2>{documents.length ? <table><thead><tr><th>User</th><th>Filename</th><th>Type</th><th>Namespace</th><th>Chunks</th><th>Action</th></tr></thead><tbody>{documents.map((document) => <tr key={document.id}><td>{document.email}</td><td>{document.original_filename}</td><td>{document.file_type}</td><td>{document.pinecone_namespace}</td><td>{document.chunk_count}</td><td><form method="post" action={`/admin/documents/${document.id}/delete`}><button type="submit" className="danger-button">Delete Metadata</button></form></td></tr>)}</tbody></table> : <p className="muted">No uploaded files yet.</p>}</section>
    </>
  );
}

const bootstrap = JSON.parse(document.getElementById('app-state').textContent);
createRoot(document.getElementById('root')).render(<App bootstrap={bootstrap} />);

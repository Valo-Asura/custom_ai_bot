import React, { useState } from 'react';

export default function UploadPage({ documents = [] }) {
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

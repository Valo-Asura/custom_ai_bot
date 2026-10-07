import React from 'react';

export default function AdminPage({ users = [], user_count: userCount = 0, documents = [], provider_overview: providerOverview = [], health = {} }) {
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

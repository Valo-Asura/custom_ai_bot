import React, { useEffect, useRef, useState } from 'react';
import ChatBubble from '../components/ChatBubble';

export default function ChatPage({ messages: initialMessages = [] }) {
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

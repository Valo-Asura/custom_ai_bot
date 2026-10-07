import React, { useMemo, useState } from 'react';
import { MODEL_OPTIONS, DEPRECATED_MODELS } from '../lib/providerModels';
import KeyClearOption from '../components/KeyClearOption';

export default function ProvidersPage({ providers, chat_providers: chatProviders, embedding_providers: embeddingProviders }) {
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

const resultColors = {
  pending: { background: '#EFF6FF', border: '#3B82F6', color: '#1E3A8A' },
  success: { background: '#ECFDF5', border: '#10B981', color: '#065F46' },
  error: { background: '#FEF2F2', border: '#EF4444', color: '#991B1B' },
};

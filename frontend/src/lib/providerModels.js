export const MODEL_OPTIONS = {
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

export const DEPRECATED_MODELS = {
  'llama-3.3-70b-versatile': 'openai/gpt-oss-120b',
  'llama-3.1-8b-instant': 'openai/gpt-oss-20b',
  'gemma2-9b-it': 'openai/gpt-oss-20b',
  'llama3-8b-8192': 'openai/gpt-oss-20b',
  'llama3-70b-8192': 'openai/gpt-oss-120b',
};

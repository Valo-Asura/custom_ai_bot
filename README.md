# Personal RAG AI Bot Builder

A lightweight Flask app for building personal AI assistants that answer from uploaded documents.

Users can create a bot profile, choose AI providers, upload PDF/DOCX/TXT files, and chat against a private Pinecone-backed knowledge base.

## Screenshots

| Login | Dashboard |
| --- | --- |
| ![Login screen](docs/screenshots/01-login.png) | ![Dashboard](docs/screenshots/02-dashboard.png) |

| Providers | Upload |
| --- | --- |
| ![Provider setup](docs/screenshots/03-provider-setup.png) | ![Document upload](docs/screenshots/04-document-upload.png) |

| Chat | Personality |
| --- | --- |
| ![Chat workflow](docs/screenshots/05-chat-workflow.png) | ![Personality setup](docs/screenshots/06-personality.png) |

## Stack

| Layer | Tech |
| --- | --- |
| App | Flask application factory |
| Controllers | Route modules in `controllers/` |
| Views | Jinja templates in `templates/` |
| Services | Business logic in `services/` |
| UI | HTML, CSS, vanilla JavaScript |
| Auth | Flask sessions, user/admin guards |
| Data | MongoDB Atlas in production, SQLite locally |
| Vector DB | Pinecone namespaces per user |
| Documents | PyPDF2, python-docx, TXT parser |
| Chunking | `langchain-text-splitters` |
| Chat | Groq, OpenRouter, Gemini, Hugging Face, Ollama |
| Embeddings | Gemini, Hugging Face, Pinecone, Ollama, sentence-transformers |
| Deploy | Vercel Python Functions |

## Project Structure

```text
app.py                 # Flask app factory and bootstrap
config.py              # Runtime config and environment defaults
controllers/           # Route handlers grouped by workflow
database/              # SQLite schema plus MongoDB/SQLite adapter
services/              # Auth, RAG, provider, document, and vector logic
templates/             # Jinja views
static/                # Cached CSS and JavaScript
docs/screenshots/      # README screenshots
```

The current structure follows a practical MVC split:

- **Controllers:** request/response flow only
- **Views:** Jinja templates and static assets
- **Model/Data:** `database/` adapter plus service-layer domain operations

## Workflow

```mermaid
flowchart LR
    A[Upload file] --> B[Extract text]
    B --> C[Split chunks]
    C --> D[Create embeddings]
    D --> E[Pinecone namespace]
    F[Ask question] --> G[Embed query]
    G --> H[Retrieve chunks]
    H --> I[Build prompt]
    I --> J[Generate answer]
```

## Performance Notes

- Static CSS/JS is served with immutable cache headers.
- UI uses system fonts, so no remote font request is needed.
- Page-load animation was removed to avoid first-paint work and screenshot fade.
- Provider dropdown logic lives in cached `static/app.js`.
- Chat defaults are tuned for Vercel free-tier response time: shorter HTTP read timeout, smaller answer token budget, and fewer retrieved chunks.
- Local-only providers fail fast on Vercel instead of hanging.

## Local Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
flask --app app run --host 127.0.0.1 --port 5000
```

Open:

```text
http://127.0.0.1:5000
```

## Required Environment

```bash
FLASK_SECRET_KEY=replace-me
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=personal-ai-bot-builder

GROQ_API_KEY=...
GEMINI_API_KEY=...
PINECONE_API_KEY=...
PINECONE_INDEX_NAME=personal-ai-bot

DEFAULT_CHAT_PROVIDER=groq
DEFAULT_CHAT_MODEL=llama-3.3-70b-versatile
DEFAULT_EMBEDDING_PROVIDER=gemini
DEFAULT_EMBEDDING_MODEL=gemini-embedding-001
```

For first MongoDB setup:

```bash
MONGO_AUTO_CREATE_INDEXES=1
```

After indexes exist on production:

```bash
MONGO_AUTO_CREATE_INDEXES=0
```

## Deploy

```bash
npx vercel --prod
```

## Health Check

```bash
curl /healthz
curl /healthz?deep=1
```

`/healthz` is shallow and fast. `?deep=1` checks remote dependencies.

## Limits

- 2 uploaded documents per account
- 5 MB max per file
- 5 user chat messages per account
- Uploaded filenames are sanitized
- Pinecone operations are scoped to `user_{id}` namespaces

# Personal RAG AI Bot Builder

> **Portfolio project** — Built to demonstrate production-grade AI engineering skills under real-world infrastructure constraints (Vercel Free Tier).

A lightweight Flask app for creating personal AI assistants that answer from uploaded documents.

Users can:

- create a bot profile and personality prompt
- upload PDF, DOCX, or TXT files (max 2 documents, 5 MB each)
- choose separate chat and embedding providers
- ask questions against their private knowledge base (5 message limit)
- clear chat history and wipe knowledge base vectors independently

## Screenshots

| Login | Upload |
| --- | --- |
| ![Login screen](docs/screenshots/01-login.png) | ![Document upload](docs/screenshots/04-document-upload.png) |

| Providers | Chat |
| --- | --- |
| ![Provider setup](docs/screenshots/03-provider-setup.png) | ![Chat workflow](docs/screenshots/05-chat-workflow.png) |

## Stack

| Layer | Tech |
| --- | --- |
| Web app | Flask, Jinja templates |
| UI | HTML, CSS (Playful Geometric design system), vanilla JavaScript |
| Fonts | Outfit (headings, 800/700), Plus Jakarta Sans (body, 400/600) |
| Auth | Flask sessions, user/admin route guards |
| Data | MongoDB Atlas in production, SQLite locally |
| Vector DB | Pinecone namespaces per user |
| Chunking | `langchain-text-splitters` |
| Documents | PyPDF2, python-docx, plain text parser |
| Chat providers | Groq, OpenRouter, Gemini, Hugging Face, Ollama |
| Embeddings | Gemini, Hugging Face, Pinecone, Ollama, sentence-transformers |
| Deploy | Vercel Python Functions (Free Tier) |

## Design System

The UI uses a **Playful Geometric** design language:

- **Hard pop shadows** — `4px 4px 0px #1E293B` on cards and buttons (no blur, sticker feel)
- **Candy buttons** — pill-shaped with lift/press micro-animations and bounce easing
- **Dot-grid background** — warm cream (`#FFFDF5`) with a subtle 24px radial dot pattern
- **Confetti metric cards** — each gets a unique colored shadow (violet / pink / yellow)
- **Color-on-focus inputs** — hard colored shadow appears on `:focus`, matching the accent color
- **Reduced-motion safe** — all animations respect `prefers-reduced-motion`

## Workflow

```mermaid
flowchart LR
    A[Upload document] --> B[Extract text]
    B --> C[Split into chunks]
    C --> D[Create embeddings]
    D --> E[Store in Pinecone namespace]
    F[Ask question] --> G[Embed question]
    G --> H[Retrieve matching chunks]
    H --> I[Build prompt]
    I --> J[Generate answer]
```

## Key Ideas

- Chat and embedding providers are separate, so generation and retrieval can be tuned independently.
- Pinecone data is isolated by namespace using `user_{id}`.
- Static assets are cached aggressively for faster Vercel loads.
- Local-only providers fail fast on Vercel instead of hanging.
- MongoDB is used for persistent production state; SQLite is only the local fallback.
- Vercel Free Tier constraints (memory, timeout, ephemeral storage) are treated as engineering challenges, not blockers.

## Vercel Free Tier Engineering

| Constraint | Limit | Solution |
| --- | --- | --- |
| Function memory | 1024 MB | Removed `langchain`, use `langchain-text-splitters` only |
| Cold start | Penalizes large packages | Minimal deps — near-instant boot |
| Ephemeral filesystem | SQLite resets on redeploy | MongoDB Atlas as persistent backend |
| Execution timeout | 10s | Lightweight Groq inference calls |
| Bandwidth | 100 GB/month | `Cache-Control: immutable` on all static assets |

## Local Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## Required Environment

Minimum production variables:

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

For first-time MongoDB setup, temporarily enable index creation:

```bash
MONGO_AUTO_CREATE_INDEXES=1
```

After indexes exist, keep it disabled on Vercel:

```bash
MONGO_AUTO_CREATE_INDEXES=0
```

## Deploy

```bash
npx vercel --prod
```

The app includes `vercel.json` for Python function deployment and static asset cache headers.

## Health Check

```bash
curl /healthz
curl /healthz?deep=1
```

`/healthz` is shallow and fast. `?deep=1` checks remote dependencies.

## Security Notes

- Protected queries are scoped by authenticated `user_id`.
- Admin routes require admin role.
- Uploaded filenames are sanitized.
- API keys are stored server-side and masked in admin views.
- Pinecone operations are scoped to per-user namespaces.
- File size capped at 5 MB; chat history capped at 5 messages per account.

import os
import tempfile
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / '.env')


def _resolve_runtime_path(configured_path: str, *, for_uploads: bool = False) -> Path:
    candidate = Path(configured_path)
    if not candidate.is_absolute():
        candidate = (BASE_DIR / candidate).resolve()

    # Vercel serverless functions cannot rely on persistent writes inside the project directory.
    if os.getenv('VERCEL') and not os.getenv('DATABASE_URL'):
        runtime_root = Path(tempfile.gettempdir()) / 'personal-ai-bot-builder'
        runtime_root.mkdir(parents=True, exist_ok=True)
        suffix = 'uploads' if for_uploads else 'app.db'
        return runtime_root / suffix

    return candidate


class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-me')
    ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'admin@example.com')
    ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')

    MONGODB_URI = os.getenv('MONGODB_URI', '').strip()
    MONGODB_DB_NAME = os.getenv('MONGODB_DB_NAME', 'personal-ai-bot-builder').strip() or 'personal-ai-bot-builder'
    DATABASE_URL = os.getenv('DATABASE_URL', '').strip() or None
    DATABASE_PATH = _resolve_runtime_path(os.getenv('DATABASE_PATH', 'database/app.db'))
    UPLOAD_FOLDER = _resolve_runtime_path(os.getenv('UPLOAD_FOLDER', 'uploads'), for_uploads=True)
    MAX_CONTENT_LENGTH_MB = int(os.getenv('MAX_CONTENT_LENGTH_MB', '10'))
    MAX_CONTENT_LENGTH = MAX_CONTENT_LENGTH_MB * 1024 * 1024

    PINECONE_API_KEY = os.getenv('PINECONE_API_KEY', '').strip()
    PINECONE_INDEX_NAME = os.getenv('PINECONE_INDEX_NAME', 'personal-ai-bot')
    PINECONE_CLOUD = os.getenv('PINECONE_CLOUD', 'aws')
    PINECONE_REGION = os.getenv('PINECONE_REGION', 'us-east-1')

    GROQ_API_KEY = os.getenv('GROQ_API_KEY', '').strip()
    OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY', '').strip()
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '').strip() or os.getenv('GOOGLE_API_KEY', '').strip()
    HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY', '').strip()
    OLLAMA_BASE_URL = os.getenv('OLLAMA_BASE_URL', 'http://localhost:11434').rstrip('/')

    DEFAULT_CHAT_PROVIDER = os.getenv('DEFAULT_CHAT_PROVIDER', 'ollama')
    DEFAULT_CHAT_MODEL = os.getenv('DEFAULT_CHAT_MODEL', 'llama3.1')
    DEFAULT_EMBEDDING_PROVIDER = os.getenv('DEFAULT_EMBEDDING_PROVIDER', 'ollama')
    DEFAULT_EMBEDDING_MODEL = os.getenv('DEFAULT_EMBEDDING_MODEL', 'embeddinggemma')

    CHUNK_SIZE = int(os.getenv('CHUNK_SIZE', '1000'))
    CHUNK_OVERLAP = int(os.getenv('CHUNK_OVERLAP', '150'))

    ALLOWED_EXTENSIONS = {'pdf', 'txt', 'docx'}
    CHAT_PROVIDERS = ['groq', 'openrouter', 'gemini', 'huggingface', 'ollama']
    EMBEDDING_PROVIDERS = ['gemini', 'huggingface', 'ollama', 'pinecone', 'sentence-transformers']

from __future__ import annotations

from typing import Any

import requests
from flask import current_app


def _timeout(*, local: bool = False) -> tuple[float, float]:
    read_timeout = (
        current_app.config['LOCAL_HTTP_READ_TIMEOUT_SECONDS']
        if local
        else current_app.config['HTTP_READ_TIMEOUT_SECONDS']
    )
    return (current_app.config['HTTP_CONNECT_TIMEOUT_SECONDS'], read_timeout)


def _reject_local_provider_on_vercel(provider: str) -> None:
    if current_app.config.get('IS_VERCEL'):
        raise ValueError(f'{provider} runs locally and cannot be reached from Vercel. Choose Gemini, Pinecone, or Hugging Face embeddings.')


def _normalize_embedding(vector: Any) -> list[float]:
    return [float(value) for value in list(vector)]


def _embed_with_ollama(model: str, texts: list[str]) -> list[list[float]]:
    _reject_local_provider_on_vercel('Ollama')
    response = requests.post(
        f"{current_app.config['OLLAMA_BASE_URL']}/api/embed",
        json={'model': model, 'input': texts},
        timeout=_timeout(local=True),
    )
    response.raise_for_status()
    data = response.json()
    embeddings = data.get('embeddings') or []
    if not embeddings and data.get('embedding'):
        embeddings = [data['embedding']]
    return [_normalize_embedding(item) for item in embeddings]


def _embed_with_gemini(model: str, api_key: str, texts: list[str]) -> list[list[float]]:
    if not api_key:
        raise ValueError('Google API key is required for Gemini embeddings.')

    endpoint = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:batchEmbedContents?key={api_key}'
    payload = {
        'requests': [
            {
                'model': f'models/{model}',
                'content': {'parts': [{'text': text}]},
            }
            for text in texts
        ]
    }
    response = requests.post(endpoint, json=payload, timeout=_timeout())
    try:
        response.raise_for_status()
    except requests.exceptions.HTTPError as exc:
        if exc.response is not None and exc.response.status_code == 404:
            raise ValueError(f"The model '{model}' was not found. Please verify your Gemini API key has access to this model or try a different one.")
        raise ValueError(f"Gemini API Error: {exc.response.text if exc.response is not None else str(exc)}")
    data = response.json()
    return [_normalize_embedding(item['values']) for item in data.get('embeddings', [])]


def _embed_with_huggingface(model: str, api_key: str | None, texts: list[str]) -> list[list[float]]:
    from huggingface_hub import InferenceClient
    if api_key:
        client = InferenceClient(api_key=api_key)
        embeddings: list[list[float]] = []
        for text in texts:
            vector = client.feature_extraction(text, model=model)
            embeddings.append(_normalize_embedding(vector))
        return embeddings
    if current_app.config.get('IS_VERCEL'):
        raise ValueError('A Hugging Face API key is required for hosted embeddings on Vercel.')
    return _embed_with_sentence_transformers(model, texts)


def _embed_with_sentence_transformers(model: str, texts: list[str]) -> list[list[float]]:
    _reject_local_provider_on_vercel('sentence-transformers')
    try:
        from sentence_transformers import SentenceTransformer
    except ImportError as exc:
        raise ValueError(
            'sentence-transformers is optional and not installed. '
            'Install it locally if you want the local embedding fallback.'
        ) from exc

    selected_model = model or 'sentence-transformers/all-MiniLM-L6-v2'
    encoder = SentenceTransformer(selected_model)
    result = encoder.encode(texts)
    return [_normalize_embedding(item) for item in result]


def _embed_with_pinecone(model: str, api_key: str | None, texts: list[str]) -> list[list[float]]:
    from pinecone import Pinecone

    resolved_key = api_key or current_app.config['PINECONE_API_KEY']
    if not resolved_key:
        raise ValueError('Pinecone API key is required for Pinecone-hosted embeddings.')

    client = Pinecone(api_key=resolved_key)
    response = client.inference.embed(
        model=model,
        inputs=texts,
        parameters={'input_type': 'passage', 'truncate': 'END'},
    )
    vectors = []
    for item in getattr(response, 'data', []):
        values = getattr(item, 'values', None)
        if values is None and isinstance(item, dict):
            values = item.get('values', [])
        vectors.append(_normalize_embedding(values or []))
    return vectors


def embed_texts(provider: str, model: str, api_key: str | None, texts: list[str]) -> list[list[float]]:
    if not texts:
        return []

    provider_name = (provider or '').strip().lower()
    model_name = model.strip()

    if provider_name == 'ollama':
        return _embed_with_ollama(model_name, texts)
    if provider_name in {'gemini', 'google', 'google-gemini'}:
        return _embed_with_gemini(model_name, api_key or current_app.config.get('GEMINI_API_KEY', current_app.config.get('GOOGLE_API_KEY')), texts)
    if provider_name in {'huggingface', 'hf'}:
        return _embed_with_huggingface(model_name, api_key or current_app.config['HUGGINGFACE_API_KEY'], texts)
    if provider_name in {'sentence-transformers', 'local'}:
        return _embed_with_sentence_transformers(model_name, texts)
    if provider_name == 'pinecone':
        return _embed_with_pinecone(model_name, api_key, texts)

    raise ValueError(f'Unsupported embedding provider: {provider}')

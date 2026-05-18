from __future__ import annotations

from typing import Any

import requests
from flask import current_app


def _openai_compatible_chat(
    base_url: str,
    api_key: str,
    model: str,
    system_prompt: str,
    user_prompt: str,
    extra_headers: dict[str, str] | None = None,
) -> str:
    if not api_key:
        raise ValueError('An API key is required for this provider.')

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
    }
    if extra_headers:
        headers.update(extra_headers)

    response = requests.post(
        f'{base_url}/chat/completions',
        headers=headers,
        json={
            'model': model,
            'messages': [
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': user_prompt},
            ],
            'temperature': 0.2,
        },
        timeout=120,
    )
    response.raise_for_status()
    data = response.json()
    return data['choices'][0]['message']['content'].strip()


def _gemini_chat(model: str, api_key: str, system_prompt: str, user_prompt: str) -> str:
    if not api_key:
        raise ValueError('Google API key is required for Gemini chat.')
    endpoint = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}'
    payload = {
        'system_instruction': {'parts': [{'text': system_prompt}]},
        'contents': [{'parts': [{'text': user_prompt}]}],
    }
    response = requests.post(endpoint, json=payload, timeout=120)
    response.raise_for_status()
    data = response.json()
    candidates = data.get('candidates', [])
    if not candidates:
        raise ValueError('Gemini returned no candidates.')
    parts = candidates[0].get('content', {}).get('parts', [])
    return ''.join(part.get('text', '') for part in parts).strip()


def _huggingface_chat(model: str, api_key: str, system_prompt: str, user_prompt: str) -> str:
    from huggingface_hub import InferenceClient
    if not api_key:
        raise ValueError('Hugging Face API key is required for hosted chat inference.')
    client = InferenceClient(api_key=api_key)
    response = client.chat_completion(
        model=model,
        messages=[
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': user_prompt},
        ],
        max_tokens=800,
    )
    choice = response.choices[0]
    message = getattr(choice, 'message', None)
    if message is not None:
        content = getattr(message, 'content', None)
        if isinstance(content, str):
            return content.strip()
    if isinstance(choice, dict):
        return str(choice.get('message', {}).get('content', '')).strip()
    raise ValueError('Hugging Face returned an unexpected response format.')


def _ollama_chat(model: str, system_prompt: str, user_prompt: str) -> str:
    response = requests.post(
        f"{current_app.config['OLLAMA_BASE_URL']}/api/chat",
        json={
            'model': model,
            'stream': False,
            'messages': [
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': user_prompt},
            ],
        },
        timeout=120,
    )
    response.raise_for_status()
    data = response.json()
    message = data.get('message', {})
    return str(message.get('content', '')).strip()


def generate_response(
    provider: str,
    model: str,
    api_key: str | None,
    system_prompt: str,
    user_prompt: str,
) -> str:
    provider_name = (provider or '').strip().lower()
    resolved_api_key = (api_key or '').strip()

    if provider_name == 'groq':
        return _openai_compatible_chat('https://api.groq.com/openai/v1', resolved_api_key or current_app.config['GROQ_API_KEY'], model, system_prompt, user_prompt)
    if provider_name == 'openrouter':
        return _openai_compatible_chat(
            'https://openrouter.ai/api/v1',
            resolved_api_key or current_app.config['OPENROUTER_API_KEY'],
            model,
            system_prompt,
            user_prompt,
            {'HTTP-Referer': 'https://vercel.com', 'X-Title': 'Personal AI Bot Builder'},
        )
    if provider_name in {'gemini', 'google', 'google-gemini'}:
        return _gemini_chat(model, resolved_api_key or current_app.config.get('GEMINI_API_KEY', current_app.config.get('GOOGLE_API_KEY')), system_prompt, user_prompt)
    if provider_name in {'huggingface', 'hf'}:
        return _huggingface_chat(model, resolved_api_key or current_app.config['HUGGINGFACE_API_KEY'], system_prompt, user_prompt)
    if provider_name == 'ollama':
        return _ollama_chat(model, system_prompt, user_prompt)

    raise ValueError(f'Unsupported chat provider: {provider}')

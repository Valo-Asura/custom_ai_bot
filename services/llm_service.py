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


def _clean_api_key(key: str | None) -> str:
    if not key:
        return ''
    cleaned = str(key).strip().strip("'\"`")
    if cleaned.lower().startswith('bearer '):
        cleaned = cleaned[7:].strip().strip("'\"`")
    return cleaned


def _extract_error_detail(response: requests.Response) -> str:
    try:
        err_data = response.json()
        if isinstance(err_data, dict):
            error_obj = err_data.get('error')
            if isinstance(error_obj, dict):
                return str(error_obj.get('message') or error_obj.get('detail') or '')
            if isinstance(error_obj, str):
                return error_obj
            if 'message' in err_data:
                return str(err_data['message'])
    except Exception:
        pass
    text = (response.text or '').strip()
    return text[:200] if text else ''


def _openai_compatible_chat(
    base_url: str,
    api_key: str,
    model: str,
    system_prompt: str,
    user_prompt: str,
    extra_headers: dict[str, str] | None = None,
    provider_name: str = 'Provider',
    env_var: str = 'API_KEY',
) -> str:
    cleaned_key = _clean_api_key(api_key)
    if not cleaned_key:
        raise ValueError(
            f'API key is missing for {provider_name}. Please set {env_var} in your .env file or enter your API key under Settings > Providers.'
        )

    headers = {
        'Authorization': f'Bearer {cleaned_key}',
        'Content-Type': 'application/json',
    }
    if extra_headers:
        headers.update(extra_headers)

    try:
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
                'max_tokens': current_app.config['CHAT_MAX_TOKENS'],
            },
            timeout=_timeout(),
        )
    except requests.exceptions.RequestException as exc:
        raise ValueError(f'{provider_name} network request failed: {exc}') from exc

    if not response.ok:
        detail = _extract_error_detail(response)
        detail_msg = f': {detail}' if detail else ''

        if response.status_code == 401:
            raise ValueError(
                f'{provider_name} API authentication failed (401 Unauthorized){detail_msg}. '
                f'Please ensure that your {env_var} in .env or the API key saved in Settings > Providers is valid and active.'
            )
        if response.status_code == 403:
            raise ValueError(f'{provider_name} access forbidden (403 Forbidden){detail_msg}.')
        if response.status_code == 404:
            raise ValueError(
                f'{provider_name} model "{model}" was not found (404 Not Found){detail_msg}. '
                'Please select an active model in Settings > Providers.'
            )
        if response.status_code == 429:
            raise ValueError(f'{provider_name} rate limit or quota exceeded (429){detail_msg}.')
        raise ValueError(f'{provider_name} returned error status {response.status_code}{detail_msg}')

    try:
        data = response.json()
        return data['choices'][0]['message']['content'].strip()
    except (KeyError, IndexError, TypeError) as exc:
        raise ValueError(f'Unexpected response structure from {provider_name}: {exc}') from exc


def _gemini_chat(model: str, api_key: str, system_prompt: str, user_prompt: str) -> str:
    cleaned_key = _clean_api_key(api_key)
    if not cleaned_key:
        raise ValueError('Google API key is required for Gemini chat. Please set GEMINI_API_KEY in .env or under Providers.')

    endpoint = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={cleaned_key}'
    payload = {
        'system_instruction': {'parts': [{'text': system_prompt}]},
        'contents': [{'parts': [{'text': user_prompt}]}],
        'generationConfig': {
            'temperature': 0.2,
            'maxOutputTokens': current_app.config['CHAT_MAX_TOKENS'],
        },
    }
    try:
        response = requests.post(endpoint, json=payload, timeout=_timeout())
    except requests.exceptions.RequestException as exc:
        raise ValueError(f'Gemini network request failed: {exc}') from exc

    if not response.ok:
        detail = _extract_error_detail(response)
        detail_msg = f': {detail}' if detail else ''
        if response.status_code in {400, 401, 403}:
            raise ValueError(f'Gemini authentication/request error ({response.status_code}){detail_msg}. Check GEMINI_API_KEY.')
        if response.status_code == 404:
            raise ValueError(f'Gemini model "{model}" was not found (404 Not Found){detail_msg}.')
        if response.status_code == 429:
            raise ValueError(f'Gemini rate limit exceeded (429){detail_msg}.')
        raise ValueError(f'Gemini API error ({response.status_code}){detail_msg}')

    data = response.json()
    candidates = data.get('candidates', [])
    if not candidates:
        raise ValueError('Gemini returned no candidates.')
    parts = candidates[0].get('content', {}).get('parts', [])
    return ''.join(part.get('text', '') for part in parts).strip()


def _huggingface_chat(model: str, api_key: str, system_prompt: str, user_prompt: str) -> str:
    from huggingface_hub import InferenceClient
    cleaned_key = _clean_api_key(api_key)
    if not cleaned_key:
        raise ValueError('Hugging Face API key is required for hosted chat inference. Please set HUGGINGFACE_API_KEY in .env or under Providers.')
    try:
        client = InferenceClient(api_key=cleaned_key)
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
    except Exception as exc:
        raise ValueError(f'Hugging Face chat error: {exc}') from exc


def _ollama_chat(model: str, system_prompt: str, user_prompt: str) -> str:
    if current_app.config.get('IS_VERCEL'):
        raise ValueError('Ollama runs locally and cannot be reached from Vercel. Choose Groq, Gemini, OpenRouter, or Hugging Face for deployed chat.')
    try:
        response = requests.post(
            f"{current_app.config['OLLAMA_BASE_URL']}/api/chat",
            json={
                'model': model,
                'stream': False,
                'messages': [
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': user_prompt},
                ],
                'options': {'num_predict': current_app.config['CHAT_MAX_TOKENS']},
            },
            timeout=_timeout(local=True),
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as exc:
        raise ValueError(f'Ollama connection failed: {exc}. Is Ollama running on {current_app.config["OLLAMA_BASE_URL"]}?') from exc

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
    resolved_api_key = _clean_api_key(api_key)

    if provider_name == 'groq':
        final_key = resolved_api_key or _clean_api_key(current_app.config.get('GROQ_API_KEY'))
        return _openai_compatible_chat(
            'https://api.groq.com/openai/v1',
            final_key,
            model,
            system_prompt,
            user_prompt,
            provider_name='Groq',
            env_var='GROQ_API_KEY',
        )
    if provider_name == 'openrouter':
        final_key = resolved_api_key or _clean_api_key(current_app.config.get('OPENROUTER_API_KEY'))
        return _openai_compatible_chat(
            'https://openrouter.ai/api/v1',
            final_key,
            model,
            system_prompt,
            user_prompt,
            {'HTTP-Referer': 'https://vercel.com', 'X-Title': 'Personal AI Bot Builder'},
            provider_name='OpenRouter',
            env_var='OPENROUTER_API_KEY',
        )
    if provider_name in {'gemini', 'google', 'google-gemini'}:
        final_key = resolved_api_key or _clean_api_key(
            current_app.config.get('GEMINI_API_KEY') or current_app.config.get('GOOGLE_API_KEY')
        )
        return _gemini_chat(model, final_key, system_prompt, user_prompt)
    if provider_name in {'huggingface', 'hf'}:
        final_key = resolved_api_key or _clean_api_key(current_app.config.get('HUGGINGFACE_API_KEY'))
        return _huggingface_chat(model, final_key, system_prompt, user_prompt)
    if provider_name == 'ollama':
        return _ollama_chat(model, system_prompt, user_prompt)

    raise ValueError(f'Unsupported chat provider: {provider}')


def test_chat_connection(
    provider: str,
    model: str,
    api_key: str | None = None,
) -> tuple[bool, str]:
    try:
        reply = generate_response(
            provider=provider,
            model=model,
            api_key=api_key,
            system_prompt="You are a system tester. Respond with 'Connected successfully' only.",
            user_prompt="Ping",
        )
        return True, f"Success! {provider.title()} answered: {reply[:80]}"
    except Exception as exc:
        return False, str(exc)

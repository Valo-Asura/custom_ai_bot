document.addEventListener('DOMContentLoaded', () => {
    const modelOptions = {
        chat: {
            groq: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'gemma2-9b-it'],
            ollama: ['llama3.2', 'llama3.1', 'mistral', 'gemma2', 'phi3'],
            gemini: ['gemini-1.5-flash', 'gemini-1.5-pro'],
            openrouter: ['meta-llama/llama-3.1-8b-instruct', 'anthropic/claude-3.5-sonnet', 'google/gemini-pro-1.5'],
            huggingface: ['meta-llama/Meta-Llama-3-8B-Instruct', 'mistralai/Mistral-7B-Instruct-v0.2']
        },
        embedding: {
            gemini: ['gemini-embedding-001', 'text-embedding-004', 'gemini-embedding-2'],
            huggingface: ['sentence-transformers/all-MiniLM-L6-v2', 'BAAI/bge-small-en-v1.5'],
            ollama: ['nomic-embed-text', 'mxbai-embed-large', 'all-minilm'],
            pinecone: ['multilingual-e5-large'],
            'sentence-transformers': ['all-MiniLM-L6-v2', 'all-mpnet-base-v2']
        }
    };

    const hydrateModelSelect = (providerName, modelId, optionsByProvider, isUserAction = false) => {
        const providerSelect = document.querySelector(`select[name="${providerName}"]`);
        const modelSelect = document.getElementById(modelId);
        if (!providerSelect || !modelSelect) {
            return;
        }

        const provider = providerSelect.value;
        const currentValue = modelSelect.dataset.current;
        const options = [...(optionsByProvider[provider] || [])];
        if (!isUserAction && currentValue && !options.includes(currentValue)) {
            options.unshift(currentValue);
        }

        modelSelect.replaceChildren(
            ...options.map((model) => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                return option;
            })
        );

        modelSelect.value = isUserAction ? options[0] || '' : currentValue || options[0] || '';
    };

    const chatProviderSelect = document.querySelector('select[name="chat_provider"]');
    if (chatProviderSelect) {
        hydrateModelSelect('chat_provider', 'chat_model', modelOptions.chat);
        chatProviderSelect.addEventListener('change', () => {
            hydrateModelSelect('chat_provider', 'chat_model', modelOptions.chat, true);
        });
    }

    const embeddingProviderSelect = document.querySelector('select[name="embedding_provider"]');
    if (embeddingProviderSelect) {
        hydrateModelSelect('embedding_provider', 'embedding_model', modelOptions.embedding);
        embeddingProviderSelect.addEventListener('change', () => {
            hydrateModelSelect('embedding_provider', 'embedding_model', modelOptions.embedding, true);
        });
    }

    const uploadForm = document.getElementById('upload-form');
    const overlay = document.getElementById('upload-overlay');
    if (uploadForm && overlay) {
        uploadForm.addEventListener('submit', () => {
            const submitButton = uploadForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Indexing...';
            }
            setTimeout(() => {
                overlay.classList.add('active');
            }, 50);
        });
    }

    const chatForm = document.getElementById('chat-form');
    if (!chatForm) {
        return;
    }

    const chatInput = document.getElementById('chat-input');
    const chatLog = document.getElementById('chat-log');
    const chatStatus = document.getElementById('chat-status');
    const submitButton = chatForm.querySelector('button[type="submit"]');

    const appendMessage = (role, content) => {
        const wrapper = document.createElement('div');
        wrapper.className = `chat-bubble ${role}`;

        const title = document.createElement('strong');
        title.textContent = role.charAt(0).toUpperCase() + role.slice(1);

        const body = document.createElement('p');
        body.textContent = content;

        wrapper.appendChild(title);
        wrapper.appendChild(body);
        chatLog.appendChild(wrapper);
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                chatForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        });
    }

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const message = chatInput.value.trim();
        if (!message) {
            return;
        }

        appendMessage('user', message);
        chatInput.value = '';
        chatInput.disabled = true;
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending';
        }
        chatStatus.textContent = 'Retrieving context...';

        let timeoutId;
        try {
            const controller = new AbortController();
            timeoutId = window.setTimeout(() => controller.abort(), 12000);
            const response = await fetch(chatForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message }),
                signal: controller.signal
            });
            window.clearTimeout(timeoutId);
            const payload = await response.json();
            if (!response.ok || !payload.ok) {
                throw new Error(payload.error || 'Chat request failed.');
            }
            appendMessage('assistant', payload.answer);
            chatStatus.textContent = `${payload.context_count} context chunk(s) used.`;
        } catch (error) {
            const message = error.name === 'AbortError'
                ? 'The request took too long for the serverless time budget. Try a shorter question or use a faster provider.'
                : error.message;
            appendMessage('assistant', `Error: ${message}`);
            chatStatus.textContent = 'Chat failed.';
        } finally {
            chatInput.disabled = false;
            chatInput.focus();
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send';
            }
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        }
    });
});

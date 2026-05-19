document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const overlay = document.getElementById('upload-overlay');
    if (uploadForm && overlay) {
        uploadForm.addEventListener('submit', () => {
            const submitButton = uploadForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Indexing';
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
            timeoutId = window.setTimeout(() => controller.abort(), 55000);
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
                ? 'The request took too long for the serverless time budget. Try a shorter question or a faster provider.'
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

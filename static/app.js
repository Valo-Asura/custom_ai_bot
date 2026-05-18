document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    if (!chatForm) {
        return;
    }

    const chatInput = document.getElementById('chat-input');
    const chatLog = document.getElementById('chat-log');
    const chatStatus = document.getElementById('chat-status');

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
        chatStatus.textContent = 'Thinking...';

        try {
            const response = await fetch(chatForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            const payload = await response.json();
            if (!response.ok || !payload.ok) {
                throw new Error(payload.error || 'Chat request failed.');
            }
            appendMessage('assistant', payload.answer);
            chatStatus.textContent = `${payload.context_count} context chunk(s) used.`;
        } catch (error) {
            appendMessage('assistant', `Error: ${error.message}`);
            chatStatus.textContent = 'Chat failed.';
        }
    });
});

import React from 'react';

export default function ChatBubble({ message }) {
  const role = message.role === 'user' ? 'user' : 'assistant';
  const title = role === 'user' ? 'User' : 'Assistant';
  return <div className={`chat-bubble ${role}`}><strong>{title}</strong><p>{message.content}</p></div>;
}

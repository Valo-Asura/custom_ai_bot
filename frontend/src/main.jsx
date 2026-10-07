import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../../static/style.css';

const bootstrap = JSON.parse(document.getElementById('app-state').textContent);
createRoot(document.getElementById('root')).render(<App bootstrap={bootstrap} />);

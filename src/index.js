import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import '../src/styles/index.scss'

const root = createRoot(document.getElementById('app'));
root.render(
	<App />
);
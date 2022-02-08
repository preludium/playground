import { StrictMode } from 'react';
import { createRoot } from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);

reportWebVitals();

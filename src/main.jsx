import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

(async () => {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();
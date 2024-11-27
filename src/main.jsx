import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// MSW 초기화
async function startMockServiceWorker() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/browser');
    worker.start();
  }
}

// 개발 모드에서만 MSW 시작
startMockServiceWorker();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
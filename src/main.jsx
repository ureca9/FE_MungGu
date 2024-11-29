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

<<<<<<< HEAD
// 개발 모드에서만 MSW 시작
startMockServiceWorker();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
=======
createRoot(document.getElementById('root')).render(<App />);
>>>>>>> f9ddb28a09dd76610f5d097851668f0d04c5391b

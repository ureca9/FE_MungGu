import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// MSW 초기화
if (import.meta.env.MODE === 'development') {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

createRoot(document.getElementById('root')).render(<App />);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

console.log('ZeaBIS: Main entry point loaded');
console.log('Environment:', {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('ZeaBIS: Root element not found!');
  throw new Error('Failed to find the root element. Make sure there is a <div id="root"></div> in your HTML.');
}

console.log('ZeaBIS: Root element found, mounting app...');

try {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('ZeaBIS: App mounted successfully');
} catch (error) {
  console.error('ZeaBIS: Failed to mount app:', error);
  throw error;
}

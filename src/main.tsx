import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../src/styles/main.scss';

const queryClient = new QueryClient();
// async function deferRender() {
//   const { worker } = await import('./mocks/browser.ts');
//   return worker.start();
// }
// deferRender().then(() => {
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
// });

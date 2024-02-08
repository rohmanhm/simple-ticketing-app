import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App.tsx';

async function enableMocking() {
  // NOTE: We always want to enable mocking
  // if (process.env.NODE_ENV !== "development") {
  //   return;
  // }

  const {
    worker,
    // dropDb
  } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  await worker.start();

  // Uncomment this to drop the database.
  // await dropDb();

  return;
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

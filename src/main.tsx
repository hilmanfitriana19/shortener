import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { fetchLinkBySlug, incrementLinkClicks } from './utils/linkApi';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const path = window.location.pathname.replace(basePath, '');

console.log('Base Path:', basePath);
console.log('Current Path:', path);


const redirectMatch = path.match(/^\/([^/]+)\/([^/?#]+)/);
console.log('Redirect Match:', redirectMatch);
if (redirectMatch) {
  const slug = decodeURIComponent(redirectMatch[2]);
  (async () => {
    const link = await fetchLinkBySlug(slug);
    if (link) {
      try {
        await incrementLinkClicks(link.id);
      } catch (e) {
        console.error('Failed to record click:', e);
      }
      if (link.openInNewTab) {
        window.open(link.originalUrl, '_self', 'noopener,noreferrer');
      } else {
        window.location.replace(link.originalUrl);
      }
    } else {
      document.body.innerHTML = '<h1>Link not found</h1>';
    }
  })();
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

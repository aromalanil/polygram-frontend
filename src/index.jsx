import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './global/style.scss';
import App from './components/App';
import swConfig from './sw.config';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorkerRegistration.register(swConfig);

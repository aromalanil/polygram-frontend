import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './global/style.scss';
import App from './components/App';
import swConfig from './sw.config';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const googleClientId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);

serviceWorkerRegistration.register(swConfig);

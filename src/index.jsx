import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './global/style.scss';
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

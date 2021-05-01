import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './global/style.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

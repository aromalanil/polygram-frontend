import { useHistory } from 'react-router-dom';

import './style.scss';
import Button from '../../common/Button';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="not-found-page">
      <div className="not-found-page-top">
        <h1>Page Not Found</h1>
        <p>You must have picked the wrong door!</p>
        <Button onClick={() => history.push('/')}>Home</Button>
      </div>
      <div className="not-found-page-bottom">
        <img src="/assets/404.webp" alt="lazy developer" />
      </div>
    </div>
  );
};

export default NotFound;

import { useHistory } from 'react-router-dom';

import './style.scss';

const Avatar = ({ src, username, className }) => {
  const history = useHistory();
  return (
    <img
      src={src}
      alt={username}
      tabIndex={0}
      role="button" // eslint-disable-line
      className={`avatar ${className ?? ''}`}
      onClick={() => history.push(`/u/${username}`)}
    />
  );
};

export default Avatar;

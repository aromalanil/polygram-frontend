import { useHistory } from 'react-router-dom';

import './style.scss';

const Avatar = ({ src, name, username, className }) => {
  const history = useHistory();
  return (
    <img
      src={src}
      alt={name}
      tabIndex={0}
      role="button" // eslint-disable-line
      className={`avatar ${className}`}
      onClick={() => history.push(`/u/${username}`)}
    />
  );
};

export default Avatar;

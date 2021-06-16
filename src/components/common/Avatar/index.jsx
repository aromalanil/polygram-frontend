import { useHistory } from 'react-router-dom';

import './style.scss';

const Avatar = ({ src, alt, username, className, onClick }) => {
  const history = useHistory();
  const localOnClick = () => username && history.push(`/u/${username}`);
  return (
    <img
      src={src}
      alt={alt ?? username}
      tabIndex={0}
      role="button" // eslint-disable-line
      className={`avatar ${className ?? ''}`}
      onClick={onClick ?? localOnClick}
    />
  );
};

export default Avatar;

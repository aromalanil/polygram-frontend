import './style.scss';
import { useEffect, useRef } from 'react';
import { BiCheckCircle, BiError, BiErrorCircle, BiX } from 'react-icons/bi';

const getIconByType = (type) => {
  switch (type) {
    case 'error':
      return <BiErrorCircle />;
    case 'warning':
      return <BiError />;
    case 'success':
      return <BiCheckCircle />;
    default:
      throw new Error('Invalid Snackbar type');
  }
};

const Snackbar = ({ isOpen, autoHideDuration, onClose, message, type }) => {
  const icon = getIconByType(type);
  const closeSnackBarTimer = useRef(null);

  useEffect(() => {
    if (closeSnackBarTimer.current) {
      clearTimeout(closeSnackBarTimer.current);
    }
    closeSnackBarTimer.current = setTimeout(onClose, autoHideDuration);
    return () => {
      clearTimeout(closeSnackBarTimer.current);
    };
  }, [onClose, autoHideDuration]);

  const handleCloseButtonClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return isOpen ? (
    <div className={`snackbar snackbar-${type}`}>
      <div className="snackbar-left">
        <div className="snackbar-icon">{icon}</div>
        <span className="snackbar-content">{message}</span>
      </div>
      <div className="snackbar-right">
        <div role="button" tabIndex={0} className="snackbar-close" onClick={handleCloseButtonClick}>
          <BiX />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Snackbar;

import './style.scss';
import { useCallback, useEffect } from 'react';
import { BiCheckCircle, BiError, BiErrorCircle, BiX } from 'react-icons/bi';
import { useRhinoState } from '../../../global/state';

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

const SnackbarController = () => {
  const [snackBarData, setSnackbarData] = useRhinoState('snackBarData');

  const onClose = useCallback(() => {
    setSnackbarData((prevData) => ({ ...prevData, message: null }));
  }, [setSnackbarData]);

  const { type, message } = snackBarData;
  return message ? <Snackbar type={type} message={message} onClose={onClose} /> : <></>;
};

const Snackbar = ({ onClose, type, message }) => {
  const icon = getIconByType(type);

  const handleCloseButtonClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
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
  );
};

export default SnackbarController;

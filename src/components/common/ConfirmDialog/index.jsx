import './style.scss';
import Modal from '../Modal';
import Button from '../Button';

const ConfirmDialog = ({
  title,
  isOpen,
  message,
  onClose,
  onAbort,
  onSuccess,
  primaryAction,
  secondaryAction,
}) => (
  <Modal onClose={onClose} isOpen={isOpen} fullScreen={false}>
    <div className="confirm-dialog-popup">
      <div className="confirm-dialog-popup-top">
        <h3 className="title">{title}</h3>
        <p className="message">{message}</p>
      </div>
      <div className="confirm-dialog-popup-bottom">
        <Button variant="secondary" onClick={onAbort}>
          {secondaryAction ?? 'No'}
        </Button>
        <Button onClick={onSuccess}>{primaryAction ?? 'Yes'}</Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;

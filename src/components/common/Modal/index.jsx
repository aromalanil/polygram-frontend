import './style.scss';
import { BiX } from 'react-icons/bi';
import { useRef } from 'react';

const Modal = ({ isOpen, onClose, fullScreen = true, children }) => {
  const modelRef = useRef(null);

  return isOpen ? (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="modal-bg" onClick={onClose} />
      <div className={`modal ${fullScreen ? 'full-screen' : ''}`} ref={modelRef}>
        <div className="modal-top">
          <div role="button" tabIndex={0} className="modal-close" onClick={onClose}>
            <BiX />
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Modal;

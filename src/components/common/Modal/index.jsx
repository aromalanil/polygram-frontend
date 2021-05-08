import './style.scss';
import { BiX } from 'react-icons/bi';
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, bottomSheet = true, children }) => {
  const modelRef = useRef(null);

  // Click outside the modal will make modal close
  useEffect(() => {
    const hideModal = (e) => {
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', hideModal);
    } else {
      document.removeEventListener('click', hideModal);
    }

    return () => {
      document.removeEventListener('click', hideModal);
    };
  }, [onClose, isOpen]);

  return isOpen ? (
    <>
      <div className="modal-bg" />
      <div className={`modal ${bottomSheet ? 'bottom-sheet' : ''}`} ref={modelRef}>
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

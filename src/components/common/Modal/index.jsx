import { useEffect, useRef } from 'react';
import { BiX } from 'react-icons/bi';
import './style.scss';

const Modal = ({ isOpen, onClose, children }) => {
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
      <div className="modal" ref={modelRef}>
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

import { useEffect, useRef } from 'react';

import './style.scss';

const MenuPopup = ({ isOpen, children, onClose }) => {
  const ref = useRef(null);

  // Click outside the popup will make the popup close
  useEffect(() => {
    const hideMenuPopup = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', hideMenuPopup);

    return () => {
      document.removeEventListener('mousedown', hideMenuPopup);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div ref={ref} className="menu-popup">
          {children}
        </div>
      )}
    </>
  );
};

export default MenuPopup;

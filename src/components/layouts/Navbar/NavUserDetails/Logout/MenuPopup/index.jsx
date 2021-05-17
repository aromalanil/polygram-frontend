import { useEffect, useRef } from 'react';

const MenuPopup = ({ isOpen, children, onClose }) => {
  const ref = useRef(null);
  // Click outside the modal will make modal close
  useEffect(() => {
    const hideMenuPopup = (e) => {
      if (ref.current && !ref.current.parentNode.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', hideMenuPopup);

    return () => {
      document.removeEventListener('mousedown', hideMenuPopup);
    };
  }, []); // eslint-disable-line
  return <>{isOpen && <div ref={ref}>{children}</div>}</>;
};

export default MenuPopup;

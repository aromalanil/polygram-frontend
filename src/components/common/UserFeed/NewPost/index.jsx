import { useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';

import './style.scss';

const NewPost = ({ isVisible, onHide }) => {
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(onHide, 50000);

    return () => {
      clearTimeout(timer);
    };
  }, [onHide]);

  const handleClick = () => {
    if (ref.current?.parentNode) {
      ref.current.parentNode.scrollTo(0, 0);
    }
    onHide();
  };

  return (
    isVisible && (
      <div className="new-posts" ref={ref} onClick={handleClick} role="button" tabIndex={0}>
        <FaArrowUp />
        <span>New Posts</span>
      </div>
    )
  );
};

export default NewPost;

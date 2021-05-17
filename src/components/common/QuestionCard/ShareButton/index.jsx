import { BiShareAlt } from 'react-icons/bi';
import IconButton from '../../IconButton';

const ShareButton = ({ title, url }) => {
  const handleClick = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        url,
      });
    }
  };

  return (
    <IconButton onClick={handleClick}>
      <BiShareAlt />
    </IconButton>
  );
};

export default ShareButton;

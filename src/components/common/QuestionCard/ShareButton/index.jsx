import { BiShareAlt } from 'react-icons/bi';
import IconButton from '../../IconButton';
import { useSetRhinoState } from '../../../../global/state';

const ShareButton = ({ text, url }) => {
  const setSnackBarData = useSetRhinoState('snackBarData');
  const handleClick = async () => {
    const dataToShare = { title: text, text, url };

    // Using web share api to share data
    if (navigator.canShare) {
      await navigator.share(dataToShare);
    } else {
      setSnackBarData({ type: 'error', message: 'Sharing is not supported' });
    }
  };

  return (
    <IconButton label="Share" onClick={handleClick}>
      <BiShareAlt />
    </IconButton>
  );
};

export default ShareButton;

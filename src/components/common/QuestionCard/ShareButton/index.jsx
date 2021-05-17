import html2canvas from 'html2canvas';
import { BiShareAlt } from 'react-icons/bi';
import IconButton from '../../IconButton';
import { useSetRhinoState } from '../../../../global/state';

const ShareButton = ({ title, url, card }) => {
  const setSnackBarData = useSetRhinoState('snackBarData');
  const handleClick = async () => {
    const dataToShare = { title, url };

    if (navigator.canShare) {
      // Creating a clone of card component
      const cloneCard = card.cloneNode(true);
      cloneCard.style.width = `${card.clientWidth}px`;
      cloneCard.style.height = `${card.clientHeight}px`;
      cloneCard.style.position = 'fixed';
      document.body.appendChild(cloneCard);

      // Converting card to image
      const imageCanvas = await html2canvas(cloneCard, {
        useCORS: true,
      });
      document.body.removeChild(cloneCard);
      imageCanvas.toBlob(async (blob) => {
        const file = new File([blob], 'title.png', { type: 'image/png' });
        const filesArray = [file];

        // Using web share api to share data
        await navigator.share({ ...dataToShare, files: filesArray });
      });
    } else {
      setSnackBarData({ type: 'error', message: 'Sharing is not supported' });
    }
  };

  return (
    <IconButton onClick={handleClick}>
      <BiShareAlt />
    </IconButton>
  );
};

export default ShareButton;

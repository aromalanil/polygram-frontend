import html2canvas from 'html2canvas';
import { BiShareAlt } from 'react-icons/bi';
import IconButton from '../../IconButton';
import { useSetRhinoState } from '../../../../global/state';

const canvasToBlob = (canvas) =>
  new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    });
  });

const getCloneElement = (element) => {
  const cloneElement = element.cloneNode(true);
  cloneElement.style.width = `${element.clientWidth}px`;
  cloneElement.style.height = `${element.clientHeight}px`;
  cloneElement.style.position = 'fixed';
  return cloneElement;
};

const htmlElementToImageFile = async (element, fileName) => {
  const cloneElement = getCloneElement(element);
  document.body.appendChild(cloneElement);

  // Converting card to image
  const imageCanvas = await html2canvas(cloneElement, { useCORS: true });
  document.body.removeChild(cloneElement);

  // Converting canvas to blob
  const blob = await canvasToBlob(imageCanvas);
  return new File([blob], `${fileName}.png`, { type: 'image/png' });
};

const ShareButton = ({ title, url, card }) => {
  const setSnackBarData = useSetRhinoState('snackBarData');
  const handleClick = async () => {
    const dataToShare = { title, url };

    if (navigator.canShare) {
      if (card) {
        dataToShare.files = [await htmlElementToImageFile(card, title)];
      }

      // Using web share api to share data
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

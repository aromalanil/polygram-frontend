import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import { useCallback, useEffect, useState } from 'react';

import './style.scss';
import Modal from '../Modal';
import Loader from '../Loader';
import Button from '../Button';
import { readFile } from '../../../utils/common';
import { getCroppedImg, calculateImageSize } from '../../../utils/image';
import { updateProfilePicture } from '../../../api/user';
import useApiError from '../../../hooks/useApiError';
import { useSetRhinoState } from '../../../global/state';

const UploadProfilePicture = ({ profilePicture, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const setApiError = useApiError();
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const setSnackBarData = useSetRhinoState('snackBarData');
  const setUserData = useSetRhinoState('userData');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, _croppedAreaPixels) => {
    setCroppedAreaPixels(_croppedAreaPixels);
  }, []);

  const validateImage = useCallback(
    (_image, maxSize, minSize) => {
      const imageSize = calculateImageSize(_image);

      if (imageSize > maxSize) {
        setSnackBarData({ type: 'error', message: 'Image is too large' });
        return false;
      }
      if (imageSize < minSize) {
        setSnackBarData({ type: 'error', message: 'Image is too small' });
        return false;
      }
      return true;
    },
    [setSnackBarData]
  );

  const handleUploadImage = async () => {
    setIsButtonLoading(true);
    let croppedImage;
    try {
      croppedImage = await getCroppedImg(image, croppedAreaPixels, 0 /* rotate */);
    } catch (e) {
      setIsButtonLoading(false);
      return;
    }

    if (!validateImage(croppedImage, 8 * 1024 * 1024 * 2, 8 * 600)) {
      setIsButtonLoading(false);
      return;
    }

    try {
      const profile_picture = await updateProfilePicture(croppedImage);
      setUserData((oldUserData) => ({ ...oldUserData, profile_picture }));
    } catch (err) {
      setIsButtonLoading(false);
      setApiError(err);
      return;
    }

    setIsButtonLoading(false);
    setSnackBarData({ type: 'success', message: 'Profile Picture updated successfully' });
    onClose();
  };

  useEffect(() => {
    setIsLoading(true);
    if (!profilePicture) return;
    const getImage = async () => {
      const imageDataUrl = await readFile(profilePicture);
      setImage(imageDataUrl);
      setIsLoading(false);
    };
    getImage();
  }, [profilePicture]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile-picture-uploader">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className="controls">
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, _zoom) => setZoom(_zoom)}
            />
          </div>
          <Button onClick={handleUploadImage} isLoading={isButtonLoading}>
            Upload
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default UploadProfilePicture;

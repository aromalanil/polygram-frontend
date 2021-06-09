import { useState } from 'react';
import { CgLogOut } from 'react-icons/cg';

import IconButton from '../../../../common/IconButton';
import ConfirmDialog from '../../../../common/ConfirmDialog';
import useLogoutUser from '../../../../../hooks/useLogoutUser';

const LogoutButton = () => {
  const logout = useLogoutUser();
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const handleButtonClick = async () => {
    setPopupVisibility(true);
  };

  const handlePopupClose = () => {
    setPopupVisibility(false);
  };

  return (
    <>
      <IconButton onClick={handleButtonClick}>
        <CgLogOut />
      </IconButton>
      <ConfirmDialog
        title="Logout"
        onSuccess={() => logout()}
        isOpen={isPopupVisible}
        onClose={handlePopupClose}
        onAbort={handlePopupClose}
        message="Are you sure you want to logout?"
      />
    </>
  );
};

export default LogoutButton;

import { useState } from 'react';
import { CgLogOut } from 'react-icons/cg';

import './style.scss';
import MenuPopup from './MenuPopup';
import ConfirmDialog from '../../../../common/ConfirmDialog';
import useLogoutUser from '../../../../../hooks/useLogoutUser';

const Logout = ({ isLogoutVisible, onClose }) => {
  const logout = useLogoutUser();
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const logoutUser = async () => {
    if (await logout()) {
      onClose();
    }
  };

  const handlePopupClose = () => {
    setPopupVisibility(false);
    onClose();
  };

  return (
    <>
      <MenuPopup isOpen={isLogoutVisible} onClose={onClose}>
        <div className="logout-container">
          <div
            role="button"
            className="logout"
            tabIndex={0}
            onClick={() => setPopupVisibility(true)}
          >
            <CgLogOut />
            <span>Logout</span>
          </div>
        </div>
        <ConfirmDialog
          title="Logout"
          onSuccess={logoutUser}
          isOpen={isPopupVisible}
          onClose={handlePopupClose}
          onAbort={handlePopupClose}
          message="Are you sure you want to logout?"
        />
      </MenuPopup>
    </>
  );
};

export default Logout;

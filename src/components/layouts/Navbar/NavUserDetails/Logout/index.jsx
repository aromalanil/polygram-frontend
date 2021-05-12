import './style.scss';

import MenuPopup from './MenuPopup';
import { logoutUser } from '../../../../../api/user';
import useApiError from '../../../../../hooks/useApiError';
import { useSetRhinoState } from '../../../../../global/state';

const Logout = ({ isLogoutVisible, onClose }) => {
  const setApiError = useApiError();
  const setIsUserLoggedIn = useSetRhinoState('isUserLoggedIn');

  const handleLogoutClick = async () => {
    // Calling api for logout the user
    try {
      await logoutUser();
    } catch (err) {
      setApiError(err);
      return;
    }

    setIsUserLoggedIn(false);
  };

  return (
    <>
      <MenuPopup isOpen={isLogoutVisible} onClose={onClose}>
        <div className="logout-container">
          <div role="button" className="logout" tabIndex={0} onClick={handleLogoutClick}>
            Logout
          </div>
        </div>
      </MenuPopup>
    </>
  );
};

export default Logout;

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.scss';
import { useRhinoValue, useSetRhinoState } from '../../../../global/state';

const NavItem = ({ icon, text, route, isActive, isLoginRequired }) => {
  const history = useHistory();
  const [isLinkActive, setLinkActive] = useState(isActive);
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');
  const makeSignInModalVisible = useSetRhinoState('isSignInModalVisible');

  const handleClick = () => {
    // Showing sign in modal if user not logged-in
    if (isLoginRequired && !isUserLoggedIn) {
      makeSignInModalVisible(true);
      return;
    }
    setLinkActive((value) => !value);
    history.push(route);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleClick}
      className={`nav-item ${isLinkActive ? 'active-nav-item' : ''}`}
    >
      <div className="icon">{icon}</div>
      <span>{text}</span>
    </div>
  );
};

export default NavItem;

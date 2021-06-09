import { useHistory, useRouteMatch } from 'react-router-dom';

import './style.scss';
import useProtectedFunction from '../../../../hooks/useProtectedFunction';

const BottomNavItem = ({ icon, name, route, isLoginRequired }) => {
  const history = useHistory();
  const protectFunction = useProtectedFunction();
  const isLinkActive = useRouteMatch({ path: route, exact: true });

  const handleClick = () => history.push(route);
  const protectedHandleClick = protectFunction(handleClick);

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={name}
      onClick={isLoginRequired ? protectedHandleClick : handleClick}
      className={`bottom-nav-item ${isLinkActive ? 'active-nav-item' : ''}`}
    >
      <div className="icon">{icon}</div>
    </div>
  );
};

export default BottomNavItem;

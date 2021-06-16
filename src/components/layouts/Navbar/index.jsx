import { useMemo } from 'react';
import { BiCog, BiHome, BiSearchAlt2, BiUser } from 'react-icons/bi';

import './style.scss';
import NavItem from './NavItem.js';
import Logo from '../../common/Logo';
import NavUserDetails from './NavUserDetails';
import LoginAndSignIn from './LoginAndSignIn';
import { useRhinoValue } from '../../../global/state';
import useMediaQuery from '../../../hooks/useMediaQuery';
import NotificationIcon from '../../common/NotificationIcon';

const Navbar = () => {
  const userData = useRhinoValue('userData');
  const isMobile = useMediaQuery('(max-width:690px)');
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');

  const navLinkArray = useMemo(
    () => [
      {
        icon: <BiHome />,
        name: 'Home',
        route: '/',
        isLoginRequired: false,
      },
      {
        icon: <BiSearchAlt2 />,
        name: 'Search',
        route: '/search',
        isLoginRequired: false,
      },
      {
        icon: <BiUser />,
        name: 'Profile',
        route: `/u/${userData?.username ?? ''}`,
        isLoginRequired: true,
      },
      {
        icon: <NotificationIcon />,
        name: 'Notification',
        route: '/notification',
        isLoginRequired: true,
      },
      {
        icon: <BiCog />,
        name: 'Settings',
        route: '/settings',
        isLoginRequired: false,
      },
    ],
    [userData]
  );

  return isMobile ? null : (
    <nav className="nav-bar">
      <div className="nav-content">
        <div className="nav-top">
          <Logo className="nav-logo" />
          <div className="nav-links">
            {navLinkArray.map((navLink) => (
              <NavItem {...navLink} key={navLink.route} />
            ))}
          </div>
        </div>
        <div className="nav-separator" />
        <div className="nav-bottom">{isUserLoggedIn ? <NavUserDetails /> : <LoginAndSignIn />}</div>
      </div>
    </nav>
  );
};

export default Navbar;

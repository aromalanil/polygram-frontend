import { useMemo } from 'react';
import { BiCog, BiHome, BiSearchAlt2, BiUser } from 'react-icons/bi';

import './style.scss';
import NavItem from './NavItem.js';
import Logo from '../../common/Logo';
import NavUserDetails from './NavUserDetails';
import LoginAndSignIn from './LoginAndSignIn';
import { useRhinoValue } from '../../../global/state';

const Navbar = () => {
  const userData = useRhinoValue('userData');
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');

  const navLinkArray = useMemo(
    () => [
      {
        icon: <BiHome />,
        text: 'Home',
        route: '/',
        isLoginRequired: false,
      },
      {
        icon: <BiSearchAlt2 />,
        text: 'Search',
        route: '/search',
        isLoginRequired: false,
      },
      {
        icon: <BiUser />,
        text: 'Profile',
        route: `/u/${userData?.username ?? ''}`,
        isLoginRequired: true,
      },
      {
        icon: <BiCog />,
        text: 'Settings',
        route: '/settings',
        isLoginRequired: false,
      },
    ],
    [userData]
  );

  return (
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

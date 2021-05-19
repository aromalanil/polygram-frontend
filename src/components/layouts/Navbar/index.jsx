import { BiBell, BiCog, BiHome, BiUser } from 'react-icons/bi';

import './style.scss';
import NavItem from './NavItem.js';
import Logo from '../../common/Logo';
import NavUserDetails from './NavUserDetails';
import LoginAndSignIn from './LoginAndSignIn';
import { useRhinoValue } from '../../../global/state';

const navLinkArray = [
  {
    icon: <BiHome />,
    text: 'Home',
    route: '/',
    isLoginRequired: false,
  },
  {
    icon: <BiUser />,
    text: 'Profile',
    route: '/profile',
    isLoginRequired: true,
  },
  {
    icon: <BiBell />,
    text: 'Notification',
    route: '/notification',
    isLoginRequired: true,
  },
  {
    icon: <BiCog />,
    text: 'Settings',
    route: '/settings',
    isLoginRequired: false,
  },
];

const Navbar = () => {
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');
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

import { BiBell, BiCog, BiHome, BiSearchAlt2 } from 'react-icons/bi';

import './style.scss';
import BottomNavItem from './BottomNavItem';

const navLinkArray = [
  {
    icon: <BiHome />,
    route: '/',
    isLoginRequired: false,
  },
  {
    icon: <BiSearchAlt2 />,
    route: '/search',
    isLoginRequired: false,
  },
  {
    icon: <BiBell />,
    route: '/notification',
    isLoginRequired: true,
  },
  {
    icon: <BiCog />,
    route: '/settings',
    isLoginRequired: false,
  },
];

const BottomNav = () => (
  <div className="bottom-nav">
    {navLinkArray.map((navLink) => (
      <BottomNavItem
        key={navLink.route}
        icon={navLink.icon}
        route={navLink.route}
        isLoginRequired={navLink.isLoginRequired}
      />
    ))}
  </div>
);

export default BottomNav;

import { useMemo } from 'react';
import { BiCog, BiHome, BiSearchAlt2, BiUser } from 'react-icons/bi';

import './style.scss';
import BottomNavItem from './BottomNavItem';
import { useRhinoValue } from '../../../global/state';

const BottomNav = () => {
  const userData = useRhinoValue('userData');
  const navLinkArray = useMemo(
    () => [
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
        icon: <BiUser />,
        route: `/u/${userData?.username ?? ''}`,
        isLoginRequired: true,
      },
      {
        icon: <BiCog />,
        route: '/settings',
        isLoginRequired: false,
      },
    ],
    [userData]
  );

  return (
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
};

export default BottomNav;

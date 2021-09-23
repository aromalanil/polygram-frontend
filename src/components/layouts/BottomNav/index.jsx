import { useMemo } from 'react';
import { useRhinoValue } from 'react-rhino';
import { BiCog, BiHome, BiSearchAlt2, BiUser } from 'react-icons/bi';

import './style.scss';
import BottomNavItem from './BottomNavItem';
import useMediaQuery from '../../../hooks/useMediaQuery';
import NotificationIcon from '../../common/NotificationIcon';

const BottomNav = () => {
  const userData = useRhinoValue('userData');
  const isMobile = useMediaQuery('(max-width:690px)');
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

  return isMobile ? (
    <div className="bottom-nav">
      {navLinkArray.map((navLink) => (
        <BottomNavItem
          key={navLink.route}
          icon={navLink.icon}
          name={navLink.name}
          route={navLink.route}
          isLoginRequired={navLink.isLoginRequired}
        />
      ))}
    </div>
  ) : null;
};

export default BottomNav;

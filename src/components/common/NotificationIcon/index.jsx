import { memo } from 'react';
import { BiBell } from 'react-icons/bi';
import { useRhinoValue } from 'react-rhino';

import './style.scss';

const NotificationIcon = () => {
  const notificationCount = useRhinoValue('notificationCount');

  return (
    <div className="notification-icon">
      <BiBell />
      {notificationCount > 0 && <div className="notification-badge" />}
    </div>
  );
};

export default memo(NotificationIcon);

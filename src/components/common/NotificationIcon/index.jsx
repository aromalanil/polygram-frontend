import { BiBell } from 'react-icons/bi';
import { memo } from 'react';

import './style.scss';
import { useRhinoValue } from '../../../global/state';

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

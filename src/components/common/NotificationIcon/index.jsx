import { BiBell } from 'react-icons/bi';
import { useCallback, useEffect, memo } from 'react';

import './style.scss';
import { getNotificationCount } from '../../../api/notification';
import { useRhinoState, useRhinoValue } from '../../../global/state';

const NotificationIcon = memo(() => {
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');
  const [notificationCount, setNotificationCount] = useRhinoState('notificationCount');

  const updateNotificationStatus = useCallback(async () => {
    const newNotificationCount = await getNotificationCount();
    if (newNotificationCount !== notificationCount) {
      setNotificationCount(newNotificationCount);
    }
  }, [setNotificationCount, notificationCount]);

  // Fetching initial status
  useEffect(() => {
    updateNotificationStatus();
  }, [updateNotificationStatus, isUserLoggedIn]);

  // Re-fetching status every minute
  useEffect(() => {
    let timer;

    if (isUserLoggedIn) {
      timer = setInterval(updateNotificationStatus, 60000);
    } else {
      clearInterval(timer);
      setNotificationCount(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isUserLoggedIn, updateNotificationStatus, setNotificationCount]);

  return (
    <div className="notification-icon">
      <BiBell />
      {notificationCount > 0 && <div className="notification-badge" />}
    </div>
  );
});

export default NotificationIcon;

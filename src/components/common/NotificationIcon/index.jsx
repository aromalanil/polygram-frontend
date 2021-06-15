import { BiBell } from 'react-icons/bi';
import { useCallback, useEffect, memo } from 'react';

import './style.scss';
import { getNotificationCount } from '../../../api/notification';
import { useRhinoState, useRhinoValue } from '../../../global/state';

const NotificationIcon = memo(() => {
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');
  const [notificationCount, setNotificationCount] = useRhinoState('notificationCount');

  const updateNotificationStatus = useCallback(async () => {
    if (!isUserLoggedIn) {
      setNotificationCount(0);
      return;
    }

    const newNotificationCount = await getNotificationCount();
    setNotificationCount(newNotificationCount);
  }, [setNotificationCount, isUserLoggedIn]);

  // Fetching initial status
  useEffect(() => {
    updateNotificationStatus();
  }, [updateNotificationStatus, isUserLoggedIn]);

  // Re-fetching status every minute
  useEffect(() => {
    const timer = setInterval(updateNotificationStatus, 30000);

    return () => {
      clearInterval(timer);
    };
  }, [updateNotificationStatus]);

  return (
    <div className="notification-icon">
      <BiBell />
      {notificationCount > 0 && <div className="notification-badge" />}
    </div>
  );
});

export default NotificationIcon;

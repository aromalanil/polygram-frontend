import { Waypoint } from 'react-waypoint';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';

import './style.scss';
import Loader from '../../../common/Loader';
import NotificationCard from './NotificationCard';
import useApiError from '../../../../hooks/useApiError';
import { useRhinoState, useRhinoValue } from '../../../../global/state';
import { getNotificationCount, getNotifications } from '../../../../api/notification';

const NotificationFeed = () => {
  const setApiError = useApiError();
  const [hasMore, setHasMore] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');
  const [notificationCount, setNotificationCount] = useRhinoState('notificationCount');

  const finalNotification = useMemo(() => notifications[notifications.length - 1]?._id, [
    notifications,
  ]);

  const fetchInitialNotifications = useCallback(async () => {
    try {
      const newNotifications = await getNotifications();
      if (newNotifications.length === 0) {
        setHasMore(false);
        return;
      }
      setNotifications(newNotifications);
    } catch (err) {
      setApiError(err);
    }
  }, [setApiError]);

  const fetchOldNotifications = useCallback(async () => {
    if (!hasMore) return;
    try {
      const newNotifications = await getNotifications({ before_id: finalNotification });
      if (newNotifications.length === 0) {
        setHasMore(false);
        return;
      }
      setNotifications((oldNotification) => [...oldNotification, ...newNotifications]);
    } catch (err) {
      setApiError(err);
    }
  }, [setApiError, finalNotification, hasMore]);

  const onDeleteNotification = (id) => {
    setNotificationCount((count) => count - 1);
    setNotifications((oldNotification) =>
      oldNotification.filter((notification) => notification._id !== id)
    );
  };

  // Fetching initial questions on component mount
  useEffect(() => {
    if (isUserLoggedIn) {
      fetchInitialNotifications();
    } else {
      setNotifications([]);
    }
  }, [fetchInitialNotifications, isUserLoggedIn]);

  // Making all notifications as read if notificationCount updated to 0
  useEffect(() => {
    if (notificationCount === 0) {
      setNotifications((oldNotifications) =>
        oldNotifications.map((notification) => ({ ...notification, has_read: true }))
      );
    }
  }, [notificationCount]);

  useEffect(() => {
    const updateNotificationCount = async () => {
      const newNotificationCount = await getNotificationCount();
      if (newNotificationCount !== notificationCount) setNotificationCount(newNotificationCount);
    };

    updateNotificationCount();
  }, []); // eslint-disable-line

  return isUserLoggedIn ? (
    <div className="notification-feed">
      {notifications.map((notification, index) => (
        <Fragment key={notification._id}>
          <NotificationCard
            notificationData={notification}
            onDelete={() => onDeleteNotification(notification._id)}
          />
          {notifications.length - 1 === index && (
            <Waypoint onEnter={() => fetchOldNotifications()} />
          )}
        </Fragment>
      ))}
      {hasMore ? (
        <Loader />
      ) : (
        <div className="no-notifications">
          <div className="separator" />
          <span>
            {notifications.length === 0 ? 'No notifications' : 'No more notifications left'}
          </span>
        </div>
      )}
    </div>
  ) : null;
};

export default NotificationFeed;

import { useCallback, useEffect } from 'react';
import { useRhinoState, useRhinoValue } from 'react-rhino';
import { getNotificationCount } from '../api/notification';

const useNotificationCount = () => {
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');
  const [notificationCount, setNotificationCount] = useRhinoState('notificationCount');

  // Function which fetches and updates the count
  const updateNotificationCount = useCallback(async () => {
    const newNotificationCount = await getNotificationCount();
    if (newNotificationCount !== notificationCount) {
      setNotificationCount(newNotificationCount);
    }
  }, [setNotificationCount, notificationCount]);

  // Fetching initial count
  useEffect(() => {
    updateNotificationCount();
  }, []); // eslint-disable-line

  // Re-fetching count every minute
  useEffect(() => {
    let timer;

    if (isUserLoggedIn) {
      timer = setInterval(updateNotificationCount, 30000);
    } else {
      clearInterval(timer);
      setNotificationCount(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isUserLoggedIn, setNotificationCount]); // eslint-disable-line
};

export default useNotificationCount;

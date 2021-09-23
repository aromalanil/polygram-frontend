import { useState } from 'react';
import { useSetRhinoState } from 'react-rhino';

import './style.scss';
import Button from '../../../common/Button';
import useApiError from '../../../../hooks/useApiError';
import { markAllNotificationsAsRead } from '../../../../api/notification';

const MarkAllAsRead = (props) => {
  const setApiError = useApiError();
  const [isLoading, setIsLoading] = useState(false);
  const setNotificationCount = useSetRhinoState('notificationCount');

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await markAllNotificationsAsRead();
    } catch (err) {
      setApiError(err);
      return;
    } finally {
      setIsLoading(false);
    }

    setNotificationCount(0);
  };
  return (
    <Button {...props} className="mark-all-as-read-btn" isLoading={isLoading} onClick={handleClick}>
      Mark All As Read
    </Button>
  );
};

export default MarkAllAsRead;

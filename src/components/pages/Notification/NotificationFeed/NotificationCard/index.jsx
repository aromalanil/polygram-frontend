import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRhinoState } from 'react-rhino';
import relativeTime from 'dayjs/plugin/relativeTime';

import './style.scss';
import Avatar from '../../../../common/Avatar';
import NotificationOptions from './NotificationOption';
import { getFullName } from '../../../../../utils/common';
import { updateMarkAsRead } from '../../../../../api/notification';
import shieldIcon from '../../../../../assets/images/shield-icon.png';

dayjs.extend(relativeTime);

const NotificationCard = ({ notificationData, onDelete }) => {
  const { _id, message, type, sender, created_at, has_read, target_content_id } = notificationData;
  const history = useHistory();
  const [userHasRead, setUserHasRead] = useState(has_read);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { first_name, profile_picture, username } = sender ?? {};
  const setNotificationCount = useSetRhinoState('notificationCount');

  let image = shieldIcon;
  if (type === 'added-opinion') {
    image = profile_picture;
  }

  const onReadChange = async (newHasRead) => {
    if (userHasRead === newHasRead) return;
    try {
      await updateMarkAsRead({ notificationId: _id, has_read: newHasRead });
    } catch {
      return;
    }

    if (newHasRead) {
      setNotificationCount((count) => count - 1);
    } else {
      setNotificationCount((count) => count + 1);
    }
    setUserHasRead(newHasRead);
  };

  const getTitle = () => {
    switch (type) {
      case 'added-opinion':
        return 'Received an Opinion';
      case 'changed-password':
        return 'Password Changed';
      default:
        return 'Error';
    }
  };

  const getMessage = () => {
    switch (type) {
      case 'added-opinion':
        return `${getFullName(sender)} Responded to your question "${message}"`;
      default:
        return message;
    }
  };

  const handleClick = async () => {
    await onReadChange(true);
    switch (type) {
      case 'added-opinion':
        return history.push(`/questions/${target_content_id}`);
      default:
        return null;
    }
  };

  useEffect(() => {
    setUserHasRead(notificationData.has_read);
  }, [notificationData]);

  return (
    <div
      className={`notification-card ${userHasRead ? 'has-read' : ''} ${
        isOptionsOpen ? 'with-popup' : ''
      }`}
    >
      <div className="notification-card-body">
        <Avatar
          src={image}
          username={username}
          alt={first_name ?? 'shield-icon'}
          className={type === 'added-opinion' && 'profile-picture'}
        />
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div className="content" onClick={handleClick} role="button">
          <h6>{getTitle()}</h6>
          <p>{getMessage()}</p>
        </div>
      </div>
      <div className="notification-card-top-right">
        <span className="time">{dayjs(created_at).fromNow()}</span>
        <NotificationOptions
          onDelete={onDelete}
          notificationId={_id}
          hasRead={userHasRead}
          isOpen={isOptionsOpen}
          onReadChange={onReadChange}
          onOpen={() => setIsOptionsOpen(true)}
          onClose={() => setIsOptionsOpen(false)}
        />
      </div>
    </div>
  );
};

export default NotificationCard;

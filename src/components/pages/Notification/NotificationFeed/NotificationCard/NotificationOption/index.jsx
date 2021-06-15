import Menu from '../../../../../common/Menu';
import { MenuItem } from '../../../../../common/Menu/MenuList';
import { deleteNotification } from '../../../../../../api/notification';

const NotificationOptions = ({
  isOpen,
  onOpen,
  onClose,
  onDelete,
  hasRead,
  onReadChange,
  notificationId,
}) => (
  <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
    <ChangeRead closeMenu={onClose} hasRead={hasRead} onReadChange={onReadChange} />
    <Delete notificationId={notificationId} onDelete={onDelete} />
  </Menu>
);

const Delete = ({ onDelete, notificationId }) => {
  const handleDeleteNotification = async () => {
    await deleteNotification(notificationId);
    onDelete(notificationId);
  };
  return <MenuItem onClick={handleDeleteNotification}>Delete</MenuItem>;
};

const ChangeRead = ({ hasRead, onReadChange, closeMenu }) => {
  const handleClick = () => {
    onReadChange(!hasRead);
    closeMenu();
  };
  return <MenuItem onClick={handleClick}>{hasRead ? 'Mark as Unread' : 'Mark as Read'}</MenuItem>;
};

export default NotificationOptions;

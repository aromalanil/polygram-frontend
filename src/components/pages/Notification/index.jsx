import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import './style.scss';
import MarkAllAsRead from './MarkAllAsRead';
import IconButton from '../../common/IconButton';
import NotificationFeed from './NotificationFeed';

const Notification = () => {
  const history = useHistory();
  return (
    <>
      <div className="page-back">
        <IconButton className="back-btn" onClick={() => history.goBack()}>
          <FiArrowLeft />
        </IconButton>
        <h2>Notifications</h2>
        <MarkAllAsRead variant="secondary" />
      </div>
      <NotificationFeed />
    </>
  );
};

export default Notification;

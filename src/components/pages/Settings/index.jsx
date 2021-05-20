import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.scss';
import IconButton from '../../common/IconButton';
import ThemeControl from './ThemeControl';

const Settings = () => {
  const history = useHistory();
  return (
    <>
      <div className="settings-back">
        <IconButton className="back-btn" onClick={() => history.goBack()}>
          <FiArrowLeft />
        </IconButton>
        <h2>Settings</h2>
      </div>
      <ThemeControl />
    </>
  );
};

export default Settings;

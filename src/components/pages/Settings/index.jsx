import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import IconButton from '../../common/IconButton';
import ThemeControl from './ThemeControl';

const Settings = () => {
  const history = useHistory();
  return (
    <>
      <div className="page-back">
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

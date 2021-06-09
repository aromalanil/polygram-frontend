import { FaMoon, FaSun } from 'react-icons/fa';

import './style.scss';
import IconButton from '../../../common/IconButton';
import { useRhinoState } from '../../../../global/state';

/* eslint-disable */
const ThemeControl = () => {
  const [theme, setTheme] = useRhinoState('theme');

  const handleDarkModeToggle = (isDarkMode) => () => {
    setTheme((oldTheme) => ({ ...oldTheme, isDarkMode }));
  };

  return (
    <div className="theme-control-card">
      <div className="dark-mode-control">
        <h3>Dark Mode</h3>
        <div className="button-grp">
          <IconButton className="dark-mode-toggle-btn" onClick={handleDarkModeToggle(true)}>
            <FaMoon />
          </IconButton>
          <IconButton className="dark-mode-toggle-btn" onClick={handleDarkModeToggle(false)}>
            <FaSun />
          </IconButton>
        </div>
      </div>
      <div className="accent-color-control" style={{ display: 'none' }}>
        <h3>Accent Color</h3>
      </div>
    </div>
  );
};

export default ThemeControl;

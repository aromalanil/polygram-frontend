import { useRhinoValue } from 'react-rhino';

import darkLogo from '../../../assets/images/logo_dark.svg';
import lightLogo from '../../../assets/images/logo_light.svg';

const Logo = ({ width, className }) => {
  const theme = useRhinoValue('theme');

  const logoStyle = { width };
  return (
    <img
      style={logoStyle}
      alt="Polygram Logo"
      className={className}
      src={theme?.isDarkMode ? darkLogo : lightLogo}
    />
  );
};

export default Logo;

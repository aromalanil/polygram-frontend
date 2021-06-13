import { useRhinoValue } from '../../../global/state';

const Logo = ({ width, className }) => {
  const theme = useRhinoValue('theme');

  const logoStyle = { width };
  return (
    <img
      style={logoStyle}
      alt="Polygram Logo"
      className={className}
      src={theme?.isDarkMode ? '/assets/logo_dark.svg' : '/assets/logo_light.svg'}
    />
  );
};

export default Logo;

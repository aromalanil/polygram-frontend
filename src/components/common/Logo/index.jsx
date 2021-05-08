import logoImage from '../../../assets/images/poly_logo.svg';

const Logo = ({ width, className }) => {
  const logoStyle = { width };
  return <img style={logoStyle} src={logoImage} className={className} alt="Poly Logo" />;
};

export default Logo;

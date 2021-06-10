const Logo = ({ width, className }) => {
  const logoStyle = { width };
  return <img style={logoStyle} src="/assets/logo.svg" className={className} alt="Polygram Logo" />;
};

export default Logo;

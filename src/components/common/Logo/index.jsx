const Logo = ({ width, className }) => {
  const logoStyle = { width };
  return (
    <img style={logoStyle} src="/assets/poly_logo.svg" className={className} alt="Poly Logo" />
  );
};

export default Logo;

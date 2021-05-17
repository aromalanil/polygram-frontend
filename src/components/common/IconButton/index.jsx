import './styles.scss';

const IconButton = ({ children, className, ...props }) => (
  <button className={`icon-button ${className}`} {...props}>
    {children}
  </button>
);

export default IconButton;

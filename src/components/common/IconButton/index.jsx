import './styles.scss';

const IconButton = ({ children, className, label, ...props }) => (
  <button aria-label={label} className={`icon-button ${className}`} {...props}>
    {children}
  </button>
);

export default IconButton;

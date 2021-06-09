import './style.scss';

const FloatingActionButton = ({ children, isActive, className, onClick, label }) => (
  <button
    aria-label={label}
    className={`floating-action-button ${className ?? ''} ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default FloatingActionButton;

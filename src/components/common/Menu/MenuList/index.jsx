import './style.scss';

export const MenuList = ({ children }) => <div className="menu-list">{children}</div>;

export const MenuItem = ({ children, onClick }) => (
  <span className="menu-item" onClick={onClick} role="button" tabIndex={0}>
    {children}
  </span>
);

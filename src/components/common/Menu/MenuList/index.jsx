import './style.scss';

const MenuList = ({ options }) => (
  <div className="menu-list">
    {options.map(({ name, onClick }) => (
      <span className="menu-item" onClick={onClick} role="button" tabIndex={0} key={name}>
        {name}
      </span>
    ))}
  </div>
);

export default MenuList;

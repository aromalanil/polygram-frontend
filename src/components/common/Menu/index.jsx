import { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import './style.scss';
import MenuList from './MenuList';
import MenuPopup from './MenuPopup';

const Menu = ({ options }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <div className="menu">
      <div
        role="button"
        tabIndex={0}
        className="menu-button"
        onClick={() => setIsOptionsOpen((isVisible) => !isVisible)}
      >
        <BiDotsVerticalRounded />
      </div>
      <MenuPopup isOpen={isOptionsOpen} onClose={() => setIsOptionsOpen(false)}>
        <MenuList options={options} />
      </MenuPopup>
    </div>
  );
};

export default Menu;

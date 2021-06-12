import { BiDotsVerticalRounded } from 'react-icons/bi';

import './style.scss';
import MenuPopup from './MenuPopup';
import { MenuList } from './MenuList';

const Menu = ({ children, isOpen, onOpen, onClose }) => (
  <div className="menu">
    <div role="button" tabIndex={0} className="menu-button" onClick={onOpen}>
      <BiDotsVerticalRounded />
    </div>
    <MenuPopup isOpen={isOpen} onClose={onClose}>
      <MenuList>{children}</MenuList>
    </MenuPopup>
  </div>
);

export default Menu;

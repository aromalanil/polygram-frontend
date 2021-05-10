import './style.scss';
import { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import Logout from './Logout';
import Avatar from '../../../common/Avatar';
import { getShortString } from '../../../../utils/string';

const NavUserDetails = () => {
  const name = 'Ebin Johny Senchonese';
  const username = 'ebinjs10';
  const [logoutVisible, setLogoutVisible] = useState(false);

  return (
    <div className="nav-user-details">
      <Avatar
        className="nav-avatar"
        name="Spider-man"
        src="https://i.insider.com/5f778d302400440019129c6a?width=700"
      />
      <div className="nav-details-right">
        <div className="details">
          <h3>{getShortString(name, 12)}</h3>
          <p>{`@${getShortString(username, 12)}`}</p>
        </div>
        <button className="options" onClick={() => setLogoutVisible(true)}>
          <BiDotsVerticalRounded />
          <Logout isLogoutVisible={logoutVisible} onClose={() => setLogoutVisible(false)} />
        </button>
      </div>
    </div>
  );
};

export default NavUserDetails;

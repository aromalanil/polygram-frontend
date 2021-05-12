import './style.scss';
import { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import Logout from './Logout';
import Avatar from '../../../common/Avatar';
import { useRhinoValue } from '../../../../global/state';
import { getShortString } from '../../../../utils/string';
import placeHolderImage from '../../../../assets/images/placeholder_profile_picture.png';

const NavUserDetails = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const userData = useRhinoValue('userData');

  const isLoading = userData === null;
  const placeholder = {
    profile_picture: placeHolderImage,
    full_name: 'Loading...',
    username: 'loading...',
  };

  return (
    <div className="nav-user-details">
      <Avatar
        className="nav-avatar"
        name="Spider-man"
        src={isLoading ? placeholder.profile_picture : userData.profile_picture}
      />
      <div className="nav-details-right">
        <div className="details">
          <h3>{isLoading ? placeholder.full_name : getShortString(userData.full_name, 12)}</h3>
          <p>{isLoading ? placeholder.username : `@${getShortString(userData.username, 12)}`}</p>
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

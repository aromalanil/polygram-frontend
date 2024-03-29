import './style.scss';
import { useState } from 'react';
import { useRhinoValue } from 'react-rhino';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import Logout from './Logout';
import Avatar from '../../../common/Avatar';
import { getFullName } from '../../../../utils/common';
import { getShortString } from '../../../../utils/string';
import placeholderProfilePicture from '../../../../assets/images/placeholder_profile_picture.png';

const NavUserDetails = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const userData = useRhinoValue('userData');

  const isLoading = userData === null;
  const placeholder = {
    profile_picture: placeholderProfilePicture,
    full_name: 'Loading...',
    username: 'loading...',
  };

  const fullName = getFullName(userData);

  return (
    <div className="nav-user-details">
      <Avatar
        username={isLoading ? '' : userData.username}
        className="nav-avatar"
        src={isLoading ? placeholder.profile_picture : userData.profile_picture}
      />
      <div className="nav-details-right">
        <div className="details">
          <h3>{isLoading ? placeholder.full_name : getShortString(fullName, 12)}</h3>
          <p>{isLoading ? placeholder.username : `@${getShortString(userData.username, 12)}`}</p>
        </div>
        <div className="options-wrapper">
          <button className="options" onClick={() => setLogoutVisible((v) => !v)}>
            <BiDotsVerticalRounded />
          </button>
          <Logout isLogoutVisible={logoutVisible} onClose={() => setLogoutVisible(false)} />
        </div>
      </div>
    </div>
  );
};

export default NavUserDetails;

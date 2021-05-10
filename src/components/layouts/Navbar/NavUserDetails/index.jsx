import './style.scss';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useCallback, useEffect, useState } from 'react';

import Logout from './Logout';
import Avatar from '../../../common/Avatar';
import { getShortString } from '../../../../utils/string';
import { getLoggedInUserDetails } from '../../../../api/user';

const NavUserDetails = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setLoading] = useState(true);

  const updateUserDetails = useCallback(async () => {
    setLoading(true);

    try {
      const newUserDetails = await getLoggedInUserDetails();
      setUserDetails(newUserDetails);
    } catch (err) {
      console.log('Unable to get user details'); // eslint-disable-line
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    updateUserDetails();
  }, [updateUserDetails]);

  return (
    <div className="nav-user-details">
      <Avatar className="nav-avatar" name="Spider-man" src={userDetails.profile_picture} />
      <div className="nav-details-right">
        <div className="details">
          <h3>{isLoading ? 'Loading...' : getShortString(userDetails.full_name, 12)}</h3>
          <p>{isLoading ? 'loading...' : `@${getShortString(userDetails.username, 12)}`}</p>
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

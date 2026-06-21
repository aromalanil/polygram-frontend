import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import { useRhinoValue } from '#store';

import UserProfile from './UserProfile';
import { UserProfileSkeleton, QuestionCardSkeleton } from '../../common/Skeleton';
import UserFeed from '../../common/UserFeed';
import { getUserData } from '../../../api/user';
import IconButton from '../../common/IconButton';

const Profile = () => {
  const history = useHistory();
  const { username } = useParams();
  const userData = useRhinoValue('userData');
  const [profileDetails, setProfileDetails] = useState(null);

  const isCurrentUser = userData?.username === username;

  useEffect(() => {
    const updateUserDetails = async () => {
      if (isCurrentUser) {
        setProfileDetails(userData);
      } else {
        try {
          const newDetails = await getUserData(username);
          setProfileDetails(newDetails);
        } catch (err) {
          history.push('/404');
        }
      }
    };

    updateUserDetails();
  }, [userData, username, isCurrentUser, history]);

  return (
    <>
      {profileDetails ? (
        <>
          <div className="page-back">
            <IconButton className="back-btn" onClick={() => history.goBack()}>
              <FiArrowLeft />
            </IconButton>
            <h2>Profile</h2>
          </div>
          <UserProfile userDetails={profileDetails} isCurrentUser={isCurrentUser} />
          <UserFeed user_id={profileDetails._id} />
        </>
      ) : (
        <>
          <div className="page-back">
            <IconButton className="back-btn" onClick={() => history.goBack()}>
              <FiArrowLeft />
            </IconButton>
            <h2>Profile</h2>
          </div>
          <UserProfileSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
        </>
      )}
    </>
  );
};

export default Profile;

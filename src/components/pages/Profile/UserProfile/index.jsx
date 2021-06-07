import { useState } from 'react';
import { MdEmail } from 'react-icons/md';

import './style.scss';
import EditProfile from './EditProfile';
import Button from '../../../common/Button';

const UserProfile = ({ userDetails, isCurrentUser }) => {
  const {
    bio,
    email,
    username,
    last_name,
    first_name,
    profile_picture,
    followed_topics,
  } = userDetails;

  const [isEditProfileVisible, setEditProfileVisibility] = useState(false);

  const followingCount = followed_topics.length;
  return (
    <>
      <div className="user-profile-card">
        <div className="user-profile-card-top">
          <img
            className="cover-img"
            src="https://source.unsplash.com/800x600/?nature"
            alt="User Cover"
          />
        </div>
        <div className="user-profile-card-middle">
          <img
            src={profile_picture}
            alt={`${first_name} profile_picture`}
            className="profile_picture"
          />
          {isCurrentUser && (
            <Button
              variant="secondary"
              className="edit-profile"
              onClick={() => setEditProfileVisibility(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
        <div className="user-profile-card-bottom">
          <h3 className="name">
            {first_name}
            {last_name && ` ${last_name}`}
          </h3>
          <span className="username">@{username}</span>
          <p className="bio">{bio ?? 'This profile has no bio added right now.'}</p>
          <div className="extra-details">
            <span className="email-container">
              <MdEmail />
              <a href={`mailto:${email}`} className="email">
                {email}
              </a>
            </span>

            <span className="topics">
              &nbsp;•&nbsp;
              <span>
                {followingCount} {followingCount === 1 ? 'topic' : 'topics'}
              </span>{' '}
              Following
            </span>
          </div>
        </div>
      </div>
      <EditProfile isOpen={isEditProfileVisible} onClose={() => setEditProfileVisibility(false)} />
    </>
  );
};

export default UserProfile;

import { useState } from 'react';
import { MdEmail } from 'react-icons/md';

import './style.scss';
import EditProfile from './EditProfile';
import Button from '../../../common/Button';
import FileUploadButton from '../../../common/FileUploadButton';
import UploadProfilePicture from '../../../common/UploadProfilePicture';
import LogoutButton from './LogoutButton';
import RichContent from '../../../common/RichContent';

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
  const [uploadedProfilePicture, setUploadedProfilePicture] = useState(null);
  const [isPictureUploadVisible, setPictureUploadVisibility] = useState(false);

  const handlePictureUpload = (file) => {
    setUploadedProfilePicture(file);
    setPictureUploadVisibility(true);
  };

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
          <div className="profile-image">
            <img
              src={profile_picture}
              alt={`${first_name} profile_picture`}
              className="profile-picture"
            />
            {isCurrentUser && (
              <FileUploadButton
                accept="image/png, image/jpeg, image/jpg"
                className="profile-picture-upload"
                onUpload={handlePictureUpload}
              />
            )}
          </div>
          {isCurrentUser && (
            <div className="button-grp">
              <Button
                variant="secondary"
                className="edit-profile"
                onClick={() => setEditProfileVisibility(true)}
              >
                Edit Profile
              </Button>
              <LogoutButton />
            </div>
          )}
        </div>
        <div className="user-profile-card-bottom">
          <h3 className="name">
            {first_name}
            {last_name && ` ${last_name}`}
          </h3>
          <span className="username">@{username}</span>
          <RichContent className="bio">
            {bio ?? 'This profile has no bio added right now.'}
          </RichContent>
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
      {isCurrentUser && (
        <>
          <EditProfile
            isOpen={isEditProfileVisible}
            onClose={() => setEditProfileVisibility(false)}
          />
          <UploadProfilePicture
            profilePicture={uploadedProfilePicture}
            isOpen={isPictureUploadVisible}
            onClose={() => {
              setUploadedProfilePicture(null);
              setPictureUploadVisibility(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default UserProfile;

import React from 'react';
import './style.scss';
import { ShimmerBlock } from './ShimmerBlock';

export const UserProfileSkeleton = () => (
  <div className="user-profile-card skeleton-card">
    <div className="user-profile-card-top">
      <ShimmerBlock width="100%" height="20rem" borderRadius="1.3rem 1.3rem 0 0" />
    </div>
    <div className="user-profile-card-middle">
      <div className="profile-image">
        <div className="profile-picture" style={{ overflow: 'hidden', padding: 0 }}>
          <ShimmerBlock width="100%" height="100%" borderRadius="50%" />
        </div>
      </div>
      <div className="button-grp">
        <ShimmerBlock width="10rem" height="3.2rem" borderRadius="0.5rem" />
      </div>
    </div>
    <div className="user-profile-card-bottom" style={{ marginTop: '-4rem' }}>
      <ShimmerBlock width="15rem" height="2.2rem" style={{ marginBottom: '0.8rem' }} />
      <ShimmerBlock width="8rem" height="1.4rem" style={{ marginBottom: '1.5rem' }} />
      <ShimmerBlock width="100%" height="1.4rem" style={{ marginBottom: '0.6rem' }} />
      <ShimmerBlock width="90%" height="1.4rem" style={{ marginBottom: '2.5rem' }} />
      <div className="extra-details" style={{ display: 'flex', gap: '1.5rem' }}>
        <ShimmerBlock width="12rem" height="1.4rem" />
        <ShimmerBlock width="10rem" height="1.4rem" />
      </div>
    </div>
  </div>
);

export default UserProfileSkeleton;

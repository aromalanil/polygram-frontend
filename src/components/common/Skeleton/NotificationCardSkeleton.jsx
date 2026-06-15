import React from 'react';
import './style.scss';
import { ShimmerBlock } from './ShimmerBlock';

export const NotificationCardSkeleton = () => (
  <div
    className="notification-card skeleton-card"
    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
  >
    <div
      className="notification-card-body"
      style={{ display: 'flex', flex: 1, gap: '1rem', alignItems: 'center' }}
    >
      <ShimmerBlock width="3.6rem" height="3.6rem" borderRadius="50%" />
      <div className="content" style={{ flex: 1 }}>
        <ShimmerBlock width="12rem" height="1.4rem" style={{ marginBottom: '0.6rem' }} />
        <ShimmerBlock width="80%" height="1.2rem" />
      </div>
    </div>
    <div className="notification-card-top-right">
      <ShimmerBlock width="4rem" height="1rem" />
    </div>
  </div>
);

export default NotificationCardSkeleton;

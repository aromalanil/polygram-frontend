import React from 'react';
import './style.scss';
import { ShimmerBlock } from './ShimmerBlock';

export const OpinionCardSkeleton = () => (
  <div className="opinion-card skeleton-card">
    <div className="opinion-card-top">
      <div className="author-details">
        <ShimmerBlock className="avatar" borderRadius="50%" width="3rem" height="3rem" />
        <div>
          <ShimmerBlock width="10rem" height="1.2rem" style={{ marginBottom: '0.5rem' }} />
          <ShimmerBlock width="6rem" height="1rem" />
        </div>
      </div>
      <div className="opinion-card-top-right">
        <ShimmerBlock width="5rem" height="1.1rem" />
      </div>
    </div>
    <div className="opinion-card-bottom">
      <div
        className="opinion-card-voting"
        style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', minWidth: '3.6rem' }}
      >
        <ShimmerBlock width="2.4rem" height="2.4rem" borderRadius="0.4rem" />
        <ShimmerBlock width="2.4rem" height="2.4rem" borderRadius="0.4rem" />
      </div>
      <div className="opinion-card-content" style={{ flex: 1, marginLeft: '2rem' }}>
        <ShimmerBlock width="14rem" height="1.5rem" style={{ marginBottom: '1rem' }} />
        <ShimmerBlock width="100%" height="1.3rem" style={{ marginBottom: '0.6rem' }} />
        <ShimmerBlock width="85%" height="1.3rem" />
      </div>
    </div>
  </div>
);

export default OpinionCardSkeleton;

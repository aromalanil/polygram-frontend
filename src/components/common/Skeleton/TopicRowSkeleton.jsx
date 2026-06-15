import React from 'react';
import './style.scss';
import { ShimmerBlock } from './ShimmerBlock';

export const TopicRowSkeleton = () => (
  <div className="topic-row skeleton-card" style={{ padding: '0.5rem 0' }}>
    <div className="topic-row-left" style={{ flex: 1 }}>
      <ShimmerBlock width="10rem" height="1.5rem" style={{ marginBottom: '0.6rem' }} />
      <ShimmerBlock width="6rem" height="1.2rem" />
    </div>
    <div className="topic-row-right">
      <ShimmerBlock width="7rem" height="2.8rem" borderRadius="5rem" />
    </div>
  </div>
);

export default TopicRowSkeleton;

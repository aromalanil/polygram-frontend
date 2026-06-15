import React from 'react';
import './style.scss';
import { ShimmerBlock } from './ShimmerBlock';

export const TopicCardSkeleton = () => (
  <div className="topic-card skeleton-card">
    <div className="topic-card-left">
      <ShimmerBlock width="12rem" height="2rem" style={{ marginBottom: '0.8rem' }} />
      <ShimmerBlock width="8rem" height="1.2rem" />
    </div>
    <div className="topic-card-right">
      <ShimmerBlock width="9rem" height="3.2rem" borderRadius="5rem" />
    </div>
  </div>
);

export default TopicCardSkeleton;

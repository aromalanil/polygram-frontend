import React from 'react';
import './style.scss';
import { ShimmerBlock } from './ShimmerBlock';

export const QuestionCardSkeleton = ({ isDetailed = false }) => (
  <div className="question-card skeleton-card">
    <div className="question-card-top">
      <div className="author-details">
        <ShimmerBlock className="avatar" borderRadius="50%" width="4.2rem" height="4.2rem" />
        <div>
          <ShimmerBlock width="12rem" height="1.4rem" style={{ marginBottom: '0.6rem' }} />
          <ShimmerBlock width="8rem" height="1.1rem" />
        </div>
      </div>
      <div className="question-card-top-right">
        <ShimmerBlock width="5rem" height="1.1rem" />
      </div>
    </div>
    <div className="question-card-middle">
      <div className="badge-row" style={{ gap: '0.8rem', marginBottom: '1.2rem', display: 'flex' }}>
        <ShimmerBlock width="6rem" height="2rem" borderRadius="2rem" />
        <ShimmerBlock width="8rem" height="2rem" borderRadius="2rem" />
      </div>
      <ShimmerBlock width="90%" height="2.2rem" style={{ marginBottom: '1.2rem' }} />
      <ShimmerBlock width="100%" height="1.4rem" style={{ marginBottom: '0.8rem' }} />
      <ShimmerBlock width="95%" height="1.4rem" style={{ marginBottom: '0.8rem' }} />
      <ShimmerBlock width="60%" height="1.4rem" />

      {isDetailed && (
        <div
          className="card-options"
          style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <ShimmerBlock width="100%" height="4rem" borderRadius="5rem" />
          <ShimmerBlock width="100%" height="4rem" borderRadius="5rem" />
        </div>
      )}
    </div>
    <div className="question-card-bottom">
      <div className="question-card-bottom-left">
        {!isDetailed && <ShimmerBlock width="8rem" height="3.2rem" borderRadius="0.5rem" />}
      </div>
      <div
        className="question-card-bottom-right"
        style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
      >
        <ShimmerBlock width="6rem" height="1.4rem" />
        <ShimmerBlock width="2.4rem" height="2.4rem" borderRadius="50%" />
      </div>
    </div>
  </div>
);

export default QuestionCardSkeleton;

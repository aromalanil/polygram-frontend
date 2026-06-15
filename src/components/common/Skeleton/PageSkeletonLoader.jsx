import React from 'react';
import './style.scss';
import { ShimmerBlock } from './ShimmerBlock';
import { QuestionCardSkeleton } from './QuestionCardSkeleton';
import { UserProfileSkeleton } from './UserProfileSkeleton';
import { TopicCardSkeleton } from './TopicCardSkeleton';
import { NotificationCardSkeleton } from './NotificationCardSkeleton';

export const PageSkeletonLoader = () => {
  const path = window.location.pathname;

  if (path.startsWith('/u/')) {
    return (
      <>
        <div className="page-back">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '3.6rem',
              marginBottom: '1rem',
            }}
          >
            <ShimmerBlock
              width="3.6rem"
              height="3.6rem"
              borderRadius="50%"
              style={{ marginRight: '1rem' }}
            />
            <ShimmerBlock width="8rem" height="2rem" />
          </div>
        </div>
        <UserProfileSkeleton />
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
      </>
    );
  }

  if (path.startsWith('/questions/')) {
    return (
      <>
        <div
          className="page-back"
          style={{ display: 'flex', alignItems: 'center', height: '3.6rem', marginBottom: '1rem' }}
        >
          <ShimmerBlock
            width="3.6rem"
            height="3.6rem"
            borderRadius="50%"
            style={{ marginRight: '1rem' }}
          />
          <ShimmerBlock width="8rem" height="2rem" />
        </div>
        <QuestionCardSkeleton isDetailed />
      </>
    );
  }

  if (path.startsWith('/topics/')) {
    return (
      <>
        <div
          className="page-back"
          style={{ display: 'flex', alignItems: 'center', height: '3.6rem', marginBottom: '1rem' }}
        >
          <ShimmerBlock
            width="3.6rem"
            height="3.6rem"
            borderRadius="50%"
            style={{ marginRight: '1rem' }}
          />
          <ShimmerBlock width="8rem" height="2rem" />
        </div>
        <TopicCardSkeleton />
        <QuestionCardSkeleton />
      </>
    );
  }

  if (path === '/notification') {
    return (
      <div className="notification-feed">
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
      </div>
    );
  }

  if (path === '/settings') {
    return (
      <div className="settings-page skeleton-card" style={{ padding: '2rem' }}>
        <ShimmerBlock width="12rem" height="2.4rem" style={{ marginBottom: '2rem' }} />
        <ShimmerBlock width="100%" height="4rem" style={{ marginBottom: '1.5rem' }} />
        <ShimmerBlock width="100%" height="4rem" style={{ marginBottom: '1.5rem' }} />
        <ShimmerBlock width="100%" height="4rem" />
      </div>
    );
  }

  return (
    <>
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
      <QuestionCardSkeleton />
    </>
  );
};

export default PageSkeletonLoader;

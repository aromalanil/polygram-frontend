import { useEffect, useState } from 'react';
import { useRhinoValue } from '#store';

import './style.scss';
import TopicRow from './TopicRow';
import { TopicRowSkeleton } from '../../../common/Skeleton';
import { getTrendingTopics } from '../../../../api/topic';
import useApiError from '../../../../hooks/useApiError';

const TopicsCard = () => {
  const setApiError = useApiError();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const newTopics = await getTrendingTopics({ limit: 4 });
        setIsLoading(false);
        setTopics(newTopics);
      } catch (err) {
        setApiError(err);
      }
    };
    fetchTopics();
  }, [setApiError, isUserLoggedIn]);

  return (
    <div className="topics-card">
      <h3>Trending Topics</h3>
      {isLoading ? (
        <>
          <TopicRowSkeleton />
          <TopicRowSkeleton />
          <TopicRowSkeleton />
          <TopicRowSkeleton />
        </>
      ) : (
        topics.map((topic) => (
          <TopicRow
            key={topic._id}
            topicName={topic.name}
            questionCount={topic.question_count}
            isFollowing={topic.followed_by_user}
          />
        ))
      )}
    </div>
  );
};

export default TopicsCard;

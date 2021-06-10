import { useEffect, useState } from 'react';

import './style.scss';
import TopicRow from './TopicRow';
import Loader from '../../../common/Loader';
import { getTrendingTopics } from '../../../../api/topic';
import useApiError from '../../../../hooks/useApiError';
import { useRhinoValue } from '../../../../global/state';

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
      {topics.map((topic) => (
        <TopicRow
          key={topic._id}
          topicName={topic.name}
          questionCount={topic.question_count}
          isFollowing={topic.followed_by_user}
        />
      ))}
      {isLoading && <Loader />}
    </div>
  );
};

export default TopicsCard;

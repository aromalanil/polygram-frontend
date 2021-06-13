import { Waypoint } from 'react-waypoint';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import './style.scss';
import Loader from '../Loader';
import TopicCard from '../TopicCard';
import { getTopics } from '../../../api/topic';
import useApiError from '../../../hooks/useApiError';

const TopicFeed = ({ search }) => {
  const setApiError = useApiError();
  const [topics, setTopics] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const finalTopic = useMemo(() => topics[topics.length - 1]?._id, [topics]);

  const fetchTopics = useCallback(
    async (before) =>
      getTopics({
        search,
        before_id: before,
      }),
    [search]
  );

  const fetchInitialTopics = useCallback(async () => {
    let newTopics;
    try {
      newTopics = await fetchTopics();
      if (newTopics.length === 0) setHasMore(false);
      setTopics(newTopics);
    } catch (err) {
      setApiError(err);
    }
  }, [fetchTopics, setApiError]);

  const fetchOldTopics = useCallback(async () => {
    if (!hasMore) return;
    let newTopics;
    try {
      newTopics = await fetchTopics(finalTopic);
      if (newTopics.length === 0) {
        setHasMore(false);
        return;
      }
      setTopics((oldTopics) => [...oldTopics, ...newTopics]);
    } catch (err) {
      setApiError(err);
    }
  }, [hasMore, fetchTopics, setApiError, finalTopic]);

  // Fetching initial Topics on component mount
  useEffect(() => {
    fetchInitialTopics();
  }, [fetchInitialTopics]);

  return (
    <>
      {topics.map((topic, index) => (
        <Fragment key={topic._id}>
          <TopicCard topicData={topic} />
          {topics.length - 1 === index && <Waypoint onEnter={() => fetchOldTopics()} />}
        </Fragment>
      ))}
      {hasMore ? (
        <Loader />
      ) : (
        <div className="no-topics">
          <div className="separator" />
          <span>
            {topics.length === 0 ? 'No topics to show right now' : 'No more topics available'}
          </span>
        </div>
      )}
    </>
  );
};

export default TopicFeed;

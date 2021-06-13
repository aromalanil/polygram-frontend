import { FiArrowLeft } from 'react-icons/fi';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './style.scss';
import Loader from '../../common/Loader';
import UserFeed from '../../common/UserFeed';
import TopicCard from '../../common/TopicCard';
import IconButton from '../../common/IconButton';
import { getSingleTopic } from '../../../api/topic';
import useApiError from '../../../hooks/useApiError';

const Topic = () => {
  const { name } = useParams();
  const history = useHistory();
  const setApiError = useApiError();
  const [topicData, setTopicData] = useState(null);

  const updateTopicData = useCallback(
    async (topicName) => {
      try {
        const topic = await getSingleTopic(topicName);
        setTopicData(topic);
      } catch (err) {
        if (err?.response?.status === 404) {
          history.push('/404');
          return;
        }
        setApiError(err);
      }
    },
    [history, setApiError]
  );

  useEffect(() => {
    updateTopicData(name);
  }, [name, updateTopicData]);

  return (
    <div className="topics-page">
      <div className="page-back">
        <IconButton className="back-btn" onClick={() => history.goBack()}>
          <FiArrowLeft />
        </IconButton>
        <h2>Topic {name}</h2>
      </div>
      {topicData ? <TopicCard topicData={topicData} /> : <Loader />}
      <UserFeed topic={name} />
    </div>
  );
};

export default Topic;

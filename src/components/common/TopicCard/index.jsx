import { Link } from 'react-router-dom';

import './style.scss';
import TopicFollowButton from '../TopicFollowButton';

const TopicCard = ({ topicData }) => {
  const { name, followed_by_user, question_count } = topicData || {};

  return (
    <div className="topic-card">
      <div className="topic-card-left">
        <Link to={`/topics/${name}`}>
          <h2>{name}</h2>
          <p>{`${question_count} ${question_count === 1 ? 'Question' : 'Questions'}`}</p>
        </Link>
      </div>
      <div className="topic-card-right">
        <TopicFollowButton
          topic={name}
          className="follow-topic-btn"
          initialIsFollowing={followed_by_user}
        />
      </div>
    </div>
  );
};

export default TopicCard;

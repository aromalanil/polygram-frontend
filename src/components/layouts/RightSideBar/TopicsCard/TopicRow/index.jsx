import './style.scss';
import TopicFollowButton from '../../../../common/TopicFollowButton';

const TopicRow = ({ topicName, questionCount, isFollowing }) => (
  <div className="topic-row">
    <div className="topic-row-left">
      <h4>{topicName}</h4>
      <span>
        {questionCount} {questionCount === 1 ? 'Question' : 'Questions'}
      </span>
    </div>
    <div className="topic-row-right">
      <TopicFollowButton
        topic={topicName}
        variant="secondary"
        className="follow-btn"
        initialIsFollowing={isFollowing}
      />
    </div>
  </div>
);

export default TopicRow;

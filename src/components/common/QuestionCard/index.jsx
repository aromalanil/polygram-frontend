import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import './style.scss';
import Avatar from '../Avatar';
import Button from '../Button';
import ShareButton from './ShareButton';
import { getShortString } from '../../../utils/string';

dayjs.extend(relativeTime);

const QuestionCard = ({ _id, author, content, created_at, title, opinion_count }) => {
  const { username, first_name, last_name, profile_picture } = author;
  return (
    <div className="question-card">
      <div className="question-card-top">
        <div className="author-details">
          <Avatar src={profile_picture} />
          <div>
            <h6>{`${first_name} ${last_name || ''}`}</h6>
            <span>{`@${username}`}</span>
          </div>
        </div>
        <div className="time">{dayjs(created_at).fromNow()}</div>
      </div>
      <div className="question-card-middle">
        <h2>{getShortString(title, 50)}</h2>
        <p>{getShortString(content, 700)}</p>
      </div>
      <div className="question-card-bottom">
        <div className="question-card-bottom-left">
          <Button className="view-more-btn" variant="secondary">
            View More
          </Button>
        </div>
        <div className="question-card-bottom-right">
          <span>
            {opinion_count > 1 ? `${opinion_count} Opinions` : `${opinion_count} Opinion`}
          </span>
          <ShareButton title={title} url={`${window.location.origin}/questions/${_id}`} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

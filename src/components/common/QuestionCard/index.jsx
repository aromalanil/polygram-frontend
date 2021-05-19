import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';

import './style.scss';
import Avatar from '../Avatar';
import Button from '../Button';
import Options from './Options';
import ShareButton from './ShareButton';
import { getShortString } from '../../../utils/string';
import { FetchQuestionProvider } from './fetchQuestionContext';
import Badge from '../Badge';

dayjs.extend(relativeTime);

const QuestionCard = ({ questionData, isDetailed = false, refetchData }) => {
  const history = useHistory();
  const cardRef = useRef(null);
  const {
    _id,
    title,
    author,
    topics,
    content,
    options,
    created_at,
    opinion_count,
    have_user_voted = false,
  } = questionData;
  const { username, first_name, last_name, profile_picture } = author;

  const [showPercentage, setShowPercentage] = useState(have_user_voted);
  const titleToDisplay = isDetailed ? title : getShortString(title, 50);
  const contentToDisplay = isDetailed ? content : getShortString(content, 700);

  useEffect(() => {
    setShowPercentage(have_user_voted);
  }, [have_user_voted]);

  return (
    <FetchQuestionProvider value={refetchData}>
      <div className="question-card" ref={cardRef}>
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
          <div className="badge-row">
            {topics.map((topic) => (
              <Badge key={topic}>{topic}</Badge>
            ))}
          </div>
          <h2>{titleToDisplay}</h2>
          <p>{contentToDisplay}</p>
          {isDetailed && (
            <Options questionId={_id} options={options} showPercentage={showPercentage} />
          )}
        </div>
        <div className="question-card-bottom">
          <div className="question-card-bottom-left">
            {!isDetailed ? (
              <Button
                className="view-more-btn"
                variant="secondary"
                onClick={() => history.push(`/questions/${_id}`)}
              >
                View More
              </Button>
            ) : (
              <Button
                className="view-more-btn"
                variant="secondary"
                disabled={have_user_voted}
                onClick={() => setShowPercentage(!showPercentage)}
              >
                {showPercentage ? 'Hide Result' : 'Show Result'}
              </Button>
            )}
          </div>
          <div className="question-card-bottom-right">
            <span>
              {opinion_count > 1 ? `${opinion_count} Opinions` : `${opinion_count} Opinion`}
            </span>
            <ShareButton
              title={title}
              card={cardRef.current}
              url={`${window.location.origin}/questions/${_id}`}
            />
          </div>
        </div>
      </div>
    </FetchQuestionProvider>
  );
};

export default QuestionCard;

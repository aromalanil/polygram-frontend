import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';

// Don't change order of this import👇🏻 or you may break build😈
// Issue status: https://github.com/facebook/create-react-app/issues/5372
import LinkPreview from '../LinkPreview';

import './style.scss';
import Badge from '../Badge';
import Avatar from '../Avatar';
import Button from '../Button';
import Options from './Options';
import ShareButton from './ShareButton';
import RichContent from '../RichContent';
import QuestionMenu from './QuestionMenu';
import { getFullName } from '../../../utils/common';
import { FetchQuestionProvider } from './fetchQuestionContext';

dayjs.extend(relativeTime);

const QuestionCard = ({ questionData, refetchData, isDetailed = false, onDelete }) => {
  const history = useHistory();
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
  const { username, profile_picture } = author;

  const [showPercentage, setShowPercentage] = useState(have_user_voted);

  useEffect(() => {
    setShowPercentage(have_user_voted);
  }, [have_user_voted]);

  return (
    <FetchQuestionProvider value={refetchData}>
      <div className="question-card">
        <div className="question-card-top">
          <div className="author-details">
            <Avatar src={profile_picture} username={username} />
            <div>
              <h6>{getFullName(author)}</h6>
              <span>@{username}</span>
            </div>
          </div>
          <div className="question-card-top-right">
            <span className="time">{dayjs(created_at).fromNow()}</span>
            <QuestionMenu onDelete={() => onDelete(_id)} id={_id} username={username} />
          </div>
        </div>
        <div className="question-card-middle">
          <div className="badge-row">
            {topics.map((topic) => (
              <Link key={topic} to={`/topics/${topic}`}>
                <Badge>{topic}</Badge>
              </Link>
            ))}
          </div>
          <h2 className={!isDetailed ? 'short' : ''}>{title}</h2>
          <RichContent className={!isDetailed ? 'short' : ''}>{content}</RichContent>
          <LinkPreview content={content} />
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
            <ShareButton text={title} url={`${window.location.origin}/questions/${_id}`} />
          </div>
        </div>
      </div>
    </FetchQuestionProvider>
  );
};

export default QuestionCard;

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';

import './style.scss';
import Avatar from '../Avatar';
import UpvoteDownVoteButton from './UpvoteDownVoteButton';

dayjs.extend(relativeTime);

const OpinionCard = ({ opinionData }) => {
  const {
    _id,
    author,
    option,
    content,
    created_at,
    upvote_count,
    downvote_count,
    is_upvoted = false,
    is_downvoted = false,
  } = opinionData;
  const { profile_picture, first_name, last_name, username } = author;

  const [count, setCount] = useState({ upvote: upvote_count, downvote: downvote_count });
  const [isVoted, setIsVoted] = useState({ upvote: is_upvoted, downvote: is_downvoted });

  useEffect(() => {
    setCount({ upvote: upvote_count, downvote: downvote_count });
  }, [upvote_count, downvote_count]);

  useEffect(() => {
    setIsVoted({ upvote: is_upvoted, downvote: is_downvoted });
  }, [is_upvoted, is_downvoted]);

  return (
    <div className="opinion-card">
      <div className="opinion-card-top">
        <div className="author-details">
          <Avatar src={profile_picture} username={username} />
          <div>
            <h6>
              {first_name} {last_name || ''}
            </h6>
            <span>@{username}</span>
          </div>
        </div>
        <div className="time">{dayjs(created_at).fromNow()}</div>
      </div>
      <div className="opinion-card-bottom">
        <div className="opinion-card-voting">
          <UpvoteDownVoteButton
            type="upvote"
            opinion_id={_id}
            setCount={setCount}
            count={count.upvote}
            setIsVoted={setIsVoted}
            isVoted={isVoted.upvote}
          />
          <UpvoteDownVoteButton
            type="downvote"
            opinion_id={_id}
            setCount={setCount}
            count={count.downvote}
            setIsVoted={setIsVoted}
            isVoted={isVoted.downvote}
          />
        </div>
        <div className="opinion-card-content">
          <h3>Voted For {option}</h3>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;

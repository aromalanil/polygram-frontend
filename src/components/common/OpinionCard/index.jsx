import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';

import './style.scss';
import Avatar from '../Avatar';
import OpinionMenu from './OpinionMenu';
import LinkPreview from '../LinkPreview';
import RichContent from '../RichContent';
import { getFullName } from '../../../utils/common';
import UpvoteDownVoteButton from './UpvoteDownVoteButton';

dayjs.extend(relativeTime);

const OpinionCard = ({ opinionData, onDelete }) => {
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
  const { profile_picture, username } = author;

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
            <h6>{getFullName(author)}</h6>
            <span>@{username}</span>
          </div>
        </div>
        <div className="opinion-card-top-right">
          <span className="time">{dayjs(created_at).fromNow()}</span>
          <OpinionMenu onDelete={() => onDelete(_id)} id={_id} username={username} />
        </div>
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
          <RichContent>{content}</RichContent>
          <LinkPreview content={content} />
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;

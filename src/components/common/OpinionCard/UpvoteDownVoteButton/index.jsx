import { useCallback } from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';

import './style.scss';
import useApiError from '../../../../hooks/useApiError';
import useProtectedFunction from '../../../../hooks/useProtectedFunction';
import { addVote, removeVote } from '../../../../api/opinion';

const UpvoteDownVoteButton = ({ opinion_id, isVoted, type, count, setCount, setIsVoted }) => {
  // Checking if type prop is valid
  if (!['upvote', 'downvote'].includes(type)) throw new Error('Invalid type');

  const setApiError = useApiError();
  const protectFunction = useProtectedFunction();

  const handleVote = useCallback(async () => {
    if (!isVoted) {
      try {
        const { upvote_count, downvote_count } = await addVote({ type, opinion_id });

        setCount({ upvote: upvote_count, downvote: downvote_count });

        const newIsVoted = {
          upvote: type === 'upvote',
          downvote: type === 'downvote',
        };
        setIsVoted(newIsVoted);
      } catch (err) {
        setApiError(err);
      }
    } else {
      try {
        const { upvote_count, downvote_count } = await removeVote({ type, opinion_id });

        setCount((prevCount) => ({
          upvote: upvote_count ?? prevCount.upvote,
          downvote: downvote_count ?? prevCount.downvote,
        }));

        setIsVoted((prevIsVoted) => {
          const newIsVoted = { ...prevIsVoted };
          newIsVoted[type] = false;
          return newIsVoted;
        });
      } catch (err) {
        setApiError(err);
      }
    }
  }, [isVoted, opinion_id, setApiError, setCount, setIsVoted, type]);

  return (
    <div className="vote-status">
      <div
        className={`vote-button ${type} ${isVoted ? 'voted' : ''}`}
        role="button"
        tabIndex={0}
        onClick={protectFunction(handleVote)}
      >
        {type === 'upvote' && <GoArrowUp />}
        {type === 'downvote' && <GoArrowDown />}
      </div>
      <div className="vote-count">{count}</div>
    </div>
  );
};

export default UpvoteDownVoteButton;

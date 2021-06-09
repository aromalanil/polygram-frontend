import { useCallback, useState } from 'react';
import { VscLoading, VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

import './style.scss';
import useApiError from '../../../../hooks/useApiError';
import { addVote, removeVote } from '../../../../api/opinion';
import useProtectedFunction from '../../../../hooks/useProtectedFunction';
import { useRefetchData } from '../../../pages/Question/isDataUpdated';

const UpvoteDownVoteButton = ({ opinion_id, isVoted, type, count, setCount, setIsVoted }) => {
  // Checking if type prop is valid
  if (!['upvote', 'downvote'].includes(type)) throw new Error('Invalid type');

  const setApiError = useApiError();
  const [isLoading, setIsLoading] = useState(false);
  const protectFunction = useProtectedFunction();
  const refetchQuestionData = useRefetchData();

  const handleVote = useCallback(async () => {
    if (!isVoted) {
      setIsLoading(true);
      try {
        const { upvote_count, downvote_count } = await addVote({ type, opinion_id });

        setCount({ upvote: upvote_count, downvote: downvote_count });

        const newIsVoted = {
          upvote: type === 'upvote',
          downvote: type === 'downvote',
        };
        setIsVoted(newIsVoted);
        if (refetchQuestionData?.current) refetchQuestionData.current();
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
        if (refetchQuestionData?.current) refetchQuestionData.current();
      } catch (err) {
        setApiError(err);
      }
    }
    setIsLoading(false);
  }, [isVoted, opinion_id, setApiError, setCount, setIsVoted, type, refetchQuestionData]);

  return (
    <div className="vote-status">
      <div
        className={`vote-button ${type} ${isVoted ? 'voted' : ''} ${isLoading ? 'is-loading' : ''}`}
        role="button"
        aria-label={`${type} button`}
        tabIndex={0}
        onClick={protectFunction(handleVote)}
      >
        {isLoading ? (
          <VscLoading />
        ) : (
          <>
            {type === 'upvote' && <VscTriangleUp />}
            {type === 'downvote' && <VscTriangleDown />}
          </>
        )}
      </div>
      <div className="vote-count">{count}</div>
    </div>
  );
};

export default UpvoteDownVoteButton;

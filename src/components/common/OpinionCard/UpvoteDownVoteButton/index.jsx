import { useCallback } from 'react';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

import './style.scss';
import useApiError from '../../../../hooks/useApiError';
import { addVote, removeVote } from '../../../../api/opinion';
import useProtectedFunction from '../../../../hooks/useProtectedFunction';
import { useRefetchData } from '../../../pages/Question/isDataUpdated';

const UpvoteDownVoteButton = ({ opinion_id, isVoted, type, count, setCount, setIsVoted }) => {
  // Checking if type prop is valid
  if (!['upvote', 'downvote'].includes(type)) throw new Error('Invalid type');

  const setApiError = useApiError();
  const protectFunction = useProtectedFunction();
  const refetchQuestionData = useRefetchData();

  const handleVote = useCallback(async () => {
    const currentlyVoted = isVoted[type];
    const oppositeType = type === 'upvote' ? 'downvote' : 'upvote';

    const rollbackIsVoted = isVoted;
    const rollbackCount = count;

    // 1. Optimistic updates
    setIsVoted((prevIsVoted) => {
      if (currentlyVoted) {
        return {
          ...prevIsVoted,
          [type]: false,
        };
      }
      return {
        [type]: true,
        [oppositeType]: false,
      };
    });

    setCount((prevCount) => {
      if (currentlyVoted) {
        return {
          ...prevCount,
          [type]: Math.max(0, prevCount[type] - 1),
        };
      }
      return {
        ...prevCount,
        [type]: prevCount[type] + 1,
        [oppositeType]: rollbackIsVoted[oppositeType]
          ? Math.max(0, prevCount[oppositeType] - 1)
          : prevCount[oppositeType],
      };
    });

    // 2. Perform API request
    try {
      if (currentlyVoted) {
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

        // Refetching the question to get updated opinion percentage
        if (refetchQuestionData?.current) refetchQuestionData.current();
      } else {
        const { upvote_count, downvote_count } = await addVote({ type, opinion_id });

        setCount({ upvote: upvote_count, downvote: downvote_count });

        const newIsVoted = {
          upvote: type === 'upvote',
          downvote: type === 'downvote',
        };
        setIsVoted(newIsVoted);

        // Refetching the question to get updated opinion percentage
        if (refetchQuestionData?.current) refetchQuestionData.current();
      }
    } catch (err) {
      // Roll back to previous state on error
      setCount(rollbackCount);
      setIsVoted(rollbackIsVoted);
      setApiError(err);
    }
  }, [isVoted, count, opinion_id, setApiError, setCount, setIsVoted, type, refetchQuestionData]);

  return (
    <div className="vote-status">
      <div
        className={`vote-button ${type} ${isVoted[type] ? 'voted' : ''}`}
        role="button"
        aria-label={`${type} button`}
        tabIndex={0}
        onClick={protectFunction(handleVote)}
      >
        {type === 'upvote' && <VscTriangleUp />}
        {type === 'downvote' && <VscTriangleDown />}
      </div>
      <div className="vote-count">{count[type]}</div>
    </div>
  );
};

export default UpvoteDownVoteButton;

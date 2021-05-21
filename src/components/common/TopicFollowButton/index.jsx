import { useEffect, useState } from 'react';
import useApiError from '../../../hooks/useApiError';
import useProtectedFunction from '../../../hooks/useProtectedFunction';
import { followTopics, unfollowTopics } from '../../../api/topic';

import Button from '../Button';

const TopicFollowButton = ({ topic, initialIsFollowing, ...props }) => {
  const setApiError = useApiError();
  const protectFunction = useProtectedFunction();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleFollowTopic = protectFunction(async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        await unfollowTopics({ topics: [topic] });
        setIsFollowing(false);
      } else {
        await followTopics({ topics: [topic] });
        setIsFollowing(true);
      }
    } catch (err) {
      setApiError(err);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Button isLoading={isLoading} onClick={handleFollowTopic} {...props}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default TopicFollowButton;

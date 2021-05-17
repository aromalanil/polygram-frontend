import { useCallback, useEffect, useState, Fragment, useMemo } from 'react';
import { Waypoint } from 'react-waypoint';

import './style.scss';
import NewPost from './NewPost';
import Loader from '../Loader';
import QuestionCard from '../QuestionCard';
import { getQuestions } from '../../../api/question';
import useApiError from '../../../hooks/useApiError';
import { useRhinoValue } from '../../../global/state';

const UserFeed = ({ topic, search }) => {
  const setApiError = useApiError();
  const [hasMore, setHasMore] = useState(true);
  const [questions, setQuestions] = useState([]);
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');
  const [showNewPostAlert, setShowNewPostAlert] = useState(false);

  const [initialQuestion, finalQuestion] = useMemo(() => {
    const first = questions[0]?._id;
    const last = questions[questions.length - 1]?._id;
    return [first, last];
  }, [questions]);

  const fetchQuestions = useCallback(
    async ({ before, after } = {}) =>
      getQuestions({
        topic,
        search,
        after_id: after,
        before_id: before,
        following: isUserLoggedIn ? 'true' : 'false',
      }),
    [isUserLoggedIn, topic, search]
  );

  const fetchInitialQuestions = useCallback(async () => {
    let newQuestions;
    try {
      newQuestions = await fetchQuestions();
      setQuestions(newQuestions);
    } catch (err) {
      setApiError(err);
    }
  }, [fetchQuestions, setApiError]);

  const fetchOldQuestions = useCallback(
    async ({ before }) => {
      if (!hasMore) return;
      let newQuestions;
      try {
        newQuestions = await fetchQuestions({ before });
        if (newQuestions.length === 0) {
          setHasMore(false);
          return;
        }
        setQuestions((oldQuestions) => [...oldQuestions, ...newQuestions]);
      } catch (err) {
        setApiError(err);
      }
    },
    [hasMore, fetchQuestions, setApiError]
  );

  const fetchNewQuestions = useCallback(async () => {
    let newQuestions;
    try {
      newQuestions = await fetchQuestions({ after: initialQuestion });
      if (newQuestions.length === 0) return;
      setShowNewPostAlert(true);
      setQuestions((oldQuestions) => [...newQuestions, ...oldQuestions]);
    } catch (err) {
      setApiError(err);
    }
  }, [fetchQuestions, setApiError, initialQuestion]);

  useEffect(() => {
    const timer = setInterval(fetchNewQuestions, 60000);
    fetchInitialQuestions();

    return () => {
      clearInterval(timer);
    };
  }, [fetchInitialQuestions, fetchNewQuestions]);

  return (
    <>
      <NewPost isVisible={showNewPostAlert} onHide={() => setShowNewPostAlert(false)} />
      <>
        {questions.map((question, index) => (
          <Fragment key={question._id}>
            <QuestionCard {...question} />
            {questions.length - 1 === index && (
              <Waypoint onEnter={() => fetchOldQuestions({ before: finalQuestion })} />
            )}
          </Fragment>
        ))}
        {hasMore ? (
          <Loader />
        ) : (
          <div className="no-questions">
            <div className="separator" />
            <span>There are no more questions to show right now</span>
          </div>
        )}
      </>
    </>
  );
};

export default UserFeed;

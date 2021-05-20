import { useCallback, useEffect, useState, Fragment, useMemo } from 'react';
import { Waypoint } from 'react-waypoint';

import './style.scss';
import NewPost from './NewPost';
import Loader from '../Loader';
import QuestionCard from '../QuestionCard';
import { getQuestions } from '../../../api/question';
import useApiError from '../../../hooks/useApiError';
import { useRhinoValue } from '../../../global/state';

const UserFeed = ({ topic, search, following, user_id }) => {
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
        user_id,
        following,
        after_id: after,
        before_id: before,
      }),
    [topic, search, following, user_id]
  );

  const fetchInitialQuestions = useCallback(async () => {
    let newQuestions;
    try {
      newQuestions = await fetchQuestions();
      if (newQuestions.length === 0) setHasMore(false);
      setQuestions(newQuestions);
    } catch (err) {
      setApiError(err);
    }
  }, [fetchQuestions, setApiError]);

  const fetchOldQuestions = useCallback(async () => {
    if (!hasMore) return;
    let newQuestions;
    try {
      newQuestions = await fetchQuestions({ before: finalQuestion });
      if (newQuestions.length === 0) {
        setHasMore(false);
        return;
      }
      setQuestions((oldQuestions) => [...oldQuestions, ...newQuestions]);
    } catch (err) {
      setApiError(err);
    }
  }, [hasMore, fetchQuestions, setApiError, finalQuestion]);

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

  // Fetching initial questions on component mount
  useEffect(() => {
    fetchInitialQuestions();
  }, [fetchInitialQuestions, isUserLoggedIn]);

  // Setting hasMore to true each time user login/logout
  useEffect(() => {
    setHasMore(true);
  }, [isUserLoggedIn]);

  // Checking for new questions every one minute
  useEffect(() => {
    const timer = setInterval(fetchNewQuestions, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [fetchNewQuestions]);

  return (
    <>
      <NewPost isVisible={showNewPostAlert} onHide={() => setShowNewPostAlert(false)} />
      <>
        {questions.map((question, index) => (
          <Fragment key={question._id}>
            <QuestionCard questionData={question} />
            {questions.length - 1 === index && <Waypoint onEnter={() => fetchOldQuestions()} />}
          </Fragment>
        ))}
        {hasMore ? (
          <Loader />
        ) : (
          <div className="no-questions">
            <div className="separator" />
            <span>
              {questions.length === 0
                ? 'No questions to show right now'
                : 'No more questions available'}
            </span>
          </div>
        )}
      </>
    </>
  );
};

export default UserFeed;

import { Waypoint } from 'react-waypoint';
import { useRhinoValue } from 'react-rhino';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import './style.scss';
import Loader from '../../../common/Loader';
import { getOpinions } from '../../../../api/opinion';
import OpinionCard from '../../../common/OpinionCard';
import useApiError from '../../../../hooks/useApiError';

const Opinions = ({ question_id }) => {
  const setApiError = useApiError();
  const [opinions, setOpinion] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');

  const [initialOpinion, finalOpinion] = useMemo(() => {
    const first = opinions[0]?._id;
    const last = opinions[opinions.length - 1]?._id;
    return [first, last];
  }, [opinions]);

  const fetchInitialOpinions = useCallback(async () => {
    try {
      const newOpinions = await getOpinions({ question_id });
      if (newOpinions.length === 0) {
        setHasMore(false);
        return;
      }
      setOpinion(newOpinions);
    } catch (err) {
      setApiError(err);
    }
  }, [setApiError, question_id]);

  const fetchNewQuestions = useCallback(async () => {
    try {
      const newOpinions = await getOpinions({ question_id, after_id: initialOpinion });
      if (newOpinions.length === 0) return;
      setOpinion((oldOpinions) => [...newOpinions, ...oldOpinions]);
    } catch (err) {
      setApiError(err);
    }
  }, [initialOpinion, setApiError, question_id]);

  const fetchOldOpinions = useCallback(async () => {
    if (!hasMore) return;
    try {
      const newOpinions = await getOpinions({ question_id, before_id: finalOpinion });
      if (newOpinions.length === 0) {
        setHasMore(false);
        return;
      }
      setOpinion((oldOpinion) => [...oldOpinion, ...newOpinions]);
    } catch (err) {
      setApiError(err);
    }
  }, [setApiError, finalOpinion, hasMore, question_id]);

  const onOpinionDelete = (id) => {
    setOpinion((oldOpinion) => oldOpinion.filter((opinion) => opinion._id !== id));
  };

  // Fetching initial questions on component mount
  useEffect(() => {
    fetchInitialOpinions();
  }, [fetchInitialOpinions, isUserLoggedIn]);

  // Checking for new opinions every one minutes
  useEffect(() => {
    const timer = setInterval(fetchNewQuestions, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [fetchNewQuestions]);

  return (
    <div className="opinions">
      {opinions.map((opinion, index) => (
        <Fragment key={opinion._id}>
          <OpinionCard opinionData={opinion} onDelete={onOpinionDelete} />
          {opinions.length - 1 === index && <Waypoint onEnter={() => fetchOldOpinions()} />}
        </Fragment>
      ))}
      {hasMore ? (
        <Loader />
      ) : (
        <div className="no-opinions">
          <div className="separator" />
          <span>{opinions.length === 0 ? 'No opinions' : 'No more opinions left'}</span>
        </div>
      )}
    </div>
  );
};

export default Opinions;

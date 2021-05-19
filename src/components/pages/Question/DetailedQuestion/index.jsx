import { useCallback, useEffect, useState } from 'react';

import Loader from '../../../common/Loader';
import useApiError from '../../../../hooks/useApiError';
import QuestionCard from '../../../common/QuestionCard';
import { getSingleQuestion } from '../../../../api/question';
import { useRhinoValue } from '../../../../global/state';

const DetailedQuestion = ({ id }) => {
  const setApiError = useApiError();
  const [questionData, setQuestionData] = useState(null);
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');

  const fetchQuestion = useCallback(async () => {
    let questionDetails;
    try {
      questionDetails = await getSingleQuestion({ id });
      setQuestionData(questionDetails);
    } catch (err) {
      setApiError(err);
    }
  }, [setApiError, id]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion, isUserLoggedIn]);

  return questionData ? (
    <QuestionCard questionData={questionData} isDetailed refetchData={fetchQuestion} />
  ) : (
    <Loader />
  );
};

export default DetailedQuestion;

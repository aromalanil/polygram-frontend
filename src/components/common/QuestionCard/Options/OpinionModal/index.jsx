import { useState } from 'react';

import './style.scss';
import Modal from '../../../Modal';
import Button from '../../../Button';
import TextArea from '../../../TextArea';
import { markVote } from '../../../../../api/opinion';
import useApiError from '../../../../../hooks/useApiError';
import { useFetchContext } from '../../fetchQuestionContext';
import { useSetRhinoState } from '../../../../../global/state';

const OpinionModal = ({ option, questionId, isOpen, onClose }) => {
  const setApiError = useApiError();
  const refetchData = useFetchContext();
  const [isLoading, setIsLoading] = useState(false);
  const setSnackbarData = useSetRhinoState('snackBarData');

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(null);

  const handleMarkVote = async () => {
    if (contentError) return;
    try {
      setIsLoading(true);
      await markVote({ content, question_id: questionId, option });
      setSnackbarData({ type: 'success', message: 'Opinion added successfully' });
      await refetchData();
      setIsLoading(false);
    } catch (err) {
      setApiError(err);
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="opinion-wrapper">
        <div className="opinion-top">
          <h3>Vote for {option}</h3>
          <TextArea
            autoFocus
            name="opinion"
            minLength={5}
            maxLength={1600}
            value={content}
            error={contentError}
            label="Your Opinion"
            setError={setContentError}
            className="opinion-textarea"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button className="opinion-submit" isLoading={isLoading} onClick={handleMarkVote}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default OpinionModal;

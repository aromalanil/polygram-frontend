import { useState } from 'react';

import './style.scss';
import Modal from '../../../Modal';
import Button from '../../../Button';
import TextArea from '../../../TextArea';
import { markVote } from '../../../../../api/opinion';
import { validateString } from '../../../../../utils/validation';
import useApiError from '../../../../../hooks/useApiError';
import { useFetchContext } from '../../fetchQuestionContext';
import { useSetRhinoState } from '../../../../../global/state';

const OpinionModal = ({ option, questionId, isOpen, onClose }) => {
  const setApiError = useApiError();
  const refetchData = useFetchContext();
  const [isLoading, setIsLoading] = useState(false);
  const setSnackbarData = useSetRhinoState('snackBarData');

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const validateContent = () => {
    try {
      validateString(content, 5, 150, 'Opinion', true);
    } catch (err) {
      setContentError(err.message);
      return false;
    }
    return true;
  };

  const handleMarkVote = async () => {
    if (!validateContent()) return;
    if (contentError) return;
    try {
      setIsLoading(true);
      await markVote({ content, question_id: questionId, option });
      setSnackbarData({ type: 'success', message: 'Opinion added successfully' });
      await refetchData();
      setIsLoading(false);
      onClose();
    } catch (err) {
      setApiError(err);
      setIsLoading(false);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="opinion-wrapper">
        <div className="opinion-top">
          <h3>{`Vote for ${option}`}</h3>
          <TextArea
            autoFocus
            name="opinion"
            value={content}
            error={contentError}
            label="Your Opinion"
            className="opinion-textarea"
            onChange={handleContentChange}
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

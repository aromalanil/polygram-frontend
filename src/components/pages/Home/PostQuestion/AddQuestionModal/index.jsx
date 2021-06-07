import { useEffect, useState } from 'react';

import './style.scss';
import Options from './Options';
import TopicSelect from './TopicSelect';
import Modal from '../../../../common/Modal';
import Button from '../../../../common/Button';
import TextArea from '../../../../common/TextArea';
import TextInput from '../../../../common/TextInput';
import useApiError from '../../../../../hooks/useApiError';
import { createQuestion } from '../../../../../api/question';
import { useSetRhinoState } from '../../../../../global/state';

const AddQuestionModal = ({ initialContent, isOpen, onClose }) => {
  const setApiError = useApiError();
  const setSnackBarData = useSetRhinoState('snackBarData');
  const [title, setTitle] = useState('');
  const [topics, setTopics] = useState([]);
  const [options, setOptions] = useState([
    { key: Math.random(), value: '' },
    { key: Math.random(), value: '' },
  ]);
  const [content, setContent] = useState(initialContent ?? '');

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleModalClose = () => {
    setTitle('');
    setTopics([]);
    setContent('');
    setOptions([
      { key: Math.random(), value: '' },
      { key: Math.random(), value: '' },
    ]);
    onClose();
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();

    try {
      await createQuestion({
        content,
        title,
        topics,
        options: Object.values(options).map((option) => option.value),
      });
    } catch (err) {
      setApiError(err);
      return;
    }

    setSnackBarData({ type: 'success', message: 'Question posted successfully' });
    handleModalClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <form onSubmit={handleAddQuestion} className="add-question-modal">
        <h3>Post A Question</h3>
        <TextInput
          name="title"
          value={title}
          label="Title"
          className="title-input"
          autoFocus={!initialContent}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          name="body"
          label="Body"
          type="text"
          value={content}
          className="body-input"
          autoFocus={!!initialContent}
          onChange={(e) => setContent(e.target.value)}
        />
        <Options options={options} setOptions={setOptions} />
        <TopicSelect topics={topics} setTopics={setTopics} />
        <Button type="submit">Post</Button>
      </form>
    </Modal>
  );
};

export default AddQuestionModal;

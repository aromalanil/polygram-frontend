import { useState } from 'react';
import Modal from '../../../../common/Modal';

const AddQuestionModal = ({ initialContent, isOpen, onClose }) => {
  const [content, setContent] = useState(initialContent);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <input autoFocus type="text" value={content} onChange={(e) => setContent(e.target.value)} />
    </Modal>
  );
};

export default AddQuestionModal;

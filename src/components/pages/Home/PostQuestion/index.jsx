import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useRhinoValue } from 'react-rhino';

import './style.scss';
import Avatar from '../../../common/Avatar';
import Button from '../../../common/Button';
import AddQuestionModal from './AddQuestionModal';
import FloatingActionButton from '../../../common/FloatingActionButton';
import useProtectedFunction from '../../../../hooks/useProtectedFunction';
import placeholderProfilePicture from '../../../../assets/images/placeholder_profile_picture.png';

const PostQuestion = () => {
  const userData = useRhinoValue('userData');
  const [content, setContent] = useState('');
  const protectFunction = useProtectedFunction();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoading = userData === null;

  const openAddQuestionPopup = protectFunction(() => setIsModalOpen(true));

  const handleContentChange = protectFunction((e) => {
    const newContent = e.target.value;
    setContent(newContent);

    if (newContent.length > 50) {
      openAddQuestionPopup();
    }
  });

  const onInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      openAddQuestionPopup();
    }
  };

  return (
    <>
      <div className="post-question">
        <Avatar
          className="avatar"
          username={isLoading ? '' : userData.username}
          src={isLoading ? placeholderProfilePicture : userData.profile_picture}
        />
        <input
          type="text"
          value={content}
          onKeyPress={onInputKeyPress}
          placeholder="What's your Question?"
          onClick={protectFunction(() => {})}
          onChange={handleContentChange}
        />
        <Button className="post-btn" onClick={openAddQuestionPopup}>
          Post
        </Button>
      </div>
      <AddQuestionModal
        initialContent={content}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <FloatingActionButton
        label="Add Question"
        isActive={isModalOpen}
        onClick={openAddQuestionPopup}
      >
        <FiPlus />
      </FloatingActionButton>
    </>
  );
};

export default PostQuestion;

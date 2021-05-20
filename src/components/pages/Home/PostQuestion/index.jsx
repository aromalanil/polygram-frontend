import { useState } from 'react';

import './style.scss';
import Avatar from '../../../common/Avatar';
import Button from '../../../common/Button';
import AddQuestionModal from './AddQuestionModal';
import { useRhinoValue } from '../../../../global/state';
import useProtectedFunction from '../../../../hooks/useProtectedFunction';
import placeHolderImage from '../../../../assets/images/placeholder_profile_picture.png';

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
          src={isLoading ? placeHolderImage : userData.profile_picture}
          name={isLoading ? 'User Avatar' : 'userData.full_name'}
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
    </>
  );
};

export default PostQuestion;

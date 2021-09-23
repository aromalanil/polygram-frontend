import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRhinoValue, useSetRhinoState } from 'react-rhino';

import Menu from '../../Menu';
import { MenuItem } from '../../Menu/MenuList';
import ConfirmDialog from '../../ConfirmDialog';
import useApiError from '../../../../hooks/useApiError';
import { deleteQuestion } from '../../../../api/question';

const QuestionMenu = ({ username, id, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu isOpen={isMenuOpen} onOpen={() => setIsMenuOpen(true)} onClose={closeMenu}>
      <VisitProfile username={username} />
      <Delete id={id} onDelete={onDelete} authorUsername={username} closeMenu={closeMenu} />
    </Menu>
  );
};

const Delete = ({ id, onDelete, closeMenu, authorUsername }) => {
  const setApiError = useApiError();
  const userData = useRhinoValue('userData');
  const setSnackBarData = useSetRhinoState('snackBarData');
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const handleDeleteClick = () => setIsConfirmDeleteOpen(true);
  const handleDelete = async () => {
    try {
      await deleteQuestion(id);
    } catch (err) {
      setApiError(err);
      return;
    }

    setSnackBarData({ type: 'success', message: 'Question deleted successfully' });
    closeMenu();
    if (onDelete) onDelete();
  };

  return userData?.username === authorUsername ? (
    <>
      <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      <ConfirmDialog
        title="Delete Question ?"
        isOpen={isConfirmDeleteOpen}
        message="Are you sure you want to delete this question"
        onAbort={() => setIsConfirmDeleteOpen(false)}
        onSuccess={handleDelete}
        onClose={() => setIsConfirmDeleteOpen(false)}
        primaryAction="Yes"
        secondaryAction="No"
      />
    </>
  ) : null;
};

const VisitProfile = ({ username }) => {
  const history = useHistory();
  return <MenuItem onClick={() => history.push(`/u/${username}`)}>Visit Profile</MenuItem>;
};

export default QuestionMenu;

import { useState } from 'react';
import { MdDelete } from 'react-icons/md';

import './style.scss';
import Modal from '../../../common/Modal';
import Button from '../../../common/Button';
import TextInput from '../../../common/TextInput';
import { deleteAccount } from '../../../../api/user';
import useApiError from '../../../../hooks/useApiError';
import { passwordRegex } from '../../../../utils/regex';
import { useRhinoState, useSetRhinoState } from '../../../../global/state';

const DeleteAccount = () => {
  const setApiError = useApiError();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const setSnackBarData = useSetRhinoState('snackBarData');
  const [isUserLoggedIn, setIsUserLoggedIn] = useRhinoState('isUserLoggedIn');

  const handleDeleteAccount = async () => {
    if (password === '' || passwordError) return;

    try {
      setIsLoading(true);
      await deleteAccount({ password });
    } catch (err) {
      setApiError(err);
      return;
    } finally {
      setIsLoading(false);
    }

    setIsUserLoggedIn(false);
    setSnackBarData({ type: 'success', message: 'Account Deleted Successfully' });
  };

  return isUserLoggedIn ? (
    <div className="delete-account-card">
      <div className="delete-account-card-top">
        <h3>Account Deletion</h3>
        <p>Once you delete your account, there is no going back. Please be certain.</p>
      </div>
      <Button className="delete-account-button" onClick={() => setIsModalOpen(true)}>
        <div className="icon">
          <MdDelete />
        </div>
        <span>Delete Account</span>
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="delete-account-modal">
          <h1 className="delete-account-title">Delete Account</h1>
          <div className="delete-account-content">
            <p>If you delete your account:</p>
            <ul>
              <li>All your data will be deleted</li>
              <li>All the questions you posted will be deleted</li>
              <li>All the opinions you posted will be deleted</li>
            </ul>
            <p>
              <strong>This action cannot be undone !</strong>
            </p>
          </div>
          <TextInput
            minLength={8}
            maxLength={50}
            type="password"
            value={password}
            error={passwordError}
            pattern={passwordRegex}
            setError={setPasswordError}
            label="Password Confirmation"
            onChange={(e) => setPassword(e.target.value)}
            patternMessage="Password must contain at least an alphabet, a special character and a number"
          />
          <div className="button-group">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button isLoading={isLoading} onClick={handleDeleteAccount}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  ) : null;
};

export default DeleteAccount;

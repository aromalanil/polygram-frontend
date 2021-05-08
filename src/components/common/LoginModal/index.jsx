import { useState } from 'react';

import './style.scss';
import Modal from '../Modal';
import Button from '../Button';
import Snackbar from '../Snackbar';
import TextInput from '../TextInput';
import { loginUser } from '../../../api/user';
import useApiError from '../../../hooks/useApiError';
import { useRhinoState } from '../../../global/state';
import { validatePassword, validateUsername } from '../../../utils/validation';

const LoginModal = () => {
  const [apiErrorMessage, setApiError] = useApiError();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isLoginModalVisible, setLoginModalVisibility] = useRhinoState('isLoginModalVisible');

  const validateForm = () => {
    let isValid = true;
    try {
      validateUsername(username, 'Username', true);
    } catch (err) {
      isValid = false;
      setUsernameError(err.message);
    }
    try {
      validatePassword(password, 'Password', true);
    } catch (err) {
      isValid = false;
      setPasswordError(err.message);
    }

    return isValid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Validating user inputs
    const isFormValid = validateForm();
    if (!isFormValid) return;

    // Calling api for login the user
    try {
      await loginUser({ username, password });
    } catch (err) {
      setApiError(err);
      return;
    }

    setLoginModalVisibility(false);
  };

  const handleModalClose = () => {
    setUsername('');
    setPassword('');
    setUsernameError(null);
    setPasswordError(null);
    setLoginModalVisibility(false);
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(null);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(null);
  };

  return (
    <>
      <Modal isOpen={isLoginModalVisible} onClose={handleModalClose}>
        <div className="login-modal">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit} className="login-form">
            <TextInput
              label="Username"
              value={username}
              error={usernameError}
              onChange={onUsernameChange}
            />
            <TextInput
              type="password"
              label="Password"
              value={password}
              error={passwordError}
              onChange={onPasswordChange}
            />
            <Button type="submit" variant="primary">
              Login
            </Button>
          </form>
        </div>
      </Modal>
      <Snackbar
        type="error"
        autoHideDuration={5000}
        message={apiErrorMessage}
        onClose={() => setApiError(null)}
        isOpen={apiErrorMessage !== ''}
      />
    </>
  );
};

export default LoginModal;

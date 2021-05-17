import { useState } from 'react';

import './style.scss';
import Modal from '../Modal';
import Button from '../Button';
import TextInput from '../TextInput';
import GoogleOAuth from '../GoogleOAuth';
import { loginUser } from '../../../api/user';
import useApiError from '../../../hooks/useApiError';
import { useRhinoState, useSetRhinoState } from '../../../global/state';
import { validatePassword, validateUsername } from '../../../utils/validation';

const LoginModal = () => {
  const setApiError = useApiError();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const setSnackBarData = useSetRhinoState('snackBarData');
  const setIsUserLoggedIn = useSetRhinoState('isUserLoggedIn');
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
      setIsLoading(true);
      await loginUser({ username, password });
    } catch (err) {
      setIsLoading(false);
      setApiError(err);
      return;
    }
    setIsLoading(false);
    setIsUserLoggedIn(true);
    setLoginModalVisibility(false);
    setSnackBarData({ type: 'success', message: 'Successfully Logged in' });
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
          <div className="login-head">
            <h1 className="login-title">Login to Poly</h1>
            <p className="login-subtitle">
              Not a member? <a href="http://localhost:3000">Sign up now</a>
            </p>
          </div>
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
            <p className="forgot-password">
              <a href="https://localhost:3000">Forgot Password?</a>
            </p>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Login
            </Button>
          </form>
          <div className="line-separator">
            <span>OR</span>
          </div>
          <div className="google-login">
            <GoogleOAuth text="Login with Google" onSuccess={handleModalClose} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;

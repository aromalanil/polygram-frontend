import { useMemo, useState } from 'react';

import './style.scss';
import Modal from '../Modal';
import Button from '../Button';
import TextInput from '../TextInput';
import GoogleOAuth from '../GoogleOAuth';
import { loginUser } from '../../../api/user';
import useApiError from '../../../hooks/useApiError';
import { useRhinoState, useSetRhinoState } from '../../../global/state';

const usernameRegex = /^[a-z0-9_-]*$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#?!@$ %^&*-])[A-Za-z\d#?!@$ %^&*-]/;

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

  const isValid = useMemo(() => !usernameError && !passwordError, [usernameError, passwordError]);

  const handleModalClose = () => {
    setUsername('');
    setPassword('');
    setUsernameError(null);
    setPasswordError(null);
    setLoginModalVisibility(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Checking if form has any errors
    if (!isValid) return;

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
    setSnackBarData({ type: 'success', message: 'Successfully Logged in' });
    handleModalClose();
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
              minLength={4}
              maxLength={15}
              label="Username"
              value={username}
              error={usernameError}
              pattern={usernameRegex}
              setError={setUsernameError}
              onChange={(e) => setUsername(e.target.value)}
              patternMessage="Username must only contain small letters, numbers, dashes and underscore"
            />
            <TextInput
              minLength={8}
              maxLength={50}
              type="password"
              label="Password"
              value={password}
              error={passwordError}
              pattern={passwordRegex}
              setError={setPasswordError}
              onChange={(e) => setPassword(e.target.value)}
              patternMessage="Password must contain al teast 1 letter, 1 digit and 1 number"
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

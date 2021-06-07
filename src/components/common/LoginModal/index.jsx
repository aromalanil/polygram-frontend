import { useMemo, useState } from 'react';

import './style.scss';
import Modal from '../Modal';
import Button from '../Button';
import TextInput from '../TextInput';
import GoogleOAuth from '../GoogleOAuth';
import { loginUser } from '../../../api/user';
import useApiError from '../../../hooks/useApiError';
import { passwordRegex, usernameRegex } from '../../../utils/regex';
import { useRhinoState, useSetRhinoState } from '../../../global/state';

const LoginModal = () => {
  const setApiError = useApiError();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const setSnackBarData = useSetRhinoState('snackBarData');
  const setIsUserLoggedIn = useSetRhinoState('isUserLoggedIn');
  const setSignUpModalVisibility = useSetRhinoState('isSignUpModalVisible');
  const setForgetPasswordModalVisibility = useSetRhinoState('isForgetPasswordModalVisible');
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

  const handleSignUpClick = () => {
    setSignUpModalVisibility(true);
    handleModalClose();
  };

  const handleForgetPasswordClick = () => {
    setForgetPasswordModalVisibility(true);
    setLoginModalVisibility(false);
  };

  return (
    <>
      <Modal isOpen={isLoginModalVisible} onClose={handleModalClose}>
        <div className="login-modal">
          <div className="login-head">
            <h1 className="login-title">Login to Poly</h1>
            <p className="login-subtitle">
              Not a member?{' '}
              <span role="link" tabIndex={0} className="link" onClick={handleSignUpClick}>
                Sign up now
              </span>
            </p>
          </div>
          <form onSubmit={handleLoginSubmit} className="login-form">
            <TextInput
              autoFocus
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
              patternMessage="Password must contain at least an alphabet, a special character and a number"
            />
            <span
              role="link"
              tabIndex={0}
              className="link forgot-password"
              onClick={handleForgetPasswordClick}
            >
              Forgot Password?
            </span>
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

import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useSetRhinoState } from '#store';

import { googleOAuth } from '../../../api/user';
import useApiError from '../../../hooks/useApiError';

const GoogleOAuth = ({ text, onSuccess, oAuthType }) => {
  const setApiError = useApiError();
  const [isLoading, setIsLoading] = useState(false);
  const setSnackBarData = useSetRhinoState('snackBarData');
  const setIsUserLoggedIn = useSetRhinoState('isUserLoggedIn');

  const onLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    setIsLoading(true);
    try {
      await googleOAuth({ token, type: oAuthType });
    } catch (err) {
      setApiError(err);
      return;
    } finally {
      setIsLoading(false);
    }

    setIsUserLoggedIn(true);
    setSnackBarData({ type: 'success', message: 'Successfully Logged in' });
    if (onSuccess) onSuccess();
  };

  const onLoginFailure = () => {
    setIsLoading(false);
    setApiError('Google authentication failed');
  };

  // Calculate the standard text for the GoogleLogin button
  const buttonText =
    text?.toLowerCase().includes('signup') || text?.toLowerCase().includes('register')
      ? 'signup_with'
      : 'signin_with';

  return (
    <div
      className={`google-oauth-container ${isLoading ? 'loading' : ''}`}
      style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
    >
      <GoogleLogin
        onSuccess={onLoginSuccess}
        onError={onLoginFailure}
        text={buttonText}
        size="large"
        theme="outline"
      />
    </div>
  );
};

export default GoogleOAuth;

import { useState } from 'react';
import { useGoogleLogin } from 'react-google-login';

import './style.scss';
import { googleOAuth } from '../../../api/user';
import useApiError from '../../../hooks/useApiError';
import { useSetRhinoState } from '../../../global/state';
import googleLogo from '../../../assets/images/google_logo.svg';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleOAuth = ({ text, onSuccess }) => {
  const setApiError = useApiError();
  const [isLoading, setIsLoading] = useState(false);
  const setIsUserLoggedIn = useSetRhinoState('isUserLoggedIn');

  const onLoginSuccess = async (res) => {
    const { tokenId: token } = res;
    try {
      await googleOAuth({ token });
    } catch (err) {
      setApiError(err);
      return;
    }
    setIsUserLoggedIn(true);
    if (onSuccess) onSuccess();
  };

  const onLoginFailure = () => {
    setIsLoading(false);
    setApiError('Google authentication failed');
  };

  const { signIn } = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onFailure: onLoginFailure,
    clientId: googleClientId,
  });

  const handleClick = (e) => {
    setIsLoading(true);
    signIn(e);
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        className={`google-oauth-btn ${isLoading ? 'loading' : ''}`}
      >
        <div className="logo-wrapper">
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
        </div>
        <span>{text}</span>
      </div>
    </>
  );
};

export default GoogleOAuth;

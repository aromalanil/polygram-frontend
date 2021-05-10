import { useGoogleLogin } from 'react-google-login';

import './style.scss';
import googleLogo from '../../../assets/images/google_logo_g.svg';
import Snackbar from '../Snackbar';
import { googleOAuth } from '../../../api/user';
import useApiError from '../../../hooks/useApiError';
import { useSetRhinoState } from '../../../global/state';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleOAuth = ({ text, onSuccess }) => {
  const [errorMessage, setApiError] = useApiError();
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
    setApiError('Google authentication failed');
  };

  const { signIn } = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onFailure: onLoginFailure,
    clientId: googleClientId,
  });

  return (
    <>
      <div role="button" tabIndex={0} className="google-oauth-btn" onClick={signIn}>
        <div className="logo-wrapper">
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
        </div>
        <span>{text}</span>
      </div>
      <Snackbar
        isOpen={errorMessage !== ''}
        message={errorMessage}
        onClose={() => setApiError(null)}
        type="error"
        autoHideDuration={5000}
      />
    </>
  );
};

export default GoogleOAuth;

import './style.scss';
import { useSetRhinoState } from 'react-rhino';

import Button from '../../../common/Button';

const LoginAndSignIn = () => {
  const setLoginModalVisibility = useSetRhinoState('isLoginModalVisible');
  const setSignUpModalVisibility = useSetRhinoState('isSignUpModalVisible');

  const handleLoginClick = () => {
    setLoginModalVisibility(true);
  };

  const handleSignUpClick = () => {
    setSignUpModalVisibility(true);
  };

  return (
    <div className="nav-auth">
      <Button className="auth-btn" variant="secondary" onClick={handleLoginClick}>
        Login
      </Button>
      <Button className="auth-btn" variant="primary" onClick={handleSignUpClick}>
        Sign Up
      </Button>
    </div>
  );
};

export default LoginAndSignIn;

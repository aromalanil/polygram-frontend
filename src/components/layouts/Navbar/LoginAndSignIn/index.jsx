import './style.scss';
import Button from '../../../common/Button';
import { useSetRhinoState } from '../../../../global/state';

const LoginAndSignIn = () => {
  const setLoginModalVisibility = useSetRhinoState('isLoginModalVisible');

  const handleLoginClick = () => {
    setLoginModalVisibility(true);
  };

  return (
    <div className="nav-auth">
      <Button className="auth-btn" variant="secondary" onClick={handleLoginClick}>
        Login
      </Button>
      <Button className="auth-btn" variant="primary">
        Sign Up
      </Button>
    </div>
  );
};

export default LoginAndSignIn;

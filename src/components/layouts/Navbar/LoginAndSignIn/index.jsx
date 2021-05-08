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
      <Button variant="secondary" onClick={handleLoginClick}>
        Login
      </Button>
      <Button variant="primary">Sign Up</Button>
    </div>
  );
};

export default LoginAndSignIn;

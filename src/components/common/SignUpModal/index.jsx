import { useMemo, useState } from 'react';

import './style.scss';
import Modal from '../Modal';
import Button from '../Button';
import OtpModal from '../OtpModal';
import TextInput from '../TextInput';
import GoogleOAuth from '../GoogleOAuth';
import useApiError from '../../../hooks/useApiError';
import { makeObjectFromArray } from '../../../utils/common';
import { registerUser, verifyUser } from '../../../api/user';
import { useRhinoState, useSetRhinoState } from '../../../global/state';

const usernameRegex = /^[a-z0-9_-]*$/;
const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#?!@$ %^&*-])[A-Za-z\d#?!@$ %^&*-]/;

const signUpInputFields = [
  'email',
  'username',
  'password',
  'last_name',
  'first_name',
  'confirm_password',
];

const SignUpModal = () => {
  const setApiError = useApiError();
  const [isLoading, setIsLoading] = useState(false);
  const setSnackBarData = useSetRhinoState('snackBarData');
  const setIsUserLoggedIn = useSetRhinoState('isUserLoggedIn');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const setLoginModalVisibility = useSetRhinoState('isLoginModalVisible');
  const [isSignUpModalVisible, setSignUpModalVisibility] = useRhinoState('isSignUpModalVisible');

  // An object with names of each input field as keys  and value ''
  const [inputs, setInputs] = useState(makeObjectFromArray(signUpInputFields, ''));

  // An object with names of each input field as keys and value null
  const [errors, setErrors] = useState(makeObjectFromArray(signUpInputFields, null));

  // isValid will be false if any entries of error object is not null
  const isValid = useMemo(() => Object.values(errors).every((error) => error === null), [errors]);

  const handleModalClose = () => {
    setInputs(makeObjectFromArray(signUpInputFields, ''));
    setErrors(makeObjectFromArray(signUpInputFields, null));
    setSignUpModalVisibility(false);
  };

  const handleInputChange = (inputName) => (e) => {
    setInputs((initialValues) => ({ ...initialValues, [inputName]: e.target.value }));
  };

  const setSingleError = (inputName) => (error) => {
    setErrors((initialErrors) => ({ ...initialErrors, [inputName]: error }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    // Checking if form has any errors
    if (!isValid) return;

    // Checking if confirm password match
    if (inputs.password !== inputs.confirm_password) {
      setSingleError('confirm_password')('Password does not match');
      return;
    }

    // Calling api for Registering the user
    try {
      setIsLoading(true);
      await registerUser(inputs);
    } catch (err) {
      setIsLoading(false);
      setApiError(err);
      return;
    }
    setIsOtpModalVisible(true);
    setIsLoading(false);
  };

  const handleVerify = async (otp) => {
    try {
      await verifyUser({ otp, username: inputs.username });
      return true;
    } catch (err) {
      setApiError(err);
      return false;
    }
  };

  const handleResendOTP = async () => {
    try {
      await registerUser(inputs);
      setSnackBarData({ type: 'success', message: 'A new OTP has been send' });
      return true;
    } catch (err) {
      setApiError(err);
      return false;
    }
  };

  const handleVerificationSuccess = () => {
    setIsUserLoggedIn(true);
    setSnackBarData({ type: 'success', message: 'Account created successfully' });
    handleModalClose();
  };

  const handleLoginClick = () => {
    setLoginModalVisibility(true);
    handleModalClose();
  };

  return (
    <>
      <Modal isOpen={isSignUpModalVisible} onClose={handleModalClose}>
        <div className="sign-up-modal">
          <div className="sign-up-head">
            <h1 className="sign-up-title">Sign Up for Poly</h1>
            <p className="sign-up-subtitle">
              Already a member?{' '}
              <span className="link" onClick={handleLoginClick} role="link" tabIndex={0}>
                Login now
              </span>
            </p>
          </div>
          <form onSubmit={handleSignUpSubmit} className="sign-up-form">
            <div className="name-row">
              <TextInput
                autoFocus
                minLength={3}
                maxLength={30}
                label="First Name"
                className="first-name"
                error={errors.first_name}
                value={inputs.first_name}
                setError={setSingleError('first_name')}
                onChange={handleInputChange('first_name')}
              />
              <TextInput
                minLength={0}
                maxLength={30}
                label="Last Name"
                className="last-name"
                error={errors.last_name}
                value={inputs.last_name}
                setError={setSingleError('last_name')}
                onChange={handleInputChange('last_name')}
              />
            </div>
            <TextInput
              minLength={4}
              maxLength={15}
              label="Username"
              error={errors.username}
              value={inputs.username}
              pattern={usernameRegex}
              setError={setSingleError('username')}
              onChange={handleInputChange('username')}
              patternMessage="Username must only contain small letters, numbers, dashes and underscore"
            />
            <TextInput
              minLength={5}
              maxLength={50}
              label="Email"
              value={inputs.email}
              error={errors.email}
              pattern={emailRegex}
              setError={setSingleError('email')}
              onChange={handleInputChange('email')}
              patternMessage="Please enter a valid email"
            />
            <TextInput
              minLength={8}
              maxLength={50}
              type="password"
              label="Password"
              value={inputs.password}
              error={errors.password}
              pattern={passwordRegex}
              setError={setSingleError('password')}
              onChange={handleInputChange('password')}
              patternMessage="Password must contain at least an alphabet, a special character and a number"
            />
            <TextInput
              minLength={8}
              maxLength={50}
              type="password"
              label="Confirm Password"
              value={inputs.confirm_password}
              error={errors.confirm_password}
              setError={setSingleError('confirm_password')}
              onChange={handleInputChange('confirm_password')}
            />
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Sign Up
            </Button>
          </form>
          <div className="line-separator">
            <span>OR</span>
          </div>
          <div className="google-sign-up">
            <GoogleOAuth text="Sign Up with Google" onSuccess={handleModalClose} />
          </div>
        </div>
        <OtpModal
          resendOtp={handleResendOTP}
          onSubmit={handleVerify}
          onSuccess={handleVerificationSuccess}
          isOpen={isOtpModalVisible}
          email={inputs.email}
          onClose={() => setIsOtpModalVisible(false)}
        />
      </Modal>
    </>
  );
};

export default SignUpModal;

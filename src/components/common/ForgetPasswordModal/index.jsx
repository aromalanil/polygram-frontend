import { useMemo, useState } from 'react';
import { useRhinoState, useSetRhinoState } from 'react-rhino';

import './style.scss';
import Modal from '../Modal';
import Button from '../Button';
import OtpModal from '../OtpModal';
import TextInput from '../TextInput';
import useApiError from '../../../hooks/useApiError';
import { makeObjectFromArray } from '../../../utils/common';
import { forgotPassword, sendOtp } from '../../../api/user';
import { emailRegex, passwordRegex } from '../../../utils/regex';

const forgetPasswordInputFields = ['email', 'password', 'confirm_password'];

const ForgetPasswordModal = () => {
  const setApiError = useApiError();
  const [isLoading, setIsLoading] = useState(false);
  const setSnackBarData = useSetRhinoState('snackBarData');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const setSignUpModalVisibility = useSetRhinoState('isSignUpModalVisible');
  const [isForgetPasswordModalVisible, setForgetPasswordModalVisibility] = useRhinoState(
    'isForgetPasswordModalVisible'
  );

  // An object with names of each input field as keys  and value ''
  const [inputs, setInputs] = useState(makeObjectFromArray(forgetPasswordInputFields, ''));

  // An object with names of each input field as keys and value null
  const [errors, setErrors] = useState(makeObjectFromArray(forgetPasswordInputFields, null));

  // isValid will be false if any entries of error object is not null
  const isValid = useMemo(() => Object.values(errors).every((error) => error === null), [errors]);

  const handleModalClose = () => {
    setInputs(makeObjectFromArray(forgetPasswordInputFields, ''));
    setErrors(makeObjectFromArray(forgetPasswordInputFields, null));
    setForgetPasswordModalVisibility(false);
  };

  const handleInputChange = (inputName) => (e) => {
    setInputs((initialValues) => ({ ...initialValues, [inputName]: e.target.value }));
  };

  const setSingleError = (inputName) => (error) => {
    setErrors((initialErrors) => ({ ...initialErrors, [inputName]: error }));
  };

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();

    // Checking if form has any errors
    if (!isValid) return;

    // Checking if confirm password match
    if (inputs.password !== inputs.confirm_password) {
      setSingleError('confirm_password')('Password does not match');
      return;
    }

    // Calling api for sending OTP
    try {
      setIsLoading(true);
      await sendOtp(inputs.email);
    } catch (err) {
      setIsLoading(false);
      setApiError(err);
      return;
    }
    setIsOtpModalVisible(true);
    setIsLoading(false);
  };

  // Calling api for forget password
  const handleVerify = async (otp) => {
    try {
      await forgotPassword({
        email: inputs.email,
        new_password: inputs.confirm_password,
        otp,
      });
      return true;
    } catch (err) {
      setApiError(err);
      return false;
    }
  };

  const handleResendOTP = async () => {
    try {
      await sendOtp(inputs.email);
      setSnackBarData({ type: 'success', message: 'A new OTP has been send' });
      return true;
    } catch (err) {
      setApiError(err);
      return false;
    }
  };

  const handleVerificationSuccess = () => {
    setSnackBarData({ type: 'success', message: 'Password changed successfully' });
    handleModalClose();
  };

  const handleSignUpClick = () => {
    setSignUpModalVisibility(true);
    handleModalClose();
  };
  return (
    <>
      <Modal isOpen={isForgetPasswordModalVisible} onClose={handleModalClose}>
        <div className="forget-password-modal">
          <div className="forget-password-head">
            <h1 className="forget-password-title">Forgot Password</h1>
            <p className="forget-password-subtitle">
              Not a member?{' '}
              <span className="link" onClick={handleSignUpClick} role="link" tabIndex={0}>
                Sign Up now
              </span>
            </p>
          </div>
          <form onSubmit={handleForgetPasswordSubmit} className="forget-password-form">
            <TextInput
              autoFocus
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
              label="New Password"
              value={inputs.password}
              error={errors.password}
              pattern={passwordRegex}
              setError={setSingleError('password')}
              onChange={handleInputChange('password')}
              patternMessage="Password must contain at least 1 alphabet, special character and number"
            />
            <TextInput
              minLength={8}
              maxLength={50}
              type="password"
              label="Confirm New Password"
              value={inputs.confirm_password}
              error={errors.confirm_password}
              setError={setSingleError('confirm_password')}
              onChange={handleInputChange('confirm_password')}
            />
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Reset Password
            </Button>
          </form>
        </div>
      </Modal>
      <OtpModal
        resendOtp={handleResendOTP}
        onSubmit={handleVerify}
        onSuccess={handleVerificationSuccess}
        isOpen={isOtpModalVisible}
        email={inputs.email}
        onClose={() => setIsOtpModalVisible(false)}
      />
    </>
  );
};

export default ForgetPasswordModal;

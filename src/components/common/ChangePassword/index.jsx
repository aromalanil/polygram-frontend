import { useState } from 'react';
import { useSetRhinoState } from 'react-rhino';

import './style.scss';
import Button from '../Button';
import TextInput from '../TextInput';
import { changePassword } from '../../../api/user';
import { passwordRegex } from '../../../utils/regex';
import useApiError from '../../../hooks/useApiError';
import { makeObjectFromArray } from '../../../utils/common';

const changePasswordInputs = ['old_password', 'new_password', 'confirm_password'];

const ChangePassword = ({ onSuccess }) => {
  const setApiError = useApiError();
  const [isLoading, setIsLoading] = useState(false);
  const setSnackBarData = useSetRhinoState('snackBarData');

  // An object with names of each input field as keys  and value ''
  const [inputs, setInputs] = useState(makeObjectFromArray(changePasswordInputs, ''));

  // An object with names of each input field as keys and value null
  const [errors, setErrors] = useState(makeObjectFromArray(changePasswordInputs, null));

  const handleInputChange = (inputName) => (e) => {
    setInputs((initialValues) => ({ ...initialValues, [inputName]: e.target.value }));
  };

  const setSingleError = (inputName) => (error) => {
    setErrors((initialErrors) => ({ ...initialErrors, [inputName]: error }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // isValid will be false if any entries of error object is not null
    const isValid = Object.values(errors).every((error) => error === null);

    // Checking if form has any errors
    if (!isValid) return;

    // Checking if confirm password match
    if (inputs.new_password !== inputs.confirm_password) {
      setSingleError('confirm_password')('Password does not match');
      return;
    }

    // Calling api for Registering the user
    try {
      setIsLoading(true);
      await changePassword(inputs);
    } catch (err) {
      setIsLoading(false);
      setApiError(err);
      return;
    }

    setIsLoading(false);
    setSnackBarData({ type: 'success', message: 'Password Changed Successfully' });
    if (onSuccess) onSuccess();
  };

  return (
    <form className="edit-password">
      <h3>Change Password</h3>
      <TextInput
        minLength={8}
        maxLength={50}
        type="password"
        label="Current Password"
        value={inputs.old_password}
        error={errors.old_password}
        pattern={passwordRegex}
        setError={setSingleError('old_password')}
        onChange={handleInputChange('old_password')}
        patternMessage="Password must contain at least an alphabet, a special character and a number"
      />
      <TextInput
        minLength={8}
        maxLength={50}
        type="password"
        label="New Password"
        value={inputs.new_password}
        error={errors.new_password}
        pattern={passwordRegex}
        setError={setSingleError('new_password')}
        onChange={handleInputChange('new_password')}
        patternMessage="Password must contain at least an alphabet, a special character and a number"
      />
      <TextInput
        minLength={8}
        maxLength={50}
        type="password"
        label="Confirm Password"
        value={inputs.confirm_password}
        error={errors.confirm_password}
        pattern={passwordRegex}
        setError={setSingleError('confirm_password')}
        onChange={handleInputChange('confirm_password')}
        patternMessage="Password must contain at least an alphabet, a special character and a number"
      />
      <Button isLoading={isLoading} type="submit" onClick={handleChangePassword}>
        Change Password
      </Button>
    </form>
  );
};

export default ChangePassword;

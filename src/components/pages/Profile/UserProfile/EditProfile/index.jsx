import { useState } from 'react';

import './style.scss';
import Modal from '../../../../common/Modal';
import Button from '../../../../common/Button';
import TextArea from '../../../../common/TextArea';
import TextInput from '../../../../common/TextInput';
import { editDetails } from '../../../../../api/user';
import useApiError from '../../../../../hooks/useApiError';
import { useSetRhinoState } from '../../../../../global/state';
import ChangePassword from '../../../../common/ChangePassword';
import { filterObject, makeObjectFromArray } from '../../../../../utils/common';

const editDetailsFields = ['last_name', 'first_name', 'bio'];

const EditProfile = ({ isOpen, onClose }) => {
  const setApiError = useApiError();
  const setUserData = useSetRhinoState('userData');
  const [isLoading, setIsLoading] = useState(false);
  const setSnackBarData = useSetRhinoState('snackBarData');

  // An object with names of each input field as keys  and value ''
  const [inputs, setInputs] = useState(makeObjectFromArray(editDetailsFields, ''));

  // An object with names of each input field as keys and value null
  const [errors, setErrors] = useState(makeObjectFromArray(editDetailsFields, null));

  const handleInputChange = (inputName) => (e) => {
    setInputs((initialValues) => ({ ...initialValues, [inputName]: e.target.value }));
  };

  const setSingleError = (inputName) => (error) => {
    setErrors((initialErrors) => ({ ...initialErrors, [inputName]: error }));
  };

  const handleEditDetails = async (e) => {
    e.preventDefault();

    // isValid will be false if any entries of error object is not null
    const isValid = Object.values(errors).every((error) => error === null);

    // Checking if form has any errors
    if (!isValid) return;

    setIsLoading(true);

    // Calling api for Updating user details
    const updatedEntries = filterObject(inputs, '');
    try {
      await editDetails(updatedEntries);
    } catch (err) {
      setIsLoading(false);
      setApiError(err);
      return;
    }

    setUserData((oldUserData) => ({ ...oldUserData, ...updatedEntries }));
    setSnackBarData({ type: 'success', message: 'Details updated successfully' });
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="edit-profile-wrapper">
        <form className="edit-details">
          <h3>Edit Details</h3>
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
          <TextArea
            label="Bio"
            minLength={5}
            maxLength={60}
            className="bio"
            error={errors.bio}
            value={inputs.bio}
            setError={setSingleError('bio')}
            onChange={handleInputChange('bio')}
          />
          <Button isLoading={isLoading} type="submit" onClick={handleEditDetails}>
            Update Details
          </Button>
        </form>
        <ChangePassword />
      </div>
    </Modal>
  );
};

export default EditProfile;

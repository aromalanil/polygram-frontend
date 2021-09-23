import { useCallback } from 'react';
import { useSetRhinoState } from 'react-rhino';

import useApiError from './useApiError';
import { logoutUser } from '../api/user';

const useLogoutUser = () => {
  const setApiError = useApiError();
  const setSnackBarData = useSetRhinoState('snackBarData');
  const setIsUserLoggedIn = useSetRhinoState('isUserLoggedIn');

  const logout = useCallback(async () => {
    // Calling api for logout the user
    try {
      await logoutUser();
      localStorage.setItem('isUserSubscribed', false);
      setIsUserLoggedIn(false);
      setSnackBarData({ type: 'success', message: 'Successfully Logged out' });
    } catch (err) {
      setApiError(err);
    }
  }, [setApiError, setIsUserLoggedIn, setSnackBarData]);

  return logout;
};

export default useLogoutUser;

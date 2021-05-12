import { useCallback, useEffect } from 'react';
import { useSetRhinoState } from '../global/state';
import { findIfUserIsLoggedIn } from '../api/user';

const useIsUserLoggedIn = () => {
  const setIsUserLoggedIn = useSetRhinoState('isUserLoggedIn');

  const updateUserDetails = useCallback(async () => {
    // Getting user details from backend
    let isUserLoggedIn = false;
    try {
      isUserLoggedIn = await findIfUserIsLoggedIn();
    } catch (err) {
      // Logging out user as we can't get user details
      return setIsUserLoggedIn(false);
    }

    return setIsUserLoggedIn(isUserLoggedIn);
  }, [setIsUserLoggedIn]);

  useEffect(() => {
    updateUserDetails();
  }, [updateUserDetails]);
};

export default useIsUserLoggedIn;

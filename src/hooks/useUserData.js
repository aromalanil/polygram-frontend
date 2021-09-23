import { useCallback, useEffect } from 'react';
import { useRhinoValue, useSetRhinoState } from 'react-rhino';

import { getUserData } from '../api/user';

const useUserData = () => {
  const setUserData = useSetRhinoState('userData');
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');

  const updateUserData = useCallback(
    async (_isUserLoggedIn) => {
      if (_isUserLoggedIn) {
        let userData;
        try {
          userData = await getUserData();
          setUserData(userData ?? null);
        } catch (err) {
          console.log('Unable to get user details'); // eslint-disable-line
        }
      } else {
        setUserData(null);
      }
    },
    [setUserData]
  );

  useEffect(() => {
    updateUserData(isUserLoggedIn);
  }, [isUserLoggedIn, updateUserData]);
};

export default useUserData;

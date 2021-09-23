import { useCallback } from 'react';
import { useRhinoValue, useSetRhinoState } from 'react-rhino';

/**
 *
 * Custom hook which returns a function which modifies any function
 * in such a way that only the logged in user can use it.
 * @returns A function which modifies event handler functions
 */
const useProtectedFunction = () => {
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');
  const setLoginModalVisible = useSetRhinoState('isLoginModalVisible');

  /**
   *
   * A Higher order function which modifies any function in such a way that
   * only the logged in user can use it.
   * @param functionToProtect The function to be protected from logged out user
   * @returns Modified function which will only triggers when called by logged in user
   */
  const protectFunction = useCallback(
    (functionToProtect) => (...args) => {
      if (isUserLoggedIn) {
        functionToProtect(...args);
      } else {
        setLoginModalVisible(true);
      }
    },
    [isUserLoggedIn, setLoginModalVisible]
  );

  return protectFunction;
};

export default useProtectedFunction;

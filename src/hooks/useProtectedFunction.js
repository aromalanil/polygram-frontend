import { useCallback } from 'react';
import { useRhinoValue, useSetRhinoState } from '../global/state';

/**
 *
 * Custom hook which returns a protectFunction() function which
 * modifies any event handler in such a way that it only triggers
 * if user is logged in
 * @returns A function which modifies event handler functions
 */
const useProtectedFunction = () => {
  const isUserLoggedIn = useRhinoValue('isUserLoggedIn');
  const setLoginModalVisible = useSetRhinoState('isLoginModalVisible');

  /**
   *
   * A Higher order function which modifies the event in such a way that
   * only the logged in user can use it.
   * @param eventHandler Any event handler function
   * @returns Modified event handler which will only trigger if user is logged in
   */
  const protectFunction = useCallback(
    (eventHandler) => (...args) => {
      if (isUserLoggedIn) {
        eventHandler(...args);
      } else {
        setLoginModalVisible(true);
      }
    },
    [isUserLoggedIn, setLoginModalVisible]
  );

  return protectFunction;
};

export default useProtectedFunction;

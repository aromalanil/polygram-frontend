import { useSetRhinoState } from '../global/state';

const getErrorMessageFromStatusCode = (statusCode) => {
  switch (statusCode) {
    case 400:
      return 'You entered invalid data.';
    case 401:
    case 403:
      return 'Access Denied';
    case 404:
      return 'Not Found';
    case 409:
      return 'Conflict occurred in server';
    case 500:
      return 'Some error ocurred in server';
    default:
      throw new Error('Invalid status code');
  }
};

const useApiError = () => {
  const setSnackBarData = useSetRhinoState('snackBarData');

  const setApiErrorMessage = (message) => {
    setSnackBarData(() => ({ type: 'error', message }));
  };

  const setApiError = (err) => {
    if (err === null) {
      return setApiErrorMessage(null);
    }

    if (typeof err === 'string') {
      return setApiErrorMessage(err);
    }

    // If error is returned from server set that error
    let errorFromServer = err?.response?.data?.error?.message;
    if (errorFromServer) {
      return setApiErrorMessage(errorFromServer);
    }

    // Setting error from status code
    if (err?.response?.status) {
      errorFromServer = getErrorMessageFromStatusCode(err.response.status);
      return setApiErrorMessage(errorFromServer);
    }

    // Setting error if device is offline
    if (!navigator.onLine) {
      return setApiErrorMessage('You are currently offline');
    }

    return setApiErrorMessage('Please check your network connection.');
  };

  return setApiError;
};

export default useApiError;

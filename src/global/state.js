import createRhinoState from 'react-rhino';

const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = createRhinoState({
  userData: null,
  isUserLoggedIn: false,
  isDeviceOffline: false,
  isLoginModalVisible: false,
  isSignInModalVisible: false,
  snackBarData: { type: 'error', message: null },
});

export { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState };

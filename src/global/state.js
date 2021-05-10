import createRhinoState from 'react-rhino';

const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = createRhinoState({
  isUserLoggedIn: false,
  isDeviceOffline: false,
  isLoginModalVisible: false,
  isSignInModalVisible: false,
});

export { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState };

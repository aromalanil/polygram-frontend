import createRhinoState from 'react-rhino';

const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = createRhinoState({
  isUserLoggedIn: false,
  isDeviceOffline: false,
  isLoginModalVisible: true,
  isSignInModalVisible: false,
});

export { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState };

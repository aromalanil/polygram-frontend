import createRhinoState from 'react-rhino';

const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = createRhinoState({
  isUserLoggedIn: false,
  isSignInPopupVisible: false,
});

export { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState };

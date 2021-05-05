import createRhinoState from 'react-rhino';

const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = createRhinoState({
  isUserLoggedIn: true,
  isSignInPopupVisible: false,
});

export { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState };

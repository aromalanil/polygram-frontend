import createRhinoState from 'react-rhino';
import { getInitialTheme } from '../utils/theme';

const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = createRhinoState({
  userData: null,
  isUserLoggedIn: false,
  isDeviceOffline: false,
  theme: getInitialTheme(),
  isLoginModalVisible: false,
  isSignInModalVisible: false,
  snackBarData: { type: 'error', message: null },
});

export { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState };

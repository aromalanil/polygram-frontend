import { createRhinoStore } from 'react-rhino';
import { getInitialTheme } from '../utils/theme';

const store = {
  userData: null,
  notificationCount: 0,
  isUserLoggedIn: false,
  isDeviceOffline: false,
  theme: getInitialTheme(),
  isLoginModalVisible: false,
  isSignUpModalVisible: false,
  isForgetPasswordModalVisible: false,
  snackBarData: { type: 'error', message: null },
};

export const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } =
  createRhinoStore(store);

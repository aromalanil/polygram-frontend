import api from './config';

export const loginUser = async ({ username, password }) =>
  api.post('/users/login', { username, password });

export const logoutUser = async () => api.post('/users/logout');

export const googleOAuth = async ({ token }) => api.post('/users/auth/google', { token });

export const getUserData = async (username) => {
  const userData = await api.get(`/users/${username ?? ''}`);
  return userData?.data?.data?.user;
};

export const findIfUserIsLoggedIn = async () => {
  const response = await api.get('/users/is-logged-in');
  return response?.data?.data?.is_user_logged_in;
};

export const registerUser = async ({ email, first_name, last_name, username, password }) =>
  api.post('/users/register', { email, first_name, last_name, username, password });

export const verifyUser = async ({ username, otp }) => api.post('/users/verify', { username, otp });

export const sendOtp = async (email) => api.post('/users/send-otp', { email });

export const forgotPassword = async ({ email, new_password, otp }) =>
  api.post('/users/forgot-password', { email, new_password, otp });

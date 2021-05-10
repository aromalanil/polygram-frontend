import api from './config';

export const loginUser = async ({ username, password }) =>
  api.post('/users/login', { username, password });

export const googleOAuth = async ({ token }) => api.post('/users/auth/google', { token });

export const getLoggedInUserDetails = async () => {
  const userDetails = await api.get('/users/');
  return userDetails?.data?.data?.user;
};

export const findIfUserIsLoggedIn = async () => {
  const response = await api.get('/users/is-logged-in');
  return response?.data?.data?.is_user_logged_in;
};

export const logoutUser = async () => {
  const response = await api.post('/users/logout');
  return response.json;
};

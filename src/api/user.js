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

import api from './config';

export const loginUser = async ({ username, password }) =>
  api.post('/users/login', { username, password });

export const logoutUser = async () => api.post('/users/logout');

export const googleOAuth = async ({ token, type }) =>
  api.post('/users/auth/google', { token, type });

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

export const changePassword = async ({ old_password, new_password }) =>
  api.post('/users/change-password', { old_password, new_password });

export const editDetails = async ({ first_name, last_name, bio }) =>
  api.post('/users/edit', { first_name, last_name, bio });

export const updateProfilePicture = async (image) => {
  const response = await api.post('/users/profile_picture', { image });
  return response?.data?.data?.profile_picture;
};

export const deleteAccount = async ({ password }) => api.post('/users/account', { password });

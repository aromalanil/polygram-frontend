import api from './config';

export const loginUser = async ({ username, password }) => {
  const response = await api.post('/users/login', { username, password });
  return response.json;
};

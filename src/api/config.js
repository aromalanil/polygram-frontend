import axios from 'axios';

const apiOrigin = import.meta.env.REACT_APP_API_ORIGIN;

const api = axios.create({
  baseURL: `${apiOrigin}/api`,
  withCredentials: true,
});

export default api;

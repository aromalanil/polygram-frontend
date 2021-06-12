import api from './config';

export const getLinkPreview = async (url) => {
  const response = await api.get('/utils/link-preview', {
    params: { url },
  });
  return response?.data?.data;
};

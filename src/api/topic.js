import api from './config';

export const getTopics = async ({ search, limit = 5, before_id }) => {
  const response = await api.get('/topics', {
    params: { search, page_size: limit, before_id },
  });
  return response?.data?.data?.topics;
};

export const getTrendingTopics = async ({ limit = 5 }) => {
  const response = await api.get('/topics/trending', {
    params: { page_size: limit },
  });
  return response?.data?.data?.topics;
};

export const followTopics = async ({ topics }) => api.post('/topics/follow', { topics });

export const unfollowTopics = async ({ topics }) => api.post('/topics/unfollow', { topics });

import api from './config';

export const getTopics = async ({ search, includeCount, limit = 5 }) => {
  const response = await api.get('/topics', {
    params: { search, page_size: limit, count: includeCount },
  });
  return response?.data?.data?.topics;
};

export const followTopics = async ({ topics }) => api.post('/topics/follow', { topics });

export const unfollowTopics = async ({ topics }) => api.post('/topics/unfollow', { topics });

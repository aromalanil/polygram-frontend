import api from './config';

export const markVote = async ({ question_id, content, option }) =>
  api.post('/opinions', { question_id, content, option });

export const getOpinions = async ({ question_id, before_id, after_id }) => {
  if (!question_id) throw new Error(`question_id cannot be ${question_id}`);
  const response = await api.get('/opinions', {
    params: {
      after_id,
      before_id,
      question_id,
      page_size: 5,
    },
  });
  return response?.data?.opinions;
};

export const deleteOpinion = async (id) => api.delete(`/opinions/${id}`);

export const addVote = async ({ type, opinion_id }) => {
  if (!['upvote', 'downvote'].includes(type)) throw new Error('Invalid type');

  const response = await api.post(`/opinions/${opinion_id}/${type}`);
  return response?.data?.data;
};

export const removeVote = async ({ type, opinion_id }) => {
  if (!['upvote', 'downvote'].includes(type)) throw new Error('Invalid type');

  const response = await api.delete(`/opinions/${opinion_id}/${type}`);
  return response?.data?.data;
};

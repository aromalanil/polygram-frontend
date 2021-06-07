import api from './config';

export const createQuestion = async ({ title, content, topics, options }) =>
  api.post('/questions', { title, content, topics, options });

export const getSingleQuestion = async ({ id }) => {
  const response = await api.get(`/questions/${id}`);
  return response?.data?.data?.question;
};

export const getQuestions = async ({ following, topic, user_id, before_id, after_id, search }) => {
  const response = await api.get('/questions', {
    params: {
      topic,
      search,
      user_id,
      after_id,
      before_id,
      following,
      page_size: 5,
    },
  });
  return response?.data?.questions;
};

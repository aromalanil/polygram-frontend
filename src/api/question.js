import api from './config';

export const getQuestions = async ({ following, topic, before_id, after_id, search }) => {
  const response = await api.get('/questions', {
    params: {
      topic,
      search,
      after_id,
      before_id,
      following,
      page_size: 5,
    },
  });
  return response?.data?.questions;
};

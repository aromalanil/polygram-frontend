import api from './config';

export const getNotifications = async ({ limit = 5, before_id } = {}) => {
  const response = await api.get('/notifications', {
    params: { page_size: limit, before_id },
  });
  return response?.data?.data?.notifications;
};

export const deleteNotification = async (notification_id) =>
  api.delete(`/notifications/${notification_id}`);

export const getNotificationCount = async () => {
  const response = await api.get('/notifications/count');
  return response?.data?.data?.count;
};

export const updateMarkAsRead = async ({ notificationId, has_read }) =>
  api.post(`/notifications/${notificationId}/has-read`, { has_read });

export const markAllNotificationsAsRead = async () => api.post('/notifications/mark-all-as-read');

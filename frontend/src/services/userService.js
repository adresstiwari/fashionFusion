import api from './api';

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.put('/users/change-password', passwordData);
    return response.data;
  },

  // Add address
  addAddress: async (addressData) => {
    const response = await api.post('/users/addresses', addressData);
    return response.data;
  },

  // Update address
  updateAddress: async (addressId, addressData) => {
    const response = await api.put(`/users/addresses/${addressId}`, addressData);
    return response.data;
  },

  // Delete address
  deleteAddress: async (addressId) => {
    const response = await api.delete(`/users/addresses/${addressId}`);
    return response.data;
  },

  // Set default address
  setDefaultAddress: async (addressId) => {
    const response = await api.put(`/users/addresses/${addressId}/default`);
    return response.data;
  },

  // Get wishlist
  getWishlist: async () => {
    const response = await api.get('/users/wishlist');
    return response.data;
  },

  // Add to wishlist
  addToWishlist: async (productId) => {
    const response = await api.post('/users/wishlist', { productId });
    return response.data;
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    const response = await api.delete(`/users/wishlist/${productId}`);
    return response.data;
  },

  // Get order history
  getOrderHistory: async () => {
    const response = await api.get('/users/orders');
    return response.data;
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    const response = await api.get(`/users/orders/${orderId}`);
    return response.data;
  },

  // Request order cancellation
  cancelOrder: async (orderId, reason) => {
    const response = await api.post(`/users/orders/${orderId}/cancel`, { reason });
    return response.data;
  },

  // Request return
  requestReturn: async (orderId, returnData) => {
    const response = await api.post(`/users/orders/${orderId}/return`, returnData);
    return response.data;
  },

  // Track order
  trackOrder: async (orderId) => {
    const response = await api.get(`/users/orders/${orderId}/track`);
    return response.data;
  },

  // Get notifications
  getNotifications: async () => {
    const response = await api.get('/users/notifications');
    return response.data;
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    const response = await api.put(`/users/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async () => {
    const response = await api.put('/users/notifications/read-all');
    return response.data;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    const response = await api.delete(`/users/notifications/${notificationId}`);
    return response.data;
  },

  // Get user preferences
  getPreferences: async () => {
    const response = await api.get('/users/preferences');
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  }
};
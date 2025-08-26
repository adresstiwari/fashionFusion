import api from './api';

export const authService = {
  // Set auth token for requests
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },

  // Remove auth token
  removeAuthToken: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post(
      '/auth/login',
      { email, password },
      { withCredentials: true }   // ✅ ensure cookies/JWT work across Netlify <-> Render
    );
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post(
      '/auth/register',
      userData,
      { withCredentials: true }
    );
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me', {
      withCredentials: true
    });
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post(
      '/auth/forgot-password',
      { email },
      { withCredentials: true }
    );
    return response.data;
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await api.post(
      `/auth/reset-password/${token}`,
      { password },
      { withCredentials: true }
    );
    return response.data;
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData, {
      withCredentials: true
    });
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put(
      '/auth/change-password',
      { currentPassword, newPassword },
      { withCredentials: true }
    );
    return response.data;
  }
};

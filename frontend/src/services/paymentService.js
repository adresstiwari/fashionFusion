import api from './api';

export const paymentService = {
  // Create Razorpay order
  createRazorpayOrder: async (amount) => {
    const response = await api.post('/payments/create-order', { amount });
    return response.data;
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    const response = await api.post('/payments/verify', paymentData);
    return response.data;
  },

  // Get payment methods
  getPaymentMethods: async () => {
    const response = await api.get('/payments/methods');
    return response.data;
  },

  // Save payment method
  savePaymentMethod: async (paymentMethodData) => {
    const response = await api.post('/payments/methods', paymentMethodData);
    return response.data;
  },

  // Get saved payment methods
  getSavedPaymentMethods: async () => {
    const response = await api.get('/payments/saved-methods');
    return response.data;
  },

  // Delete payment method
  deletePaymentMethod: async (methodId) => {
    const response = await api.delete(`/payments/methods/${methodId}`);
    return response.data;
  }
};
import api from './api';

export const paymentService = {
  async createPaymentIntent(orderData) {
    const response = await api.post('/payments/create-intent', orderData);
    return response.data;
  },

  async confirmPayment(paymentId) {
    const response = await api.post('/payments/confirm', { paymentId });
    return response.data;
  },

  async createRazorpayOrder(orderData) {
    const response = await api.post('/payments/razorpay/create-order', orderData);
    return response.data;
  },

  async verifyRazorpayPayment(paymentData) {
    const response = await api.post('/payments/razorpay/verify', paymentData);
    return response.data;
  }
};
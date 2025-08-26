import api from './api';

export const cartService = {
  async getCart() {
    const response = await api.get('/cart');
    return response.data;
  },

  async addToCart(productId, quantity = 1, size = '', color = '') {
    const response = await api.post('/cart/add', {
      productId,
      quantity,
      size,
      color
    });
    return response.data;
  },

  async updateCartItem(itemId, quantity) {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  async removeFromCart(itemId) {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  },

  async clearCart() {
    const response = await api.delete('/cart');
    return response.data;
  }
};
// src/services/cartService.js
import api from './api';

export const cartService = {
  async getCart() {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  },

  async addToCart(productId, quantity = 1, size = '', color = '') {
    try {
      const response = await api.post('/cart', {
        productId,
        quantity,
        size,
        color
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  async updateCartItem(itemId, quantity) {
    try {
      const response = await api.put(`/cart/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  async removeFromCart(itemId) {
    try {
      const response = await api.delete(`/cart/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  async clearCart() {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};
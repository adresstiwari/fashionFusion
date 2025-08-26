import api from './api';

const cartService = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      // Handle specific error cases - don't throw for expected errors
      if (error.response?.status === 401) {
        // User not logged in - return empty cart
        console.log('User not authenticated, returning empty cart');
        return [];
      }
      if (error.response?.status === 404) {
        // Cart doesn't exist yet - return empty array (this is normal)
        console.log('Cart not found (404), returning empty cart');
        return [];
      }
      // Only throw for unexpected errors
      if (error.response?.status >= 500) {
        throw error;
      }
      return []; // Return empty array for other client errors
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart', {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message);
      }
      // Don't throw for 401/404 - these are handled elsewhere
      if (error.response?.status === 401 || error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/${itemId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message);
      }
      if (error.response?.status === 401 || error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/cart/${itemId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  }
};

export default cartService;
import api from './api';

export const productService = {
  async getProducts(queryParams = '') {
    try {
      const url = queryParams ? `/products?${queryParams}` : '/products';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async getProduct(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  },

  async searchProducts(query) {
    try {
      const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching products with query "${query}":`, error);
      return [];
    }
  },

  async getProductsByCategory(category, queryParams = '') {
    try {
      const url = queryParams 
        ? `/products/category/${category}?${queryParams}` 
        : `/products/category/${category}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category "${category}":`, error);
      return [];
    }
  },

  async addToWishlist(productId) {
    try {
      const response = await api.post('/wishlist/add', { productId });
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  async removeFromWishlist(productId) {
    try {
      const response = await api.delete(`/wishlist/remove/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  async getWishlist() {
    try {
      const response = await api.get('/wishlist');
      return response.data;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return [];
    }
  },

  async getCategories() {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
};

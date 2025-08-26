import api from './api';

export const productService = {
  async getProducts(queryParams = '') {
    const url = queryParams ? `/products?${queryParams}` : '/products';
    const response = await api.get(url);
    return response.data;
  },

  async getProduct(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async searchProducts(query) {
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  async getProductsByCategory(category, queryParams = '') {
    const url = queryParams 
      ? `/products/category/${category}?${queryParams}` 
      : `/products/category/${category}`;
    const response = await api.get(url);
    return response.data;
  },

  async addToWishlist(productId) {
    const response = await api.post('/wishlist/add', { productId });
    return response.data;
  },

  async removeFromWishlist(productId) {
    const response = await api.delete(`/wishlist/remove/${productId}`);
    return response.data;
  },

  async getWishlist() {
    const response = await api.get('/wishlist');
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  }
};
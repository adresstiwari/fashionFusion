import api from './api';

export const adminService = {
  // Dashboard
  async getDashboardStats() {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  // Products
  async getProducts(params = {}) {
    const response = await api.get('/admin/products', { params });
    return response.data;
  },

  async getProduct(id) {
    const response = await api.get(`/admin/products/${id}`);
    return response.data;
  },

  async addProduct(productData) {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  },

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/admin/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Categories
  async getCategories() {
    const response = await api.get('/admin/categories');
    return response.data;
  },

  async createCategory(categoryData) {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  },

  async updateCategory(id, categoryData) {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  },

  // Orders
  async getOrders(params = {}) {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },

  async getOrder(id) {
    const response = await api.get(`/admin/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id, statusData) {
    const response = await api.put(`/admin/orders/${id}/status`, statusData);
    return response.data;
  },

  // Users
  async getUsers(params = {}) {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  async getUser(id) {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  async updateUserRole(id, roleData) {
    const response = await api.put(`/admin/users/${id}/role`, roleData);
    return response.data;
  },

  async updateUserStatus(id, statusData) {
    const response = await api.put(`/admin/users/${id}/status`, statusData);
    return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  }
};
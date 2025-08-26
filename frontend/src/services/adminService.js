import api from './api';

export const adminService = {
  // Products
  getProducts: async () => {
    const response = await api.get('/admin/products');
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  addProduct: async (productData) => {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  },

  // Users
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getUser: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await api.put(`/admin/users/${id}`, { role });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Orders
  getOrders: async () => {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  getOrder: async (id) => {
    const response = await api.get(`/admin/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id, statusData) => {
    const response = await api.put(`/admin/orders/${id}`, statusData);
    return response.data;
  },

  // Uploads
  uploadImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  }
};

// import api from './api';

// export const adminService = {
//   // Dashboard stats
//   getDashboardStats: async () => {
//     const response = await api.get('/admin/dashboard/stats');
//     return response.data;
//   },

//   // Get all products
//   getProducts: async (filters = {}) => {
//     const params = new URLSearchParams(filters);
//     const response = await api.get(`/admin/products?${params}`);
//     return response.data;
//   },

//   // Get single product
//   getProduct: async (productId) => {
//     const response = await api.get(`/admin/products/${productId}`);
//     return response.data;
//   },

//   // Create product
//   createProduct: async (productData) => {
//     const response = await api.post('/admin/products', productData);
//     return response.data;
//   },

//   // Update product
//   updateProduct: async (productId, productData) => {
//     const response = await api.put(`/admin/products/${productId}`, productData);
//     return response.data;
//   },

//   // Delete product
//   deleteProduct: async (productId) => {
//     const response = await api.delete(`/admin/products/${productId}`);
//     return response.data;
//   },

//   // Upload product image
//   uploadImage: async (file) => {
//     const formData = new FormData();
//     formData.append('image', file);
    
//     const response = await api.post('/admin/upload/image', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   },

//   // Get all orders
//   getOrders: async (filters = {}) => {
//     const params = new URLSearchParams(filters);
//     const response = await api.get(`/admin/orders?${params}`);
//     return response.data;
//   },

//   // Get order details
//   getOrder: async (orderId) => {
//     const response = await api.get(`/admin/orders/${orderId}`);
//     return response.data;
//   },

//   // Update order status
//   updateOrderStatus: async (orderId, statusData) => {
//     const response = await api.put(`/admin/orders/${orderId}/status`, statusData);
//     return response.data;
//   },

//   // Update tracking info
//   updateTrackingInfo: async (orderId, trackingData) => {
//     const response = await api.put(`/admin/orders/${orderId}/tracking`, trackingData);
//     return response.data;
//   },

//   // Get all users
//   getUsers: async (filters = {}) => {
//     const params = new URLSearchParams(filters);
//     const response = await api.get(`/admin/users?${params}`);
//     return response.data;
//   },

//   // Get user details
//   getUser: async (userId) => {
//     const response = await api.get(`/admin/users/${userId}`);
//     return response.data;
//   },

//   // Update user role
//   updateUserRole: async (userId, roleData) => {
//     const response = await api.put(`/admin/users/${userId}/role`, roleData);
//     return response.data;
//   },

//   // Delete user
//   deleteUser: async (userId) => {
//     const response = await api.delete(`/admin/users/${userId}`);
//     return response.data;
//   },

//   // Get all categories
//   getCategories: async () => {
//     const response = await api.get('/admin/categories');
//     return response.data;
//   },

//   // Create category
//   createCategory: async (categoryData) => {
//     const response = await api.post('/admin/categories', categoryData);
//     return response.data;
//   },

//   // Update category
//   updateCategory: async (categoryId, categoryData) => {
//     const response = await api.put(`/admin/categories/${categoryId}`, categoryData);
//     return response.data;
//   },

//   // Delete category
//   deleteCategory: async (categoryId) => {
//     const response = await api.delete(`/admin/categories/${categoryId}`);
//     return response.data;
//   },

//   // Get sales reports
//   getSalesReports: async (period = 'monthly') => {
//     const response = await api.get(`/admin/reports/sales?period=${period}`);
//     return response.data;
//   },

//   // Get customer reports
//   getCustomerReports: async () => {
//     const response = await api.get('/admin/reports/customers');
//     return response.data;
//   }
// };
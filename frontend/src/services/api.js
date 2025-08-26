import axios from 'axios';
import { showNotification } from '../utils/notification';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  
  withCredentials: true,
});




// Request interceptor to add auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const method = error.config?.method || '';
    const status = error.response?.status;
    
    // Don't show notification for these cases
    const shouldSkipNotification = (
      // Cart 404 errors (expected behavior)
      (url.includes('/cart') && status === 404) ||
      // Authentication errors (handled by redirect)
      status === 401 ||
      // Specific endpoints that might return expected errors
      (url.includes('/products/category') && status === 404) ||
      // Options preflight requests
      method === 'options'
    );
    
    if (!shouldSkipNotification && status && status >= 400) {
      const message = error.response?.data?.message || 'An error occurred';
      showNotification(message, 'error');
    }
    
    // Handle 401 errors with redirect
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;
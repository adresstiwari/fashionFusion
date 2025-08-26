// src/config/environment.js
const getApiBaseUrl = () => {
  if (import.meta.env.MODE === 'production') {
    return import.meta.env.VITE_API_BASE_URL || 'https://your-backend-url.onrender.com/api';
  }
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
};

export const config = {
  apiBaseUrl: getApiBaseUrl(),
  appName: import.meta.env.VITE_APP_NAME || 'FashionFusion'
};
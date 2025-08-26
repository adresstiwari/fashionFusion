// src/config/environment.js
const getApiBaseUrl = () => {
  if (import.meta.env.MODE === 'production') {
    // Use production backend URL from Netlify environment variables
    return import.meta.env.VITE_API_BASE_URL || 'https://fashionfusion-g78z.onrender.com/api';
  }
  // Use local backend URL in development
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
};

export const config = {
  apiBaseUrl: getApiBaseUrl(),
  appName: import.meta.env.VITE_APP_NAME || 'FashionFusion'
};

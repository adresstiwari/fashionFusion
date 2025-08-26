import axios from "axios";
import { showNotification } from "../utils/notification";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ from .env / Netlify
  withCredentials: true,
});

// Request interceptor to add auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    const method = error.config?.method || "";
    const status = error.response?.status;

    const shouldSkipNotification =
      (url.includes("/cart") && status === 404) || // Cart 404 errors
      status === 401 || // Authentication errors
      (url.includes("/products/category") && status === 404) || // Category 404
      method === "options"; // Preflight requests

    if (!shouldSkipNotification && status && status >= 400) {
      const message =
        error.response?.data?.message || "An error occurred";
      showNotification(message, "error");
    }

    // Handle 401 errors with redirect
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;

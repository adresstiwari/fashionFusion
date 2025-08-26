import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useNotification } from './NotificationContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.setAuthToken(token);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      authService.removeAuthToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { token, ...userData } = response;
      
      localStorage.setItem('token', token);
      authService.setAuthToken(token);
      setUser(userData);
      
      addNotification({
        type: 'success',
        title: 'Login Successful',
        message: 'Welcome back to FashionFusion!'
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: message
      });
      
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { token, ...user } = response;
      
      localStorage.setItem('token', token);
      authService.setAuthToken(token);
      setUser(user);
      
      addNotification({
        type: 'success',
        title: 'Registration Successful',
        message: 'Your account has been created successfully!'
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message: message
      });
      
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authService.removeAuthToken();
    setUser(null);
    
    addNotification({
      type: 'success',
      message: 'Logged out successfully'
    });
  };

  const updateProfile = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
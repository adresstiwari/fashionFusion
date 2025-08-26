import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user && user.role === 'admin') {
    return children;
  }

  // Redirect to login page if not authenticated or not an admin
  return <Navigate to="/login" replace />;
};

export default AdminRoute;
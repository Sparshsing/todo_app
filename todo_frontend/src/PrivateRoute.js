import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // console.log('route auth', isAuthenticated());
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
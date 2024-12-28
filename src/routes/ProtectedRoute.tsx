import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  console.log('user', user);

  // If user is not logged in, redirect to register (or login) page
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedRoute;

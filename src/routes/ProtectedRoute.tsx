import { useAppSelector } from '@/app/store';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.user);
  console.log('user', user);

  // If user is not logged in, redirect to register (or login) page
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedRoute;

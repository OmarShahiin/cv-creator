// PublicOnlyRoute.js
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem('user') || null;
  // If user IS logged in, redirect to "/" (or /home, up to you)
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If user is NOT logged in, allow access to this route
  return children;
};

export default PublicOnlyRoute;

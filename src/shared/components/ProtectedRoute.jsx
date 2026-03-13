import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles = [], requireKYC = true }) => {
  const { user, isAuthenticated, loading, needsKYC } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireKYC && needsKYC && location.pathname !== '/kyc') {
    return <Navigate to="/kyc" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

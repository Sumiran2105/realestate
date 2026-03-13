import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import Login from '@/features/auth/pages/Login';
import OTPVerification from '@/features/auth/pages/OTPVerification';
import Register from '@/features/auth/pages/Register';
import ResetPassword from '@/features/auth/pages/ResetPassword';

export function renderAuthRoutes({ user, getDashboardPath }) {
  return [
    <Route key="/verify-otp" path="/verify-otp" element={<OTPVerification />} />,
    <Route
      key="/login"
      path="/login"
      element={!user ? <Login /> : <Navigate to={getDashboardPath(user.role)} replace />}
    />,
    <Route
      key="/register"
      path="/register"
      element={!user ? <Register /> : <Navigate to={getDashboardPath(user.role)} replace />}
    />,
    <Route key="/forgot-password" path="/forgot-password" element={<ForgotPassword />} />,
    <Route key="/reset-password" path="/reset-password" element={<ResetPassword />} />,
  ];
}

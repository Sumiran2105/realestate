import React from 'react';
import { Routes } from 'react-router-dom';

import { renderAuthRoutes } from '@/app/routes/authRoutes';
import { renderBuyerRoutes } from '@/app/routes/buyerRoutes';
import { renderDashboardRoutes } from '@/app/routes/dashboardRoutes';
import { renderFallbackRoutes } from '@/app/routes/fallbackRoutes';
import { renderPublicRoutes } from '@/app/routes/publicRoutes';

export const getDashboardPath = (role) => {
  switch (role) {
    case 'agent':
      return '/dashboard/agent';
    case 'seller':
      return '/dashboard/seller';
    case 'admin':
      return '/dashboard/admin';
    case 'buyer':
      return '/buyer/home';
    default:
      return '/';
  }
};

export default function AppRoutes({ user }) {
  return (
    <Routes>
      {renderPublicRoutes()}
      {renderAuthRoutes({ user, getDashboardPath })}
      {renderBuyerRoutes()}
      {renderDashboardRoutes({ user, getDashboardPath })}
      {renderFallbackRoutes()}
    </Routes>
  );
}

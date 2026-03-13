import React from 'react';
import { Routes } from 'react-router-dom';

import { renderAuthRoutes } from '@/app/routes/groups/authRoutes';
import { renderBuyerRoutes } from '@/app/routes/groups/buyerRoutes';
import { renderDashboardRoutes } from '@/app/routes/groups/dashboardRoutes';
import { renderFallbackRoutes } from '@/app/routes/groups/fallbackRoutes';
import { renderPublicRoutes } from '@/app/routes/groups/publicRoutes';

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

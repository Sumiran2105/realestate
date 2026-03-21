import React from 'react';
import { Routes } from 'react-router-dom';

import { renderAuthRoutes } from '@/app/routes/authRoutes';
import { renderBuyerRoutes } from '@/app/routes/buyerRoutes';
import { renderDashboardRoutes } from '@/app/routes/dashboardRoutes';
import { renderFallbackRoutes } from '@/app/routes/fallbackRoutes';
import { renderPublicRoutes } from '@/app/routes/publicRoutes';
import { getDashboardPath } from '@/shared/utils/dashboard';

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

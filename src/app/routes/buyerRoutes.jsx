import React from 'react';
import { Route } from 'react-router-dom';

import BuyerHome from '@/features/buyer/pages/BuyerHome';
import BuyerProfile from '@/features/buyer/pages/BuyerProfile';
import BuyerPropertyView from '@/features/buyer/pages/BuyerPropertyView';
import Wishlist from '@/features/properties/pages/Wishlist';
import ProtectedRoute from '@/shared/components/ProtectedRoute';

export function renderBuyerRoutes() {
  return [
    <Route
      key="/wishlist"
      path="/wishlist"
      element={
        <ProtectedRoute allowedRoles={['buyer']}>
          <Wishlist />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/buyer/home"
      path="/buyer/home"
      element={
        <ProtectedRoute allowedRoles={['buyer']}>
          <BuyerHome />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/buyer/profile"
      path="/buyer/profile"
      element={
        <ProtectedRoute allowedRoles={['buyer']}>
          <BuyerProfile />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/buyer/property/:id"
      path="/buyer/property/:id"
      element={
        <ProtectedRoute allowedRoles={['buyer']}>
          <BuyerPropertyView />
        </ProtectedRoute>
      }
    />,
  ];
}

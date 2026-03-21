import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import AdminDashboard from '@/dashboards/admin/pages/AdminDashboard';
import AdminKYC from '@/dashboards/admin/pages/AdminKYC';
import AdminProperties from '@/dashboards/admin/pages/AdminProperties';
import AdminReports from '@/dashboards/admin/pages/AdminReports';
import AdminSettings from '@/dashboards/admin/pages/AdminSettings';
import AdminUsers from '@/dashboards/admin/pages/AdminUsers';
import AgentAnalytics from '@/dashboards/agent/pages/AgentAnalytics';
import AgentDashboard from '@/dashboards/agent/pages/AgentDashboard';
import AgentInquiries from '@/dashboards/agent/pages/AgentInquiries';
import AgentLeads from '@/dashboards/agent/pages/AgentLeads';
import AgentListings from '@/dashboards/agent/pages/AgentListings';
import AgentProfile from '@/dashboards/agent/pages/AgentProfile';
import AgentTransactions from '@/dashboards/agent/pages/AgentTransactions';
import AddProperty from '@/dashboards/seller/pages/AddProperty';
import SellerDashboard from '@/dashboards/seller/pages/SellerDashboard';
import SellerInquiries from '@/dashboards/seller/pages/SellerInquiries';
import SellerProfile from '@/dashboards/seller/pages/SellerProfile';
import SellerProperties from '@/dashboards/seller/pages/SellerProperties';
import SellerPropertyView from '@/dashboards/seller/pages/SellerPropertyView';
import KYCVerification from '@/features/kyc/pages/KYCVerification';
import ProtectedRoute from '@/shared/components/ProtectedRoute';

export function renderDashboardRoutes({ user, getDashboardPath }) {
  return [
    <Route
      key="/kyc"
      path="/kyc"
      element={
        <ProtectedRoute requireKYC={false}>
          <KYCVerification />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/agent"
      path="/dashboard/agent"
      element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AgentDashboard />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/agent/listings"
      path="/dashboard/agent/listings"
      element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AgentListings />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/agent/leads"
      path="/dashboard/agent/leads"
      element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AgentLeads />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/agent/analytics"
      path="/dashboard/agent/analytics"
      element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AgentAnalytics />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/agent/profile"
      path="/dashboard/agent/profile"
      element={
        <ProtectedRoute allowedRoles={['agent']} requireKYC={false}>
          <AgentProfile />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/agent/inquiries"
      path="/dashboard/agent/inquiries"
      element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AgentInquiries />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/agent/transactions"
      path="/dashboard/agent/transactions"
      element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AgentTransactions />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/seller"
      path="/dashboard/seller"
      element={
        <ProtectedRoute allowedRoles={['seller']}>
          <SellerDashboard />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/builder"
      path="/dashboard/builder"
      element={
        <ProtectedRoute allowedRoles={['builder']}>
          <SellerDashboard />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/seller/properties"
      path="/dashboard/seller/properties"
      element={
        <ProtectedRoute allowedRoles={['seller']}>
          <SellerProperties />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/builder/properties"
      path="/dashboard/builder/properties"
      element={
        <ProtectedRoute allowedRoles={['builder']}>
          <SellerProperties />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/seller/properties/:id"
      path="/dashboard/seller/properties/:id"
      element={
        <ProtectedRoute allowedRoles={['seller']}>
          <SellerPropertyView />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/builder/properties/:id"
      path="/dashboard/builder/properties/:id"
      element={
        <ProtectedRoute allowedRoles={['builder']}>
          <SellerPropertyView />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/seller/add-property"
      path="/dashboard/seller/add-property"
      element={
        <ProtectedRoute allowedRoles={['seller']}>
          <AddProperty />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/builder/add-property"
      path="/dashboard/builder/add-property"
      element={
        <ProtectedRoute allowedRoles={['builder']}>
          <AddProperty />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/seller/profile"
      path="/dashboard/seller/profile"
      element={
        <ProtectedRoute allowedRoles={['seller']} requireKYC={false}>
          <SellerProfile />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/builder/profile"
      path="/dashboard/builder/profile"
      element={
        <ProtectedRoute allowedRoles={['builder']} requireKYC={false}>
          <SellerProfile />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/seller/inquiries"
      path="/dashboard/seller/inquiries"
      element={
        <ProtectedRoute allowedRoles={['seller']}>
          <SellerInquiries />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/builder/inquiries"
      path="/dashboard/builder/inquiries"
      element={
        <ProtectedRoute allowedRoles={['builder']}>
          <SellerInquiries />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/admin"
      path="/dashboard/admin"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/admin/kyc"
      path="/dashboard/admin/kyc"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminKYC />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/admin/properties"
      path="/dashboard/admin/properties"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminProperties />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/admin/users"
      path="/dashboard/admin/users"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminUsers />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/admin/settings"
      path="/dashboard/admin/settings"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminSettings />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard/admin/reports"
      path="/dashboard/admin/reports"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminReports />
        </ProtectedRoute>
      }
    />,
    <Route
      key="/dashboard"
      path="/dashboard"
      element={
        <ProtectedRoute>
          {user ? <Navigate to={getDashboardPath(user.role)} replace /> : <Navigate to="/login" replace />}
        </ProtectedRoute>
      }
    />,
  ];
}

import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/useAuth';
import AppRoutes from '@/app/routes/AppRoutes';
import Footer from '@/shared/components/Footer';
import Navbar from '@/shared/components/Navbar';
import ScrollToTop from '@/shared/components/ScrollToTop';
import ToastContainer from '@/shared/components/ToastContainer';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

const isDashboardPath = (pathname) =>
  pathname.startsWith('/dashboard') ||
  pathname.startsWith('/kyc');

const isAuthPage = (pathname) =>
  pathname.startsWith('/login') ||
  pathname.startsWith('/register') ||
  pathname.startsWith('/forgot-password') ||
  pathname.startsWith('/reset-password');

const isAgentOrSeller = (user) =>
  user && (user.role === 'agent' || user.role === 'seller' || user.role === 'builder' || user.role === 'admin');

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const hideNavFooter = isAuthPage(location.pathname) || (isDashboardPath(location.pathname) && isAgentOrSeller(user));
  const showNavFooter = !hideNavFooter;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      {showNavFooter && <Navbar />}
      <main className={`flex-grow ${!showNavFooter ? 'pt-0' : ''}`}>
        <ScrollToTop />
        <AppRoutes user={user} />
      </main>
      {showNavFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

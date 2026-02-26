// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';

// // Components
// import Navbar from './components/Navbar';
// import HeroDropdown from './components/HeroDropdown';
// import Footer from './components/Footer';
// import ProtectedRoute from './components/ProtectedRoute';

// // Auth Pages
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import ResetPassword from './pages/auth/ResetPassword';

// // Agent Dashboard Pages
// import AgentDashboard from './pages/dashboard/agent/AgentDashboard';
// import AgentListings from './pages/dashboard/agent/AgentListings';
// import AgentLeads from './pages/dashboard/agent/AgentLeads';
// import AgentAnalytics from './pages/dashboard/agent/AgentAnalytics';

// // Seller Dashboard Pages
// import SellerDashboard from './pages/dashboard/seller/SellerDashboard';
// import SellerProperties from './pages/dashboard/seller/SellerProperties';
// import SellerPropertyView from './pages/dashboard/seller/SellerPropertyView';
// import AddProperty from './pages/dashboard/seller/AddProperty';

// // Existing Pages
// import Home from './pages/Home';
// import About from './pages/About';
// import Properties from './pages/Properties';
// import PropertyDetail from './pages/PropertyDetail';
// import Services from './pages/Services';
// import Contact from './pages/Contact';
// import VerificationReport from './pages/VerificationReport';
// import LegalAssistance from './pages/services/LegalAssistance';
// import VerifyProperty from './pages/services/VerifyProperty';
// import HomeLoan from './pages/services/HomeLoan';
// import RentalAgreements from './pages/services/RentalAgreements';
// import Wishlist from './pages/Wishlist';
// import BuyerHome from './pages/buyer/BuyerHome';
// import BuyerProfile from './pages/buyer/BuyerProfile';
// import BuyerPropertyView from './pages/buyer/BuyerPropertyView';
// import AgentProfile from './pages/dashboard/agent/AgentProfile';
// import AgentInquiries from './pages/dashboard/agent/AgentInquiries';
// import AgentTransactions from './pages/dashboard/agent/AgentTransactions';
// import ScrollToTop from './pages/ScrollToTop';

// // Loading Component
// const LoadingSpinner = () => (
//   <div className="min-h-screen flex items-center justify-center">
//     <div className="text-center">
//       <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//       <p className="mt-4 text-gray-600">Loading...</p>
//     </div>
//   </div>
// );

// // Helper function to check if current path is dashboard or auth related
// const isDashboardPath = (pathname) => {
//   return pathname.startsWith('/dashboard') || 
//          pathname.startsWith('/kyc') || 
//          pathname.startsWith('/login') || 
//          pathname.startsWith('/register') ||
//          pathname.startsWith('/forgot-password') ||
//          pathname.startsWith('/reset-password');
// };

// // Helper function to check if user is agent or seller
// const isAgentOrSeller = (user) => {
//   return user && (user.role === 'agent' || user.role === 'seller');
// };

// function AppContent() {
//   const { user, loading } = useAuth();
//   const location = useLocation();
  
//   // Determine if we should show navbar and footer
//   const shouldShowNavbarFooter = () => {
//     // Don't show on dashboard/kyc/auth pages for agents and sellers
//     if (isDashboardPath(location.pathname) && isAgentOrSeller(user)) {
//       return false;
//     }
//     // Show for all other cases (including buyers on dashboard)
//     return true;
//   };

//   const showNavFooter = shouldShowNavbarFooter();

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       {showNavFooter && <Navbar />}
//       {showNavFooter && <HeroDropdown />}
//       <main className={`flex-grow ${!showNavFooter ? 'pt-0' : ''}`}>
//         <ScrollToTop/>
//         <Routes>
//           {/* Public Routes - Accessible to everyone */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/properties" element={<Properties />} />
//           <Route path="/property/:id" element={<PropertyDetail />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/services/legal-assistance" element={<LegalAssistance />} />
//           <Route path="/services/verify-property" element={<VerifyProperty />} />
//           <Route path="/services/home-loan" element={<HomeLoan />} />
//           <Route path="/services/rental-agreements" element={<RentalAgreements />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/verification-report/:propertyId" element={<VerificationReport />} />
//           <Route path="/wishlist" element={
//             <ProtectedRoute allowedRoles={['buyer']}>
//               <Wishlist />
//             </ProtectedRoute>
//           } />
//           <Route path="/buyer/home" element={
//             <ProtectedRoute allowedRoles={['buyer']}>
//               <BuyerHome />
//             </ProtectedRoute>
//           } />
//           <Route path="/buyer/profile" element={
//             <ProtectedRoute allowedRoles={['buyer']}>
//               <BuyerProfile />
//             </ProtectedRoute>
//           } />
//           <Route path="/buyer/property/:id" element={
//             <ProtectedRoute allowedRoles={['buyer']}>
//               <BuyerPropertyView />
//             </ProtectedRoute>
//           } />
          
//           {/* Auth Routes - Redirect to dashboard if already logged in */}
//           <Route path="/login" element={
//             !user ? <Login /> : <Navigate to={getDashboardPath(user.role)} replace />
//           } />
//           <Route path="/register" element={
//             !user ? <Register /> : <Navigate to={getDashboardPath(user.role)} replace />
//           } />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
          
//           {/* Agent Dashboard Routes - Only agents */}
//           <Route path="/dashboard/agent" element={
//             <ProtectedRoute allowedRoles={['agent']}>
//               <AgentDashboard />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard/agent/listings" element={
//             <ProtectedRoute allowedRoles={['agent']}>
//               <AgentListings />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard/agent/leads" element={
//             <ProtectedRoute allowedRoles={['agent']}>
//               <AgentLeads />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard/agent/analytics" element={
//             <ProtectedRoute allowedRoles={['agent']}>
//               <AgentAnalytics />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard/agent/profile" element={
//             <ProtectedRoute allowedRoles={['agent']}>
//               <AgentProfile />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard/agent/inquiries" element={
//             <ProtectedRoute allowedRoles={['agent']}>
//               <AgentInquiries />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard/agent/transactions" element={
//             <ProtectedRoute allowedRoles={['agent']}>
//               <AgentTransactions />
//             </ProtectedRoute>
//           } />
          
//           {/* Seller Dashboard Routes - Only sellers */}
//           <Route path="/dashboard/seller" element={
//             <ProtectedRoute allowedRoles={['seller']}>
//               <SellerDashboard />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard/seller/properties" element={
//             <ProtectedRoute allowedRoles={['seller']}>
//               <SellerProperties />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard/seller/properties/:id" element={
//             <ProtectedRoute allowedRoles={['seller']}>
//               <SellerPropertyView />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard/seller/add-property" element={
//             <ProtectedRoute allowedRoles={['seller']}>
//               <AddProperty />
//             </ProtectedRoute>
//           } />
          
//           {/* Generic Dashboard Redirect - Based on user role */}
//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               {user ? (
//                 <Navigate to={getDashboardPath(user.role)} replace />
//               ) : (
//                 <Navigate to="/login" replace />
//               )}
//             </ProtectedRoute>
//           } />
          
//           {/* 404 Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//       {showNavFooter && <Footer />}
//     </div>
//   );
// }

// // Helper function to get dashboard path based on role
// const getDashboardPath = (role) => {
//   switch(role) {
//     case 'agent': return '/dashboard/agent';
//     case 'seller': return '/dashboard/seller';
//     case 'buyer': return '/buyer/home';
//     default: return '/';
//   }
// };

// // 404 Not Found Component
// const NotFound = () => (
//   <div className="min-h-[60vh] flex items-center justify-center px-4">
//     <div className="text-center">
//       <h1 className="text-9xl font-bold text-blue-600">404</h1>
//       <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
//       <p className="text-gray-600 mt-2 mb-8">
//         The page you're looking for doesn't exist or has been moved.
//       </p>
//       <a 
//         href="/" 
//         className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//       >
//         Go Back Home
//       </a>
//     </div>
//   </div>
// );

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;




































import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';
import HeroDropdown from './components/HeroDropdown';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// KYC Pages
import KYCVerification from './pages/kyc/KYCVerification';

// Agent Dashboard Pages
import AgentDashboard from './pages/dashboard/agent/AgentDashboard';
import AgentListings from './pages/dashboard/agent/AgentListings';
import AgentLeads from './pages/dashboard/agent/AgentLeads';
import AgentAnalytics from './pages/dashboard/agent/AgentAnalytics';

// Seller Dashboard Pages
import SellerDashboard from './pages/dashboard/seller/SellerDashboard';
import SellerProperties from './pages/dashboard/seller/SellerProperties';
import SellerPropertyView from './pages/dashboard/seller/SellerPropertyView';
import AddProperty from './pages/dashboard/seller/AddProperty';

// Existing Pages
import Home from './pages/Home';
import About from './pages/About';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';
import VerificationReport from './pages/VerificationReport';
import LegalAssistance from './pages/services/LegalAssistance';
import VerifyProperty from './pages/services/VerifyProperty';
import HomeLoan from './pages/services/HomeLoan';
import RentalAgreements from './pages/services/RentalAgreements';
import Wishlist from './pages/Wishlist';
import BuyerHome from './pages/buyer/BuyerHome';
import BuyerProfile from './pages/buyer/BuyerProfile';
import BuyerPropertyView from './pages/buyer/BuyerPropertyView';
import AgentProfile from './pages/dashboard/agent/AgentProfile';
import AgentInquiries from './pages/dashboard/agent/AgentInquiries';
import AgentTransactions from './pages/dashboard/agent/AgentTransactions';
import ScrollToTop from './pages/ScrollToTop';
import OTPVerification from './pages/auth/OTPVerification';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import AdminKYC from './pages/dashboard/admin/AdminKYC';
import AdminProperties from './pages/dashboard/admin/AdminProperties';
import AdminUsers from './pages/dashboard/admin/AdminUsers';
import AdminSettings from './pages/dashboard/admin/AdminSettings';
import AdminReports from './pages/dashboard/admin/AdminReports';

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Helper function to check if current path is dashboard or auth related
const isDashboardPath = (pathname) => {
  return pathname.startsWith('/dashboard') || 
         pathname.startsWith('/kyc') || 
         pathname.startsWith('/login') || 
         pathname.startsWith('/register') ||
         pathname.startsWith('/forgot-password') ||
         pathname.startsWith('/reset-password');
};

// Helper function to check if user is agent or seller
const isAgentOrSeller = (user) => {
  return user && (user.role === 'agent' || user.role === 'seller' || user.role === 'admin');
};

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Determine if we should show navbar and footer
  const shouldShowNavbarFooter = () => {
    // Don't show on dashboard/kyc/auth pages for agents and sellers
    if (isDashboardPath(location.pathname) && isAgentOrSeller(user)) {
      return false;
    }
    // Show for all other cases (including buyers on dashboard)
    return true;
  };

  const showNavFooter = shouldShowNavbarFooter();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showNavFooter && <Navbar />}
      {showNavFooter && <HeroDropdown />}
      <main className={`flex-grow ${!showNavFooter ? 'pt-0' : ''}`}>
        <ScrollToTop/>
        <Routes>
          {/* Public Routes - Accessible to everyone */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/legal-assistance" element={<LegalAssistance />} />
          <Route path="/services/verify-property" element={<VerifyProperty />} />
          <Route path="/services/home-loan" element={<HomeLoan />} />
          <Route path="/services/rental-agreements" element={<RentalAgreements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verification-report/:propertyId" element={<VerificationReport />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/wishlist" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Wishlist />
            </ProtectedRoute>
          } />
          <Route path="/buyer/home" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerHome />
            </ProtectedRoute>
          } />
          <Route path="/buyer/profile" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerProfile />
            </ProtectedRoute>
          } />
          <Route path="/buyer/property/:id" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerPropertyView />
            </ProtectedRoute>
          } />
          
          {/* Auth Routes - Redirect to dashboard if already logged in */}
          <Route path="/login" element={
            !user ? <Login /> : <Navigate to={getDashboardPath(user.role)} replace />
          } />
          <Route path="/register" element={
            !user ? <Register /> : <Navigate to={getDashboardPath(user.role)} replace />
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* KYC Route - Single page for Aadhaar, PAN, and Selfie verification */}
          <Route path="/kyc" element={
            <ProtectedRoute requireKYC={false}>
              <KYCVerification />
            </ProtectedRoute>
          } />
          
          {/* Agent Dashboard Routes - Only agents */}
          <Route path="/dashboard/agent" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/agent/listings" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentListings />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/agent/leads" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentLeads />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/agent/analytics" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/agent/profile" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentProfile />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/agent/inquiries" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentInquiries />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/agent/transactions" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentTransactions />
            </ProtectedRoute>
          } />
          
          {/* Seller Dashboard Routes - Only sellers */}
          <Route path="/dashboard/seller" element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/seller/properties" element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerProperties />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/seller/properties/:id" element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerPropertyView />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/seller/add-property" element={
            <ProtectedRoute allowedRoles={['seller']}>
              <AddProperty />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/admin/kyc" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminKYC />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/admin/properties" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminProperties />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminSettings />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/admin/reports" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminReports />
            </ProtectedRoute>
          } />

          {/* Generic Dashboard Redirect - Based on user role */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              {user ? (
                <Navigate to={getDashboardPath(user.role)} replace />
              ) : (
                <Navigate to="/login" replace />
              )}
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showNavFooter && <Footer />}
    </div>
  );
}

// Helper function to get dashboard path based on role
const getDashboardPath = (role) => {
  switch(role) {
    case 'agent': return '/dashboard/agent';
    case 'seller': return '/dashboard/seller';
    case 'buyer': return '/buyer/home';
    case 'admin': return '/dashboard/admin';
    default: return '/';
  }
};

// 404 Not Found Component
const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a 
        href="/" 
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
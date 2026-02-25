import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const Sidebar = ({ role, isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = {
    agent: [
      { path: '/dashboard/agent', icon: '📊', label: 'Dashboard', exact: true },
      { path: '/dashboard/agent/listings', icon: '🏠', label: 'My Listings' },
      { path: '/dashboard/agent/leads', icon: '👥', label: 'Leads' },
      { path: '/dashboard/agent/analytics', icon: '📈', label: 'Analytics' },
      { path: '/dashboard/agent/transactions', icon: '💰', label: 'Transactions' },
      { path: '/dashboard/agent/profile', icon: '👤', label: 'Profile' }
    ],
    seller: [
      { path: '/dashboard/seller', icon: '📊', label: 'Dashboard', exact: true },
      { path: '/dashboard/seller/properties', icon: '🏠', label: 'My Properties' },
      { path: '/dashboard/seller/add-property', icon: '➕', label: 'Add Property' },
      { path: '/dashboard/seller/inquiries', icon: '💬', label: 'Inquiries' },
      { path: '/dashboard/seller/profile', icon: '👤', label: 'Profile' }
    ],
    buyer: [
      { path: '/dashboard/buyer', icon: '📊', label: 'Dashboard', exact: true },
      { path: '/dashboard/buyer/favorites', icon: '❤️', label: 'Favorites' },
      { path: '/dashboard/buyer/searches', icon: '🔍', label: 'Saved Searches' },
      { path: '/dashboard/buyer/profile', icon: '👤', label: 'Profile' }
    ]
  };

  const currentMenu = menuItems[role] || menuItems.buyer;

  // Custom function to check if link is active
  const isLinkActive = (item) => {
    if (item.exact) {
      // For dashboard, check exact match
      return location.pathname === item.path;
    }
    // For other links, check if the path starts with the link path
    // But make sure it's not just the dashboard path
    return location.pathname.startsWith(item.path) && 
           location.pathname !== `/dashboard/${role}`;
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600">RealEstate<span className="text-gray-800">.ai</span></h1>
        <p className="text-xs text-gray-500 mt-1 capitalize">{role} Dashboard</p>
      </div>

      {/* User Info */}
      <div className="px-4 pb-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">
              {user?.kycStatus === 'completed' ? '✅ Verified' : '⏳ KYC Pending'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {currentMenu.map((item) => {
          const isActive = isLinkActive(item);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2.5 w-full text-red-600 hover:bg-red-50 rounded-lg"
        >
          <span className="mr-3 text-xl">🚪</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <div className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 bottom-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-blue-600">RealEstate<span className="text-gray-800">.ai</span></h1>
              <button 
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 capitalize">{role} Dashboard</p>
          </div>

          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">
                  {user?.kycStatus === 'completed' ? '✅ Verified' : '⏳ KYC Pending'}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {currentMenu.map((item) => {
              const isActive = isLinkActive(item);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                navigate('/');
                handleLinkClick();
              }}
              className="flex items-center px-3 py-2.5 w-full text-gray-700 hover:bg-gray-100 rounded-lg mb-2"
            >
              <span className="mr-3 text-xl">🏠</span>
              <span className="text-sm font-medium">Back to Site</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2.5 w-full text-red-600 hover:bg-red-50 rounded-lg"
            >
              <span className="mr-3 text-xl">🚪</span>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;
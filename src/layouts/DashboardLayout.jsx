import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../pages/dashboard/common/Sidebar';
import Header from '../pages/dashboard/common/Header';

const DashboardLayout = ({ children, title }) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        role={user?.role} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          title={title} 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { getAllProperties, getAllUsers, getPendingKYC } from '../../../utils/adminData';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    pendingKYC: 0,
    verifiedProperties: 0
  });

  useEffect(() => {
    // Load stats
    setStats({
      totalUsers: getAllUsers().length,
      totalProperties: getAllProperties().length,
      pendingKYC: getPendingKYC().length,
      verifiedProperties: getAllProperties().filter(p => p.verificationStatus === 'verified').length
    });
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon="👥" 
            color="bg-blue-100 text-blue-600"
          />
          <StatCard 
            title="Total Properties" 
            value={stats.totalProperties} 
            icon="🏠" 
            color="bg-green-100 text-green-600"
          />
          <StatCard 
            title="Pending KYC" 
            value={stats.pendingKYC} 
            icon="⏳" 
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard 
            title="Verified Properties" 
            value={stats.verifiedProperties} 
            icon="✅" 
            color="bg-purple-100 text-purple-600"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
            <div className="space-y-3">
              {getAllUsers().slice(0, 5).map(user => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.kycStatus === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {user.kycStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Properties */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Properties</h3>
            <div className="space-y-3">
              {getAllProperties().slice(0, 5).map(property => (
                <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{property.title}</p>
                    <p className="text-sm text-gray-600">{property.location}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    property.verificationStatus === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {property.verificationStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
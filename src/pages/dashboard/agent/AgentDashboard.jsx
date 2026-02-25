import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import DashboardLayout from '../../../layouts/DashboardLayout';

const AgentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Leads', value: '156', icon: '👥', color: 'blue' },
    { label: 'Active Listings', value: '23', icon: '🏠', color: 'green' },
    { label: 'Completed Deals', value: '12', icon: '✓', color: 'purple' },
    { label: 'Commission', value: '₹2.45L', icon: '💰', color: 'yellow' }
  ];

  const recentLeads = [
    { name: 'Rahul Sharma', property: '3BHK in Gachibowli', budget: '₹1.2Cr', status: 'hot' },
    { name: 'Priya Patel', property: '2BHK in Hitech City', budget: '₹85L', status: 'warm' },
    { name: 'Amit Kumar', property: 'Villa in Banjara Hills', budget: '₹3.5Cr', status: 'cold' }
  ];

  return (
    <DashboardLayout title="Agent Dashboard">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-600 mt-1">Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Property</th>
                  <th className="pb-3">Budget</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-3 text-sm font-medium text-gray-900">{lead.name}</td>
                    <td className="py-3 text-sm text-gray-600">{lead.property}</td>
                    <td className="py-3 text-sm text-gray-900">{lead.budget}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === 'hot' ? 'bg-red-100 text-red-600' :
                        lead.status === 'warm' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
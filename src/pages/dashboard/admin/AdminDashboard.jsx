import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { getAllProperties, getAllUsers, getPendingKYC } from '../../../utils/adminData';
import { 
  FaUsers, 
  FaHome, 
  FaClock, 
  FaCheckCircle,
  FaUserClock,
  FaShieldAlt,
  FaArrowRight,
  FaChartLine,
  FaBuilding,
  FaFileAlt
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    pendingKYC: 0,
    verifiedProperties: 0,
    activeAgents: 0,
    totalRevenue: '₹45.6L'
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Load stats
    const users = getAllUsers();
    const properties = getAllProperties();
    
    setStats({
      totalUsers: users.length,
      totalProperties: properties.length,
      pendingKYC: getPendingKYC().length,
      verifiedProperties: properties.filter(p => p.verificationStatus === 'verified').length,
      activeAgents: users.filter(u => u.role === 'agent' && u.status !== 'inactive').length,
      totalRevenue: '₹45.6L'
    });

    // Generate recent activities
    const activities = [
      ...users.slice(0, 2).map(u => ({
        id: `u-${u.id}`,
        type: 'user',
        title: u.name,
        description: 'New user registered',
        time: '2 minutes ago',
        icon: '👤',
        color: 'blue',
        path: '/dashboard/admin/users'
      })),
      ...properties.slice(0, 1).map(p => ({
        id: `p-${p.id}`,
        type: 'property',
        title: p.title,
        description: 'New property listed',
        time: '5 minutes ago',
        icon: '🏠',
        color: 'green',
        path: '/dashboard/admin/properties'
      }))
    ];
    setRecentActivities(activities);
  }, []);

  // Navigation cards configuration
  const navigationCards = [
    {
      id: 1,
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers />,
      gradient: 'from-blue-600 to-blue-700',
      hoverGradient: 'from-blue-700 to-blue-800',
      textColor: 'text-white',
      path: '/dashboard/admin/users',
      description: 'Manage all platform users',
      metric: 'Active users'
    },
    {
      id: 2,
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: <FaBuilding />,
      gradient: 'from-emerald-600 to-emerald-700',
      hoverGradient: 'from-emerald-700 to-emerald-800',
      textColor: 'text-white',
      path: '/dashboard/admin/properties',
      description: 'View all property listings',
      metric: 'Listed properties'
    },
    {
      id: 5,
      title: 'Active Agents',
      value: stats.activeAgents,
      icon: <FaShieldAlt />,
      gradient: 'from-rose-600 to-rose-700',
      hoverGradient: 'from-rose-700 to-rose-800',
      textColor: 'text-white',
      path: '/dashboard/admin/users?role=agent',
      description: 'Registered real estate agents',
      metric: 'Active agents'
    },
    {
      id: 6,
      title: 'Total Revenue',
      value: stats.totalRevenue,
      icon: <FaChartLine />,
      gradient: 'from-indigo-600 to-indigo-700',
      hoverGradient: 'from-indigo-700 to-indigo-800',
      textColor: 'text-white',
      path: '/dashboard/admin/reports',
      description: 'View financial reports',
      metric: 'This month'
    }
  ];

  const StatCard = ({ card }) => (
    <div
      onClick={() => navigate(card.path)}
      className={`relative overflow-hidden bg-gradient-to-br ${card.gradient} rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
    >
      {/* Background Pattern */}
      <div className="absolute right-0 top-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className="absolute right-4 top-4 text-7xl">{card.icon}</div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl text-white shadow-lg">
            {card.icon}
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white flex items-center gap-1">
            <span>View</span>
            <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        <p className="text-sm font-medium text-white/80 mb-1">{card.title}</p>
        <p className="text-3xl font-bold text-white mb-2">{card.value}</p>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/70">{card.description}</p>
          <p className="text-xs text-white/50">{card.metric}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/50 rounded-full transition-all duration-500 group-hover:bg-white/70"
            style={{ width: `${Math.min(100, (parseInt(card.value) / 1000) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );

  const ActivityCard = ({ activity }) => (
    <div 
      onClick={() => navigate(activity.path)}
      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm ${
        activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
        activity.color === 'green' ? 'bg-green-100 text-green-600' :
        'bg-purple-100 text-purple-600'
      }`}>
        {activity.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{activity.title}</p>
        <p className="text-xs text-gray-500">{activity.description}</p>
        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
      </div>
      <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 text-xs bg-white rounded-lg shadow-sm hover:bg-gray-50">
        View
      </button>
    </div>
  );

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Header with Welcome Message */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Here's what's happening with your platform today.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/dashboard/admin/reports')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
            >
              <FaFileAlt />
              Generate Report
            </button>
            <button 
              onClick={() => navigate('/dashboard/admin/analytics')}
              className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-200 flex items-center gap-2 text-sm"
            >
              <FaChartLine />
              Analytics
            </button>
          </div>
        </div>

        {/* Navigation Cards Grid - 6 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {navigationCards.map(card => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>

        {/* Charts and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area - Takes 2/3 width */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Platform Overview</h3>
              <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>This year</option>
              </select>
            </div>
            
            {/* Simple Bar Chart Representation */}
            <div className="space-y-4">
              {[
                { label: 'Users', value: 75, color: 'bg-blue-500', path: '/dashboard/admin/users' },
                { label: 'Properties', value: 60, color: 'bg-green-500', path: '/dashboard/admin/properties' },
                { label: 'KYC Completed', value: 45, color: 'bg-yellow-500', path: '/dashboard/admin/kyc' },
                { label: 'Revenue', value: 30, color: 'bg-purple-500', path: '/dashboard/admin/reports' }
              ].map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate(item.path)}
                  className="space-y-1 cursor-pointer group"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 group-hover:text-blue-600 transition-colors">{item.label}</span>
                    <span className="font-medium text-gray-800">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-500 group-hover:opacity-80`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {recentActivities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>

            <button 
              onClick={() => navigate('/dashboard/admin/activity')}
              className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
              View All Activity →
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/dashboard/admin/users')}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg group"
          >
            <div className="flex items-center gap-3">
              <FaUsers size={20} />
              <span className="text-sm font-medium">Manage Users</span>
            </div>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/dashboard/admin/properties')}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg group"
          >
            <div className="flex items-center gap-3">
              <FaBuilding size={20} />
              <span className="text-sm font-medium">Properties</span>
            </div>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/dashboard/admin/kyc')}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg group"
          >
            <div className="flex items-center gap-3">
              <FaUserClock size={20} />
              <span className="text-sm font-medium">KYC Queue</span>
            </div>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/dashboard/admin/reports')}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg group"
          >
            <div className="flex items-center gap-3">
              <FaChartLine size={20} />
              <span className="text-sm font-medium">Reports</span>
            </div>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AdminDashboard;
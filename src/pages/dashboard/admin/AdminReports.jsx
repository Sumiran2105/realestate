import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { 
  FaDownload, 
  FaCalendarAlt, 
  FaFilePdf, 
  FaFileExcel,
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaUsers,
  FaHome,
  FaRupeeSign,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const AdminReports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');
  const [chartType, setChartType] = useState('line');
  const [loading, setLoading] = useState(false);

  // Sample data - In real app, this would come from API
  const overviewData = {
    totalUsers: 1250,
    newUsers: 145,
    activeUsers: 890,
    totalProperties: 567,
    newListings: 78,
    verifiedProperties: 423,
    totalRevenue: '₹45,67,890',
    monthlyRevenue: '₹8,92,345',
    pendingKYC: 23,
    completedDeals: 156
  };

  const userGrowthData = [
    { month: 'Jan', buyers: 65, sellers: 28, agents: 15, admins: 2 },
    { month: 'Feb', buyers: 78, sellers: 32, agents: 18, admins: 2 },
    { month: 'Mar', buyers: 92, sellers: 35, agents: 22, admins: 2 },
    { month: 'Apr', buyers: 88, sellers: 38, agents: 25, admins: 3 },
    { month: 'May', buyers: 102, sellers: 42, agents: 28, admins: 3 },
    { month: 'Jun', buyers: 118, sellers: 45, agents: 32, admins: 3 },
  ];

  const propertyStatsData = [
    { month: 'Jan', listed: 45, sold: 28, verified: 38 },
    { month: 'Feb', listed: 52, sold: 32, verified: 45 },
    { month: 'Mar', listed: 68, sold: 41, verified: 58 },
    { month: 'Apr', listed: 58, sold: 38, verified: 49 },
    { month: 'May', listed: 72, sold: 45, verified: 62 },
    { month: 'Jun', listed: 85, sold: 52, verified: 73 },
  ];

  const revenueData = [
    { month: 'Jan', amount: 425000, transactions: 18 },
    { month: 'Feb', amount: 532000, transactions: 23 },
    { month: 'Mar', amount: 678000, transactions: 28 },
    { month: 'Apr', amount: 589000, transactions: 25 },
    { month: 'May', amount: 745000, transactions: 32 },
    { month: 'Jun', amount: 892000, transactions: 38 },
  ];

  const kycStatusData = [
    { name: 'Verified', value: 845, color: '#10b981' },
    { name: 'Pending', value: 156, color: '#f59e0b' },
    { name: 'Not Started', value: 249, color: '#6b7280' },
  ];

  const propertyTypeData = [
    { name: 'Apartment', value: 245, color: '#3b82f6' },
    { name: 'Villa', value: 156, color: '#8b5cf6' },
    { name: 'Independent House', value: 98, color: '#ec4899' },
    { name: 'Land', value: 45, color: '#14b8a6' },
    { name: 'Commercial', value: 23, color: '#f97316' },
  ];

  const topLocations = [
    { location: 'Banjara Hills', properties: 89, avgPrice: '₹3.2 Cr' },
    { location: 'Gachibowli', properties: 76, avgPrice: '₹2.8 Cr' },
    { location: 'Jubilee Hills', properties: 67, avgPrice: '₹4.1 Cr' },
    { location: 'Hitech City', properties: 54, avgPrice: '₹2.3 Cr' },
    { location: 'Kukatpally', properties: 45, avgPrice: '₹1.5 Cr' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Buyer', action: 'Completed KYC verification', time: '5 mins ago', type: 'kyc' },
    { id: 2, user: 'Sarah Seller', action: 'Listed new property', time: '15 mins ago', type: 'property' },
    { id: 3, user: 'Mike Agent', action: 'Closed a deal', time: '1 hour ago', type: 'deal' },
    { id: 4, user: 'Robert Wilson', action: 'Registered as buyer', time: '2 hours ago', type: 'user' },
    { id: 5, user: 'Priya Sharma', action: 'Uploaded KYC documents', time: '3 hours ago', type: 'kyc' },
  ];

  const handleExport = (format) => {
    setLoading(true);
    // Simulate export
    setTimeout(() => {
      setLoading(false);
      alert(`Report exported as ${format}`);
    }, 1500);
  };

  const StatCard = ({ title, value, icon, change, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <span className={`text-2xl ${color}`}>{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {change && (
          <span className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Reports & Analytics">
      <div className="space-y-6">
        {/* Header with Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h2>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Live
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {/* Date Range Selector */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>

              {/* Export Buttons */}
              <button
                onClick={() => handleExport('PDF')}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 text-sm"
              >
                <FaFilePdf className="mr-2" />
                PDF
              </button>
              <button
                onClick={() => handleExport('Excel')}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 text-sm"
              >
                <FaFileExcel className="mr-2" />
                Excel
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Users" 
            value={overviewData.totalUsers} 
            icon={<FaUsers />}
            change={12.5}
            color="text-blue-600"
          />
          <StatCard 
            title="Total Properties" 
            value={overviewData.totalProperties} 
            icon={<FaHome />}
            change={8.3}
            color="text-green-600"
          />
          <StatCard 
            title="Total Revenue" 
            value={overviewData.totalRevenue} 
            icon={<FaRupeeSign />}
            change={15.2}
            color="text-purple-600"
          />
          <StatCard 
            title="Completed Deals" 
            value={overviewData.completedDeals} 
            icon={<FaCheckCircle />}
            change={23.1}
            color="text-yellow-600"
          />
        </div>

        {/* Report Type Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-wrap gap-2">
            {['overview', 'users', 'properties', 'revenue', 'kyc'].map((type) => (
              <button
                key={type}
                onClick={() => setReportType(type)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  reportType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type} Reports
              </button>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded ${chartType === 'line' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <FaChartLine />
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded ${chartType === 'bar' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <FaChartBar />
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="buyers" stroke="#3b82f6" />
                    <Line type="monotone" dataKey="sellers" stroke="#10b981" />
                    <Line type="monotone" dataKey="agents" stroke="#8b5cf6" />
                  </LineChart>
                ) : (
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="buyers" fill="#3b82f6" />
                    <Bar dataKey="sellers" fill="#10b981" />
                    <Bar dataKey="agents" fill="#8b5cf6" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Statistics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Statistics</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={propertyStatsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="listed" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="verified" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="sold" stackId="3" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="amount" fill="#3b82f6" name="Revenue (₹)" />
                  <Bar yAxisId="right" dataKey="transactions" fill="#10b981" name="Transactions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* KYC Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Status Distribution</h3>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={kycStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {kycStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Locations */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h3>
            <div className="space-y-3">
              {topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{location.location}</p>
                    <p className="text-sm text-gray-600">{location.properties} properties</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{location.avgPrice}</p>
                    <p className="text-xs text-gray-500">Avg. Price</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'kyc' ? 'bg-yellow-100 text-yellow-600' :
                    activity.type === 'property' ? 'bg-green-100 text-green-600' :
                    activity.type === 'deal' ? 'bg-purple-100 text-purple-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'kyc' ? '📄' :
                     activity.type === 'property' ? '🏠' :
                     activity.type === 'deal' ? '💰' : '👤'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
            <h4 className="text-lg font-semibold mb-2">Quick Stats</h4>
            <div className="space-y-2">
              <p>New Users (Today): <span className="font-bold">24</span></p>
              <p>New Listings: <span className="font-bold">12</span></p>
              <p>Pending Verifications: <span className="font-bold">18</span></p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
            <h4 className="text-lg font-semibold mb-2">Performance</h4>
            <div className="space-y-2">
              <p>Conversion Rate: <span className="font-bold">23.5%</span></p>
              <p>Avg. Deal Value: <span className="font-bold">₹45.6L</span></p>
              <p>Success Rate: <span className="font-bold">89%</span></p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <h4 className="text-lg font-semibold mb-2">Platform Health</h4>
            <div className="space-y-2">
              <p>Uptime: <span className="font-bold">99.9%</span></p>
              <p>Response Time: <span className="font-bold">245ms</span></p>
              <p>Active Sessions: <span className="font-bold">156</span></p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
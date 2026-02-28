import React, { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

const AgentAnalytics = () => {
  const [timeframe, setTimeframe] = useState('month');

  const metrics = {
    totalViews: 1245,
    uniqueVisitors: 876,
    inquiries: 89,
    conversionRate: 12.5,
    avgResponseTime: '2.5 hrs',
    deals: 12,
    revenue: 245000
  };

  const monthlyData = [
    { month: 'Jan', views: 450, inquiries: 32, deals: 4 },
    { month: 'Feb', views: 520, inquiries: 38, deals: 5 },
    { month: 'Mar', views: 610, inquiries: 42, deals: 6 },
    { month: 'Apr', views: 580, inquiries: 40, deals: 5 },
    { month: 'May', views: 630, inquiries: 45, deals: 7 },
    { month: 'Jun', views: 700, inquiries: 52, deals: 8 }
  ];

  const topLocations = [
    { name: 'Gachibowli', views: 345, inquiries: 28 },
    { name: 'Hitech City', views: 289, inquiries: 22 },
    { name: 'Banjara Hills', views: 234, inquiries: 18 },
    { name: 'Kukatpally', views: 187, inquiries: 15 },
    { name: 'Madhapur', views: 156, inquiries: 12 }
  ];

  const recentActivities = [
    { action: 'New lead received', description: 'Rahul Sharma interested in 3BHK', time: '5 min ago' },
    { action: 'Property viewed', description: 'Sunshine Apartments got 50 views', time: '1 hour ago' },
    { action: 'Deal closed', description: '2BHK at Gachibowli - ₹85L', time: '3 hours ago' },
    { action: 'New rating', description: '5 stars from Priya Patel', time: '5 hours ago' }
  ];

  return (
    <DashboardLayout title="Analytics">
      {/* Timeframe Selector */}
      <div className="mb-6 flex justify-end">
        <select 
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Total Views</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{metrics.totalViews}</p>
          <p className="text-xs text-green-600 mt-2">↑ 12%</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Inquiries</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{metrics.inquiries}</p>
          <p className="text-xs text-green-600 mt-2">↑ 8%</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Conversion</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{metrics.conversionRate}%</p>
          <p className="text-xs text-green-600 mt-2">↑ 2.5%</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Revenue</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">₹{metrics.revenue/1000}K</p>
          <p className="text-xs text-green-600 mt-2">↑ 15%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h2>
          <div className="h-64 flex items-end justify-between">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex flex-col items-center w-1/6">
                <div className="w-full flex justify-center space-x-1">
                  <div 
                    className="w-2 sm:w-3 bg-blue-500 rounded-t"
                    style={{ height: `${(data.views / 700) * 120}px` }}
                  ></div>
                  <div 
                    className="w-2 sm:w-3 bg-green-500 rounded-t"
                    style={{ height: `${(data.inquiries / 52) * 120}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-xs text-gray-600">Views</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-xs text-gray-600">Inquiries</span>
            </div>
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h2>
          <div className="space-y-4">
            {topLocations.map((loc) => (
              <div key={loc.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{loc.name}</span>
                  <span className="font-medium text-gray-900">{loc.views} views</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(loc.views / 345) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Best Time to Post</p>
              <p className="text-xs text-blue-700 mt-1">Weekends 10 AM - 12 PM have highest engagement</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Popular Property Type</p>
              <p className="text-xs text-green-700 mt-1">3BHK Apartments (45% of all inquiries)</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-900">Average Deal Time</p>
              <p className="text-xs text-purple-700 mt-1">18 days from first contact to closure</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentAnalytics;

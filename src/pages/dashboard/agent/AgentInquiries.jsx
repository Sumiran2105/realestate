import React, { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

const AgentInquiries = () => {
  const [filter, setFilter] = useState('all');
  
  const inquiries = [
    { id: 1, buyer: 'Rajesh Kumar', property: '3BHK Luxury Apartment', message: 'Interested in visiting the property this weekend', date: '2024-01-15', status: 'new', phone: '9876543210', email: 'rajesh.k@email.com' },
    { id: 2, buyer: 'Priya Singh', property: 'Commercial Space', message: 'Need more details about parking and maintenance', date: '2024-01-14', status: 'read', phone: '9876543211', email: 'priya.s@email.com' },
    { id: 3, buyer: 'Amit Sharma', property: 'Independent Villa', message: 'Is the price negotiable? Looking for immediate purchase', date: '2024-01-13', status: 'replied', phone: '9876543212', email: 'amit.s@email.com' },
    { id: 4, buyer: 'Sneha Reddy', property: '2BHK Affordable Flat', message: 'Can we schedule a site visit tomorrow?', date: '2024-01-12', status: 'new', phone: '9876543213', email: 'sneha.r@email.com' },
    { id: 5, buyer: 'Vikram Singh', property: 'Plot in Kukatpally', message: 'Interested in this plot. Need bank loan approval info', date: '2024-01-11', status: 'replied', phone: '9876543214', email: 'vikram.s@email.com' }
  ];

  const filteredInquiries = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-600';
      case 'read': return 'bg-gray-100 text-gray-600';
      case 'replied': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout title="Inquiries">
      {/* Filter Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {['all', 'new', 'read', 'replied'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm capitalize whitespace-nowrap ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {status} ({inquiries.filter(i => status === 'all' ? true : i.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{inquiry.buyer}</h3>
                <p className="text-sm text-gray-600 mt-1">{inquiry.property}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(inquiry.status)}`}>
                {inquiry.status}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-3">{inquiry.message}</p>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-400">{inquiry.date}</p>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Buyer</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Property</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Message</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{inquiry.buyer}</p>
                      <p className="text-sm text-gray-500">{inquiry.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inquiry.property}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{inquiry.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{inquiry.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentInquiries;
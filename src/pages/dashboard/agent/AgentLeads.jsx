import React, { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

const AgentLeads = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [filter, setFilter] = useState('all');
  
  const leads = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.s@email.com', phone: '9876543210', property: '3BHK in Gachibowli', budget: '₹1.2 Cr', status: 'hot', date: '2024-01-15', message: 'Looking for ready-to-move apartment near IT hub' },
    { id: 2, name: 'Priya Patel', email: 'priya.p@email.com', phone: '9876543211', property: '2BHK in Hitech City', budget: '₹85 L', status: 'warm', date: '2024-01-14', message: 'Need property within 5km of office' },
    { id: 3, name: 'Amit Kumar', email: 'amit.k@email.com', phone: '9876543212', property: 'Villa in Banjara Hills', budget: '₹3.5 Cr', status: 'cold', date: '2024-01-13', message: 'Looking for luxury villa with garden' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha.r@email.com', phone: '9876543213', property: 'Commercial Space', budget: '₹2 Cr', status: 'hot', date: '2024-01-12', message: 'Need ground floor commercial space' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.s@email.com', phone: '9876543214', property: 'Plot in Kukatpally', budget: '₹50 L', status: 'warm', date: '2024-01-11', message: 'Looking for residential plot' }
  ];

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'hot': return 'bg-red-100 text-red-600';
      case 'warm': return 'bg-yellow-100 text-yellow-600';
      case 'cold': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-yellow-500';
      case 'cold': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout title="Lead Management">
      {/* Filter Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {['all', 'hot', 'warm', 'cold'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm capitalize whitespace-nowrap ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {status} ({leads.filter(l => status === 'all' ? true : l.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="lg:hidden space-y-4">
        {filteredLeads.map((lead) => (
          <div 
            key={lead.id} 
            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition"
            onClick={() => setSelectedLead(lead)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{lead.property}</p>
                <p className="text-xs text-gray-500 mt-1">{lead.budget}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-400">{lead.date}</p>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table Layout */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Client</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Property</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Budget</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedLead(lead)}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lead.property}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.budget}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.date}</td>
                  <td className="px-6 py-4">
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

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedLead(null)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusBadge(selectedLead.status)}`} />
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{selectedLead.name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedLead.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedLead.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="font-medium text-gray-900">{selectedLead.budget}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Property Interest</p>
                  <p className="font-medium text-gray-900">{selectedLead.property}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Message</p>
                  <p className="text-gray-900">{selectedLead.message}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Lead Date</p>
                  <p className="text-gray-900">{selectedLead.date}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Contact Client
                  </button>
                  <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AgentLeads;
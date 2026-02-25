import React, { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

const AgentTransactions = () => {
  const [filter, setFilter] = useState('all');
  
  const transactions = [
    { id: 'TRX001', property: '3BHK Luxury Apartment', client: 'Rahul Sharma', amount: '₹1,20,00,000', commission: '₹1,20,000', date: '2024-01-15', status: 'completed' },
    { id: 'TRX002', property: '2BHK Affordable Flat', client: 'Priya Patel', amount: '₹65,00,000', commission: '₹65,000', date: '2024-01-14', status: 'pending' },
    { id: 'TRX003', property: 'Commercial Space', client: 'Amit Kumar', amount: '₹2,50,00,000', commission: '₹2,50,000', date: '2024-01-13', status: 'processing' },
    { id: 'TRX004', property: 'Independent Villa', client: 'Sneha Reddy', amount: '₹3,80,00,000', commission: '₹3,80,000', date: '2024-01-12', status: 'completed' },
    { id: 'TRX005', property: 'Plot in Kukatpally', client: 'Vikram Singh', amount: '₹50,00,000', commission: '₹50,000', date: '2024-01-11', status: 'cancelled' }
  ];

  const filteredTransactions = filter === 'all' ? transactions : transactions.filter(t => t.status === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'processing': return 'bg-blue-100 text-blue-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const totalCommission = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + parseInt(t.commission.replace(/[^0-9]/g, '')), 0);

  return (
    <DashboardLayout title="Transactions">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{transactions.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600">Completed Deals</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {transactions.filter(t => t.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600">Total Commission</p>
          <p className="text-2xl font-bold text-green-600 mt-2">₹{(totalCommission/100000).toFixed(1)}L</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {['all', 'completed', 'processing', 'pending', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm capitalize whitespace-nowrap ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500">#{transaction.id}</p>
                <h3 className="font-semibold text-gray-900 mt-1">{transaction.property}</h3>
                <p className="text-sm text-gray-600 mt-1">{transaction.client}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </span>
            </div>
            <div className="flex justify-between mt-3">
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-sm font-medium text-gray-900">{transaction.amount}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Commission</p>
                <p className="text-sm font-medium text-green-600">{transaction.commission}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">{transaction.date}</p>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Transaction ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Property</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Client</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Commission</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{transaction.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.property}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.client}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.amount}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">{transaction.commission}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
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

export default AgentTransactions;
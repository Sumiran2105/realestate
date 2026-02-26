import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { getPendingKYC, updateUserKYC } from '../../../utils/adminData';

const AdminKYC = () => {
  const [pendingKYC, setPendingKYC] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadPendingKYC();
  }, []);

  const loadPendingKYC = () => {
    setPendingKYC(getPendingKYC());
  };

  const handleVerifyKYC = (userId, status) => {
    updateUserKYC(userId, status);
    loadPendingKYC();
    setSelectedUser(null);
  };

  return (
    <DashboardLayout title="KYC Verification Requests">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending KYC List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Requests ({pendingKYC.length})</h3>
          <div className="space-y-3">
            {pendingKYC.map(user => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full text-left p-4 rounded-lg transition ${
                  selectedUser?.id === user.id ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">Role: {user.role}</p>
              </button>
            ))}
          </div>
        </div>

        {/* KYC Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          {selectedUser ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Details - {selectedUser.name}</h3>
              
              {/* User Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium text-gray-900">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-medium text-gray-900 capitalize">{selectedUser.role}</p>
                  </div>
                </div>
              </div>

              {/* Document Previews */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-900">Uploaded Documents</h4>
                
                {/* Aadhaar */}
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Aadhaar Card</p>
                  <p className="text-sm text-gray-600">Number: {selectedUser.kycData?.aadhaarNumber || 'XXXX-XXXX-XXXX'}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Front Image</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Back Image</span>
                  </div>
                </div>

                {/* PAN */}
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">PAN Card</p>
                  <p className="text-sm text-gray-600">Number: {selectedUser.kycData?.panNumber || 'ABCDE1234F'}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">PAN Image</span>
                  </div>
                </div>

                {/* Selfie */}
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selfie with ID</p>
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">📸</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleVerifyKYC(selectedUser.id, 'verified')}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve KYC
                </button>
                <button
                  onClick={() => handleVerifyKYC(selectedUser.id, 'rejected')}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject KYC
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Select a user from the list to view KYC details
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminKYC;
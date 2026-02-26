import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { getPendingKYC, updateUserKYC } from '../../../utils/adminData';
import { 
  FaUserCheck, 
  FaUserTimes, 
  FaIdCard, 
  FaFileAlt, 
  FaCamera,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaEye,
  FaDownload,
  FaArrowLeft,
  FaArrowRight,
  FaSearch,
  FaFilter,
  FaShieldAlt,
  FaClock,
  FaCheckDouble
} from 'react-icons/fa';

const AdminKYC = () => {
  const [pendingKYC, setPendingKYC] = useState([]);
  const [filteredKYC, setFilteredKYC] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    loadPendingKYC();
  }, []);

  useEffect(() => {
    filterKYC();
  }, [pendingKYC, searchTerm, roleFilter]);

  const loadPendingKYC = () => {
    const data = getPendingKYC();
    setPendingKYC(data);
    setFilteredKYC(data);
  };

  const filterKYC = () => {
    let filtered = [...pendingKYC];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm)
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredKYC(filtered);
    setCurrentPage(1);
  };

  const handleVerifyKYC = (userId, status) => {
    updateUserKYC(userId, status);
    loadPendingKYC();
    setSelectedUser(null);
    setShowConfirmModal(false);
    setActionType(null);
  };

  const confirmAction = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setShowConfirmModal(true);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKYC.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredKYC.length / itemsPerPage);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'verified':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
          <FaCheckCircle size={12} />
          Verified
        </span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
          <FaClock size={12} />
          Pending
        </span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
          <FaTimesCircle size={12} />
          Not Started
        </span>;
    }
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      admin: 'bg-purple-100 text-purple-700 border-purple-200',
      agent: 'bg-blue-100 text-blue-700 border-blue-200',
      seller: 'bg-green-100 text-green-700 border-green-200',
      buyer: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize border ${roleColors[role] || roleColors.buyer}`}>
        {role}
      </span>
    );
  };

  return (
    <DashboardLayout title="KYC Verification">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100 mb-1">Total Pending</p>
                <p className="text-2xl font-bold">{pendingKYC.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                <FaClock />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100 mb-1">Verified Today</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                <FaCheckCircle />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl shadow-lg p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-100 mb-1">Agents Queue</p>
                <p className="text-2xl font-bold">{pendingKYC.filter(u => u.role === 'agent').length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                <FaShieldAlt />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-100 mb-1">Sellers Queue</p>
                <p className="text-2xl font-bold">{pendingKYC.filter(u => u.role === 'seller').length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                <FaUserCheck />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Pending KYC List */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Pending Requests</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {filteredKYC.length} total
                </span>
              </div>

              {/* Search and Filter */}
              <div className="space-y-3">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Roles</option>
                  <option value="agent">Agents Only</option>
                  <option value="seller">Sellers Only</option>
                  <option value="buyer">Buyers Only</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {currentItems.map(user => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full text-left p-4 transition-all hover:bg-gray-50 ${
                    selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
                      user.role === 'agent' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      user.role === 'seller' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      'bg-gradient-to-br from-gray-500 to-gray-600'
                    }`}>
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.kycStatus)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {currentItems.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaUserTimes className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-500">No pending KYC requests</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredKYC.length > 0 && (
              <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                >
                  <FaArrowLeft size={14} />
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                >
                  <FaArrowRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Right Side - KYC Details */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-2xl">
                        {selectedUser.name?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{selectedUser.name}</h3>
                        <p className="text-sm text-blue-100">KYC Verification Request</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium flex items-center gap-1">
                      <FaClock size={12} />
                      Pending Review
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* User Information */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaShieldAlt className="text-blue-600" />
                      User Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Full Name</p>
                        <p className="font-medium text-gray-900">{selectedUser.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="font-medium text-gray-900">{selectedUser.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="font-medium text-gray-900">{selectedUser.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Role</p>
                        <div>{getRoleBadge(selectedUser.role)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaFileAlt className="text-green-600" />
                      Uploaded Documents
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Aadhaar Card */}
                      <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl">
                            <FaIdCard />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Aadhaar Card</p>
                            <p className="text-xs text-gray-500">Front & Back</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Number: {selectedUser.kycData?.aadhaarNumber || 'XXXX-XXXX-XXXX'}</p>
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200">
                            <FaEye size={10} /> View Front
                          </button>
                          <button className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200">
                            <FaEye size={10} /> View Back
                          </button>
                        </div>
                      </div>

                      {/* PAN Card */}
                      <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xl">
                            <FaFileAlt />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">PAN Card</p>
                            <p className="text-xs text-gray-500">Income Tax</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Number: {selectedUser.kycData?.panNumber || 'ABCDE1234F'}</p>
                        <button className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200">
                          <FaEye size={10} /> View Document
                        </button>
                      </div>

                      {/* Selfie */}
                      <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 text-xl">
                            <FaCamera />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Selfie</p>
                            <p className="text-xs text-gray-500">With ID Card</p>
                          </div>
                        </div>
                        <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                          <span className="text-4xl">📸</span>
                        </div>
                        <button className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200 w-full justify-center">
                          <FaEye size={10} /> View Selfie
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Verification Actions */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Verification Decision</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => confirmAction(selectedUser, 'approve')}
                        className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle />
                        Approve KYC
                      </button>
                      <button
                        onClick={() => confirmAction(selectedUser, 'reject')}
                        className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <FaTimesCircle />
                        Reject KYC
                      </button>
                    </div>

                    {/* Rejection Reason (Optional) */}
                    <div className="mt-4">
                      <label className="block text-sm text-gray-600 mb-2">Rejection Reason (if any)</label>
                      <textarea
                        rows="2"
                        placeholder="Enter reason for rejection..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUserCheck className="text-blue-600 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No User Selected</h3>
                <p className="text-gray-500 mb-6">Select a user from the list to view their KYC details</p>
                <div className="flex justify-center gap-2 text-sm text-gray-400">
                  <span className="px-3 py-1 bg-gray-100 rounded-full">📄 Aadhaar</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full">🆔 PAN</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full">📸 Selfie</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full animate-scaleIn">
            <div className="p-6">
              <div className="text-center mb-4">
                <div className={`w-16 h-16 ${actionType === 'approve' ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {actionType === 'approve' ? (
                    <FaCheckCircle className="text-green-600 text-3xl" />
                  ) : (
                    <FaTimesCircle className="text-red-600 text-3xl" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {actionType === 'approve' ? 'Approve KYC?' : 'Reject KYC?'}
                </h3>
                <p className="text-gray-600 mt-2">
                  {actionType === 'approve' 
                    ? `Are you sure you want to approve KYC for ${selectedUser.name}?` 
                    : `Are you sure you want to reject KYC for ${selectedUser.name}?`}
                </p>
                {actionType === 'reject' && (
                  <p className="text-sm text-red-600 mt-2 flex items-center justify-center gap-1">
                    <FaExclamationTriangle />
                    This action cannot be undone
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleVerifyKYC(selectedUser.id, actionType === 'approve' ? 'verified' : 'rejected')}
                  className={`flex-1 py-3 ${
                    actionType === 'approve' 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                  } text-white rounded-xl transition-all shadow-lg`}
                >
                  Yes, {actionType === 'approve' ? 'Approve' : 'Reject'}
                </button>
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setActionType(null);
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AdminKYC;
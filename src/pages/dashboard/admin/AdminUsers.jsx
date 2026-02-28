import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { getAllUsers, updateUserStatus, deleteUser } from '../../../utils/adminData';
import { 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle,
  FaEye,
  FaFilter
} from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter, statusFilter]);

  const loadUsers = () => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
    calculateStats(allUsers);
  };

  const calculateStats = (userList) => {
    const stats = {
      total: userList.length,
      verified: userList.filter(u => u.kycStatus === 'verified').length,
      pending: userList.filter(u => u.kycStatus === 'pending' || u.kycStatus === 'not_started').length
    };
    setStats(stats);
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm) ||
        user.id?.toString().includes(searchTerm)
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => {
        if (statusFilter === 'verified') return user.kycStatus === 'verified';
        if (statusFilter === 'pending') return user.kycStatus === 'pending' || user.kycStatus === 'not_started';
        return true;
      });
    }

    setFilteredUsers(filtered);
  };

  const handleStatusChange = (userId, newStatus) => {
    updateUserStatus(userId, newStatus);
    loadUsers();
    setShowEditModal(false);
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
    loadUsers();
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'verified':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
          <FaCheckCircle size={12} />
          Verified
        </span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
          <FaExclamationTriangle size={12} />
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
      admin: 'bg-purple-100 text-purple-700',
      agent: 'bg-blue-100 text-blue-700',
      seller: 'bg-green-100 text-green-700',
      buyer: 'bg-gray-100 text-gray-700'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${roleColors[role] || roleColors.buyer}`}>
        {role}
      </span>
    );
  };

  return (
    <DashboardLayout title="User Management">
      <div className="space-y-6">
        {/* Simple Stats Row - Only 3 Cards */}
        {/* Stats Cards - Vibrant Solid Colors */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {/* Total Users */}
  <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Total Users</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.total}</p>
      </div>
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-blue-600 text-xl"><FaUsers size={20} /></span>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-gray-100">
      <p className="text-xs text-gray-400">All registered users</p>
    </div>
  </div>

  {/* Verified KYC */}
  <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Verified KYC</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.verified}</p>
      </div>
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-green-600 text-xl"><FaCheckCircle size={20} /></span>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-gray-100">
      <p className="text-xs text-green-600">Completed verification</p>
    </div>
  </div>

  {/* Pending KYC */}
  <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-amber-500 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Pending KYC</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.pending}</p>
      </div>
      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
        <span className="text-amber-600 text-xl"><FaExclamationTriangle size={20} /></span>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-gray-100">
      <p className="text-xs text-amber-600">Awaiting verification</p>
    </div>
  </div>
</div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
            >
              <FaFilter />
              <span>Filters</span>
            </button>

            {/* Filter Dropdowns */}
            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-3 w-full lg:w-auto`}>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Roles</option>
                <option value="buyer">Buyers</option>
                <option value="seller">Sellers</option>
                <option value="agent">Agents</option>
                <option value="admin">Admins</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] md:min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KYC Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(user.kycStatus)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.createdAt || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowViewModal(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
                className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Simple Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex justify-between items-center px-4 py-3 bg-white rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{filteredUsers.length}</span> of{' '}
              <span className="font-medium">{users.length}</span> users
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimesCircle className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {/* User Header */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                    {selectedUser.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedUser.name}</h4>
                    <p className="text-xs text-gray-500">Joined {selectedUser.createdAt || 'N/A'}</p>
                  </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.phone}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Role</p>
                    <div>{getRoleBadge(selectedUser.role)}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">KYC Status</p>
                    <div>{getStatusBadge(selectedUser.kycStatus)}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setShowEditModal(true);
                    }}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit User
                  </button>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit User</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">KYC Status</label>
                  <select
                    value={selectedUser.kycStatus}
                    onChange={(e) => setSelectedUser({...selectedUser, kycStatus: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleStatusChange(selectedUser.id, selectedUser.kycStatus)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaExclamationTriangle className="text-red-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete <span className="font-medium">{selectedUser.name}</span>?
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminUsers;

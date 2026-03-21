import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import { adminApi } from '@/dashboards/admin/api/adminApi';
import { useToast } from '@/shared/hooks/useToast';
import { 
  FaSearch, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle,
  FaEye,
  FaFilter,
  FaIdCard,
  FaFileAlt
} from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';

const INITIAL_STATS = {
  total: 0,
  active: 0,
  suspended: 0,
  kycVerified: 0,
  kycPending: 0,
  buyers: 0,
  sellers: 0,
  agents: 0,
  builders: 0,
};

const formatCreatedAt = (value) =>
  value
    ? new Date(value).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';

const mapDashboardUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: 'Not available',
  role: user.type,
  status: user.status,
  createdAt: formatCreatedAt(user.created_at),
});

const AdminUsers = () => {
  const { error: showError, info: showInfo, success: showSuccess } = useToast();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUserKycSummary, setSelectedUserKycSummary] = useState(null);
  const [selectedUserKycDetail, setSelectedUserKycDetail] = useState(null);
  const [isKycDetailsLoading, setIsKycDetailsLoading] = useState(false);
  const [isSuspendSubmitting, setIsSuspendSubmitting] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState('');
  const [showSuspendReasonBox, setShowSuspendReasonBox] = useState(false);
  const [stats, setStats] = useState(INITIAL_STATS);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter, statusFilter]);

  const loadUsers = () => {
    adminApi
      .getUsersDashboard()
      .then((response) => {
        const recentUsers = (response?.recent_users || []).map(mapDashboardUser);

        setUsers(recentUsers);
        setStats({
          total: response?.user_stats?.total || recentUsers.length,
          active: response?.user_stats?.active || 0,
          suspended: response?.user_stats?.suspended || 0,
          kycVerified: response?.kyc_stats?.approved || 0,
          kycPending: response?.kyc_stats?.pending || 0,
          buyers: response?.users_by_type?.buyer || 0,
          sellers: response?.users_by_type?.seller || 0,
          agents: response?.users_by_type?.agent || 0,
          builders: response?.users_by_type?.builder || 0,
        });
      })
      .catch((loadError) => {
        showError(loadError.message || 'Failed to load users dashboard data.', 'Users Load Failed');
      });
  };

  const normalizeKycCollection = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.items)) return response.items;
    if (Array.isArray(response?.listings)) return response.listings;
    if (Array.isArray(response?.records)) return response.records;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.results)) return response.results;
    if (response?.user_id || response?.id) return [response];
    return [];
  };

  const getKycStatusBadge = (status) => {
    const normalizedStatus = String(status || '').toLowerCase();

    if (normalizedStatus === 'approved' || normalizedStatus === 'verified') {
      return (
        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium w-fit">
          KYC Verified
        </span>
      );
    }

    if (normalizedStatus === 'pending') {
      return (
        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium w-fit">
          KYC Pending
        </span>
      );
    }

    if (normalizedStatus === 'rejected') {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium w-fit">
          KYC Rejected
        </span>
      );
    }

    return (
      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium w-fit">
        No KYC Record
      </span>
    );
  };

  const loadUserKycSummary = async (user) => {
    const response = await adminApi.getAllKyc();
    const allKycItems = normalizeKycCollection(response);
    const selectedUserId = String(user.id || '').trim().toLowerCase();
    const selectedUserEmail = String(user.email || '').trim().toLowerCase();

    return allKycItems.find((item) => {
      const itemUserId = String(item.user_id || item.userId || '').trim().toLowerCase();
      const itemEmail = String(item.user_email || item.email || '').trim().toLowerCase();

      return (
        (itemUserId && itemUserId === selectedUserId) ||
        (!itemUserId && itemEmail && itemEmail === selectedUserEmail)
      );
    });
  };

  const handleOpenUserModal = async (user) => {
    setSelectedUser(user);
    setSelectedUserKycSummary(null);
    setSelectedUserKycDetail(null);
    setSuspensionReason('');
    setShowSuspendReasonBox(false);
    setShowViewModal(true);

    try {
      const matchedKyc = await loadUserKycSummary(user);
      if (matchedKyc) {
        setSelectedUserKycSummary(matchedKyc);
      }
    } catch (loadError) {
      showError(loadError.message || 'Failed to preload KYC summary for this user.', 'KYC Summary Failed');
    }
  };

  const handleLoadKycDetails = async () => {
    if (!selectedUser?.id) {
      return;
    }

    setIsKycDetailsLoading(true);

    try {
      const matchedKyc = await loadUserKycSummary(selectedUser);

      if (!matchedKyc) {
        showInfo('No KYC details were found for this user.', 'KYC Not Found');
        setSelectedUserKycSummary(null);
        setSelectedUserKycDetail(null);
        return;
      }

      const detailedKyc = await adminApi.getKycDetail(matchedKyc.id);
      const resolvedKyc = detailedKyc?.data || detailedKyc || matchedKyc;

      setSelectedUser((currentUser) => ({
        ...currentUser,
        name: resolvedKyc.user_name || currentUser?.name,
        email: resolvedKyc.user_email || currentUser?.email,
        role: resolvedKyc.user_type || currentUser?.role,
        status: resolvedKyc.user_status || currentUser?.status,
      }));
      setSelectedUserKycSummary(matchedKyc);
      setSelectedUserKycDetail(resolvedKyc);
    } catch (loadError) {
      showError(loadError.message || 'Failed to load KYC details for this user.', 'KYC Details Failed');
    } finally {
      setIsKycDetailsLoading(false);
    }
  };

  const maskVisibleSuffix = (value, minMaskLength = 4) => {
    if (!value) return 'Not available';
    const visibleValue = String(value).trim();
    return `${'*'.repeat(Math.max(minMaskLength, 4))}${visibleValue}`;
  };

  const openDocumentUrl = (documentUrl) => {
    if (!documentUrl) {
      showInfo('Document URL is not available for this record.', 'Document Unavailable');
      return;
    }

    const normalizedUrl = /^https?:\/\//i.test(documentUrl)
      ? documentUrl
      : `${window.location.protocol}//${window.location.hostname}:8000${documentUrl.startsWith('/') ? documentUrl : `/${documentUrl}`}`;

    window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSuspendUser = async () => {
    if (!selectedUser?.id) {
      return;
    }

    if (!showSuspendReasonBox) {
      setShowSuspendReasonBox(true);
      return;
    }

    if (!suspensionReason.trim()) {
      showError('Please enter a suspension reason before suspending this user.', 'Reason Required');
      return;
    }

    setIsSuspendSubmitting(true);

    try {
      await adminApi.suspendUser(selectedUser.id, suspensionReason.trim());
      showSuccess(`${selectedUser.name} has been suspended.`, 'User Suspended');
      setShowViewModal(false);
      setSelectedUser(null);
      setSelectedUserKycSummary(null);
      setSelectedUserKycDetail(null);
      setSuspensionReason('');
      setShowSuspendReasonBox(false);
      loadUsers();
    } catch (actionError) {
      showError(actionError.message || 'Failed to suspend this user.', 'Suspend Failed');
    } finally {
      setIsSuspendSubmitting(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm) ||
        user.id?.toString().includes(searchTerm)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
          <FaCheckCircle size={12} />
          Active
        </span>;
      case 'suspended':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
          <FaTimesCircle size={12} />
          Suspended
        </span>;
      case 'inactive':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
          <FaExclamationTriangle size={12} />
          Inactive
        </span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
          <FaTimesCircle size={12} />
          Unknown
        </span>;
    }
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      admin: 'bg-purple-100 text-purple-700',
      agent: 'bg-blue-100 text-blue-700',
      seller: 'bg-green-100 text-green-700',
      builder: 'bg-emerald-100 text-emerald-700',
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
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md p-3 sm:p-4 text-white hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center gap-2.5 text-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-base sm:text-lg"><FaUsers size={16} /></span>
              </div>
              <p className="text-[11px] sm:text-sm text-blue-100">Total Users</p>
            </div>
            <div className="mt-2 sm:mt-3 text-center">
              <p className="text-lg sm:text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="mt-2 pt-2 border-t border-white/20 hidden sm:block">
              <p className="text-xs text-blue-100 text-center">All registered users</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-md p-3 sm:p-4 text-white hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center gap-2.5 text-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-base sm:text-lg"><FaCheckCircle size={16} /></span>
              </div>
              <p className="text-[11px] sm:text-sm text-green-100">
                <span className="sm:hidden">KYC Verified</span>
                <span className="hidden sm:inline">Total KYC Verified</span>
              </p>
            </div>
            <div className="mt-2 sm:mt-3 text-center">
              <p className="text-lg sm:text-2xl font-bold text-white">{stats.kycVerified}</p>
            </div>
            <div className="mt-2 pt-2 border-t border-white/20 hidden sm:block">
              <p className="text-xs text-green-100 text-center">KYC approved accounts</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-md p-3 sm:p-4 text-white hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center gap-2.5 text-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-base sm:text-lg"><FaExclamationTriangle size={16} /></span>
              </div>
              <p className="text-[11px] sm:text-sm text-amber-100">Pending KYC</p>
            </div>
            <div className="mt-2 sm:mt-3 text-center">
              <p className="text-lg sm:text-2xl font-bold text-white">{stats.kycPending}</p>
            </div>
            <div className="mt-2 pt-2 border-t border-white/20 hidden sm:block">
              <p className="text-xs text-amber-100 text-center">Awaiting KYC review</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg shadow-md p-3 sm:p-4 text-white hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center gap-2.5 text-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-base sm:text-lg"><FaCheckCircle size={16} /></span>
              </div>
              <p className="text-[11px] sm:text-sm text-emerald-100">Active</p>
            </div>
            <div className="mt-2 sm:mt-3 text-center">
              <p className="text-lg sm:text-2xl font-bold text-white">{stats.active}</p>
            </div>
            <div className="mt-2 pt-2 border-t border-white/20 hidden sm:block">
              <p className="text-xs text-emerald-100 text-center">Currently active accounts</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg shadow-md p-3 sm:p-4 border border-slate-200 hover:shadow-lg transition-all duration-300">
            <p className="text-[11px] sm:text-sm text-slate-500 text-center mb-1">Buyers</p>
            <p className="text-lg sm:text-2xl font-bold text-center text-slate-800">{stats.buyers}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg shadow-md p-3 sm:p-4 border border-green-200 hover:shadow-lg transition-all duration-300">
            <p className="text-[11px] sm:text-sm text-green-700 text-center mb-1">Sellers</p>
            <p className="text-lg sm:text-2xl font-bold text-center text-green-900">{stats.sellers}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-lg shadow-md p-3 sm:p-4 border border-blue-200 hover:shadow-lg transition-all duration-300">
            <p className="text-[11px] sm:text-sm text-blue-700 text-center mb-1">Agents</p>
            <p className="text-lg sm:text-2xl font-bold text-center text-blue-900">{stats.agents}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg shadow-md p-3 sm:p-4 border border-emerald-200 hover:shadow-lg transition-all duration-300">
            <p className="text-[11px] sm:text-sm text-emerald-700 text-center mb-1">Builders</p>
            <p className="text-lg sm:text-2xl font-bold text-center text-emerald-900">{stats.builders}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
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

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
            >
              <FaFilter />
              <span>Filters</span>
            </button>

            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-3 w-full lg:w-auto`}>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Roles</option>
                <option value="buyer">Buyers</option>
                <option value="seller">Sellers</option>
                <option value="builder">Builders</option>
                <option value="agent">Agents</option>
                <option value="admin">Admins</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] md:min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">User Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">Joined On</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 md:px-6">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phone || 'Phone not available yet'}</p>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 md:px-6">
                      {user.createdAt || 'N/A'}
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handleOpenUserModal(user);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">User Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimesCircle className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                    {selectedUser.name?.charAt(0) || 'U'}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{selectedUser.name}</h4>
                      {selectedUserKycSummary?.verification_status && getKycStatusBadge(selectedUserKycSummary.verification_status)}
                    </div>
                    <p className="text-xs text-gray-500">Joined {selectedUser.createdAt || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="break-all text-sm font-medium text-gray-900">{selectedUser.email}</p>
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
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <div>{getStatusBadge(selectedUser.status)}</div>
                  </div>
                </div>

                {selectedUserKycDetail && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-2">
                    <h5 className="text-sm font-semibold text-blue-900">KYC Details</h5>
                    <p className="text-sm text-blue-800">
                      Level: <span className="font-medium capitalize">{selectedUserKycDetail.kyc_level || 'N/A'}</span>
                    </p>
                    <p className="text-sm text-blue-800">
                      Status: <span className="font-medium capitalize">{selectedUserKycDetail.verification_status || 'N/A'}</span>
                    </p>
                    <p className="text-sm text-blue-800">
                      Submitted: <span className="font-medium">{selectedUserKycDetail.submitted_at ? new Date(selectedUserKycDetail.submitted_at).toLocaleString('en-IN') : 'N/A'}</span>
                    </p>
                  </div>
                )}

                {selectedUserKycDetail?.basic && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <FaIdCard className="text-blue-600" />
                        <h5 className="text-sm font-semibold text-gray-900">Aadhaar</h5>
                      </div>
                      <p className="text-sm text-gray-700">
                        Number: <span className="font-medium">{maskVisibleSuffix(selectedUserKycDetail.basic.aadhaar_number)}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        {selectedUserKycDetail.basic.aadhaar_verified ? (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                            Verified
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => openDocumentUrl(selectedUserKycDetail.basic.aadhaar_document_url)}
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                      >
                        <FaEye size={14} />
                        View Document
                      </button>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <FaFileAlt className="text-purple-600" />
                        <h5 className="text-sm font-semibold text-gray-900">PAN</h5>
                      </div>
                      <p className="text-sm text-gray-700">
                        Number: <span className="font-medium">{maskVisibleSuffix(selectedUserKycDetail.basic.pan_number, 6)}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        {selectedUserKycDetail.basic.pan_verified ? (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                            Verified
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => openDocumentUrl(selectedUserKycDetail.basic.pan_document_url)}
                        className="inline-flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100"
                      >
                        <FaEye size={14} />
                        View Document
                      </button>
                    </div>
                  </div>
                )}

                {showSuspendReasonBox && (
                  <div className="space-y-2 rounded-lg border border-red-100 bg-red-50 p-4">
                    <label className="block text-sm font-medium text-red-800">Suspension Reason</label>
                    <textarea
                      rows="3"
                      value={suspensionReason}
                      onChange={(e) => setSuspensionReason(e.target.value)}
                      placeholder="Enter the reason for suspending this user..."
                      className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowSuspendReasonBox(false);
                        setSuspensionReason('');
                      }}
                      className="text-sm font-medium text-red-700 hover:text-red-800"
                    >
                      Cancel suspension
                    </button>
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row">
                  <button
                    onClick={handleLoadKycDetails}
                    disabled={isKycDetailsLoading}
                    className="flex-1 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {isKycDetailsLoading ? 'Loading...' : 'KYC Details'}
                  </button>
                  <button
                    onClick={handleSuspendUser}
                    disabled={isSuspendSubmitting}
                    className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-60"
                  >
                    {isSuspendSubmitting
                      ? 'Suspending...'
                      : showSuspendReasonBox
                        ? 'Confirm Suspend'
                        : 'Suspend User'}
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

export default AdminUsers;

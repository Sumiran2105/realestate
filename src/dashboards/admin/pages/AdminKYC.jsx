import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import { adminApi } from '@/dashboards/admin/api/adminApi';
import { useToast } from '@/shared/hooks/useToast';
import {
  FaUserCheck, 
  FaUserTimes, 
  FaIdCard, 
  FaFileAlt, 
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaEye,
  FaArrowLeft,
  FaArrowRight,
  FaSearch,
  FaShieldAlt,
  FaClock,
  FaCheckDouble,
  FaBuilding
} from 'react-icons/fa';

const INITIAL_KYC_STATS = {
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  completion_rate: 0,
};

const formatDateTime = (value) => (value ? new Date(value).toLocaleString('en-IN') : 'Not available');

const mapPendingKycItem = (item) => ({
  id: item.id,
  userId: item.user_id,
  name: item.user_name,
  email: item.user_email,
  phone: item.user_phone,
  role: item.user_type,
  kycStatus: 'pending',
  kycLevel: item.kyc_level,
  submittedAt: item.submitted_at,
  missingDocuments: item.missing_documents || [],
  documentsStatus: item.documents_status || {},
  kycData: {
    aadhaarNumber: item.documents_status?.aadhaar?.number || 'Not available',
    panNumber: item.documents_status?.pan?.number || 'Not available',
    aadhaarDocumentUrl:
      item.documents_status?.aadhaar?.document_url ||
      item.documents_status?.aadhaar?.file_url ||
      item.documents_status?.aadhaar?.url ||
      '',
    panDocumentUrl:
      item.documents_status?.pan?.document_url ||
      item.documents_status?.pan?.file_url ||
      item.documents_status?.pan?.url ||
      '',
  },
});

const AdminKYC = () => {
  const { error: showError, info: showInfo, success: showSuccess } = useToast();
  const [pendingKYC, setPendingKYC] = useState([]);
  const [filteredKYC, setFilteredKYC] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isActionSubmitting, setIsActionSubmitting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [kycStats, setKycStats] = useState(INITIAL_KYC_STATS);
  const itemsPerPage = 5;

  useEffect(() => {
    loadPendingKYC();
    loadKycStatistics();
  }, []);

  useEffect(() => {
    filterKYC();
  }, [pendingKYC, searchTerm, roleFilter]);

  useEffect(() => {
    if (!selectedUser?.id) {
      return;
    }

    loadKycDetail(selectedUser.id);
  }, [selectedUser?.id]);

  useEffect(() => {
    setRejectionReason(selectedUser?.rejectionReason || '');
  }, [selectedUser?.id, selectedUser?.rejectionReason]);

  const loadPendingKYC = () => {
    return adminApi
      .getPendingKyc()
      .then((response) => {
        const data = (response?.listings || []).map(mapPendingKycItem);

        setPendingKYC(data);
        setFilteredKYC(data);
      })
      .catch((loadError) => {
        showError(loadError.message || 'Failed to load pending KYC requests.', 'Pending KYC Load Failed');
      });
  };

  const loadKycStatistics = async () => {
    try {
      const response = await adminApi.getKycStatistics();
      setKycStats({
        total: response?.total || 0,
        pending: response?.pending || 0,
        approved: response?.approved || 0,
        rejected: response?.rejected || 0,
        completion_rate: response?.completion_rate || 0,
      });
    } catch (loadError) {
      showError(loadError.message || 'Failed to load KYC statistics.', 'Statistics Load Failed');
    }
  };

  const filterKYC = () => {
    let filtered = [...pendingKYC];

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredKYC(filtered);
    setCurrentPage(1);
  };

  const handleVerifyKYC = async () => {
    if (!selectedUser?.id || !actionType) {
      return;
    }

    if (actionType === 'reject' && !rejectionReason.trim()) {
      showError('Please enter a rejection reason before rejecting this KYC request.', 'Reason Required');
      return;
    }

    setIsActionSubmitting(true);

    try {
      if (actionType === 'approve') {
        await adminApi.approveKyc(selectedUser.id);
        showSuccess(`KYC approved for ${selectedUser.name}.`, 'KYC Approved');
      } else {
        await adminApi.rejectKyc(selectedUser.id, rejectionReason.trim());
        showSuccess(`KYC rejected for ${selectedUser.name}.`, 'KYC Rejected');
      }

      await Promise.all([loadPendingKYC(), loadKycStatistics()]);
      setSelectedUser(null);
      setShowConfirmModal(false);
      setActionType(null);
      setRejectionReason('');
    } catch (actionError) {
      showError(actionError.message || 'Failed to update KYC verification.', 'KYC Action Failed');
    } finally {
      setIsActionSubmitting(false);
    }
  };

  const confirmAction = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setShowConfirmModal(true);
  };

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
      builder: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      buyer: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize border ${roleColors[role] || roleColors.buyer}`}>
        {role}
      </span>
    );
  };

  const maskVisibleSuffix = (value, minMaskLength = 4) => {
    if (!value || value === 'Not available') {
      return 'Not available';
    }

    const visibleValue = String(value).trim();
    return `${'*'.repeat(Math.max(minMaskLength, 4))}${visibleValue}`;
  };

  const handleViewDocument = (documentLabel, documentUrl) => {
    if (!documentUrl) {
      showInfo(
        `${documentLabel} view is not available yet because the current KYC detail response does not include a document URL.`,
        'View Unavailable'
      );
      return;
    }

    const normalizedUrl = /^https?:\/\//i.test(documentUrl)
      ? documentUrl
      : `${window.location.protocol}//${window.location.hostname}:8000${documentUrl.startsWith('/') ? documentUrl : `/${documentUrl}`}`;

    window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
  };

  const getDocumentInfo = (source = {}, fallback = {}) => {
    const fileUrl =
      source.document_url ||
      source.file_url ||
      source.url ||
      source.file ||
      fallback.documentUrl ||
      '';

    const visibleNumber =
      source.full_number ||
      source.number ||
      source.masked_number ||
      fallback.number ||
      'Not available';

    return {
      uploaded: Boolean(
        source.uploaded ??
        source.is_uploaded ??
        source.file_uploaded ??
        source.file_present ??
        fileUrl
      ),
      verified: Boolean(
        source.verified ??
        source.is_verified ??
        source.status === 'verified'
      ),
      number: visibleNumber,
      documentUrl: fileUrl,
      status:
        source.status ||
        (source.verified ? 'verified' : source.uploaded ? 'uploaded' : 'pending'),
      extraFields: source.fields || source.metadata || {},
    };
  };

  const normalizeKycDetail = (response, fallbackUser) => {
    const detail = response?.data || response || {};
    const basic = detail.basic || {};
    const professional = detail.professional || {};

    const aadhaarSource = {
      verified: basic.aadhaar_verified,
      number: basic.aadhaar_number,
      document_url: basic.aadhaar_document_url,
      uploaded: Boolean(basic.aadhaar_document_url || basic.aadhaar_number),
    };

    const panSource = {
      verified: basic.pan_verified,
      number: basic.pan_number,
      document_url: basic.pan_document_url,
      uploaded: Boolean(basic.pan_document_url || basic.pan_number),
    };

    const reraSource = {
      verified: professional.rera_verified,
      number: professional.rera_license_number,
      uploaded: Boolean(
        professional.rera_verified ||
        professional.rera_license_number ||
        professional.rera_state ||
        professional.rera_expiry_date
      ),
      metadata: {
        state: professional.rera_state,
        expiryDate: professional.rera_expiry_date,
      },
    };

    const gstSource = {
      verified: professional.gst_verified,
      number: professional.gst_number,
      uploaded: Boolean(professional.gst_verified || professional.gst_number),
    };

    const companySource = {
      verified: professional.company_reg_verified,
      number: professional.company_registration_number,
      uploaded: Boolean(
        professional.company_reg_verified ||
        professional.company_registration_number ||
        professional.company_name
      ),
      metadata: {
        companyName: professional.company_name,
      },
    };

    return {
      ...fallbackUser,
      userId: detail.user_id || fallbackUser.userId,
      name: detail.user_name || fallbackUser.name,
      email: detail.user_email || fallbackUser.email,
      role: detail.user_type || fallbackUser.role,
      kycLevel: detail.kyc_level || fallbackUser.kycLevel,
      kycStatus: detail.verification_status || fallbackUser.kycStatus,
      submittedAt: detail.submitted_at || fallbackUser.submittedAt,
      verifiedAt: detail.verified_at || fallbackUser.verifiedAt,
      verifiedBy: detail.verified_by || fallbackUser.verifiedBy,
      rejectionReason: detail.rejection_reason || fallbackUser.rejectionReason,
      documentsStatus: {
        ...fallbackUser.documentsStatus,
        aadhaar: {
          ...fallbackUser.documentsStatus?.aadhaar,
          ...aadhaarSource,
        },
        pan: {
          ...fallbackUser.documentsStatus?.pan,
          ...panSource,
        },
        rera: reraSource,
        gst: gstSource,
        company: companySource,
      },
      kycData: {
        ...fallbackUser.kycData,
        aadhaarNumber: getDocumentInfo(aadhaarSource, {
          number: fallbackUser.kycData?.aadhaarNumber,
          documentUrl: fallbackUser.kycData?.aadhaarDocumentUrl,
        }).number,
        panNumber: getDocumentInfo(panSource, {
          number: fallbackUser.kycData?.panNumber,
          documentUrl: fallbackUser.kycData?.panDocumentUrl,
        }).number,
        aadhaarDocumentUrl: getDocumentInfo(aadhaarSource, {
          documentUrl: fallbackUser.kycData?.aadhaarDocumentUrl,
        }).documentUrl,
        panDocumentUrl: getDocumentInfo(panSource, {
          documentUrl: fallbackUser.kycData?.panDocumentUrl,
        }).documentUrl,
        professionalDocuments: {
          rera: getDocumentInfo(reraSource),
          gst: getDocumentInfo(gstSource),
          company: getDocumentInfo(companySource),
        },
      },
    };
  };

  const loadKycDetail = async (kycId) => {
    setIsDetailLoading(true);

    try {
      const response = await adminApi.getKycDetail(kycId);

      setSelectedUser((currentUser) => {
        if (!currentUser || currentUser.id !== kycId) {
          return currentUser;
        }

        return normalizeKycDetail(response, currentUser);
      });
    } catch (loadError) {
      showError(loadError.message || 'Failed to load KYC details.', 'KYC Detail Load Failed');
    } finally {
      setIsDetailLoading(false);
    }
  };

  const professionalDocuments = selectedUser?.kycData?.professionalDocuments || {};
  const professionalDocumentCards = [
    {
      key: 'rera',
      label: 'RERA License',
      icon: <FaShieldAlt />,
      tone: 'text-indigo-600 bg-indigo-100 border-indigo-200 hover:bg-indigo-100',
      buttonTone: 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
      data: professionalDocuments.rera,
      numberLabel: 'License Number',
      maskLength: 6,
      metaLines: [
        professionalDocuments.rera?.extraFields?.state
          ? `State: ${professionalDocuments.rera.extraFields.state}`
          : null,
        professionalDocuments.rera?.extraFields?.expiryDate
          ? `Expiry: ${new Date(professionalDocuments.rera.extraFields.expiryDate).toLocaleDateString('en-IN')}`
          : null,
      ].filter(Boolean),
    },
    {
      key: 'gst',
      label: 'GST Certificate',
      icon: <FaFileAlt />,
      tone: 'text-emerald-600 bg-emerald-100 border-emerald-200 hover:bg-emerald-100',
      buttonTone: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
      data: professionalDocuments.gst,
      numberLabel: 'GST Number',
      maskLength: 6,
      metaLines: [],
    },
    {
      key: 'company',
      label: 'Company Registration',
      icon: <FaBuilding />,
      tone: 'text-amber-600 bg-amber-100 border-amber-200 hover:bg-amber-100',
      buttonTone: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100',
      data: professionalDocuments.company,
      numberLabel: 'Registration Number',
      maskLength: 6,
      metaLines: [
        professionalDocuments.company?.extraFields?.companyName
          ? `Company: ${professionalDocuments.company.extraFields.companyName}`
          : null,
      ].filter(Boolean),
    },
  ].filter((item) => item.data?.uploaded || item.data?.documentUrl || item.data?.number !== 'Not available');

  return (
    <DashboardLayout title="KYC Verification">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100 mb-1">Total Verified</p>
                <p className="text-2xl font-bold">{kycStats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                <FaCheckCircle />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100 mb-1">Total Pending</p>
                <p className="text-2xl font-bold">{kycStats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                <FaClock />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl shadow-lg p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-100 mb-1">Total Rejected</p>
                <p className="text-2xl font-bold">{kycStats.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                <FaTimesCircle />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-100 mb-1">Completion Rate</p>
                <p className="text-2xl font-bold">{kycStats.completion_rate}%</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                <FaCheckDouble />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Pending Requests</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {filteredKYC.length} total
                </span>
              </div>

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
                  <option value="builder">Builders Only</option>
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
                      user.role === 'builder' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
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

          <div className="lg:col-span-2">
            {selectedUser ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                    {getStatusBadge(selectedUser.kycStatus)}
                  </div>
                </div>

                <div className="p-6 space-y-6">
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

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaFileAlt className="text-green-600" />
                      Uploaded Documents
                    </h4>
                    {isDetailLoading && (
                      <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                        Loading detailed KYC documents...
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl">
                            <FaIdCard />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Aadhaar Card</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 break-all">
                          Number: {maskVisibleSuffix(selectedUser.kycData?.aadhaarNumber)}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedUser.documentsStatus?.aadhaar?.uploaded
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {selectedUser.documentsStatus?.aadhaar?.uploaded ? 'Uploaded' : 'Missing'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedUser.documentsStatus?.aadhaar?.verified
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {selectedUser.documentsStatus?.aadhaar?.verified ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleViewDocument('Aadhaar document', selectedUser.kycData?.aadhaarDocumentUrl)}
                          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                        >
                          <FaEye size={14} />
                          View
                        </button>
                      </div>

                      <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xl">
                            <FaFileAlt />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">PAN Card</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 break-all">
                          Number: {maskVisibleSuffix(selectedUser.kycData?.panNumber, 6)}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedUser.documentsStatus?.pan?.uploaded
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {selectedUser.documentsStatus?.pan?.uploaded ? 'Uploaded' : 'Missing'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedUser.documentsStatus?.pan?.verified
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {selectedUser.documentsStatus?.pan?.verified ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleViewDocument('PAN document', selectedUser.kycData?.panDocumentUrl)}
                          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100"
                        >
                          <FaEye size={14} />
                          View
                        </button>
                      </div>

                      <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 text-xl">
                            <FaFileAlt />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Summary</p>
                            <p className="text-xs text-gray-500 capitalize">{selectedUser.kycLevel} KYC</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            Submitted:{' '}
                            <span className="font-medium text-gray-900">
                              {formatDateTime(selectedUser.submittedAt)}
                            </span>
                          </p>
                          <p>
                            Missing Documents:{' '}
                            <span className="font-medium text-gray-900">
                              {selectedUser.missingDocuments?.length
                                ? selectedUser.missingDocuments.join(', ')
                                : 'None'}
                            </span>
                          </p>
                          {selectedUser.verifiedAt && (
                            <p>
                              Verified At:{' '}
                              <span className="font-medium text-gray-900">
                                {formatDateTime(selectedUser.verifiedAt)}
                              </span>
                            </p>
                          )}
                          {selectedUser.rejectionReason && (
                            <p>
                              Rejection Reason:{' '}
                              <span className="font-medium text-gray-900">
                                {selectedUser.rejectionReason}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {professionalDocumentCards.length > 0 && (
                      <div className="mt-6">
                        <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">
                          Professional Documents
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {professionalDocumentCards.map((document) => (
                            <div key={document.key} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${document.tone}`}>
                                  {document.icon}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{document.label}</p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3 break-all">
                                {document.numberLabel}: {maskVisibleSuffix(document.data?.number, document.maskLength)}
                              </p>
                              {document.metaLines.length > 0 && (
                                <div className="mb-3 space-y-1 text-sm text-gray-600">
                                  {document.metaLines.map((line) => (
                                    <p key={`${document.key}-${line}`}>{line}</p>
                                  ))}
                                </div>
                              )}
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  document.data?.uploaded
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {document.data?.uploaded ? 'Uploaded' : 'Missing'}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  document.data?.verified
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {document.data?.verified ? 'Verified' : 'Pending'}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleViewDocument(`${document.label} document`, document.data?.documentUrl)}
                                className={`mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${document.buttonTone}`}
                              >
                                <FaEye size={14} />
                                View
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

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

                    <div className="mt-4">
                      <label className="block text-sm text-gray-600 mb-2">Rejection Reason (if any)</label>
                      <textarea
                        rows="2"
                        placeholder="Enter reason for rejection..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
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
                  <span className="px-3 py-1 bg-gray-100 rounded-full">📋 Summary</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
                  onClick={handleVerifyKYC}
                  disabled={isActionSubmitting}
                  className={`flex-1 py-3 ${
                    actionType === 'approve' 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                  } text-white rounded-xl transition-all shadow-lg disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {isActionSubmitting
                    ? 'Submitting...'
                    : `Yes, ${actionType === 'approve' ? 'Approve' : 'Reject'}`}
                </button>
                <button
                  onClick={() => {
                    if (isActionSubmitting) {
                      return;
                    }
                    setShowConfirmModal(false);
                    setActionType(null);
                  }}
                  disabled={isActionSubmitting}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

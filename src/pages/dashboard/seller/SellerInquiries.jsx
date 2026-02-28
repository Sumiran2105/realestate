import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  FaComments, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaReply,
  FaFilter,
  FaSearch,
  FaDownload,
  FaStar,
  FaHome,
  FaMapMarkerAlt
} from 'react-icons/fa';

const SellerInquiries = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockInquiries = [
      {
        id: 1,
        propertyId: 1,
        propertyTitle: '3BHK Luxury Apartment',
        propertyLocation: 'Gachibowli, Hyderabad',
        propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&auto=format&fit=crop',
        buyerName: 'Rahul Sharma',
        buyerEmail: 'rahul.sharma@example.com',
        buyerPhone: '+91 9876543210',
        message: 'I am interested in this property. Can you schedule a site visit?',
        date: '2024-03-15T10:30:00',
        status: 'pending',
        priority: 'high',
        viewed: false
      },
      {
        id: 2,
        propertyId: 2,
        propertyTitle: '2BHK Affordable Flat',
        propertyLocation: 'Kukatpally, Hyderabad',
        propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&auto=format&fit=crop',
        buyerName: 'Priya Patel',
        buyerEmail: 'priya.patel@example.com',
        buyerPhone: '+91 9876543211',
        message: 'What is the exact price and is negotiation possible?',
        date: '2024-03-14T15:45:00',
        status: 'replied',
        priority: 'medium',
        viewed: true
      },
      {
        id: 3,
        propertyId: 3,
        propertyTitle: 'Commercial Office Space',
        propertyLocation: 'Hitech City, Hyderabad',
        propertyImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&auto=format&fit=crop',
        buyerName: 'Amit Kumar',
        buyerEmail: 'amit.kumar@example.com',
        buyerPhone: '+91 9876543212',
        message: 'Interested in leasing for 2 years. Please share more details.',
        date: '2024-03-14T09:15:00',
        status: 'pending',
        priority: 'high',
        viewed: false
      },
      {
        id: 4,
        propertyId: 4,
        propertyTitle: 'Independent Villa',
        propertyLocation: 'Banjara Hills, Hyderabad',
        propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&auto=format&fit=crop',
        buyerName: 'Sneha Reddy',
        buyerEmail: 'sneha.reddy@example.com',
        buyerPhone: '+91 9876543213',
        message: 'Is this property ready for immediate possession?',
        date: '2024-03-13T14:20:00',
        status: 'replied',
        priority: 'low',
        viewed: true
      },
      {
        id: 5,
        propertyId: 5,
        propertyTitle: 'Plot for Construction',
        propertyLocation: 'Miyapur, Hyderabad',
        propertyImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&auto=format&fit=crop',
        buyerName: 'Vikram Singh',
        buyerEmail: 'vikram.singh@example.com',
        buyerPhone: '+91 9876543214',
        message: 'What are the dimensions and is it corner plot?',
        date: '2024-03-12T11:30:00',
        status: 'pending',
        priority: 'medium',
        viewed: false
      }
    ];

    setInquiries(mockInquiries);
    setFilteredInquiries(mockInquiries);
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [inquiries, filter, searchTerm]);

  const filterInquiries = () => {
    let filtered = [...inquiries];

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(inquiry => inquiry.status === filter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(inquiry => 
        inquiry.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.buyerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredInquiries(filtered);
  };

  const handleMarkAsRead = (inquiryId) => {
    const updated = inquiries.map(inq => 
      inq.id === inquiryId ? { ...inq, viewed: true } : inq
    );
    setInquiries(updated);
  };

  const handleReply = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowReplyModal(true);
  };

  const sendReply = () => {
    // Here you would send the reply via API
    console.log('Sending reply to:', selectedInquiry.buyerEmail);
    console.log('Reply message:', replyMessage);

    // Update inquiry status
    const updated = inquiries.map(inq => 
      inq.id === selectedInquiry.id ? { ...inq, status: 'replied', viewed: true } : inq
    );
    setInquiries(updated);

    // Close modal and reset
    setShowReplyModal(false);
    setSelectedInquiry(null);
    setReplyMessage('');
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      replied: 'bg-green-100 text-green-700 border-green-200',
      closed: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return styles[status] || styles.pending;
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-orange-100 text-orange-700',
      low: 'bg-blue-100 text-blue-700'
    };
    return styles[priority] || styles.medium;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === 'pending').length,
    replied: inquiries.filter(i => i.status === 'replied').length,
    unread: inquiries.filter(i => !i.viewed).length,
    highPriority: inquiries.filter(i => i.priority === 'high' && i.status === 'pending').length
  };

  return (
    <DashboardLayout title="Property Inquiries">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Inquiries</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and respond to buyer inquiries</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
            <FaDownload />
            Export Inquiries
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <p className="text-xs text-yellow-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-xs text-green-600 mb-1">Replied</p>
            <p className="text-2xl font-bold text-green-700">{stats.replied}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <p className="text-xs text-purple-600 mb-1">Unread</p>
            <p className="text-2xl font-bold text-purple-700">{stats.unread}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="text-xs text-red-600 mb-1">High Priority</p>
            <p className="text-2xl font-bold text-red-700">{stats.highPriority}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by property, buyer name, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg text-gray-700"
            >
              <FaFilter />
              <span>Filters</span>
            </button>

            <div className={`${showFilters ? "flex" : "hidden"} lg:flex flex-col sm:flex-row gap-3`}>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaComments className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No inquiries found</h3>
              <p className="text-gray-500">When buyers inquire about your properties, they'll appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`p-4 sm:p-6 hover:bg-gray-50 transition-all ${!inquiry.viewed ? "bg-blue-50/30" : ""}`}
                  onClick={() => handleMarkAsRead(inquiry.id)}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Property Image */}
                    <div className="w-full sm:w-56 lg:w-48">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <img
                          src={inquiry.propertyImage}
                          alt={inquiry.propertyTitle}
                          className="w-full h-full object-cover"
                        />
                        {!inquiry.viewed && (
                          <span className="absolute top-2 left-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                        )}
                      </div>
                    </div>

                    {/* Inquiry Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{inquiry.propertyTitle}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <FaMapMarkerAlt size={12} />
                            {inquiry.propertyLocation}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(inquiry.status)}`}>
                            {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(inquiry.priority)}`}>
                            {inquiry.priority} priority
                          </span>
                        </div>
                      </div>

                      {/* Buyer Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <FaUser className="text-gray-400" />
                          <span className="text-gray-700">{inquiry.buyerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaEnvelope className="text-gray-400" />
                          <a href={`mailto:${inquiry.buyerEmail}`} className="text-blue-600 hover:underline">
                            {inquiry.buyerEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaPhone className="text-gray-400" />
                          <a href={`tel:${inquiry.buyerPhone}`} className="text-gray-700">
                            {inquiry.buyerPhone}
                          </a>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-700">{inquiry.message}</p>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FaCalendarAlt size={12} />
                          {formatDate(inquiry.date)}
                        </span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReply(inquiry);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <FaReply size={14} />
                            Reply
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // View property details
                            }}
                            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                          >
                            <FaEye size={14} />
                            View Property
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full animate-scaleIn">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Reply to Inquiry</h3>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimesCircle className="text-gray-500" />
                </button>
              </div>

              {/* Buyer Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-1">Replying to:</p>
                <p className="font-medium text-gray-900">{selectedInquiry.buyerName}</p>
                <p className="text-sm text-gray-600">{selectedInquiry.buyerEmail}</p>
                <p className="text-sm text-gray-600 mt-2">Property: {selectedInquiry.propertyTitle}</p>
                <p className="text-sm text-gray-600">Original message: "{selectedInquiry.message}"</p>
              </div>

              {/* Reply Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reply
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your reply here..."
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={sendReply}
                  disabled={!replyMessage.trim()}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  Send Reply
                </button>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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

export default SellerInquiries;

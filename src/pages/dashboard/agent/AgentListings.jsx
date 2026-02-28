import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  getAgentProperties, getAgentStats, updateProperty,deleteProperty } from '../../../utils/PropertyData';
import { 
  FaEdit, 
  FaEye, 
  FaMapMarkerAlt, 
  FaRupeeSign, 
  FaCalendarAlt,
  FaChartBar,
  FaComments,
  FaPlus,
  FaFilter,
  FaSearch,
  FaHome,
  FaTrash,
  FaBed,
  FaBath,
  FaVectorSquare,
  FaStar,
  FaRedo,
  FaCheckCircle,
  FaClock,
  FaBan
} from 'react-icons/fa';

const AgentListings = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    sold: 0,
    draft: 0,
    totalViews: 0,
    totalInquiries: 0
  });

  useEffect(() => {
    loadProperties();
  }, [user?.id]);

  useEffect(() => {
    filterProperties();
  }, [properties, filter, searchTerm]);

  const loadProperties = () => {
    setLoading(true);
    try {
      const data = getAgentProperties(user?.id || 2); // Default to agent ID 2 for demo
      console.log('Loaded properties:', data);
      setProperties(data);
      
      // Load stats
      const agentStats = getAgentStats(user?.id || 2);
      setStats(agentStats);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter((property) => property.status === filter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(property => 
        property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.price?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const handleDelete = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const updated = deleteProperty(propertyId);
      loadProperties(); // Reload properties
    }
  };

  const handleStatusChange = (propertyId, newStatus) => {
    const updated = updateProperty(propertyId, { status: newStatus });
    loadProperties();
  };

  const getStatusStyle = (status) => {
    const styles = {
      verified: 'bg-green-100 text-green-700 border-green-200',
      active: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      sold: 'bg-gray-100 text-gray-700 border-gray-200',
      draft: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return styles[status] || styles.pending;
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'verified':
      case 'active':
        return <FaCheckCircle className="mr-1" />;
      case 'pending':
        return <FaClock className="mr-1" />;
      case 'sold':
        return <FaBan className="mr-1" />;
      default:
        return null;
    }
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop';

  if (loading) {
    return (
      <DashboardLayout title="My Listings">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Listings">
      <div className="space-y-6">
        {/* Header with Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 rounded-xl shadow-sm p-4 border border-blue-100">
            <p className="text-xs text-blue-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4 border border-green-100">
            <p className="text-xs text-green-600 mb-1">Active</p>
            <p className="text-2xl font-bold text-green-700">{stats.active}</p>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4 border border-yellow-100">
            <p className="text-xs text-yellow-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
          </div>
          <div className="bg-pink-100 rounded-xl p-4 border border-pink-100">
            <p className="text-xs text-pink-600 mb-1">Sold</p>
            <p className="text-2xl font-bold text-pink-700">{stats.sold}</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, location, price, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg text-gray-700"
            >
              <FaFilter />
              <span>Filters</span>
            </button>

            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex gap-3`}>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Properties</option>
                <option value="verified">Verified</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="draft">Draft</option>
              </select>

              <Link
                to="/dashboard/agent/add-property"
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center gap-2"
              >
                <FaPlus />
                <span>Add New Listing</span>
              </Link>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || filter !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">Active filters:</span>
              {searchTerm && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center gap-1">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-blue-900">×</button>
                </span>
              )}
              {filter !== 'all' && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center gap-1">
                  Status: {filter}
                  <button onClick={() => setFilter('all')} className="ml-1 hover:text-blue-900">×</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHome className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first property listing</p>
            <Link
              to="/dashboard/agent/add-property"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <FaPlus />
              Add Your First Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={property.image || fallbackImage}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusStyle(property.status)}`}>
                      {getStatusIcon(property.status)}
                      {property.status === 'under_review' ? 'Under Review' : property.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Property Type Badge */}
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                    {property.type || 'Property'}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{property.title}</h3>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <FaMapMarkerAlt className="text-gray-400 mr-1" size={12} />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-blue-600">{property.price}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <FaCalendarAlt />
                      {property.listedDate}
                    </span>
                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {property.bedrooms > 0 && (
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <FaBed className="text-gray-600 mx-auto mb-1" />
                        <span className="text-xs text-gray-600">{property.bedrooms} BHK</span>
                      </div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <FaBath className="text-gray-600 mx-auto mb-1" />
                        <span className="text-xs text-gray-600">{property.bathrooms}</span>
                      </div>
                    )}
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <FaVectorSquare className="text-gray-600 mx-auto mb-1" />
                      <span className="text-xs text-gray-600">{property.area}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1">
                      <FaChartBar className="text-gray-400" />
                      {property.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <FaComments className="text-gray-400" />
                      {property.inquiries} inquiries
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/property/${property.id}`}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaEye size={14} />
                      View
                    </Link>
                    <Link
                      to={`/dashboard/agent/edit-property/${property.id}`}
                      className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Quick Status Change (for demo) */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                    <button
                      onClick={() => handleStatusChange(property.id, 'verified')}
                      className="flex-1 px-2 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(property.id, 'pending')}
                      className="flex-1 px-2 py-1 text-xs bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100"
                    >
                      Pending
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AgentListings;

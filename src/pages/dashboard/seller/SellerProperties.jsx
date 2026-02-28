import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import { useAuth } from '../../../contexts/AuthContext';
import { getSellerListings } from '../../../utils/sellerListings';
import { 
  FaEdit, 
  FaEye, 
  FaMapMarkerAlt, 
  FaRupeeSign, 
  FaCalendarAlt,
  FaComments,
  FaPlus,
  FaFilter,
  FaSearch,
  FaHome,
  FaTrash,
  FaBed,
  FaBath,
  FaVectorSquare,
  FaStar
} from 'react-icons/fa';

const SellerProperties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    loadProperties();
  }, [user?.id]);

  useEffect(() => {
    filterProperties();
  }, [properties, filter, searchTerm]);

  useEffect(() => {
  const data = getSellerListings(user?.id);
  console.log('Properties from data file:', data);
  console.log('First property image:', data[0]?.image);
  setProperties(data);
}, [user?.id]);

  const loadProperties = () => {
    const data = getSellerListings(user?.id);
    console.log('Loaded properties:', data); // Debug log
    setProperties(data);
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
        property.price?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const handleImageError = (propertyId) => {
    setImageErrors(prev => ({
      ...prev,
      [propertyId]: true
    }));
  };

  const getStatusStyle = (status) => {
    const styles = {
      verified: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      under_review: 'bg-blue-100 text-blue-700 border-blue-200',
      sold: 'bg-gray-100 text-gray-700 border-gray-200',
      draft: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return styles[status] || styles.pending;
  };

  const stats = {
    total: properties.length,
    verified: properties.filter(p => p.status === 'verified').length,
    pending: properties.filter(p => p.status === 'pending' || p.status === 'under_review').length,
    sold: properties.filter(p => p.status === 'sold').length,
    draft: properties.filter(p => p.status === 'draft').length,
    totalViews: properties.reduce((acc, p) => acc + (p.views || 0), 0),
    totalInquiries: properties.reduce((acc, p) => acc + (p.inquiries || 0), 0)
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="seller" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="My Properties" />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Properties</h1>
                <p className="text-sm text-gray-500 mt-1">Manage and track your property listings</p>
              </div>
              <button
                onClick={() => navigate('/dashboard/seller/add-property')}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center gap-2"
              >
                <FaPlus />
                <span>List New Property</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-100 rounded-xl shadow-sm p-4 border border-blue-100">
                <p className="text-xs text-blue-500 mb-1">Total</p>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4 border border-green-100">
                <p className="text-xs text-green-600 mb-1">Verified</p>
                <p className="text-2xl font-bold text-green-700">{stats.verified}</p>
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

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties by title, location, or price..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg text-gray-700"
                >
                  <FaFilter />
                  <span>Filters</span>
                </button>

                {/* Filter Options */}
                <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex gap-3`}>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="sold">Sold</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHome className="text-blue-600 text-3xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No properties found</h3>
                <p className="text-gray-500 mb-6">Get started by listing your first property</p>
                <button
                  onClick={() => navigate('/dashboard/seller/add-property')}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
                >
                  <FaPlus />
                  List Your First Property
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={imageErrors[property.id] ? fallbackImage : property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => handleImageError(property.id)}
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(property.status)}`}>
                          {property.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {property.status === 'verified' && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-green-600 flex items-center gap-1 shadow-sm">
                          <FaStar className="text-yellow-500" />
                          Featured
                        </div>
                      )}
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
                          <FaEye className="text-gray-400" />
                          {property.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComments className="text-gray-400" />
                          {property.inquiries} inquiries
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/seller/properties/${property.id}`)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <FaEye size={14} />
                          View Details
                        </button>
                        <button
                          onClick={() => navigate(`/dashboard/seller/edit-property/${property.id}`)}
                          className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProperty(property);
                            setShowDeleteModal(true);
                          }}
                          className="px-3 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrash className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Delete Property</h3>
                <p className="text-gray-600 mt-2">
                  Are you sure you want to delete "{selectedProperty.title}"?
                </p>
                <p className="text-sm text-red-600 mt-2">
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Add delete logic here
                    setShowDeleteModal(false);
                    setSelectedProperty(null);
                  }}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProperty(null);
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProperties;

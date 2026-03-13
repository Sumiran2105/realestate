import React, { useState, useEffect } from 'react';
import { 
  FaHeart, 
  FaHeartBroken, 
  FaMapMarkerAlt, 
  FaCheckCircle,
  FaShieldAlt,
  FaBolt,
  FaTint,
  FaArrowRight,
  FaTrash,
  FaRegHeart,
  FaShoppingBag,
  FaHome,
  FaSearch,
  FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistedProperties, setWishlistedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    loadWishlist();
  }, []);

  const getItemId = (property) => property?.property_id ?? property?.id;

  const loadWishlist = () => {
    setLoading(true);
    try {
      // Get wishlist from localStorage
      const savedWishlist = localStorage.getItem('propertyWishlist');
      if (savedWishlist) {
        setWishlistedProperties(JSON.parse(savedWishlist));
      } else {
        setWishlistedProperties([]);
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setWishlistedProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Remove property from wishlist
  const removeFromWishlist = (propertyId) => {
    // Filter out the property
    const updatedWishlist = wishlistedProperties.filter(p => String(getItemId(p)) !== String(propertyId));
    
    // Update state
    setWishlistedProperties(updatedWishlist);
    
    // Update localStorage
    localStorage.setItem('propertyWishlist', JSON.stringify(updatedWishlist));
    
    // Optional: Show toast or notification
    // You could add a toast notification here
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to remove all properties from your wishlist?')) {
      setWishlistedProperties([]);
      localStorage.removeItem('propertyWishlist');
    }
  };

  // Format price in Indian format
  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Get type badge color
  const getTypeColor = (type) => {
    switch(type) {
      case 'Plot': return 'bg-blue-100 text-blue-700';
      case 'Agricultural Plot': return 'bg-green-100 text-green-700';
      case 'Commercial Plot': return 'bg-purple-100 text-purple-700';
      case 'Industrial Plot': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-dark via-brand-dark to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/properties" 
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm">Back to Properties</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <FaHeart className="text-red-400 text-xl" />
              <span className="text-2xl font-bold">My Wishlist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wishlist Stats */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FaHeart className="text-red-500 text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Your Saved Properties
                </h2>
                <p className="text-sm text-gray-600">
                  You have {wishlistedProperties.length} {wishlistedProperties.length === 1 ? 'property' : 'properties'} in your wishlist
                </p>
              </div>
            </div>
            
            {wishlistedProperties.length > 0 && (
              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
              >
                <FaTrash className="text-sm" />
                Clear Wishlist
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistedProperties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeartBroken className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Your Wishlist is Empty</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start adding properties you love while browsing and they'll appear here for easy access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="bg-brand-dark text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
              >
                <FaSearch /> Browse Properties
              </Link>
              <Link
                to="/"
                className="border-2 border-brand-dark text-brand-dark px-6 py-3 rounded-lg font-semibold hover:bg-brand-soft transition-colors flex items-center justify-center gap-2"
              >
                <FaHome /> Go to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedProperties.map((property) => (
              <div
                key={getItemId(property)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Image Section */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={property?.media?.images?.[0] || property?.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={property?.title || 'Property'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Verification Badge */}
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                    <FaCheckCircle className="text-xs" /> Verified
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(getItemId(property))}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform hover:bg-red-50"
                    title="Remove from wishlist"
                  >
                    <FaHeart className="text-red-500 text-sm" />
                  </button>

                  {/* Property Type */}
                  <div className={`absolute bottom-2 left-2 ${getTypeColor(property?.listing_type)} px-2 py-0.5 rounded-full text-xs font-medium`}>
                    {property?.listing_type || 'Plot'}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
                    {property?.title || 'Property Title'}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <FaMapMarkerAlt className="text-brand-dark text-xs flex-shrink-0" />
                    <span className="line-clamp-1">
                      {property?.location?.city || property?.location || 'City'}
                    </span>
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center bg-gray-50 rounded-lg py-1">
                      <div className="text-brand-dark font-bold text-sm">
                        {property?.property_details?.plot_area_sq_yards || 'N/A'}
                      </div>
                      <div className="text-gray-500 text-xs">sq.yds</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg py-1">
                      <div className="text-brand-dark font-bold text-sm">
                        {property?.property_details?.facing || 'N/A'}
                      </div>
                      <div className="text-gray-500 text-xs">Facing</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg py-1">
                      <div className="text-brand-dark font-bold text-sm">
                        {property?.property_details?.permissible_usage ? 
                          (property.property_details.permissible_usage === 'Residential' ? 'Resi' : 
                           property.property_details.permissible_usage === 'Commercial' ? 'Comm' : 
                           property.property_details.permissible_usage === 'Agricultural' ? 'Agri' : 'Ind') 
                          : 'N/A'}
                      </div>
                      <div className="text-gray-500 text-xs">Type</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-base font-bold text-gray-900">
                        {property?.pricing?.expected_price
                          ? formatPrice(property.pricing.expected_price)
                          : property?.price || 'Price on Request'}
                      </span>
                    </div>
                    {property?.pricing?.negotiability === 'Yes' && (
                      <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-0.5 rounded">
                        Negotiable
                      </span>
                    )}
                  </div>

                  {/* Verification Highlights */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {property?.verification_report_card?.owner_verification === 'Passed' && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FaCheckCircle className="text-xs" /> Owner Verified
                      </span>
                    )}
                    {property?.verification_report_card?.title_verification === 'Clear' && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FaShieldAlt className="text-xs" /> Clear Title
                      </span>
                    )}
                  </div>

                  {/* Utility Icons */}
                  <div className="flex gap-2 mb-4">
                    {property?.government_approvals?.utility_connections?.electricity?.verified && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FaBolt className="text-xs" /> Power
                      </span>
                    )}
                    {property?.government_approvals?.utility_connections?.water?.verified && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FaTint className="text-xs" /> Water
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/buyer/property/${getItemId(property)}`}
                      className="flex-1 bg-gradient-to-r from-brand-dark to-blue-800 text-white text-center py-2 rounded-lg text-xs font-medium hover:from-blue-800 hover:to-brand-dark transition-all flex items-center justify-center gap-1"
                    >
                      View Details <FaArrowRight className="text-xs" />
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(getItemId(property))}
                      className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-xs flex items-center gap-1"
                      title="Remove from wishlist"
                    >
                      <FaTrash className="text-xs" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

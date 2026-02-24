import React from 'react';
import { FaArrowRight, FaBolt, FaCheckCircle, FaHeart, FaMapMarkerAlt, FaShieldAlt, FaTint } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa6';
import propertyData from '../../data//properties.json'; 

const PropertyCard = ({ property, viewMode, isFavorite, onToggleFavorite, formatPrice }) => {
  // Safe access to property data with fallbacks
  const propertyDetails = property?.property_details || {};
  const location = property?.location || {};
  const pricing = property?.pricing || {};
  const verificationReport = property?.verification_report_card || {};
  const governmentApprovals = property?.government_approvals || {};
  const utilityConnections = governmentApprovals?.utility_connections || {};
  const electricity = utilityConnections?.electricity || {};
  const water = utilityConnections?.water || {};
  const reraDetails = governmentApprovals?.rera_details || {};

  // Determine badge color based on property type
  const getTypeColor = (type) => {
    switch(type) {
      case 'Plot': return 'bg-blue-100 text-blue-700';
      case 'Agricultural Plot': return 'bg-green-100 text-green-700';
      case 'Commercial Plot': return 'bg-purple-100 text-purple-700';
      case 'Industrial Plot': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Get facing color
  const getFacingColor = (facing) => {
    switch(facing) {
      case 'North': return 'text-blue-600';
      case 'South': return 'text-red-600';
      case 'East': return 'text-amber-600';
      case 'West': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`
      bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1
      ${viewMode === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col h-full'}
    `}>
      {/* Image Section - Fixed height */}
      <div className={`
        relative overflow-hidden group flex-shrink-0
        ${viewMode === 'list' ? 'md:w-1/3 h-48 md:h-auto' : 'h-36'}
      `}>
        <img
          src={property?.media?.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={property?.title || 'Property'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Verification Badge */}
        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
          <FaCheckCircle className="text-xs" /> Verified
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-sm" />
          ) : (
            <FaRegHeart className="text-gray-600 text-sm" />
          )}
        </button>

        {/* Property Type Tag */}
        <div className={`absolute bottom-2 left-2 ${getTypeColor(property?.listing_type)} px-2 py-0.5 rounded-full text-xs font-medium`}>
          {property?.listing_type || 'Plot'}
        </div>
      </div>

      {/* Content Section - Takes remaining space with flex column */}
      <div className={`
        ${viewMode === 'list' ? 'md:w-2/3 p-3' : 'p-3 flex-1 flex flex-col'}
      `}>
        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
          {property?.title || 'Property Title'}
        </h3>
        
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <FaMapMarkerAlt className="text-brand-dark text-xs flex-shrink-0" />
          <span className="line-clamp-1">
            {location?.city || 'City'}, {location?.district || 'District'}
          </span>
        </div>

        {/* Key Details - Only visible in LIST view */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="text-center bg-gray-50 rounded-lg py-1">
              <div className="text-brand-dark font-bold text-sm">
                {propertyDetails?.plot_area_sq_yards || 'N/A'}
              </div>
              <div className="text-gray-500 text-xs">sq.yds</div>
            </div>
            <div className="text-center bg-gray-50 rounded-lg py-1">
              <div className={`font-bold text-sm ${getFacingColor(propertyDetails?.facing)}`}>
                {propertyDetails?.facing || 'N/A'}
              </div>
              <div className="text-gray-500 text-xs">Facing</div>
            </div>
            <div className="text-center bg-gray-50 rounded-lg py-1">
              <div className="text-brand-dark font-bold text-sm">
                {propertyDetails?.permissible_usage ? 
                  (propertyDetails.permissible_usage === 'Residential' ? 'Resi' : 
                   propertyDetails.permissible_usage === 'Commercial' ? 'Comm' : 
                   propertyDetails.permissible_usage === 'Agricultural' ? 'Agri' : 'Ind') 
                  : 'N/A'}
              </div>
              <div className="text-gray-500 text-xs">Type</div>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-base font-bold text-gray-900">
              {pricing?.expected_price ? formatPrice(pricing.expected_price) : 'Price on Request'}
            </span>
            {pricing?.price_per_sq_yd && (
              <span className="text-xs text-gray-500 ml-1">/ {pricing.price_per_sq_yd}/yd</span>
            )}
          </div>
          {pricing?.negotiability === 'Yes' && (
            <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-0.5 rounded">
              Negotiable
            </span>
          )}
        </div>

        {/* Verification Highlights */}
        <div className="flex flex-wrap gap-1 mb-2">
          {verificationReport?.owner_verification === 'Passed' && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <FaCheckCircle className="text-xs" /> Owner Verified
            </span>
          )}
          {verificationReport?.title_verification === 'Clear' && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <FaShieldAlt className="text-xs" /> Clear Title
            </span>
          )}
          {reraDetails?.rera_number && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
              RERA
            </span>
          )}
        </div>

        {/* Utility Icons */}
        <div className="flex gap-2 mb-3">
          {electricity?.verified && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <FaBolt className="text-xs" /> Power
            </span>
          )}
          {water?.verified && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <FaTint className="text-xs" /> Water
            </span>
          )}
        </div>

        {/* View Details Button - Fixed at bottom with margin-top auto */}
        <div className="mt-auto pt-1">
          <a
            href={`/property/${property?.property_id || '#'}`}
            className="block w-full bg-gradient-to-r from-brand-dark to-blue-800 text-white text-center py-2 rounded-lg text-xs font-medium hover:from-blue-800 hover:to-brand-dark transition-all flex items-center justify-center gap-1"
          >
            View Details <FaArrowRight className="text-xs" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
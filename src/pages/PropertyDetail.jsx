import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCheckCircle,
  FaShieldAlt,
  FaRegBuilding,
  FaCompass,
  FaStar,
  FaArrowLeft,
  FaDownload,
  FaShare,
  FaPrint,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaRegClock,
  FaRegHeart,
  FaHeart,
  FaCamera,
  FaVideo,
  FaMapMarkedAlt,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaUserTie,
  FaUser,
  FaAward,
  FaBolt,
  FaTint,
  FaRoad,
  FaTrain,
  FaBus,
  FaPlane,
  FaCertificate,
  FaFileSignature,
  FaLandmark,
  FaHammer,
  FaTree,
  FaHome,
  FaBuilding,
  FaIndustry,
  FaRegMap,
  FaRegCompass,
  FaCheckDouble,
  FaInfoCircle,
  FaTimesCircle,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaCompress,
  FaHeart as FaHeartSolid,
  FaRegBookmark,
  FaBookmark,
  FaFileAlt,
  FaBath,
  FaBed,
  FaVectorSquare,
  FaRuler,
  FaCity,
  FaGlobe,
  FaWater,
  FaFire,
  FaSnowflake,
  FaParking,
  FaSwimmingPool,
  FaDumbbell,
  FaWifi,
  FaLock,
  FaDirections,
  FaExternalLinkSquareAlt,
  FaSatellite,
  FaStreetView
} from 'react-icons/fa';

// Import property data
import propertyData from '../data/properties.json';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullMap, setShowFullMap] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    // Find property by ID
    const found = propertyData.listings.find(p => p.property_id === id);
    setProperty(found);
    setLoading(false);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  // Add this useEffect to load wishlist status
  useEffect(() => {
    // Check if property is in wishlist
    const savedWishlist = localStorage.getItem('propertyWishlist');
    if (savedWishlist && property) {
      const wishlist = JSON.parse(savedWishlist);
      const isFav = wishlist.some(p => p.property_id === property.property_id);
      setIsFavorite(isFav);
    }
  }, [property]);

  // Add this function to toggle wishlist
  const toggleFavorite = () => {
    if (!property) return;

    // Get current wishlist
    const savedWishlist = localStorage.getItem('propertyWishlist');
    let wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

    if (isFavorite) {
      // Remove from wishlist
      wishlist = wishlist.filter(p => p.property_id !== property.property_id);
    } else {
      // Add to wishlist
      wishlist.push(property);
    }

    // Save to localStorage
    localStorage.setItem('propertyWishlist', JSON.stringify(wishlist));
    setIsFavorite(!isFavorite);
    
    // Optional: Show toast
    alert(!isFavorite ? 'Added to wishlist!' : 'Removed from wishlist!');
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

  // Handle contact form submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In real app, send to backend
    alert('Inquiry sent successfully!');
    setShowContactForm(false);
  };

  // Navigate images
  const nextImage = () => {
    if (property?.media?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % property.media.images.length);
    }
  };

  const prevImage = () => {
    if (property?.media?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + property.media.images.length) % property.media.images.length);
    }
  };

  // Get color based on property type
  const getTypeColor = (type) => {
    switch(type) {
      case 'Plot': return 'from-blue-300 to-blue-500';
      case 'Agricultural Plot': return 'from-green-500 to-green-600';
      case 'Commercial Plot': return 'from-purple-500 to-purple-600';
      case 'Industrial Plot': return 'from-amber-500 to-amber-600';
      default: return 'from-brand-dark to-blue-800';
    }
  };

  // Get badge color for verification
  const getVerificationBadgeColor = (status) => {
    switch(status) {
      case 'Fully Verified': return 'bg-green-500';
      case 'Partially Verified': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <FaTimesCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-800 mb-2">Property Not Found</h1>
          <p className="text-sm text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <a href="/properties" className="inline-block bg-brand-dark text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors">
            Browse All Properties
          </a>
        </div>
      </div>
    );
  }

  const typeGradient = getTypeColor(property.listing_type);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <a href="/properties" className="flex items-center gap-1 text-sm text-gray-600 hover:text-brand-dark transition-colors">
              <FaArrowLeft className="text-xs" /> Back to Properties
            </a>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-brand-dark">
                <FaShare className="text-sm" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-brand-dark">
                <FaPrint className="text-sm" />
              </button>
              <button 
                onClick={toggleFavorite}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isFavorite ? <FaHeartSolid className="text-red-500 text-sm" /> : <FaRegHeart className="text-gray-600 text-sm" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
              <div className="relative h-80 md:h-96">
                {/* Main Image */}
                <img
                  src={property.media?.images?.[currentImageIndex] || 'https://via.placeholder.com/1200x600?text=No+Image'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {property.media?.images?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                  {currentImageIndex + 1} / {property.media?.images?.length || 1}
                </div>

                {/* Verification Badge */}
                <div className={`absolute top-3 left-3 ${getVerificationBadgeColor(property.verified_badge)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg`}>
                  <FaCheckCircle className="text-xs" /> {property.verified_badge}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {property.media?.images?.length > 1 && (
                <div className="p-3 border-t border-gray-200">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {property.media.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx ? 'border-brand-dark' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'overview' ? 'text-brand-dark border-b-2 border-brand-dark bg-brand-soft/20' : 'text-gray-600 hover:text-brand-dark hover:bg-gray-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('verification')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'verification' ? 'text-brand-dark border-b-2 border-brand-dark bg-brand-soft/20' : 'text-gray-600 hover:text-brand-dark hover:bg-gray-50'
                  }`}
                >
                  Verification Report
                </button>
                <button
                  onClick={() => setActiveTab('location')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'location' ? 'text-brand-dark border-b-2 border-brand-dark bg-brand-soft/20' : 'text-gray-600 hover:text-brand-dark hover:bg-gray-50'
                  }`}
                >
                  Location
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-5">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h1 className="text-lg font-bold text-gray-900 mb-2">{property.title}</h1>
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed">{property.description}</p>

                    {/* Key Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                      <div className={`bg-gradient-to-br ${typeGradient} bg-opacity-10 p-3 rounded-xl text-center text-white`}>
                        <FaVectorSquare className="text-lg mx-auto mb-1 opacity-90" />
                        <div className="font-bold text-sm">{property.property_details?.plot_area_sq_yards || 'N/A'}</div>
                        <div className="text-xs opacity-80">sq. yards</div>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 rounded-xl text-center text-white">
                        <FaCompass className="text-lg mx-auto mb-1 opacity-90" />
                        <div className="font-bold text-sm">{property.property_details?.facing || 'N/A'}</div>
                        <div className="text-xs opacity-80">Facing</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl text-center text-white">
                        <FaRuler className="text-lg mx-auto mb-1 opacity-90" />
                        <div className="font-bold text-sm">{property.property_details?.dimensions || 'N/A'}</div>
                        <div className="text-xs opacity-80">Dimensions</div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl text-center text-white">
                        <FaCity className="text-lg mx-auto mb-1 opacity-90" />
                        <div className="font-bold text-sm text-xs">
                          {property.property_details?.permissible_usage ? 
                            (property.property_details.permissible_usage === 'Residential' ? 'Resi' : 
                             property.property_details.permissible_usage === 'Commercial' ? 'Comm' : 
                             property.property_details.permissible_usage === 'Agricultural' ? 'Agri' : 'Ind') 
                            : 'N/A'}
                        </div>
                        <div className="text-xs opacity-80">Usage</div>
                      </div>
                    </div>

                    {/* Price Details */}
                    <div className={`bg-gradient-to-r ${typeGradient} bg-opacity-10 rounded-xl p-4 mb-5`}>
                      <h3 className="font-semibold text-gray-900 text-sm mb-3">Price Details</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
                          <div className="text-xs text-gray-500">Expected Price</div>
                          <div className="text-base font-bold text-brand-dark">
                            {formatPrice(property.pricing?.expected_price)}
                          </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
                          <div className="text-xs text-gray-500">Price/sq.yd</div>
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{property.pricing?.price_per_sq_yd?.toLocaleString('en-IN') || 'N/A'}
                          </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 col-span-2 md:col-span-1">
                          <div className="text-xs text-gray-500">AI Fair Price</div>
                          <div className="text-sm font-semibold text-green-600">
                            {formatPrice(property.pricing?.fair_price_estimate?.min)} - {formatPrice(property.pricing?.fair_price_estimate?.max)}
                          </div>
                          <div className="text-xs text-gray-400">
                            Confidence: {property.pricing?.fair_price_estimate?.confidence_level}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          property.pricing?.negotiability === 'Yes' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {property.pricing?.negotiability === 'Yes' ? 'Negotiable' : 'Non-Negotiable'}
                        </span>
                        <span className="text-xs text-gray-500">
                          <span className="font-medium">Trend:</span> {property.pricing?.price_trend?.['6_months'] || 'N/A'} (6m) | {property.pricing?.price_trend?.['1_year'] || 'N/A'} (1y)
                        </span>
                      </div>
                    </div>

                    {/* Property Features */}
                    <div className="mb-5">
                      <h3 className="font-semibold text-gray-900 text-sm mb-3">Property Features</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {property.property_details?.boundary && (
                          <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                            <FaLock className="text-green-500 text-xs" />
                            <span className="text-xs text-gray-700">{property.property_details.boundary}</span>
                          </div>
                        )}
                        {property.property_details?.floor_area_ratio && (
                          <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                            <FaBuilding className="text-blue-500 text-xs" />
                            <span className="text-xs text-gray-700">FAR: {property.property_details.floor_area_ratio}</span>
                          </div>
                        )}
                        {property.property_details?.community_amenities?.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                            {amenity.includes('Park') && <FaTree className="text-green-500 text-xs" />}
                            {amenity.includes('Club') && <FaBuilding className="text-purple-500 text-xs" />}
                            {amenity.includes('Security') && <FaLock className="text-blue-500 text-xs" />}
                            {amenity.includes('Swimming') && <FaSwimmingPool className="text-cyan-500 text-xs" />}
                            {!amenity.includes('Park') && !amenity.includes('Club') && !amenity.includes('Security') && !amenity.includes('Swimming') && 
                              <FaCheckCircle className="text-green-500 text-xs" />}
                            <span className="text-xs text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Government Approvals Summary */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-1">
                        <FaShieldAlt className="text-brand-dark text-xs" /> Government Approvals
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                          <span className="text-xs text-gray-600">Layout Approval</span>
                          <span className="text-xs font-semibold text-green-600">
                            {property.government_approvals?.layout_approval?.approval_number || 'N/A'}
                          </span>
                        </div>
                        {property.government_approvals?.rera_details?.rera_number && (
                          <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                            <span className="text-xs text-gray-600">RERA Number</span>
                            <span className="text-xs font-semibold text-purple-600">
                              {property.government_approvals.rera_details.rera_number}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                          <span className="text-xs text-gray-600">Land Ownership</span>
                          <span className="text-xs font-semibold text-green-600">
                            {property.government_approvals?.land_ownership?.verification_status || 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                          <span className="text-xs text-gray-600">Encumbrance</span>
                          <span className="text-xs font-semibold text-green-600">
                            {property.government_approvals?.land_ownership?.encumbrance_status || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Verification Report Tab */}
                {activeTab === 'verification' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-base font-bold text-gray-900">Detailed Verification Report</h2>
                      <button className="bg-brand-dark text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-900 transition-colors flex items-center gap-1">
                        <FaDownload className="text-xs" /> PDF
                      </button>
                    </div>

                    {/* Report Card */}
                    <div className={`bg-gradient-to-br ${typeGradient} bg-opacity-5 rounded-xl p-4 mb-4 border border-gray-200`}>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 ${getVerificationBadgeColor(property.verified_badge)} rounded-full flex items-center justify-center`}>
                            <FaCheckCircle className="text-white text-sm" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-xs">Verification Status</h3>
                            <p className={`text-xs font-medium ${
                              property.verified_badge === 'Fully Verified' ? 'text-green-600' : 'text-yellow-600'
                            }`}>{property.verified_badge}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Last Verified</div>
                          <div className="text-xs font-semibold">{property.verification_report_card?.last_verified_date || 'N/A'}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                        <div className="bg-white rounded-lg p-2 text-center">
                          <div className="text-sm font-bold text-gray-900">{property.verification_report_card?.overall_risk_score || '0'}/10</div>
                          <div className="text-xs text-gray-500">Risk Score</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center">
                          <div className="text-sm font-bold text-gray-900">{property.verification_report_card?.document_completeness_score || '0'}/10</div>
                          <div className="text-xs text-gray-500">Document Score</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center">
                          <div className="text-sm font-bold text-green-600">✓</div>
                          <div className="text-xs text-gray-500">Owner Verified</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center">
                          <div className="text-sm font-bold text-green-600">✓</div>
                          <div className="text-xs text-gray-500">Title Clear</div>
                        </div>
                      </div>

                      {property.verification_report_card?.report_summary && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
                          <p className="text-xs text-gray-700">{property.verification_report_card.report_summary}</p>
                        </div>
                      )}
                    </div>

                    {/* Detailed Verification Sections */}
                    <div className="space-y-3">
                      {/* Ownership Verification */}
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="font-bold text-gray-900 text-xs mb-3 flex items-center gap-1">
                          <FaUserTie className="text-brand-dark" /> Ownership Verification
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-xs text-gray-500">Primary Authority</div>
                            <div className="text-xs font-semibold">{property.government_approvals?.land_ownership?.primary_authority || 'N/A'}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-xs text-gray-500">Pattadar Name</div>
                            <div className="text-xs font-semibold">{property.government_approvals?.land_ownership?.pattadar_name || 'N/A'}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-xs text-gray-500">Survey Number</div>
                            <div className="text-xs font-semibold">{property.government_approvals?.land_ownership?.survey_number || 'N/A'}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-xs text-gray-500">Status</div>
                            <div className="text-xs font-semibold text-green-600">{property.government_approvals?.land_ownership?.verification_status || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Encumbrance Check */}
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="font-bold text-gray-900 text-xs mb-3 flex items-center gap-1">
                          <FaFileSignature className="text-brand-dark" /> Encumbrance Check
                        </h3>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Status</span>
                            <span className="text-xs font-semibold text-green-600">{property.government_approvals?.land_ownership?.encumbrance_status || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      {/* RERA Verification (if applicable) */}
                      {property.government_approvals?.rera_details?.rera_number && (
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                          <h3 className="font-bold text-gray-900 text-xs mb-3 flex items-center gap-1">
                            <FaRegBuilding className="text-brand-dark" /> RERA Verification
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-2 rounded-lg">
                              <div className="text-xs text-gray-500">RERA Number</div>
                              <div className="text-xs font-semibold">{property.government_approvals.rera_details.rera_number}</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg">
                              <div className="text-xs text-gray-500">Project Name</div>
                              <div className="text-xs font-semibold">{property.government_approvals.rera_details.project_name}</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg">
                              <div className="text-xs text-gray-500">Status</div>
                              <div className="text-xs font-semibold text-green-600">{property.government_approvals.rera_details.status}</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg">
                              <div className="text-xs text-gray-500">Compliance</div>
                              <div className="text-xs font-semibold text-green-600">{property.government_approvals.rera_details.compliance_status}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Layout Approval */}
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="font-bold text-gray-900 text-xs mb-3 flex items-center gap-1">
                          <FaLandmark className="text-brand-dark" /> Layout Approval
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-xs text-gray-500">Authority</div>
                            <div className="text-xs font-semibold">{property.government_approvals?.layout_approval?.authority || 'N/A'}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-xs text-gray-500">Approval Number</div>
                            <div className="text-xs font-semibold">{property.government_approvals?.layout_approval?.approval_number || 'N/A'}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-xs text-gray-500">Approved Date</div>
                            <div className="text-xs font-semibold">{property.government_approvals?.layout_approval?.approved_date || 'N/A'}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-xs text-gray-500">Status</div>
                            <div className="text-xs font-semibold text-green-600">{property.government_approvals?.layout_approval?.status || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Utility Connections */}
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="font-bold text-gray-900 text-xs mb-3 flex items-center gap-1">
                          <FaBolt className="text-brand-dark" /> Utility Connections
                        </h3>
                        <div className="space-y-2">
                          {property.government_approvals?.utility_connections?.electricity && (
                            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <FaBolt className="text-yellow-500 text-xs" />
                                <span className="text-xs text-gray-700">Electricity</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-green-600 font-medium">✓ Verified</span>
                                <span className="text-xs text-gray-400">No dues</span>
                              </div>
                            </div>
                          )}
                          {property.government_approvals?.utility_connections?.water && (
                            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <FaTint className="text-blue-500 text-xs" />
                                <span className="text-xs text-gray-700">Water Connection</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-green-600 font-medium">✓ Verified</span>
                                <span className="text-xs text-gray-400">No dues</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === 'location' && (
                  <div>
                    {/* Map Section */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900 text-base">Location Map</h3>
                        {property.media?.map_view && (
                          <a 
                            href={property.media.map_view} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs bg-brand-dark text-white px-3 py-1.5 rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-1 shadow-sm"
                          >
                            <FaExternalLinkAlt className="text-xs" /> Open in Google Maps
                          </a>
                        )}
                      </div>
                      
                      {/* Map Container */}
                      <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow group">
                        {/* Map Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-10"></div>
                        
                        {/* Map Iframe - exactly as specified */}
                        {property.media?.map_view ? (
                          <div className="w-full h-72 md:h-96">
                            <iframe
                              title="Property Location Map"
                              src={property.media.map_view}
                              width="100%"
                              height="450"
                              className="tw-border-0"
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-72 md:h-96 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                            <div className="text-center p-6">
                              <div className="w-16 h-16 bg-brand-dark/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FaMapMarkedAlt className="text-2xl text-brand-dark" />
                              </div>
                              <h4 className="text-sm font-semibold text-gray-800 mb-1">Map Not Available</h4>
                              <p className="text-xs text-gray-600 mb-3">{property.location?.address || 'Address not available'}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Location Badge */}
                        {property.location?.map_view && (
                          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md z-20 flex items-center gap-1 text-xs">
                            <FaMapMarkerAlt className="text-red-500" />
                            <span className="font-medium text-gray-700">{property.location?.address?.split(',')[0] || 'Location'}</span>
                          </div>
                        )}
                        
                        {/* Expand Button */}
                        {property.location?.map_view && (
                          <button
                            onClick={() => setShowFullMap(true)}
                            className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md z-20 hover:bg-white transition-colors flex items-center gap-1 text-xs font-medium"
                          >
                            <FaExpand className="text-xs" /> Full Screen
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Address Card */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 mb-4 border border-gray-200 shadow-md">
                      <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-brand-dark" /> Complete Address
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Address:</span> {property.location?.address}</p>
                          <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Locality:</span> {property.location?.city}, {property.location?.district}</p>
                          <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">State:</span> {property.location?.state} - {property.location?.pincode}</p>
                        </div>
                        <div className="space-y-2">
                          {property.location?.landmark && (
                            <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Landmark:</span> {property.location.landmark}</p>
                          )}
                          <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Zone:</span> {property.location?.zone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 mb-4 border border-gray-200 shadow-md">
                        {/* connectivity */}
                        <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-brand-dark" /> Connectivity
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Nearest Metro:</span> {property.location.connectivity?.nearest_metro}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Nearest IT Hub:</span> {property.location.connectivity?.nearest_it_hub}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Nearest Bus Stop:</span> {property.location.connectivity?.nearest_bus_stop}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Nearest Airport:</span> {property.location.connectivity?.nearest_airport}</p>
                          </div>
                        </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Seller Information Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${typeGradient} px-4 py-2`}>
                  <h3 className="font-semibold text-white text-sm flex items-center gap-1">
                    <FaUserTie className="text-xs" /> Seller Information
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${typeGradient} rounded-full flex items-center justify-center text-white text-lg`}>
                      {property.seller_information?.type === 'Individual' ? <FaUser className="text-sm" /> : <FaBuilding className="text-sm" />}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{property.seller_information?.name}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <FaCheckCircle className="text-green-500 text-xs" />
                        {property.seller_information?.verification_badge}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3 text-xs">
                    <div className="flex justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-semibold">{property.seller_information?.member_since ? 
                        new Date(property.seller_information.member_since).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Total Listings</span>
                      <span className="font-semibold">{property.seller_information?.total_listings || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-semibold text-green-600">{property.seller_information?.response_rate || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-semibold">{property.seller_information?.response_time || 'N/A'}</span>
                    </div>
                    {property.seller_information?.rera_license && (
                      <div className="flex justify-between bg-purple-50 p-2 rounded-lg">
                        <span className="text-gray-600">RERA License</span>
                        <span className="font-semibold text-purple-600 text-xs">{property.seller_information.rera_license}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowContactForm(true)}
                      className={`w-full bg-gradient-to-r ${typeGradient} text-white py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1`}
                    >
                      <FaPhone className="text-xs" /> Contact Seller
                    </button>
                    <button className="w-full border border-green-500 text-green-600 py-2 rounded-lg text-xs font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-1">
                      <FaWhatsapp className="text-sm" /> WhatsApp
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                      <FaRegClock className="text-xs" /> Schedule Visit
                    </button>
                  </div>
                </div>
              </div>

              {/* EMI Calculator Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2">
                  <h3 className="font-semibold text-white text-sm">EMI Calculator</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="block text-xs text-gray-600 mb-1">Loan Amount (80%)</label>
                      <div className="text-lg font-bold text-amber-600">
                        {formatPrice(property.pricing?.expected_price * 0.8)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Interest Rate</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500">
                        <option>8.5% (SBI)</option>
                        <option>8.75% (HDFC)</option>
                        <option>8.6% (ICICI)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Tenure (Years)</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500">
                        <option>5 Years</option>
                        <option>10 Years</option>
                        <option>15 Years</option>
                        <option>20 Years</option>
                      </select>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Monthly EMI</span>
                        <span className="text-base font-bold text-amber-600">₹1,24,567</span>
                      </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
                      Calculate
                    </button>
                  </div>
                </div>
              </div>

              {/* Download Report Card */}
              <div className={`bg-gradient-to-r ${typeGradient} rounded-xl shadow-lg p-4 text-white`}>
                <h3 className="font-bold text-sm mb-1">Get Full Verification Report</h3>
                <p className="text-xs opacity-90 mb-3">Download detailed report with all government checks</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white text-brand-dark py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-1">
                    <FaDownload className="text-xs" /> PDF
                  </button>
                  <button className="flex-1 bg-white/20 backdrop-blur-sm text-white py-1.5 rounded-lg text-xs font-medium hover:bg-white/30 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className={`bg-gradient-to-r ${typeGradient} px-4 py-3 rounded-t-xl flex justify-between items-center`}>
              <h3 className="text-sm font-bold text-white">Contact Seller</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-white/80 hover:text-white"
              >
                <FaTimesCircle className="text-lg" />
              </button>
            </div>
            <div className="p-5">
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows="3"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="I'm interested in this property. Please share more details."
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r ${typeGradient} text-white py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity`}
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Full Map Modal */}
      {showFullMap && property.location?.map_view && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-brand-dark" />
                <h3 className="font-semibold text-gray-900">{property.location?.address || 'Location Map'}</h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={property.location.map_view}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-brand-dark text-white px-3 py-1.5 rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-1"
                >
                  <FaExternalLinkAlt /> Open in Maps
                </a>
                <button
                  onClick={() => setShowFullMap(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimesCircle className="text-2xl" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <iframe
                title="Property Location Map - Full Screen"
                src={property.location.map_view}
                width="100%"
                height="100%"
                className="tw-border-0 rounded-lg"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
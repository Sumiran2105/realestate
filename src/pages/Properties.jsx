import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaRupeeSign, 
  FaFilter,
  FaThLarge,
  FaList,
  FaMap,
  FaCheckCircle,
  FaShieldAlt,
  FaRegBuilding,
  FaCompass,
  FaVectorSquare,
  FaStar,
  FaArrowRight,
  FaTimes,
  FaSlidersH,
  FaChevronDown,
  FaRegHeart,
  FaHeart,
  FaDownload,
  FaShare,
  FaPrint,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaRegClock,
  FaBolt,
  FaTint,
  FaLandmark,
  FaRegMap,
  FaSpinner
} from 'react-icons/fa';

// Import property data
import propertyData from '../data/properties.json';
import PropertyCard from '../components/properties/PropertyCard';

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    facing: '',
    verificationStatus: '',
    propertyType: '',
    negotiable: '',
    sortBy: 'newest'
  });

  const ITEMS_PER_PAGE = 10;
  const observer = useRef();
  const lastPropertyRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProperties();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore]);

  // Load all properties on mount
  useEffect(() => {
    setAllProperties(propertyData.listings);
    setLoading(false);
  }, []);

    // Apply filters and initialize displayed properties
    useEffect(() => {
    if (!allProperties || allProperties.length === 0) return;

    let filtered = [...allProperties];

    // State filter
    if (filters.state) {
        filtered = filtered.filter(p => p?.location?.state === filters.state);
    }

    // City filter (search)
    if (filters.city) {
        filtered = filtered.filter(p => 
        p?.location?.city?.toLowerCase().includes(filters.city.toLowerCase()) ||
        p?.location?.address?.toLowerCase().includes(filters.city.toLowerCase())
        );
    }

    // Price range filter
    if (filters.minPrice) {
        filtered = filtered.filter(p => (p?.pricing?.expected_price || 0) >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
        filtered = filtered.filter(p => (p?.pricing?.expected_price || 0) <= parseInt(filters.maxPrice));
    }

    // Area filter (sq yards)
    if (filters.minArea) {
        filtered = filtered.filter(p => (p?.property_details?.plot_area_sq_yards || 0) >= parseInt(filters.minArea));
    }
    if (filters.maxArea) {
        filtered = filtered.filter(p => (p?.property_details?.plot_area_sq_yards || 0) <= parseInt(filters.maxArea));
    }

    // Facing filter
    if (filters.facing) {
        filtered = filtered.filter(p => p?.property_details?.facing === filters.facing);
    }

    // Verification status filter
    if (filters.verificationStatus) {
        filtered = filtered.filter(p => p?.verified_badge === filters.verificationStatus);
    }

    // Property type filter
    if (filters.propertyType) {
        filtered = filtered.filter(p => p?.listing_type === filters.propertyType);
    }

    // Negotiable filter
    if (filters.negotiable) {
        filtered = filtered.filter(p => p?.pricing?.negotiability === filters.negotiable);
    }

    // Sorting
    switch (filters.sortBy) {
        case 'price_low':
        filtered.sort((a, b) => (a?.pricing?.expected_price || 0) - (b?.pricing?.expected_price || 0));
        break;
        case 'price_high':
        filtered.sort((a, b) => (b?.pricing?.expected_price || 0) - (a?.pricing?.expected_price || 0));
        break;
        case 'area_low':
        filtered.sort((a, b) => (a?.property_details?.plot_area_sq_yards || 0) - (b?.property_details?.plot_area_sq_yards || 0));
        break;
        case 'area_high':
        filtered.sort((a, b) => (b?.property_details?.plot_area_sq_yards || 0) - (a?.property_details?.plot_area_sq_yards || 0));
        break;
        case 'newest':
        default:
        filtered.sort((a, b) => (b?.property_id || '').localeCompare(a?.property_id || ''));
        break;
    }

    // Reset pagination
    setPage(1);
    setDisplayedProperties(filtered.slice(0, ITEMS_PER_PAGE));
    setHasMore(filtered.length > ITEMS_PER_PAGE);
    }, [filters, allProperties]);

  // Load more properties on scroll
const loadMoreProperties = () => {
  if (loadingMore) return;

  let filtered = [...allProperties];
  
  // Re-apply filters with null checks
  if (filters.state) filtered = filtered.filter(p => p?.location?.state === filters.state);
  if (filters.city) filtered = filtered.filter(p => p?.location?.city?.toLowerCase().includes(filters.city.toLowerCase()));
  if (filters.minPrice) filtered = filtered.filter(p => (p?.pricing?.expected_price || 0) >= parseInt(filters.minPrice));
  if (filters.maxPrice) filtered = filtered.filter(p => (p?.pricing?.expected_price || 0) <= parseInt(filters.maxPrice));
  if (filters.minArea) filtered = filtered.filter(p => (p?.property_details?.plot_area_sq_yards || 0) >= parseInt(filters.minArea));
  if (filters.maxArea) filtered = filtered.filter(p => (p?.property_details?.plot_area_sq_yards || 0) <= parseInt(filters.maxArea));
  if (filters.facing) filtered = filtered.filter(p => p?.property_details?.facing === filters.facing);
  if (filters.verificationStatus) filtered = filtered.filter(p => p?.verified_badge === filters.verificationStatus);
  if (filters.propertyType) filtered = filtered.filter(p => p?.listing_type === filters.propertyType);
  if (filters.negotiable) filtered = filtered.filter(p => p?.pricing?.negotiability === filters.negotiable);

  // Apply sorting with null checks
  switch (filters.sortBy) {
    case 'price_low': filtered.sort((a, b) => (a?.pricing?.expected_price || 0) - (b?.pricing?.expected_price || 0)); break;
    case 'price_high': filtered.sort((a, b) => (b?.pricing?.expected_price || 0) - (a?.pricing?.expected_price || 0)); break;
    case 'area_low': filtered.sort((a, b) => (a?.property_details?.plot_area_sq_yards || 0) - (b?.property_details?.plot_area_sq_yards || 0)); break;
    case 'area_high': filtered.sort((a, b) => (b?.property_details?.plot_area_sq_yards || 0) - (a?.property_details?.plot_area_sq_yards || 0)); break;
    default: filtered.sort((a, b) => (b?.property_id || '').localeCompare(a?.property_id || ''));
  }

  const nextPage = page + 1;
  const start = (nextPage - 1) * ITEMS_PER_PAGE;
  const end = nextPage * ITEMS_PER_PAGE;
  const newProperties = filtered.slice(start, end);

  if (newProperties.length > 0) {
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayedProperties(prev => [...prev, ...newProperties]);
      setPage(nextPage);
      setHasMore(end < filtered.length);
      setLoadingMore(false);
    }, 500);
  } else {
    setHasMore(false);
  }
};

// Add this function to your Properties component
const toggleFavorite = (propertyId) => {
  // Find the property from allProperties
  const property = allProperties.find(p => p.property_id === propertyId);
  if (!property) return;

  // Get current wishlist from localStorage
  const savedWishlist = localStorage.getItem('propertyWishlist');
  let wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

  if (favorites.includes(propertyId)) {
    // Remove from wishlist
    wishlist = wishlist.filter(p => p.property_id !== propertyId);
    setFavorites(favorites.filter(id => id !== propertyId));
  } else {
    // Add to wishlist
    wishlist.push(property);
    setFavorites([...favorites, propertyId]);
  }

  // Save to localStorage
  localStorage.setItem('propertyWishlist', JSON.stringify(wishlist));
  
  // Optional: Show a toast notification
  // You can add a simple alert or toast here
};

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      state: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      facing: '',
      verificationStatus: '',
      propertyType: '',
      negotiable: '',
      sortBy: 'newest'
    });
  };

  // Format price in Indian format
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Get unique cities for filter dropdown
  const cities = [...new Set(allProperties.map(p => p.location.city))];
  const states = [...new Set(allProperties.map(p => p.location.state))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Stats - Brand Dark */}
      <div className="bg-gradient-to-r from-brand-dark via-brand-dark to-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Verified <span className="text-brand-light">Plots & Land</span>
              </h1>
              <p className="text-blue-200 text-sm">
                {displayedProperties.length} of {allProperties.length} properties shown
              </p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-xl font-bold text-brand-light">{propertyData.total_listings}</div>
                <div className="text-xs text-blue-200">Total Listings</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-brand-light">100%</div>
                <div className="text-xs text-blue-200">Govt Verified</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-brand-light">TS/AP</div>
                <div className="text-xs text-blue-200">Both States</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white rounded-lg shadow-md p-3 flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2">
              <FaSlidersH className="text-brand-dark" />
              <span className="font-medium">Filters & Search</span>
            </span>
            <span className="bg-brand-soft text-brand-dark px-2 py-1 rounded-full text-xs">
              {Object.values(filters).filter(v => v !== '' && v !== 'newest').length} Active
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`
            lg:w-1/5
            ${showFilters ? 'block' : 'hidden lg:block'}
          `}>
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <FaFilter className="text-brand-dark text-sm" /> Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-xs text-brand-dark hover:text-brand-light"
                >
                  Clear All
                </button>
              </div>

              {/* Search by City */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Search Location
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                  <input
                    type="text"
                    placeholder="City or area..."
                    value={filters.city}
                    onChange={(e) => setFilters({...filters, city: e.target.value})}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  />
                </div>
              </div>

              {/* State Filter */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  value={filters.state}
                  onChange={(e) => setFilters({...filters, state: e.target.value})}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                >
                  <option value="">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Price Range (₹)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    className="w-1/2 px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    className="w-1/2 px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  />
                </div>
              </div>

              {/* Area Range */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Area (sq.yds)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minArea}
                    onChange={(e) => setFilters({...filters, minArea: e.target.value})}
                    className="w-1/2 px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxArea}
                    onChange={(e) => setFilters({...filters, maxArea: e.target.value})}
                    className="w-1/2 px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                >
                  <option value="">All Types</option>
                  <option value="Plot">Plot</option>
                  <option value="Agricultural Plot">Agricultural</option>
                  <option value="Commercial Plot">Commercial</option>
                  <option value="Industrial Plot">Industrial</option>
                </select>
              </div>

              {/* Facing */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Facing
                </label>
                <select
                  value={filters.facing}
                  onChange={(e) => setFilters({...filters, facing: e.target.value})}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                >
                  <option value="">Any Facing</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>

              {/* Verification Status */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Verification
                </label>
                <select
                  value={filters.verificationStatus}
                  onChange={(e) => setFilters({...filters, verificationStatus: e.target.value})}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                >
                  <option value="">All Properties</option>
                  <option value="Fully Verified">Fully Verified Only</option>
                </select>
              </div>

              {/* Negotiable */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Negotiability
                </label>
                <select
                  value={filters.negotiable}
                  onChange={(e) => setFilters({...filters, negotiable: e.target.value})}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark"
                >
                  <option value="">All</option>
                  <option value="Yes">Negotiable</option>
                  <option value="No">Non-Negotiable</option>
                </select>
              </div>

              {/* Active Filters Summary */}
              {Object.values(filters).filter(v => v !== '' && v !== 'newest').length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 text-xs mb-2">Active:</h3>
                  <div className="flex flex-wrap gap-1">
                    {filters.state && (
                      <span className="bg-brand-soft text-brand-dark px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                        {filters.state} <FaTimes className="cursor-pointer text-xs" onClick={() => setFilters({...filters, state: ''})} />
                      </span>
                    )}
                    {filters.minPrice && (
                      <span className="bg-brand-soft text-brand-dark px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                        Min: ₹{parseInt(filters.minPrice)/100000}L <FaTimes className="cursor-pointer text-xs" onClick={() => setFilters({...filters, minPrice: ''})} />
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:w-4/5">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-lg p-3 mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Sort:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand-dark"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="area_low">Area: Low to High</option>
                    <option value="area_high">Area: High to Low</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-sm ${viewMode === 'grid' ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <FaThLarge className="text-xs" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg text-sm ${viewMode === 'list' ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <FaList className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid/List View - 3 cards per row in grid */}
            {viewMode !== 'map' && (
              <>
                <div className={`
                  grid gap-4
                  ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}
                `}>
                  {displayedProperties.map((property, index) => {
                    if (displayedProperties.length === index + 1) {
                      return (
                        <div ref={lastPropertyRef} key={property.property_id}>
                          <PropertyCard
                            property={property}
                            viewMode={viewMode}
                            isFavorite={favorites.includes(property.property_id)}
                            onToggleFavorite={() => toggleFavorite(property.property_id)}
                            formatPrice={formatPrice}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <PropertyCard
                          key={property.property_id}
                          property={property}
                          viewMode={viewMode}
                          isFavorite={favorites.includes(property.property_id)}
                          onToggleFavorite={() => toggleFavorite(property.property_id)}
                          formatPrice={formatPrice}
                        />
                      );
                    }
                  })}
                </div>

                {/* Loading Indicator */}
                {loadingMore && (
                  <div className="flex justify-center items-center py-8">
                    <FaSpinner className="animate-spin text-2xl text-brand-dark" />
                    <span className="ml-2 text-sm text-gray-600">Loading more properties...</span>
                  </div>
                )}

                {/* No More Properties */}
                {!hasMore && displayedProperties.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500">You've reached the end! 🎉</p>
                  </div>
                )}
              </>
            )}

            {/* No Results */}
            {displayedProperties.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <FaSearch className="text-4xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-700 mb-1">No Properties Found</h3>
                <p className="text-xs text-gray-500 mb-3">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-brand-dark text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-900 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Properties;
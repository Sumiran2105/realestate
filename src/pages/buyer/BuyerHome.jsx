import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaArrowRight, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { getAllSellerListings } from '../../utils/sellerListings';

const WISHLIST_KEY = 'propertyWishlist';

const formatPrice = (value) => {
  if (!value) return 'Price on Request';
  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }
  return value;
};

const BuyerHome = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setListings(getAllSellerListings());
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      setWishlist(saved ? JSON.parse(saved) : []);
    } catch {
      setWishlist([]);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--parallax', `${scrollY * 0.25}px`);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const wishlistIds = useMemo(
    () => new Set(wishlist.map((item) => String(item.property_id || item.id))),
    [wishlist]
  );

  const toggleWishlist = (listing) => {
    const listingId = String(listing.id);
    const exists = wishlist.some((item) => String(item.property_id || item.id) === listingId);

    const next = exists
      ? wishlist.filter((item) => String(item.property_id || item.id) !== listingId)
      : [
          {
            ...listing,
            property_id: listing.id,
            listing_type: listing.subCategory || listing.details?.propertyType?.subCategory || 'Property',
            media: { images: [listing.image] },
            location: { city: listing.location, district: '' },
            pricing: {
              expected_price: Number(String(listing.price).replace(/[^\d]/g, '')) || listing.price,
              negotiability: listing.negotiability || listing.details?.pricing?.negotiability || 'No',
            },
            property_details: {
              plot_area_sq_yards: listing.totalArea || listing.details?.propertyDetails?.totalArea,
              facing: 'N/A',
              permissible_usage: listing.propertyCategory || listing.details?.propertyType?.category || 'Residential',
            },
            verification_report_card: {
              owner_verification: 'Passed',
              title_verification: 'Clear',
            },
            government_approvals: {
              utility_connections: {
                electricity: { verified: true },
                water: { verified: true },
              },
            },
          },
          ...wishlist,
        ];

    setWishlist(next);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-slate-200">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/city.jpg')",
            transform: 'translateY(var(--parallax)) scale(1.08)',
          }}
        />
        <div className="relative text-center px-4 sm:px-6 max-w-5xl text-white">
          <p className="uppercase tracking-[0.3em] text-xs mb-6 text-brand-dark font-medium">
            ADVANCED SEARCH & DISCOVERY
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-dark">
            Find Verified Properties
            <span className="block text-brand-dark mt-3">
              Posted Directly By Sellers
            </span>
          </h1>
          <p className="mt-8 text-base sm:text-lg text-gray-900 max-w-3xl mx-auto leading-relaxed">
            Search seller-listed properties using location intelligence and structured filters designed for confident buying.
          </p>

          <div
            className="mt-16 sm:mt-20 relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl
                       shadow-[0_40px_120px_rgba(0,0,0,0.25)]
                       border border-white/20 p-4 sm:p-8 md:p-10 text-slate-800
                       transition-all duration-500 hover:shadow-[0_50px_150px_rgba(0,0,0,0.35)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <input
                type="text"
                placeholder="City, District, Mandal, Locality..."
                className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200
                           focus:ring-2 focus:ring-brand focus:border-brand
                           outline-none transition w-full"
              />
              <select
                className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200
                           focus:ring-2 focus:ring-brand focus:border-brand
                           outline-none transition w-full"
              >
                <option>Budget Range</option>
                <option>₹10L - ₹25L</option>
                <option>₹25L - ₹50L</option>
                <option>₹50L - ₹1Cr</option>
                <option>₹1Cr - ₹5Cr+</option>
              </select>
              <select
                className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200
                           focus:ring-2 focus:ring-brand focus:border-brand
                           outline-none transition w-full"
              >
                <option>Property Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Land</option>
                <option>Plot</option>
                <option>Office Space</option>
                <option>Industrial Space</option>
                <option>Commercial Space</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
              <select className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition w-full">
                <option>Bedrooms</option>
                <option>1 BHK</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>4+ BHK</option>
              </select>
              <select className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition w-full">
                <option>Area (sq.ft.)</option>
                <option>500 - 1000</option>
                <option>1000 - 2000</option>
                <option>2000+</option>
              </select>
              <select className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition w-full">
                <option>Listed by</option>
                <option>Seller</option>
                <option>Owner</option>
                <option>Agent</option>
              </select>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {[
                'Verified Owners Only',
                'Clear Title',
                'RERA Approved',
                'Municipal Approved',
                'Ready for Bank Loan',
                'Immediate Possession',
              ].map((item, index) => (
                <button
                  key={index}
                  className="px-5 py-2 rounded-full text-sm bg-brand-soft text-brand-dark border border-brand-light hover:bg-brand-light transition"
                >
                  ✓ {item}
                </button>
              ))}
            </div>

            <button
              className="mt-10 w-full bg-brand-dark text-white py-4 sm:py-5 rounded-2xl
                         hover:bg-brand hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-300 font-semibold text-lg shadow-xl"
            >
              Search Verified Properties
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">Seller Listed Properties</h2>
          <span className="text-sm text-slate-500">{listings.length} listings</span>
        </div>

        {listings.length === 0 ? (
          <div className="bg-white border border-slate-300 rounded-xl p-10 text-center text-slate-600">
            No seller properties available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => {
              const isWishlisted = wishlistIds.has(String(listing.id));
              return (
                <article key={listing.id} className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 bg-slate-100">
                    <img src={listing.image || 'https://via.placeholder.com/400x300?text=No+Image'} alt={listing.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleWishlist(listing)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow"
                      aria-label="Toggle wishlist"
                    >
                      {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-slate-600" />}
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">{listing.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-700" />
                      <span className="line-clamp-1">{listing.location}</span>
                    </p>

                    <div className="mt-3 flex justify-between items-center">
                      <p className="text-xl font-bold text-blue-800">{formatPrice(listing.price)}</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 uppercase">
                        {(listing.status || 'under_review').replace('_', ' ')}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-600 flex items-center gap-2">
                      <FaUser className="text-slate-500" />
                      Listed by {listing.sellerName || 'Seller'}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <Link
                        to={`/buyer/property/${listing.id}`}
                        className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => toggleWishlist(listing)}
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                      >
                        {isWishlisted ? 'Saved' : 'Wishlist'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-2xl bg-blue-900 text-white p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Need help shortlisting?</h3>
            <p className="text-blue-100 mt-1">Save your favorites and continue your buyer journey.</p>
          </div>
          <Link to="/wishlist" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-900 rounded-lg font-semibold hover:bg-slate-100">
            Open Wishlist <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BuyerHome;

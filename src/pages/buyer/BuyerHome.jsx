import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaArrowRight, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { getAllSellerListings } from '../../utils/sellerListings';
import propertiesData from '../../data/properties.json';

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
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchMode, setSearchMode] = useState("survey");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCityMandal, setSelectedCityMandal] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [passbookInput, setPassbookInput] = useState("");
  const [searched, setSearched] = useState(false);
  const [matchedProperty, setMatchedProperty] = useState(null);
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

  const normalizeSurvey = (value) => {
    if (!value) return "";
    return String(value).toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9/]/g, "");
  };
  const normalizePassbook = (value) => String(value || "").toUpperCase().replace(/\s+/g, "");
  const getVillage = (item) => String(item?.location?.address || "").split(",")[0]?.trim() || "";
  const getCityOrMandal = (item) => String(item?.location?.city || item?.location?.zone || "").trim();
  const getPassbookNumber = (item) => {
    const revenue = item?.government_approvals?.revenue_records || {};
    const ownership = item?.government_approvals?.land_ownership || {};
    const candidates = [
      revenue?.pattadar_passbook_number,
      revenue?.passbook_number,
      ownership?.pattadar_passbook_number,
      ownership?.passbook_number,
      item?.pattadar_passbook_number,
      item?.passbook_number,
    ];
    return String(candidates.find(Boolean) || "").trim();
  };
  const getSurveyNumbers = (item) => {
    const landOwnership = item?.government_approvals?.land_ownership || {};
    const surveys = [];
    if (landOwnership?.survey_number) {
      surveys.push(String(landOwnership.survey_number).trim());
    }
    if (Array.isArray(landOwnership?.survey_numbers)) {
      landOwnership.survey_numbers.forEach((survey) => surveys.push(String(survey).trim()));
    }
    return surveys.filter(Boolean);
  };
  const uniqueSorted = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

  const stateOptions = useMemo(
    () => uniqueSorted((propertiesData?.listings || []).map((item) => String(item?.location?.state || "").trim())),
    []
  );

  const districtOptions = useMemo(
    () =>
      uniqueSorted(
        (propertiesData?.listings || [])
          .filter((item) => String(item?.location?.state || "").trim() === selectedState)
          .map((item) => String(item?.location?.district || "").trim())
      ),
    [selectedState]
  );

  const cityMandalOptions = useMemo(
    () =>
      uniqueSorted(
        (propertiesData?.listings || [])
          .filter((item) => String(item?.location?.state || "").trim() === selectedState)
          .filter((item) => String(item?.location?.district || "").trim() === selectedDistrict)
          .map((item) => getCityOrMandal(item))
      ),
    [selectedState, selectedDistrict]
  );

  const villageOptions = useMemo(
    () =>
      uniqueSorted(
        (propertiesData?.listings || [])
          .filter((item) => String(item?.location?.state || "").trim() === selectedState)
          .filter((item) => String(item?.location?.district || "").trim() === selectedDistrict)
          .filter((item) => getCityOrMandal(item) === selectedCityMandal)
          .map((item) => getVillage(item))
      ),
    [selectedState, selectedDistrict, selectedCityMandal]
  );

  const surveyOptions = useMemo(
    () =>
      uniqueSorted(
        (propertiesData?.listings || [])
          .filter((item) => String(item?.location?.state || "").trim() === selectedState)
          .filter((item) => String(item?.location?.district || "").trim() === selectedDistrict)
          .filter((item) => getCityOrMandal(item) === selectedCityMandal)
          .filter((item) => getVillage(item) === selectedVillage)
          .flatMap((item) => getSurveyNumbers(item))
      ),
    [selectedState, selectedDistrict, selectedCityMandal, selectedVillage]
  );

  const clearSearchResult = () => {
    setMatchedProperty(null);
    setSearched(false);
  };

  const resetFilters = () => {
    setSearchMode("survey");
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCityMandal("");
    setSelectedVillage("");
    setSelectedSurvey("");
    setPassbookInput("");
    clearSearchResult();
  };

  const handleSurveySearch = (e) => {
    e.preventDefault();
    let match = null;

    if (searchMode === "survey") {
      const needle = normalizeSurvey(selectedSurvey);
      if (!needle) {
        setMatchedProperty(null);
        setSearched(true);
        return;
      }
      match = (propertiesData?.listings || []).find((item) => {
        const state = String(item?.location?.state || "").trim();
        const district = String(item?.location?.district || "").trim();
        const cityMandal = getCityOrMandal(item);
        const village = getVillage(item);
        const surveys = getSurveyNumbers(item);

        if (state !== selectedState) return false;
        if (district !== selectedDistrict) return false;
        if (cityMandal !== selectedCityMandal) return false;
        if (village !== selectedVillage) return false;
        return surveys.some((survey) => normalizeSurvey(survey) === needle);
      });
    } else {
      const needle = normalizePassbook(passbookInput);
      match = (propertiesData?.listings || []).find(
        (item) => normalizePassbook(getPassbookNumber(item)) === needle
      );
    }

    setMatchedProperty(match || null);
    setSearched(true);
  };

  // Get verification badge color class
  const getVerificationBadgeClass = (badge) => {
    switch(badge) {
      case 'Fully Verified':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'Partially Verified':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Not Verified':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  // Get verification badge icon
  const getVerificationBadgeIcon = (badge) => {
    switch(badge) {
      case 'Fully Verified':
        return '🔵';
      case 'Partially Verified':
        return '🟡';
      case 'Not Verified':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 sm:pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/city.jpg')",
            transform: "translateY(var(--parallax)) scale(1.08)",
          }}
        ></div>
        <div className="relative text-center px-4 sm:px-6 max-w-5xl text-white">
          <p className="uppercase tracking-[0.3em] text-xs mb-6 text-brand-dark font-medium">
            ADVANCED SEARCH & DISCOVERY
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-dark">
            Find Verified Properties
            <span className="block text-brand-dark mt-3">
              With Complete Transparency
            </span>
          </h1>
          <p className="mt-8 text-base sm:text-lg text-gray-900 max-w-3xl mx-auto leading-relaxed">
            Search using location intelligence, structured property filters,
            and government-backed verification criteria designed to
            eliminate risk and improve decision-making.
          </p>
          <div className="mt-16 sm:mt-20 relative z-10 max-w-4xl mr-auto text-left p-4 sm:p-6 md:p-8 rounded-3xl bg-white/95 border border-white/20 shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Search By</h3>
              <div className="flex items-center justify-between gap-4">
                <label className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="searchMode"
                    checked={searchMode === "survey"}
                    onChange={() => {
                      setSearchMode("survey");
                      setPassbookInput("");
                      clearSearchResult();
                    }}
                    className="h-4 w-4 accent-brand-dark"
                  />
                  Search by Survey Number
                </label>
                <label className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="searchMode"
                    checked={searchMode === "passbook"}
                    onChange={() => {
                      setSearchMode("passbook");
                      setSelectedState("");
                      setSelectedDistrict("");
                      setSelectedCityMandal("");
                      setSelectedVillage("");
                      setSelectedSurvey("");
                      clearSearchResult();
                    }}
                    className="h-4 w-4 accent-brand-dark"
                  />
                  Search by Pattadar Passbook Number
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4 relative z-10 max-w-4xl mr-auto text-left bg-white/95 backdrop-blur-xl rounded-3xl 
                          shadow-[0_40px_120px_rgba(0,0,0,0.25)] 
                          border border-white/20 p-4 sm:p-8 md:p-10 text-slate-800 
                          transition-all duration-500 hover:shadow-[0_50px_150px_rgba(0,0,0,0.35)]">
            <form onSubmit={handleSurveySearch}>
              {searchMode === "survey" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict("");
                    setSelectedCityMandal("");
                    setSelectedVillage("");
                    setSelectedSurvey("");                    clearSearchResult();
                  }}
                  className="px-3 py-3 sm:px-4 sm:py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition w-full text-sm sm:text-base bg-white"
                >
                  <option value="">Select State</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedCityMandal("");
                    setSelectedVillage("");
                    setSelectedSurvey("");                    clearSearchResult();
                  }}
                  disabled={!selectedState}
                  className="px-3 py-3 sm:px-4 sm:py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition w-full text-sm sm:text-base bg-white disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">Select District</option>
                  {districtOptions.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCityMandal}
                  onChange={(e) => {
                    setSelectedCityMandal(e.target.value);
                    setSelectedVillage("");
                    setSelectedSurvey("");                    clearSearchResult();
                  }}
                  disabled={!selectedDistrict}
                  className="px-3 py-3 sm:px-4 sm:py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition w-full text-sm sm:text-base bg-white disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">Select City / Mandal</option>
                  {cityMandalOptions.map((cityMandal) => (
                    <option key={cityMandal} value={cityMandal}>
                      {cityMandal}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedVillage}
                  onChange={(e) => {
                    setSelectedVillage(e.target.value);
                    setSelectedSurvey("");                    clearSearchResult();
                  }}
                  disabled={!selectedCityMandal}
                  className="px-3 py-3 sm:px-4 sm:py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition w-full text-sm sm:text-base bg-white disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">Select Village</option>
                  {villageOptions.map((village) => (
                    <option key={village} value={village}>
                      {village}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSurvey}
                  onChange={(e) => {
                    setSelectedSurvey(e.target.value);                    clearSearchResult();
                  }}
                  disabled={!selectedVillage}
                  className="md:col-span-2 px-3 py-3 sm:px-4 sm:py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition w-full text-sm sm:text-base bg-white disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">Select Survey Number</option>
                  {surveyOptions.map((survey) => (
                    <option key={survey} value={survey}>
                      {survey}
                    </option>
                  ))}
                </select>
                </div>
              )}

              {searchMode === "passbook" && (
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    value={passbookInput}
                    onChange={(e) => {
                      setPassbookInput(e.target.value);
                      clearSearchResult();
                    }}
                    placeholder="Enter Pattadar Passbook Number"
                    className="px-3 py-3 sm:px-4 sm:py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition w-full text-sm sm:text-base"
                  />
                </div>
              )}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={searchMode === "survey" ? !selectedSurvey : !passbookInput.trim()}
                  className="flex-1 bg-brand-dark text-white py-3 sm:py-4 rounded-2xl
                       hover:bg-brand hover:scale-[1.02] active:scale-[0.98]
                       transition-all duration-300 font-semibold text-base 
                             shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Verify Property
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 border border-slate-300 text-slate-700 py-3 sm:py-4 rounded-2xl hover:bg-slate-100 transition-all duration-200 font-medium text-sm sm:text-base"
                >
                  Reset Filters
                </button>
              </div>
            </form>

            {searched && !matchedProperty && (
              <div className="mt-5 text-left">
                <p className="text-sm text-red-600 font-medium">
                  {searchMode === "survey"
                    ? `No property found for selected survey number: "${selectedSurvey}"`
                    : `No property found for passbook number: "${passbookInput}"`}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {searchMode === "survey"
                    ? "Please verify the selected location and survey number."
                    : "Please verify the entered passbook number."}
                </p>
              </div>
            )}

            {matchedProperty && (
              <div className="mt-6 text-left bg-white rounded-2xl border border-slate-300 overflow-hidden">
                <div className="p-5 border-b border-slate-200">
                  <p className="font-semibold text-slate-900 text-sm sm:text-base">
                    SURVEY NUMBER: {
                      matchedProperty?.government_approvals?.land_ownership?.survey_number || 
                      matchedProperty?.government_approvals?.land_ownership?.survey_numbers?.join(', ') || 
                      "-"
                    }
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    Village: {matchedProperty?.location?.address?.split(",")?.[0] || "-"} · 
                    Mandal: {matchedProperty?.location?.zone || "-"} · 
                    District: {matchedProperty?.location?.district || "-"}
                  </p>
                </div>

                <div className={`p-5 border-b border-slate-200 ${getVerificationBadgeClass(matchedProperty?.verified_badge)}`}>
                  <p className="font-bold flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                      matchedProperty?.verified_badge === "Fully Verified" ? "bg-green-600" :
                      matchedProperty?.verified_badge === "Partially Verified" ? "bg-yellow-500" : "bg-red-500"
                    }`}></span>
                    {getVerificationBadgeIcon(matchedProperty?.verified_badge)} VERIFICATION STATUS: {matchedProperty?.verified_badge?.toUpperCase()}
                  </p>
                  <p className="text-sm text-slate-700 mt-1">
                    Risk Level: {
                      matchedProperty?.verification_report_card?.overall_risk_score <= 2 ? "LOW" : 
                      matchedProperty?.verification_report_card?.overall_risk_score <= 5 ? "MEDIUM" : "HIGH"
                    } · Score: {
                      matchedProperty?.verified_badge === "Fully Verified" ? 
                        `${(100 - (matchedProperty?.verification_report_card?.overall_risk_score || 0) * 5)}/100` :
                      matchedProperty?.verified_badge === "Partially Verified" ? "50-84/100" : "0-49/100"
                    }
                  </p>
                  {matchedProperty?.verification_report_card?.report_summary && (
                    <p className="text-xs text-slate-500 mt-2 italic">
                      {matchedProperty.verification_report_card.report_summary}
                    </p>
                  )}
                </div>

                <div className="p-5 border-b border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-3">OWNERSHIP DETAILS</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                    <p>Current Owner: {matchedProperty?.government_approvals?.land_ownership?.pattadar_name || "-"}</p>
                    <p>Ownership Type: {matchedProperty?.seller_information?.type || "Individual"}</p>
                    <p>Survey Number: {
                      matchedProperty?.government_approvals?.land_ownership?.survey_number ||
                      (matchedProperty?.government_approvals?.land_ownership?.survey_numbers?.join(', ')) || 
                      "-"
                    }</p>
                    <p>Pattadar Passbook No: {getPassbookNumber(matchedProperty) || "-"}</p>
                    <p>Status: {
                      matchedProperty?.government_approvals?.land_ownership?.verification_status || 
                      (matchedProperty?.verified_badge === "Not Verified" ? "Verification Pending" : "-")
                    }</p>
                  </div>
                </div>

                <div className="relative p-5">
                  <div className={`space-y-4 ${matchedProperty?.verified_badge === "Not Verified" ? "blur-sm select-none pointer-events-none opacity-50" : ""}`}>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">LAND DETAILS</h4>
                      <p className="text-sm text-slate-700">
                        Total Area: {
                          matchedProperty?.property_details?.plot_area_sq_yards ? 
                            `${matchedProperty.property_details.plot_area_sq_yards} sq.yds` :
                          matchedProperty?.property_details?.total_land_area_acres ?
                            `${matchedProperty.property_details.total_land_area_acres} acres` : "-"
                        }
                      </p>
                      <p className="text-sm text-slate-700">Land Type: {matchedProperty?.property_details?.permissible_usage || matchedProperty?.property_details?.land_use || "-"}</p>
                      {matchedProperty?.property_details?.dimensions && (
                        <p className="text-sm text-slate-700">Dimensions: {matchedProperty.property_details.dimensions}</p>
                      )}
                      {matchedProperty?.property_details?.facing && (
                        <p className="text-sm text-slate-700">Facing: {matchedProperty.property_details.facing}</p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">LEGAL STATUS</h4>
                      <p className="text-sm text-slate-700">Encumbrance: {matchedProperty?.government_approvals?.land_ownership?.encumbrance_status || "Not Verified"}</p>
                      <p className="text-sm text-slate-700">Last Verified: {matchedProperty?.verification_report_card?.last_verified_date || "Not Available"}</p>
                      
                      {/* Show approval status if available */}
                      {matchedProperty?.government_approvals?.layout_approval?.status && (
                        <p className="text-sm text-slate-700">
                          Layout Approval: {matchedProperty.government_approvals.layout_approval.status}
                          {matchedProperty.government_approvals.layout_approval.approval_number && 
                            ` (${matchedProperty.government_approvals.layout_approval.approval_number})`}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">DOCUMENTS AVAILABLE</h4>
                      {matchedProperty?.verification_report_card?.verified_documents && 
                       matchedProperty.verification_report_card.verified_documents.length > 0 ? (
                        <ul className="list-disc list-inside text-sm text-slate-700">
                          {matchedProperty.verification_report_card.verified_documents.slice(0, 4).map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                          ))}
                          {matchedProperty.verification_report_card.verified_documents.length > 4 && (
                            <li className="text-brand-dark">+{matchedProperty.verification_report_card.verified_documents.length - 4} more</li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-500 italic">No verified documents available</p>
                      )}
                      
                      {/* Show pending documents for partially verified */}
                      {matchedProperty?.verified_badge === "Partially Verified" && 
                       matchedProperty?.verification_report_card?.pending_documents && 
                       matchedProperty.verification_report_card.pending_documents.length > 0 && (
                        <>
                          <h4 className="font-semibold text-slate-900 mb-2 mt-3">PENDING DOCUMENTS</h4>
                          <ul className="list-disc list-inside text-sm text-yellow-700">
                            {matchedProperty.verification_report_card.pending_documents.slice(0, 3).map((doc, idx) => (
                              <li key={idx}>{doc}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Blur overlay for Not Verified - shows message */}
                  {matchedProperty?.verified_badge === "Not Verified" && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 rounded-b-2xl">
                      <p className="text-sm sm:text-base font-semibold text-red-600 text-center">
                        ⚠️ This property is not verified
                      </p>
                      <p className="text-xs text-slate-600 text-center mt-2 max-w-md">
                        Documents are pending verification or have discrepancies. 
                        Purchase verification report to understand the risks.
                      </p>
                      <button
                        onClick={() => navigate(`/verification-report/${matchedProperty.property_id}`)}
                        className="mt-3 px-5 py-2.5 rounded-lg bg-brand-dark text-white font-medium hover:bg-brand transition"
                      >
                        View Risk Report - ₹199
                      </button>
                    </div>
                  )}

                  {/* Blur overlay for Fully/Partially Verified - premium feature */}
                  {matchedProperty?.verified_badge !== "Not Verified" && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 rounded-b-2xl">
                      <p className="text-sm sm:text-base font-semibold text-slate-900 text-center">
                        {matchedProperty?.verified_badge === "Fully Verified" 
                          ? "🔓 Unlock Complete Property Intelligence" 
                          : "📋 Get Complete Verification Details"}
                      </p>
                      <p className="text-xs text-slate-600 text-center mt-1 max-w-md">
                        {matchedProperty?.verified_badge === "Fully Verified" 
                          ? "Full title report, encumbrance details, valuation, and ownership history"
                          : "Detailed document status, pending items, and risk assessment"}
                      </p>
                      <button
                        onClick={() => navigate(`/verification-report/${matchedProperty.property_id}`)}
                        className="mt-3 px-5 py-2.5 rounded-lg bg-brand-dark text-white font-medium hover:bg-brand transition"
                      >
                        {matchedProperty?.verified_badge === "Fully Verified" 
                          ? "Download Full Verification Report - ₹299" 
                          : "Download Partial Report - ₹199"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
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

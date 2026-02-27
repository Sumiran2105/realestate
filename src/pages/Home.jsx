import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import propertiesData from "../data/properties.json";
import {
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiLock,
  FiCheckCircle,
  FiFileText,FiZap, FiDroplet ,FiBarChart2,
  FiRefreshCw
  } from "react-icons/fi";
  import ScrollToTopButton from "../components/ScrollToTopButton";
  import OCRSection from "../components/OCRSection";
 
export default function Home() {
  const navigate = useNavigate();
  const listings = propertiesData?.listings || [];
  const [searchMode, setSearchMode] = useState("survey");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCityMandal, setSelectedCityMandal] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [passbookInput, setPassbookInput] = useState("");
  const [searched, setSearched] = useState(false);
  const [matchedProperty, setMatchedProperty] = useState(null);

  /* ================= HERO PARALLAX (UNCHANGED) ================= */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty(
        "--parallax",
        `${scrollY * 0.25}px`
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= APPLE STYLE TIMELINE SCROLL ================= */
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Scroll progress between 0 → 1
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / rect.height, 0),
        1
      );

      // Animate vertical line
      const line = timelineRef.current.querySelector(".timeline-line");
      if (line) {
        line.style.transform = `scaleY(${progress})`;
      }

      // Reveal timeline items smoothly
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const itemRect = item.getBoundingClientRect();
        const triggerPoint = windowHeight * 0.85;

        if (itemRect.top < triggerPoint) {
          item.style.opacity = 1;
          item.style.transform = "translateY(0)";
        } else {
          item.style.opacity = 0;
          item.style.transform = "translateY(60px)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const problems = [
    {
      title: "Buyers Cannot Independently Verify Ownership",
      desc: "Navigating Bhu Bharati, Meebhoomi, IGRS, and RERA individually leaves buyers without unified validation."
    },
    {
      title: "Fragmented Documentation Creates Information Asymmetry",
      desc: "Multiple government portals operate without integration, making due diligence complex."
    },
    {
      title: "Fraudulent & Duplicate Sales Increase Risk",
      desc: "Over 60% of disputes involve fraudulent sellers or duplicate transactions."
    },
    {
      title: "Financial Exposure Per Transaction",
      desc: "Legal disputes cost ₹5 - ₹15 lakhs per case, creating significant liability."
    }
  ];
  const telanganaIntegrationSlides = useMemo(
    () => [
      {
        title: "Bhu Bharati API",
        subtitle: "Land Records & Pattadar Data",
        description:
          "Fetches survey-linked ownership records, Pattadar details, land classification, extent, and core revenue attributes from Telangana’s integrated land records system enabling accurate title validation, ownership traceability, and risk assessment prior to property transactions.",
        logo: "/Bhubhartu.png",
      },
      {
        title: "IGRS TS",
        subtitle: "Registration & Stamps Department",
        description:
          "Validates registration history, past transaction records, encumbrance details, and stamp-duty compliance through Telangana’s Integrated Grievance & Registration System enabling early detection of title gaps, record inconsistencies, and transfer risks before execution of sale agreements.",
        logo: "/Igrs.png",
      },
      {
        title: "RERA TS",
        subtitle: "Project Registration Compliance",
        description:
          "Validates project registration status, promoter credentials, approval disclosures, and compliance filings under the Telangana Real Estate Regulatory Authority framework ensuring regulatory transparency and safeguarding buyers against unregistered or non-compliant plotted and development projects.",
        logo: "/TS Rera.png",
      },
      {
        title: "GHMC / HMDA",
        subtitle: "Municipal & Layout Approvals",
        description:
          "Verifies building permissions, municipal approvals, zoning classifications, and layout authorizations issued by Greater Hyderabad Municipal Corporation (GHMC) and Hyderabad Metropolitan Development Authority (HMDA)  ensuring urban regulatory compliance, approved development status, and protection against unauthorized constructions in metropolitan transactions.",
        logo: "/GHMC.png",
      },
      {
        title: "TSSPDCL",
        subtitle: "Electricity Verification",
        description:
          "Confirms active electricity connection status, service number authenticity, sanctioned load category, and billing consistency through Telangana State Southern Power Distribution Company Limited (TSSPDCL) systems strengthening utility-level due diligence and reducing transaction risk by validating occupancy and service continuity.",
        logo: "/TGSPDCL.png",
      },
    ],
    []
  );
  const andhraIntegrationSlides = useMemo(
    () => [
      {
        title: "Meebhoomi API",
        subtitle: "Land & Adangal Records",
        description:
          "Fetches Andhra Pradesh land records directly from Meebhoomi, including Adangal/Pahani data, survey details, ownership history, cultivation classification, and linked metadata enabling accurate due diligence, title validation, and risk assessment before property transactions.",
        logo: "/MeeBhoomi.png",
      },
      {
        title: "IGRS AP",
        subtitle: "Registration Office Data",
        description:
          "Verifies registration-side transaction records through the Integrated Grievance & Registration System (IGRS) of Andhra Pradesh, ensuring continuity of title history, validation of past sale deeds, encumbrance status checks, and accurate property transfer authentication for secure transactions.",
        logo: "/IgrsAp.png",
      },
      {
        title: "RERA AP",
        subtitle: "Real Estate Regulation",
        description:
          "Validates project-level registration, promoter credentials, approval status, and compliance disclosures under the Andhra Pradesh Real Estate Regulatory Authority (RERA) framework ensuring regulatory transparency, legal adherence, and reduced investment risk for buyers.",
        logo: "/APRera.png",
      },
      {
        title: "CRDA / DTCP",
        subtitle: "Development Approvals",
        description:
          "Validates layout approvals, zoning classifications, land use permissions, and development clearances issued by Andhra Pradesh Capital Region Development Authority (CRDA) and Directorate of Town and Country Planning Andhra Pradesh (DTCP) ensuring regulatory compliance, authorized plotting, and protection against unauthorized or non-conforming developments.",
        logo: "/APCrda.png",
      },
      {
        title: "APSPDCL",
        subtitle: "Power Verification",
        description:
          "Confirms active electricity connection status, service number authenticity, load category, and billing consistency through Andhra Pradesh Southern Power Distribution Company Limited (APSPDCL) systems adding an additional utility-level verification layer to assess occupancy validity and reduce transaction risk.",
        logo: "/APSPDCL.png",
      },
    ],
    []
  );
  const [activeTelanganaSlide, setActiveTelanganaSlide] = useState(0);
  const [activeAndhraSlide, setActiveAndhraSlide] = useState(0);
  const [isTelanganaPaused, setIsTelanganaPaused] = useState(false);
  const [isAndhraPaused, setIsAndhraPaused] = useState(false);

  useEffect(() => {
    if (!telanganaIntegrationSlides.length) return;
    const timer = setInterval(() => {
      if (isTelanganaPaused) return;
      setActiveTelanganaSlide((prev) => (prev + 1) % telanganaIntegrationSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [telanganaIntegrationSlides, isTelanganaPaused]);

  useEffect(() => {
    if (!andhraIntegrationSlides.length) return;
    const timer = setInterval(() => {
      if (isAndhraPaused) return;
      setActiveAndhraSlide((prev) => (prev + 1) % andhraIntegrationSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [andhraIntegrationSlides, isAndhraPaused]);

  const normalizeSurvey = (value) => String(value || "").toUpperCase().replace(/\s+/g, "");
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
    () => uniqueSorted(listings.map((item) => String(item?.location?.state || "").trim())),
    [listings]
  );

  const districtOptions = useMemo(
    () =>
      uniqueSorted(
        listings
          .filter((item) => String(item?.location?.state || "").trim() === selectedState)
          .map((item) => String(item?.location?.district || "").trim())
      ),
    [listings, selectedState]
  );

  const cityMandalOptions = useMemo(
    () =>
      uniqueSorted(
        listings
          .filter((item) => String(item?.location?.state || "").trim() === selectedState)
          .filter((item) => String(item?.location?.district || "").trim() === selectedDistrict)
          .map((item) => getCityOrMandal(item))
      ),
    [listings, selectedState, selectedDistrict]
  );

  const villageOptions = useMemo(
    () =>
      uniqueSorted(
        listings
          .filter((item) => String(item?.location?.state || "").trim() === selectedState)
          .filter((item) => String(item?.location?.district || "").trim() === selectedDistrict)
          .filter((item) => getCityOrMandal(item) === selectedCityMandal)
          .map((item) => getVillage(item))
      ),
    [listings, selectedState, selectedDistrict, selectedCityMandal]
  );

  const surveyOptions = useMemo(
    () =>
      uniqueSorted(
        listings
          .filter((item) => String(item?.location?.state || "").trim() === selectedState)
          .filter((item) => String(item?.location?.district || "").trim() === selectedDistrict)
          .filter((item) => getCityOrMandal(item) === selectedCityMandal)
          .filter((item) => getVillage(item) === selectedVillage)
          .flatMap((item) => getSurveyNumbers(item))
      ),
    [listings, selectedState, selectedDistrict, selectedCityMandal, selectedVillage]
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
      match = listings.find((item) => {
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
      match = listings.find((item) => normalizePassbook(getPassbookNumber(item)) === needle);
    }

    setMatchedProperty(match || null);
    setSearched(true);
  };

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">
      {/* <ScrollToTopButton /> */}

      {/* ================= HERO (UNCHANGED) ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 sm:pb-20">
  <div
    className="absolute inset-0 bg-cover bg-center will-change-transform"
    style={{
      backgroundImage: "url('/city.jpg')",
      transform: "translateY(var(--parallax)) scale(1.08)",
    }}
  ></div>
  <div className="relative text-center px-6 sm:px-6 max-w-5xl text-white">
    <div className="max-w-sm mx-auto mb-8 bg-white border  border-gray-600 rounded-xl px-6 py-3 shadow-md mt-2 ">
      <p className="uppercase tracking-[0.3em] text-xs text-gray-900 font-semibold text-center">
        ADVANCED SEARCH & DISCOVERY
      </p>
    </div>

    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold text-brand-dark">
      Find Verified Properties
      <span className="block text-brand-dark mt-3">
        With Complete Transparency
      </span>
    </h1>
    <p className="mt-8 text-base sm:text-lg text-gray-900 max-w-3xl mx-auto leading-relaxed">
      Search using location intelligence, structured property filters,
      and government backed verification criteria designed to
      eliminate risk and improve decision making.
    </p>
    <div className="mt-8 sm:mt-20 lg:mt-8 relative z-10 max-w-4xl mr-auto text-left p-4 sm:p-6 md:p-8 rounded-3xl bg-white/95 border border-white/20 shadow-[0_40px_120px_rgba(0,0,0,0.25)]"> 
    <h1 className="text-sm font-bold text-slate-900 text-center mb-3">Search By</h1>
      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
        
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
             Survey Number
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
             Pattadar  Number
          </label>
        </div>
      </div>
    </div>

    <div className="mt-3 relative z-10 max-w-4xl mr-auto text-left bg-white/95 backdrop-blur-xl rounded-3xl 
                    shadow-[0_40px_120px_rgba(0,0,0,0.25)] 
                    border border-white/20 p-6 sm:p-8 md:p-8 text-slate-800 
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
              setSelectedSurvey("");              clearSearchResult();
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
              setSelectedSurvey("");              clearSearchResult();
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
              setSelectedSurvey("");              clearSearchResult();
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
              setSelectedSurvey("");              clearSearchResult();
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
              setSelectedSurvey(e.target.value);              clearSearchResult();
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
            className="flex-1 hardgreen text-white py-3 sm:py-4 rounded-2xl
                       hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]
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
        <p className="mt-5 text-left text-sm text-red-600 font-medium">
          {searchMode === "survey"
            ? `No property found for selected survey number: "${selectedSurvey}".`
            : `No property found for passbook number: "${passbookInput}".`}
        </p>
      )}

      {matchedProperty && (
        <div className="mt-6 text-left bg-white rounded-2xl border border-slate-300 overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <p className="font-semibold text-slate-900 text-sm sm:text-base">
              SURVEY NUMBER: {matchedProperty?.government_approvals?.land_ownership?.survey_number || "-"}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Village: {matchedProperty?.location?.address?.split(",")?.[0] || "-"} · Mandal: {matchedProperty?.location?.zone || "-"} · District: {matchedProperty?.location?.district || "-"}
            </p>
          </div>

          <div className="p-5 border-b border-slate-200">
            {/* Dynamic verification badge with appropriate color coding */}
            {matchedProperty?.verified_badge === "Fully Verified" && (
              <p className="text-green-700 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                🔵 VERIFICATION STATUS: FULLY VERIFIED
              </p>
            )}
            {matchedProperty?.verified_badge === "Partially Verified" && (
              <p className="text-yellow-700 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                🟡 VERIFICATION STATUS: PARTIALLY VERIFIED
              </p>
            )}
            {matchedProperty?.verified_badge === "Not Verified" && (
              <p className="text-red-700 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                🔴 VERIFICATION STATUS: NOT VERIFIED
              </p>
            )}
            <p className="text-sm text-slate-700 mt-1">
              Risk Level: {
                matchedProperty?.verification_report_card?.overall_risk_score <= 2 ? "LOW" : 
                matchedProperty?.verification_report_card?.overall_risk_score <= 5 ? "MEDIUM" : "HIGH"
              } · Score: {
                matchedProperty?.verified_badge === "Fully Verified" ? "85-100" :
                matchedProperty?.verified_badge === "Partially Verified" ? "50-84" : "0-49"
              }/100
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
              <p>Survey Number: {matchedProperty?.government_approvals?.land_ownership?.survey_number || "-"}</p>
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
                <p className="text-sm text-slate-700">Total Area: {matchedProperty?.property_details?.plot_area_sq_yards || "-"} sq.yds</p>
                <p className="text-sm text-slate-700">Land Type: {matchedProperty?.property_details?.permissible_usage || "-"}</p>
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
                  className="mt-3 px-5 py-2.5 rounded-lg hardgreen text-white font-medium hover:opacity-95 transition"
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
                  className="mt-3 px-5 py-2.5 rounded-lg hardgreen text-white font-medium hover:opacity-95 transition"
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
      
     

      {/* ================= TIMELINE ================= */}
      <section className="relative py-12 bg-slate-50 overflow-hidden">

  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    {/* Title */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-semibold text-blue-900 tracking-tight">
        The Critical Market Problem
      </h2>
      <p className="mt-8 text-lg text-slate-600">
        Systemic inefficiencies create trust gaps and financial exposure.
      </p>
    </div>

    {/* Responsive Layout */}
    <div className="mt-24 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      {/* LEFT SIDE - Timeline */}
      <div ref={timelineRef} className="relative pl-0 sm:pl-8 md:pl-12 w-full">
        <div className="timeline-line"></div>
        <div className="md:space-y-12 space-y-10">
          {problems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative timeline-item"
            >
              <div className="timeline-dot absolute -left-[22px] sm:-left-[30px] md:-left-[38px] top-1 w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 bg-brand rounded-full"></div>
              <h3 className="text-lg sm:text-xl font-semibold text-brand-dark">
                {item.title}
              </h3>
              <p className="mt-4 text-slate-600 text-base sm:text-lg">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* RIGHT SIDE - Image */}
      <div className="relative flex justify-center items-center w-full mb-10 lg:mb-0">
        <img
          src="/Building.png"
          alt="Legal Land Documentation"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover"
        />
        {/* Optional subtle floating effect */}
        <div className="absolute -z-10 top-4 left-4 w-full h-full bg-brand/10 rounded-2xl hidden sm:block"></div>
      </div>
    </div>
  </div>
</section>


{/* ================= OUR COMPREHENSIVE SOLUTION ================= */}
<section className="relative py-12 bg-slate-50 overflow-hidden">

  

  <div className="relative max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto">
      <p className="uppercase tracking-widest text-sm text-brand mb-4">
        The Solution
      </p>

      <h2 className="text-4xl md:text-5xl font-semibold text-blue-900 tracking-tight">
        Our Comprehensive Platform
      </h2>

      <p className="mt-8 text-lg text-slate-600 leading-relaxed">
        A unified, blockchain backed verification ecosystem designed to
        restore trust, eliminate risk, and modernize property transactions.
      </p>
    </div>

    {/* ================= FEATURED CORE ENGINE ================= */}
   

<div className="mt-24 relative bg-gradient-to-br from-brand-soft to-white 
                rounded-3xl p-14 shadow-[0_40px_120px_rgba(0,0,0,0.08)] overflow-hidden">

  {/* RIGHT SIDE LOGO STACK */}
  <div className="absolute top-10 right-10 hidden lg:flex flex-col items-end gap-6">

    <p className="text-xs uppercase tracking-wider text-slate-400">
      Integrated With
    </p>

    {/* Row 1 */}
    <div className="flex items-center gap-6">
      <img
        src="/MeeBhoomi.png"
        alt="Andhra Pradesh Government"
        className="h-20 object-contain opacity-80 hover:opacity-100 transition duration-300"
      />
      <img
        src="/TS Rera.png"
        alt="Telangana RERA"
        className="h-20 object-contain opacity-80 hover:opacity-100 transition duration-300"
      />
    </div>

    {/* Row 2 */}
    <div className="flex items-center gap-6">
      <img
        src="/APSPDCL.png"
        alt="Mee Bhoomi Portal"
        className="h-20 object-contain opacity-70 hover:opacity-100 transition duration-300"
      />
      <img
        src="/TGSPDCL.png"
        alt="Dharani Portal"
        className="h-20 object-contain opacity-70 hover:opacity-100 transition duration-300"
      />
    </div>

  </div>

  {/* CONTENT */}
  <div className="max-w-4xl">
    <h3 className="text-3xl font-semibold text-brand-dark">
      Automated Legal Verification Engine
    </h3>

    <p className="mt-6 text-lg text-slate-600 leading-relaxed">
      Direct government API integration enables instant ownership
      verification, encumbrance checks, RERA validation,
      and document authentication removing ambiguity
      from high value property decisions.
    </p>

    {/* HIGHLIGHTED FEATURES */}
    <div className="mt-12 grid md:grid-cols-3 gap-6">

      {[
        "Ownership Cross Verification",
        "Encumbrance Certificate Validation",
        "Survey & Land Record Confirmation"
      ].map((item, index) => (
        <div
          key={index}
          className="group bg-white rounded-xl p-6 border border-brand/10 
                     shadow-sm hover:shadow-xl hover:-translate-y-1
                     transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            
            <FiCheckCircle className="text-brand text-xl mt-1 
                                      group-hover:scale-110 transition" />

            <div className="text-brand-dark font-semibold text-base leading-snug">
              {item}
            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
</div>

    {/* ================= SUPPORTING FEATURES ================= */}
  
   <div className="grid md:grid-cols-2 gap-8 mt-16">

  {[
    {
      icon: <FiShield />,
      title: "Automated Legal Verification",
      desc: "Seamless government API integrations make it possible to authenticate ownership in real time, analyze encumbrances, and validate documents, ensuring that all property transactions are completed in a legally sound and risk-free manner with immediate accuracy",
      color: "text-blue-600"
    },
    {
      icon: <FiTrendingUp />,
      title: "Price Intelligence Engine",
      desc: "AI-driven valuation models analyze comparable sales data, market demand trends, and infrastructure growth signals to deliver accurate, data-backed property pricing insights in real time.",
      color: "text-purple-600"
    },
    {
      icon: <FiUsers />,
      title: "Trusted Agent Network",
      desc: "A curated network of performance-rated professionals with verified credentials, transparent track records, and accountability driven workflows ensuring trustworthy guidance and seamless transaction execution.",
      color: "text-emerald-600"
    },
    {
      icon: <FiLock />,
      title: "Secure Escrow Framework",
      desc: "A blockchain-enabled, token governed escrow system that securely locks funds,automates the release of funds based on milestones, ensures compliance checks, and incorporates a dispute resolution system minimizing risks associated with counterparty transactions while ensuring transparent and tamper proof transactions",
      color: "text-pink-600"
    },
    {
      icon: <FiFileText />,
      title: "Legal Document Automation",
      desc: "Auto-generated, legally compliant agreements customized for Telangana (TS) and Andhra Pradesh (AP), dynamically tailored to transaction type, regulatory requirements, and property specifics reducing errors, delays, and legal risk.",
      color: "text-yellow-600"
    },
    {
      icon: <FiRefreshCw />,
      title: "Post-Sale Services",
      desc: "End-to-end post transaction support including mutation tracking, property tax integration, ownership record updates, and ongoing lifecycle assistance ensuring a smooth transition even after the deal is closed.",
      color: "text-indigo-600"
    }
  ].map((feature, index) => (
    <div
      key={index}
      className="group bg-brand-soft/40 backdrop-blur-sm
                 border border-brand/10 rounded-2xl p-6
                 shadow-sm hover:shadow-md
                 transition-all duration-300"
    >

      {/* ICON */}
      <div className="w-10 h-10 flex items-center justify-center 
                      rounded-lg bg-brand/10 text-brand text-xl
                      group-hover:bg-brand group-hover:text-white
                      transition-all duration-300">
        {feature.icon}
      </div>

      {/* TITLE */}
      <h3 className={`mt-4 text-lg font-semibold ${feature.color}`}>
        {feature.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        {feature.desc}
      </p>

    </div>
  ))}

</div>

  </div>
</section>

<section className="relative py-12 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    {/* MAIN HEADING */}
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-semibold text-blue-900 tracking-tight">
        Government API Integration Strategy
      </h2>

      <p className="mt-6 text-lg text-slate-600 leading-relaxed">
        Our platform integrates directly with authoritative government
        databases across Telangana and Andhra Pradesh, forming the backbone
        of our automated verification engine. This enables real-time access
        to land records, registration data, and regulatory compliance systems.
      </p>
    </div>

    {/* TELANGANA INTEGRATIONS SLIDER */}
    <div className="mt-20 max-w-5xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <img
          src="/TGlogo.png"
          alt="Telangana Government"
          className="h-10 object-contain"
        />
        <h3 className="text-3xl font-semibold text-yellow-800">
          Telangana Integrations
        </h3>
      </div>

      <div
        className="mt-8 overflow-hidden"
        onMouseEnter={() => setIsTelanganaPaused(true)}
        onMouseLeave={() => setIsTelanganaPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeTelanganaSlide * 100}%)` }}
        >
          {telanganaIntegrationSlides.map((slide, index) => (
            <div key={index} className="w-full shrink-0 px-1">
              <div className="bg-white/80 backdrop-blur-md border-2 border-slate-400 rounded-3xl p-8 shadow-sm text-center">
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={slide.logo || "/TG Logo.png"}
                    alt="Telangana Government"
                    className="h-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/TG Logo.png";
                    }}
                  />
                  <h4 className="text-2xl font-semibold text-slate-900">{slide.title}</h4>
                </div>
                <p className="mt-3 text-sm font-semibold text-brand-dark text-center bg-brand/10 border border-brand/20 rounded-full px-4 py-1 inline-block mx-auto">
                  {slide.subtitle}
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed text-center">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {telanganaIntegrationSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveTelanganaSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              activeTelanganaSlide === index ? "w-7 hardgreen" : "w-2.5 bg-slate-300"
            }`}
            aria-label={`Go to Telangana slide ${index + 1}`}
          />
        ))}
      </div>
    </div>

    {/* ANDHRA PRADESH INTEGRATIONS SLIDER */}
    <div className="mt-14 max-w-5xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <img
          src="/Ap logo2 .png"
          alt="Andhra Pradesh Government"
          className="h-10 object-contain"
        />
        <h3 className="text-3xl font-semibold text-emerald-800">
          Andhra Pradesh Integrations
        </h3>
      </div>

      <div
        className="mt-8 overflow-hidden"
        onMouseEnter={() => setIsAndhraPaused(true)}
        onMouseLeave={() => setIsAndhraPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeAndhraSlide * 100}%)` }}
        >
          {andhraIntegrationSlides.map((slide, index) => (
            <div key={index} className="w-full shrink-0 px-1">
              <div className="bg-white/80 backdrop-blur-md border-2 border-slate-400 rounded-3xl p-8 shadow-sm text-center">
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={slide.logo || "/Ap logo2 .png"}
                    alt="Andhra Pradesh Government"
                    className="h-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/Ap logo2 .png";
                    }}
                  />
                  <h4 className="text-2xl font-semibold text-slate-900">{slide.title}</h4>
                </div>
                <p className="mt-3 text-sm font-semibold text-brand-dark text-center bg-brand/10 border border-brand/20 rounded-full px-4 py-1 inline-block mx-auto">
                  {slide.subtitle}
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed text-center">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {andhraIntegrationSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveAndhraSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              activeAndhraSlide === index ? "w-7 hardgreen" : "w-2.5 bg-slate-300"
            }`}
            aria-label={`Go to Andhra slide ${index + 1}`}
          />
        ))}
      </div>
    </div>

    {/* THIRD PARTY INTEGRATIONS */}
    <div className="mt-20 max-w-5xl mx-auto">
      <div className="bg-brand-soft/40 rounded-2xl p-8 border border-brand/10 text-center">
        <p className="text-slate-700 leading-relaxed">
          Beyond government systems, we integrate with trusted third party
          providers including <strong>Karza</strong>, <strong>Surepass</strong>,
          <strong> DigiLocker</strong>, and <strong>CERSAI</strong> to ensure
          multi layered verification across identity, document authentication,
          and SARFAESI compliance checks.
        </p>
      </div>
    </div>

  </div>
</section>




<section className="relative py-12 bg-slate-50 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    {/* SECTION HEADER */}
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-semibold text-blue-900 tracking-tight">
        Comprehensive Regulatory & Compliance Verification
      </h2>

      <p className="mt-6 text-lg text-slate-600 leading-relaxed">
        Our platform integrates with state RERA authorities, municipal approval
        systems, and utility boards to ensure complete regulatory validation
        protecting buyers from legal, structural, and financial risks.
      </p>
    </div>

    {/* 3 MAIN MODULES */}
    <div className="mt-20 grid lg:grid-cols-3 gap-10">

      {/* RERA CARD */}
      <div className="group bg-white/80 backdrop-blur-md 
                      border border-slate-500 rounded-3xl p-8
                      shadow-sm hover:shadow-2xl hover:-translate-y-2
                      transition-all duration-500">

        <h3 className="text-2xl font-semibold text-green-800">
          RERA Verification
        </h3>

        <p className="mt-4 text-slate-600 text-sm leading-relaxed">
          Validate project registration, builder credentials, and compliance
          history through state RERA databases (TS & AP).
        </p>

        <div className="mt-6 space-y-3 text-slate-600 text-sm">
          {[
            "Registration & status validation",
            "Completion & unit sales check",
            "Escrow compliance review",
            "Complaint & violation tracking"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <FiCheckCircle className="text-brand mt-1" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MUNICIPAL CARD */}
      <div className="group bg-white/80 backdrop-blur-md 
                      border border-slate-500 rounded-3xl p-8
                      shadow-sm hover:shadow-2xl hover:-translate-y-2
                      transition-all duration-500">

        <h3 className="text-2xl font-semibold text-blue-800">
          Municipal Approvals
        </h3>

        <p className="mt-4 text-slate-600 text-sm leading-relaxed">
          Verify building permissions, occupancy certificates,
          and layout approvals through GHMC, HMDA, DTCP systems.
        </p>

        <div className="mt-6 space-y-3 text-slate-600 text-sm">
          {[
            "Building permission validation",
            "Occupancy certificate (OC) check",
            "Layout & OSA compliance",
            "Development authority approvals"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <FiCheckCircle className="text-brand mt-1" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* UTILITY CARD */}
      <div className="group bg-white/80 backdrop-blur-md 
                      border border-slate-500 rounded-3xl p-8
                      shadow-sm hover:shadow-2xl hover:-translate-y-2
                      transition-all duration-500">

        <h3 className="text-2xl font-semibold text-purple-800">
          Utility Verification
        </h3>

        <p className="mt-4 text-slate-600 text-sm leading-relaxed">
          Confirm active electricity and water connections,
          ensuring no outstanding dues or service issues.
        </p>

        <div className="mt-6 space-y-3 text-slate-600 text-sm">
          {[
            "Electricity service number validation",
            "Sanctioned load verification",
            "Water connection & dues check",
            "Pending bill identification"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <FiCheckCircle className="text-brand mt-1" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* OUTCOME NOTE */}
    <div className="mt-20 max-w-5xl mx-auto text-center">
      <div className="bg-brand-soft/40 rounded-2xl p-8 border border-brand/10">
        <p className="text-slate-700 leading-relaxed">
          Properties that pass all compliance layers receive verified badges
          (RERA Verified, Approval Cleared, Utility Verified), enabling buyers
          to make confident, risk free property decisions.
        </p>
      </div>
    </div>

  </div>
</section>


    {/* Document Verification */}
<OCRSection />

<section className="relative py-12 bg-gradient-to-b from-slate-50 to-white">

  <div className="max-w-7xl mx-auto px-8">

    {/* CENTERED HEADER */}
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-blue-900 tracking-tight">
        Comprehensive Verification Report
      </h2>

      <p className="mt-6 text-lg text-slate-600 leading-relaxed">
        A structured intelligence report synthesizing ownership validation,
        compliance checks, legal history, AI driven risk signals, and market
        insights into one decision ready system output.
      </p>
    </div>

    {/* GRID */}
    <div className="mt-20 grid md:grid-cols-2 gap-10">

      {[
        {
          no: "01",
          title: "Property Identity",
          desc: "A unified digital identity layer capturing survey number, geo-tagged address, GPS coordinates, land classification, and jurisdictional mapping creating a single source of truth that eliminates ambiguity and ensures precise property traceability across verification systems.",
          accent: "bg-blue-400"
        },
        {
          no: "02",
          title: "Ownership Verification",
          desc: "Authenticates current ownership details, ownership structure (individual, joint, inherited, or corporate), and assigns a dynamic validation confidence score based on cross verified government records ensuring title clarity and minimizing transfer risk before transaction execution.",
          accent: "bg-purple-400"
        },
        {
          no: "03",
          title: "Legal History",
          desc: "Comprehensive transaction trail mapping, encumbrance tracking, lien analysis, and litigation flag checks delivering a clear historical ownership timeline and risk visibility to prevent disputes and ensure clean title transfers.",
          accent: "bg-emerald-400"
        },
        {
          no: "04",
          title: "Compliance Status",
          desc: "Comprehensive transaction trail mapping, encumbrance tracking, lien analysis, and litigation flag checks delivering a clear historical ownership timeline and risk visibility to prevent disputes and ensure clean title transfers.",
          accent: "bg-orange-400"
        },
        {
          no: "05",
          title: "Risk Assessment",
          desc: "An AI-powered legal risk engine that generates a dynamic risk score by analyzing title data, transaction patterns, regulatory records, and anomaly detection signals  enabling proactive identification of red flags before deal closure.",
          accent: "bg-red-400"
        },
        {
          no: "06",
          title: "Market Intelligence",
          desc: "Delivers real-time price ranges, 6-month movement trends, demand signals, and comparable property benchmarks empowering buyers and investors with data-driven insights for confident pricing and negotiation decisions.",
          accent: "bg-cyan-400"
        }
      ].map((item, index) => (
        <div
          key={index}
          className="group relative rounded-2xl p-8 bg-white
                     shadow-md border border-slate-200
                     hover:shadow-xl hover:-translate-y-2
                     transition-all duration-500"
        >
          {/* Top Accent Bar */}
          <div className={`absolute top-0 left-0 h-1 w-full ${item.accent} rounded-t-2xl`} />

          {/* NUMBER + TITLE SAME LINE */}
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 flex items-center justify-center
                             rounded-full text-white text-sm font-semibold
                             ${item.accent} shadow-md`}>
              {item.no}
            </div>

            <h3 className="text-xl font-semibold text-slate-900">
              {item.title}
            </h3>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-5 text-slate-600 leading-relaxed text-sm">
            {item.desc}
          </p>

          {/* Risk badges inside risk card */}
          {item.title === "Risk Assessment" && (
            <div className="mt-6 flex gap-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                Low
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                Medium
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                High
              </span>
            </div>
          )}

        </div>
      ))}

    </div>

  </div>
</section>

<section className="relative py-12 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden">

  {/* Soft Background Accent */}
  <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 
                  w-[900px] h-[900px] 
                  bg-brand/5 rounded-full blur-[140px] -z-10" />

  <div className="max-w-7xl mx-auto px-6">

    {/* HEADER */}
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-blue-900 tracking-tight">
        Freemium Model Strategy
      </h2>

      <p className="mt-6 text-lg text-slate-600 leading-relaxed">
        Start free. Upgrade when you're ready. Designed to scale with your
        property journey — from exploration to transaction execution.
      </p>
    </div>

    {/* PRICING GRID */}
    <div className="mt-20 grid md:grid-cols-3 gap-8 items-stretch">

      {/* FREE */}
      <div className="group bg-white border border-slate-200 
                      rounded-2xl p-8 shadow-sm 
                      hover:shadow-xl hover:-translate-y-2
                      transition-all duration-500">

        <h3 className="text-lg font-semibold text-slate-900">
          Free
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Ideal for exploration
        </p>

        <div className="mt-6 text-4xl font-bold text-slate-900">
          ₹0
        </div>

        <ul className="mt-8 space-y-3 text-sm text-slate-600">
          <li>✓ Unlimited listing browsing</li>
          <li>✓ Basic search & filters</li>
          <li>✓ 3 seller contacts / month</li>
          <li>✓ Save 10 favorites</li>
          <li>✓ Basic verification badge</li>
        </ul>

        <button className="mt-10 w-full py-3 rounded-xl 
                           border border-slate-300 
                           font-semibold text-slate-900
                           hover:border-slate-900
                           transition-all duration-300">
          Get Started
        </button>
      </div>

      {/* PREMIUM BUYERS (FEATURED) */}
      <div className="relative group bg-white border-2 border-brand 
                      rounded-2xl p-8 shadow-xl 
                      hover:-translate-y-3 transition-all duration-500">

        {/* Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 
                        bg-brand-dark text-white text-xs font-semibold 
                        px-5 py-1.5 rounded-full shadow-md tracking-wide">
          MOST POPULAR
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          Premium Buyers
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Serious due diligence
        </p>

        <div className="mt-6 text-4xl font-bold text-brand">
          ₹499
          <span className="text-sm text-slate-500 font-normal"> /month</span>
        </div>

        <ul className="mt-8 space-y-3 text-sm text-slate-700">
          <li>✓ Unlimited seller contacts</li>
          <li>✓ 2 AI verification reports / month</li>
          <li>✓ Real-time price alerts</li>
          <li>✓ Priority chat support</li>
          <li>✓ Unlimited property comparison</li>
        </ul>

        <div className="mt-6 text-xs text-slate-500">
          Avoid costly legal mistakes with AI-backed insights.
        </div>

        <button className="mt-8 w-full py-3 rounded-xl 
                           hardgreen text-white font-semibold 
                           shadow-md hover:shadow-lg 
                           hover:opacity-95 transition-all duration-300">
          Upgrade Now
        </button>
      </div>

      {/* PREMIUM SELLERS */}
      <div className="group bg-white border border-slate-200 
                      rounded-2xl p-8 shadow-sm 
                      hover:shadow-xl hover:-translate-y-2
                      transition-all duration-500">

        <h3 className="text-lg font-semibold text-slate-900">
          Premium Sellers
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Maximize visibility
        </p>

        <div className="mt-6 text-4xl font-bold text-slate-900">
          ₹999
          <span className="text-sm text-slate-500 font-normal"> /month</span>
        </div>

        <ul className="mt-8 space-y-3 text-sm text-slate-600">
          <li>✓ Unlimited listings</li>
          <li>✓ Featured placement</li>
          <li>✓ Advanced analytics dashboard</li>
          <li>✓ Lead quality scoring</li>
          <li>✓ Bulk messaging tools</li>
        </ul>

        <button className="mt-10 w-full py-3 rounded-xl 
                           border border-slate-300 
                           font-semibold text-slate-900
                           hover:border-slate-900
                           transition-all duration-300">
          Become Seller Pro
        </button>
      </div>

    </div>

  </div>
</section>
    </div>
  );
}

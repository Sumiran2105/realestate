import { useEffect, useRef } from "react";
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
  import { motion } from "framer-motion";
  import PropertyCard from "../components/properties/PropertyCard";
  import propertiesData from "../data/properties.json";
  import { Link } from "react-router-dom";
export default function Home() {

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
      desc: "Navigating Dharani, Meebhoomi, IGRS, and RERA individually leaves buyers without unified validation."
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
      desc: "Legal disputes cost ₹5–15 lakhs per case, creating significant liability."
    }
  ];

  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">
      <ScrollToTopButton />

      {/* ================= HERO (UNCHANGED) ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <div className="mt-16 sm:mt-20 relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl 
                          shadow-[0_40px_120px_rgba(0,0,0,0.25)] 
                          border border-white/20 p-4 sm:p-8 md:p-10 text-slate-800 
                          transition-all duration-500 hover:shadow-[0_50px_150px_rgba(0,0,0,0.35)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <input
                type="text"
                placeholder="City, District, Mandal, Locality..."
                className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200 
                          focus:ring-2 focus:ring-brand focus:border-brand 
                          outline-none transition w-full"
              />
              <select className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200 
                                focus:ring-2 focus:ring-brand focus:border-brand 
                                outline-none transition w-full">
                <option>Budget Range</option>
                <option>₹10L - ₹25L</option>
                <option>₹25L - ₹50L</option>
                <option>₹50L - ₹1Cr</option>
                <option>₹1Cr - ₹5Cr+</option>
              </select>
              <select className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200 
                                focus:ring-2 focus:ring-brand focus:border-brand 
                                outline-none transition w-full">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Land</option>
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
                <option>Furnishing Status</option>
                <option>Unfurnished</option>
                <option>Semi Furnished</option>
                <option>Fully Furnished</option>
              </select>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {[
                "Verified Owners Only",
                "Clear Title",
                "RERA Approved",
                "Municipal Approved",
                "Ready for Bank Loan",
                "Immediate Possession",
              ].map((item, index) => (
                <button
                  key={index}
                  className="px-5 py-2 rounded-full text-sm 
                             bg-brand-soft text-brand-dark 
                             border border-brand-light 
                             hover:bg-brand-light transition"
                >
                  ✓ {item}
                </button>
              ))}
            </div>
            {/* Search Button */}
            <button
              className="mt-10 w-full bg-brand-dark text-white py-4 sm:py-5 rounded-2xl
                         hover:bg-brand hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-300 font-semibold text-lg 
                         shadow-xl"
            >
              Search Verified Properties
            </button>
          </div>
        </div>
      </section>
      
      {/* ================= Featured Properties (NEW) ================= */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 flex flex-col items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">Featured Properties</h2>
            <p className="text-dark">Discover our top picks for you</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertiesData?.listings?.slice(0, 4).map((prop) => (
              <PropertyCard
                key={prop.property_id}
                property={prop}
                viewMode="card"
                isFavorite={false}
                onToggleFavorite={() => {}}
                formatPrice={(n) =>
                  typeof n === 'number'
                    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
                    : n
                }
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/properties" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">View All Properties</Link>
          </div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="relative py-32 bg-slate-50 overflow-hidden">

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
        <div className="space-y-20">
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
          src="/Land.png"
          alt="Legal Land Documentation"
          className="rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover"
        />
        {/* Optional subtle floating effect */}
        <div className="absolute -z-10 top-4 left-4 w-full h-full bg-brand/10 rounded-2xl hidden sm:block"></div>
      </div>
    </div>
  </div>
</section>


{/* ================= OUR COMPREHENSIVE SOLUTION ================= */}
<section className="relative py-15 bg-slate-50 overflow-hidden">

  

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
        A unified, blockchain-backed verification ecosystem designed to
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
        src="/Ap logo.png"
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
      and document authentication — removing ambiguity
      from high-value property decisions.
    </p>

    {/* HIGHLIGHTED FEATURES */}
    <div className="mt-12 grid md:grid-cols-3 gap-6">

      {[
        "Ownership Cross-Verification",
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
      desc: "Direct government API integration provides instant ownership verification, encumbrance checks, and document validation.",
      color: "text-blue-600"
    },
    {
      icon: <FiTrendingUp />,
      title: "Price Intelligence Engine",
      desc: "AI-driven valuation models analyze comparable sales and infrastructure growth signals.",
      color: "text-purple-600"
    },
    {
      icon: <FiUsers />,
      title: "Trusted Agent Network",
      desc: "Performance-rated professionals with verified credentials and transaction transparency.",
      color: "text-emerald-600"
    },
    {
      icon: <FiLock />,
      title: "Secure Escrow Framework",
      desc: "Token-based safeguards protecting buyers and sellers during transactions.",
      color: "text-pink-600"
    },
    {
      icon: <FiFileText />,
      title: "Legal Document Automation",
      desc: "Auto-generated agreements tailored for TS & AP.",
      color: "text-yellow-600"
    },
    {
      icon: <FiRefreshCw />,
      title: "Post-Sale Services",
      desc: "Mutation tracking, tax integration, and lifecycle support.",
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

<section className="relative py-32 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
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

    {/* STATE INTEGRATIONS */}
    <div className="mt-20 grid md:grid-cols-2 gap-12">

      {/* TELANGANA CARD */}
      <div className="group relative bg-white/70 backdrop-blur-md 
                      border border-slate-500 rounded-3xl p-10
                      shadow-sm hover:shadow-2xl hover:-translate-y-2
                      transition-all duration-500">

        <div className="flex items-center gap-4">
          <img
            src="/TG Logo.png"
            alt="Telangana Government"
            className="h-20 object-contain opacity-90"
          />
          <h3 className="text-2xl font-semibold text-yellow-800">
            Telangana Integrations
          </h3>
        </div>

        <div className="mt-8 space-y-5 text-slate-600">
          {[
            "Dharani API - Land records & pattadar data",
            "IGRS TS - Registration & stamps department",
            "RERA TS - Project registration compliance",
            "GHMC / HMDA - Municipal approvals",
            "TSSPDCL - Electricity verification"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FiCheckCircle className="text-brand text-lg mt-1" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ANDHRA PRADESH CARD */}
      <div className="group relative bg-white/70 backdrop-blur-md 
                      border border-slate-500 rounded-3xl p-10
                      shadow-sm hover:shadow-2xl hover:-translate-y-2
                      transition-all duration-500">

        <div className="flex items-center gap-4">
          <img
            src="/Ap logo2 .png"
            alt="Andhra Pradesh Government"
            className="h-20 object-contain opacity-90"
          />
          <h3 className="text-2xl font-semibold text-emerald-800">
            Andhra Pradesh Integrations
          </h3>
        </div>

        <div className="mt-8 space-y-5 text-slate-600">
          {[
            "Meebhoomi API - Land & Adangal records",
            "IGRS AP - Registration office data",
            "RERA AP - Real estate regulation",
            "CRDA / DTCP - Development approvals",
            "APSPDCL - Power verification"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FiCheckCircle className="text-brand text-lg mt-1" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* THIRD PARTY INTEGRATIONS */}
    <div className="mt-20 max-w-5xl mx-auto">
      <div className="bg-brand-soft/40 rounded-2xl p-8 border border-brand/10 text-center">
        <p className="text-slate-700 leading-relaxed">
          Beyond government systems, we integrate with trusted third-party
          providers including <strong>Karza</strong>, <strong>Surepass</strong>,
          <strong> DigiLocker</strong>, and <strong>CERSAI</strong> to ensure
          multi-layered verification across identity, document authentication,
          and SARFAESI compliance checks.
        </p>
      </div>
    </div>

  </div>
</section>




<section className="relative py-15 bg-slate-50 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    {/* SECTION HEADER */}
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-semibold text-blue-900 tracking-tight">
        Comprehensive Regulatory & Compliance Verification
      </h2>

      <p className="mt-6 text-lg text-slate-600 leading-relaxed">
        Our platform integrates with state RERA authorities, municipal approval
        systems, and utility boards to ensure complete regulatory validation —
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
          to make confident, risk-free property decisions.
        </p>
      </div>
    </div>

  </div>
</section>


    {/* Document Verification */}
<OCRSection />

<section className="relative py-15 bg-gradient-to-b from-slate-50 to-white">

  <div className="max-w-7xl mx-auto px-8">

    {/* CENTERED HEADER */}
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-blue-900 tracking-tight">
        Comprehensive Verification Report
      </h2>

      <p className="mt-6 text-lg text-slate-600 leading-relaxed">
        A structured intelligence report synthesizing ownership validation,
        compliance checks, legal history, AI-driven risk signals, and market
        insights into one decision-ready system output.
      </p>
    </div>

    {/* GRID */}
    <div className="mt-20 grid md:grid-cols-2 gap-10">

      {[
        {
          no: "01",
          title: "Property Identity",
          desc: "Survey number, address, GPS coordinates and property classification.",
          accent: "bg-blue-600"
        },
        {
          no: "02",
          title: "Ownership Verification",
          desc: "Current owner, ownership type and validation confidence score.",
          accent: "bg-purple-600"
        },
        {
          no: "03",
          title: "Legal History",
          desc: "Transaction trail, encumbrance mapping and litigation checks.",
          accent: "bg-emerald-600"
        },
        {
          no: "04",
          title: "Compliance Status",
          desc: "RERA validation, municipal approvals and utility authentication.",
          accent: "bg-orange-500"
        },
        {
          no: "05",
          title: "Risk Assessment",
          desc: "AI-derived legal risk score with anomaly detection signals.",
          accent: "bg-red-600"
        },
        {
          no: "06",
          title: "Market Intelligence",
          desc: "Live price range, 6-month movement trend and comparables.",
          accent: "bg-cyan-600"
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

<section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden">

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
                           bg-brand-dark text-white font-semibold 
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

    {/* TRUST STRIP — Refined */}
    <div className="mt-24 flex justify-center">
      <div className="flex flex-wrap items-center gap-8 
                      bg-white border border-slate-200 
                      rounded-full px-10 py-4 shadow-sm">

        <span className="text-sm text-slate-600">✓ Cancel Anytime</span>
        <span className="text-sm text-slate-600">✓ Secure Payments</span>
        <span className="text-sm text-slate-600">✓ Government Data Integrated</span>

      </div>
    </div>

  </div>
</section>
    </div>
  );
}
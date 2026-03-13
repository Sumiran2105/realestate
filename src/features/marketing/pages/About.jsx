import React from "react";
import {
  FaBalanceScale,
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
  FaSearch,
  FaChartBar,
  FaHandshake,
  FaLock,
  FaFileAlt,
  FaHome,
  FaExclamationTriangle,
  FaCheckCircle,
  FaList,
  FaUserTie,
} from "react-icons/fa";

const AboutPage = () => {
  const marqueeStyle = `
    @keyframes scroll-left {
      from { transform: translateX(100%); }
      to { transform: translateX(-100%); }
    }
    .marquee-wrapper {
      overflow: hidden;
      width: 100%;
    }
    .marquee-content {
      display: flex;
      gap: 1rem;
      animation: scroll-left 50s linear infinite;
      will-change: transform;
      width: fit-content;
    }
  `;
 
  // Data with React Icons
  const stats = [
    { icon: <FaBalanceScale />, value: "60%", label: "Fraud disputes" },
    { icon: <FaMoneyBillWave />, value: "₹5–15L", label: "Legal cost avg" },
    { icon: <FaUsers />, value: "50K+", label: "Active users" },
    { icon: <FaChartLine />, value: "₹21.89Cr", label: "Y2 Revenue" },
  ];
 
  const features = [
    { icon: <FaSearch />, title: "Automated Legal Verification", desc: "Instant checks against Bhu Bharati, Meebhoomi, IGRS, RERA." },
    { icon: <FaChartBar />, title: "AI Price Intelligence", desc: "ML-powered fair price estimates & market trends." },
    { icon: <FaHandshake />, title: "Trusted Agent Network", desc: "Verified professionals with performance ratings." },
    { icon: <FaLock />, title: "Secure Escrow", desc: "Token amount protection for both parties." },
    { icon: <FaFileAlt />, title: "Legal Document Automation", desc: "Compliant sale agreements for TS & AP." },
    { icon: <FaHome />, title: "Post‑Sale Services", desc: "Mutation tracking, tax payments, support." },
  ];
 
  const techItems = [
    "Bhu Bharati",
    "Meebhoomi",
    "IGRS",
    "RERA",
    "GHMC",
    "Electricity",
    "DigiLocker",
    "CERSAI",
  ];
 
  const roadmap = [
    { year: "Q2 2024", title: "Hyderabad Launch", desc: "5K downloads, 500 listings" },
    { year: "Q4 2024", title: "Telangana Expansion", desc: "Warangal, Nizamabad, Karimnagar" },
    { year: "Q2 2025", title: "Andhra Pradesh", desc: "Meebhoomi & IGRS AP deep integration" },
    { year: "2026", title: "Advanced Features", desc: "Blockchain, AR/VR, AI analytics" },
  ];
 
  const visionStats = [
    { value: "₹75Cr", label: "Year 3 Revenue" },
    { value: "200K", label: "Active Users" },
    { value: "60K", label: "Verified Listings" },
  ];
 
  // Builder onboarding steps (text only – no emojis)
  const builderSteps = [
    { step: "1", title: "Documentation", desc: "Company registration certificate, RERA project registration, GST certificate, sample project photos and brochures, bank account details" },
    { step: "2", title: "Verification", desc: "Cross-check all documents against government databases, verify RERA compliance, validate GST registration, confirm bank account ownership" },
    { step: "3", title: "Dashboard Setup", desc: "Project listings management, lead management (unit-wise inquiries), inventory status tracking (sold/available units), payment integration" },
    { step: "4", title: "Premium Features", desc: "Featured project listings on homepage, video ads (30-second promos), email campaigns to matched buyers, analytics dashboard" },
  ];
 
  // Lead marketplace steps (text only – no emojis)
  const leadSteps = [
    { number: 1, title: "Requirement Submission", desc: "Buyer submits property requirements anonymously through the platform" },
    { number: 2, title: "Smart Matching", desc: "System matches requirements with relevant properties and qualified agents" },
    { number: 3, title: "Agent Bidding", desc: "Agents bid for the lead by paying ₹500–₹2,000 based on lead quality score" },
    { number: 4, title: "Buyer Selection", desc: "Buyer reviews agent profiles and selects preferred agent" },
    { number: 5, title: "Contact Unlock", desc: "System unlocks buyer contact information to winning agent" },
  ];
 
  return (
    <>
      <style>{marqueeStyle}</style>
      {/* Hero Section */}
      <section
        className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(219, 234, 254, 0.6)), url('/Land2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-dark-500 font-semibold tracking-widest text-sm">
              OUR PURPOSE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mt-4 mb-6 text-dark-900">
              Trust, <span className="text-blue-600">Verified.</span>
              <br />
              Real Estate, Simplified.
            </h1>
            <p className="text-lg text-slate-800 max-w-2xl mx-auto mb-8">
              To promote transparency in the real estate sector by maintaining an online platform for property verification, ensuring that buyers can make informed decisions based on accurate and up-to-date information.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition">
                <FaHome className="text-base" /> 50K+ Properties Verified
              </span>
              <span className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition">
                <FaList className="text-base" /> 500+ Listings
              </span>
              <span className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-slate-800 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition">
                <FaUserTie className="text-base" /> 100+ Agents
              </span>
            </div>
          </div>
        </div>
      </section>
 
      {/* Stats Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-600 transition-all hover:-translate-y-1"
              >
                <span className="text-2xl text-blue-600 flex mb-3">{stat.icon}</span>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      
 
      {/* Features Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12 sm:mb-16">
            How We Deliver Trust
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-600 transition-all hover:-translate-y-1"
              >
                <div className="text-3xl text-blue-600 mb-4">{feat.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Builder Onboarding Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-2">
            Builder & Developer Onboarding
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 sm:mb-16">
            Builders and developers represent a significant opportunity for platform growth
            and revenue. Our onboarding process ensures that only legitimate, RERA-compliant
            developers can list projects, protecting buyers while providing builders with
            powerful marketing tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {builderSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-600 transition-all hover:-translate-y-1 text-center"
              >
                <span className="text-2xl font-bold text-blue-600 block mb-2">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Lead Marketplace Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-2">
            Lead Marketplace Innovation
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 sm:mb-16">
            Not all buyers want direct contact with multiple agents. Our lead marketplace
            allows buyers to submit requirements anonymously while agents bid for the
            opportunity to serve them. This creates a buyer-centric model where agents
            compete on service quality rather than aggressive marketing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
            {leadSteps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-lg p-6 shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-600 transition-all hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  {step.number}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-slate-900 text-sm leading-relaxed">
              <strong className="text-blue-600">Lead quality scoring:</strong> Buyers with
              verified budgets (bank statement uploaded) receive +20 points, loan pre-approval
              adds +30 points, serious timeframe under three months adds +15 points, and
              complete profiles add +10 points. High-score leads are priced at ₹2,000+ while
              low-score leads cost ₹500, aligning agent investment with lead quality.
            </p>
          </div>
        </div>
      </section>
 
      {/* Integrations Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Government Integrations
          </h2>
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {[...techItems, ...techItems].map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center bg-slate-100 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-800 border border-slate-200 whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* Roadmap Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12 sm:mb-16">
            Our Roadmap
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {roadmap.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-600 transition-all hover:-translate-y-1"
              >
                <span className="text-blue-600 font-semibold text-xs">{item.year}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Vision Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-8">
              Vision for Tomorrow
            </h2>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-6">
              {visionStats.map((item, idx) => (
                <div key={idx}>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600">
                    {item.value}
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              From Telangana & Andhra Pradesh to a trusted verification standard across
              India.
            </p>
          </div>
        </div>
      </section>
 
      {/* CTA Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to experience trusted real estate?
          </h2>
          <button className="hardgreen text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:opacity-95 transition-all hover:scale-105 shadow-md hover:shadow-lg">
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

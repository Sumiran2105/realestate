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
  const styleTag = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    * {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .section {
      width: 100%;
      padding: 4rem 2rem;
    }
    .section-light {
      background-color: #f9fafb;
    }
    .section-white {
      background-color: #ffffff;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    /* Base card styles - REDUCED SIZES */
    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1rem 1.25rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid #eef2f6;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2);
      border-color: #3b82f6;
    }
    .feature-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid #eef2f6;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2);
      border-color: #3b82f6;
    }
    .pill {
      background: #f1f5f9;
      border-radius: 40px;
      padding: 0.4rem 1.2rem;
      font-size: 0.9rem;
      color: #1e293b;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
      cursor: default;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .pill:hover {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
    }
    .pill svg {
      font-size: 1rem;
    }
    .roadmap-item {
      background: white;
      border-radius: 12px;
      padding: 1.25rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid #eef2f6;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .roadmap-item:hover {
      transform: translateY(-4px) translateX(4px);
      box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2);
      border-color: #3b82f6;
    }
    .btn-primary {
      background: #3b82f6;
      color: white;
      padding: 0.8rem 3rem;
      border-radius: 60px;
      font-weight: 600;
      font-size: 1.2rem;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
    }
    .btn-primary:hover {
      background: #2563eb;
      transform: scale(1.05);
      box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.4);
    }
 
    /* Marquee animation */
    .marquee-wrapper {
      overflow: hidden;
      width: 100%;
    }
    .marquee-content {
      display: flex;
      gap: 0.75rem;
      animation: scroll 30s linear infinite;
      will-change: transform;
      width: fit-content;
    }
    @keyframes scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
 
    /* Step cards for lead marketplace */
    .step-card {
      background: white;
      border-radius: 12px;
      padding: 1.25rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid #eef2f6;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .step-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2);
      border-color: #3b82f6;
    }
    .step-number {
      width: 32px;
      height: 32px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }
  `;
 
  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };
 
  // Data with React Icons
  const stats = [
    { icon: <FaBalanceScale />, value: "60%", label: "Fraud disputes" },
    { icon: <FaMoneyBillWave />, value: "₹5–15L", label: "Legal cost avg" },
    { icon: <FaUsers />, value: "50K+", label: "Active users" },
    { icon: <FaChartLine />, value: "₹21.89Cr", label: "Y2 Revenue" },
  ];
 
  const features = [
    { icon: <FaSearch />, title: "Automated Legal Verification", desc: "Instant checks against Dharani, Meebhoomi, IGRS, RERA." },
    { icon: <FaChartBar />, title: "AI Price Intelligence", desc: "ML-powered fair price estimates & market trends." },
    { icon: <FaHandshake />, title: "Trusted Agent Network", desc: "Verified professionals with performance ratings." },
    { icon: <FaLock />, title: "Secure Escrow", desc: "Token amount protection for both parties." },
    { icon: <FaFileAlt />, title: "Legal Document Automation", desc: "Compliant sale agreements for TS & AP." },
    { icon: <FaHome />, title: "Post‑Sale Services", desc: "Mutation tracking, tax payments, support." },
  ];
 
  const techItems = [
    "Dharani",
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
<style>{styleTag}</style>
      {/* Hero Section - Full Width with Very Light Blue Overlay (Image Visible) */}
<div
        className="section section-white"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(219, 234, 254, 0.6)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80%27)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
>
<div style={containerStyle}>
<div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
<span style={{ color: "#3b82f6", fontWeight: "600", letterSpacing: "2px" }}>OUR PURPOSE</span>
<h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: "800", lineHeight: 1.2, margin: "1rem 0 1.5rem" }}>
              Trust, <span style={{ color: "#3b82f6" }}>Verified.</span>
<br />
              Real Estate, Simplified.
</h1>
<p style={{ fontSize: "1.2rem", color: "#1e293b", maxWidth: "700px", margin: "0 auto 2rem" }}>
              Eliminating fraud and restoring confidence in property transactions across Telangana and Andhra Pradesh.
</p>
<div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
<span className="pill"><FaHome /> 50K+ Properties Verified</span>
<span className="pill"><FaList /> 500+ Listings</span>
<span className="pill"><FaUserTie /> 100+ Agents</span>
</div>
</div>
</div>
</div>
 
      {/* Stats Section - Light Background */}
<div className="section section-light">
<div style={containerStyle}>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {stats.map((stat, idx) => (
<div key={idx} className="stat-card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
<span style={{ fontSize: "2rem", color: "#3b82f6" }}>{stat.icon}</span>
<div>
<div style={{ fontSize: "1.6rem", fontWeight: "700", color: "#1e293b" }}>{stat.value}</div>
<div style={{ fontSize: "0.9rem", color: "#64748b" }}>{stat.label}</div>
</div>
</div>
            ))}
</div>
</div>
</div>
 
      {/* Problem & Solution - White Background */}
<div className="section section-white">
<div style={containerStyle}>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
<div className="feature-card">
<span style={{ fontSize: "2.5rem", color: "#3b82f6" }}><FaExclamationTriangle /></span>
<h2 style={{ fontSize: "1.8rem", fontWeight: "700", margin: "0.8rem 0", color: "#1e293b" }}>The Problem</h2>
<p style={{ fontSize: "0.95rem", color: "#475569" }}>Over 60% of disputes involve fraudulent sellers. Disconnected portals. Legal costs ₹5–15L on average.</p>
</div>
<div className="feature-card">
<span style={{ fontSize: "2.5rem", color: "#3b82f6" }}><FaCheckCircle /></span>
<h2 style={{ fontSize: "1.8rem", fontWeight: "700", margin: "0.8rem 0", color: "#1e293b" }}>Our Solution</h2>
<p style={{ fontSize: "0.95rem", color: "#475569" }}>Unified platform integrating Dharani, Meebhoomi, IGRS, RERA – verified ownership, price intelligence, end‑to‑end support.</p>
</div>
</div>
</div>
</div>
 
      {/* Features - Light Background - 3 COLUMNS */}
<div className="section section-light">
<div style={containerStyle}>
<h2 style={{ fontSize: "2.2rem", fontWeight: "700", textAlign: "center", marginBottom: "2.5rem", color: "#1e293b" }}>How We Deliver Trust</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {features.map((feat, idx) => (
<div key={idx} className="feature-card">
<div style={{ fontSize: "2.5rem", marginBottom: "0.8rem", color: "#3b82f6" }}>{feat.icon}</div>
<h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "0.4rem", color: "#1e293b" }}>{feat.title}</h3>
<p style={{ fontSize: "0.9rem", color: "#475569" }}>{feat.desc}</p>
</div>
            ))}
</div>
</div>
</div>
 
      {/* Builder & Developer Onboarding - White Background */}
<div className="section section-white">
<div style={containerStyle}>
<h2 style={{ fontSize: "2.2rem", fontWeight: "700", textAlign: "center", marginBottom: "0.5rem", color: "#1e293b" }}>Builder & Developer Onboarding</h2>
<p style={{ fontSize: "1rem", textAlign: "center", color: "#64748b", maxWidth: "800px", margin: "0 auto 2.5rem" }}>
            Builders and developers represent a significant opportunity for platform growth and revenue. Our onboarding process ensures that only legitimate, RERA-compliant developers can list projects, protecting buyers while providing builders with powerful marketing tools.
</p>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {builderSteps.map((step, idx) => (
<div key={idx} className="feature-card" style={{ textAlign: "center" }}>
<span style={{ fontSize: "2rem", fontWeight: "700", color: "#3b82f6" }}>{step.step}</span>
<h3 style={{ fontSize: "1.2rem", fontWeight: "700", margin: "0.5rem 0", color: "#1e293b" }}>{step.title}</h3>
<p style={{ fontSize: "0.9rem", color: "#475569" }}>{step.desc}</p>
</div>
            ))}
</div>
</div>
</div>
 
      {/* Lead Marketplace Innovation - Light Background */}
<div className="section section-light">
<div style={containerStyle}>
<h2 style={{ fontSize: "2.2rem", fontWeight: "700", textAlign: "center", marginBottom: "0.5rem", color: "#1e293b" }}>Lead Marketplace Innovation</h2>
<p style={{ fontSize: "1rem", textAlign: "center", color: "#64748b", maxWidth: "800px", margin: "0 auto 2.5rem" }}>
            Not all buyers want direct contact with multiple agents. Our lead marketplace allows buyers to submit requirements anonymously while agents bid for the opportunity to serve them. This creates a buyer-centric model where agents compete on service quality rather than aggressive marketing.
</p>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {leadSteps.map((step) => (
<div key={step.number} className="step-card">
<div className="step-number">{step.number}</div>
<h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.4rem", color: "#1e293b" }}>{step.title}</h3>
<p style={{ fontSize: "0.85rem", color: "#475569" }}>{step.desc}</p>
</div>
            ))}
</div>
<div style={{ background: "#ffffff", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
<p style={{ fontSize: "0.95rem", color: "#1e293b", lineHeight: 1.6 }}>
<strong style={{ color: "#3b82f6" }}>Lead quality scoring:</strong> Buyers with verified budgets (bank statement uploaded) receive +20 points, loan pre-approval adds +30 points, serious timeframe under three months adds +15 points, and complete profiles add +10 points. High-score leads are priced at ₹2,000+ while low-score leads cost ₹500, aligning agent investment with lead quality.
</p>
</div>
</div>
</div>
 
      {/* Integrations - White Background with Scrolling Marquee */}
<div className="section section-white">
<div style={containerStyle}>
<h2 style={{ fontSize: "2rem", fontWeight: "700", textAlign: "center", marginBottom: "2rem", color: "#1e293b" }}>Government Integrations</h2>
<div className="marquee-wrapper">
<div className="marquee-content">
              {[...techItems, ...techItems].map((item, idx) => (
<span key={idx} className="pill">{item}</span>
              ))}
</div>
</div>
</div>
</div>
 
      {/* Roadmap - Light Background */}
<div className="section section-light">
<div style={containerStyle}>
<h2 style={{ fontSize: "2.2rem", fontWeight: "700", textAlign: "center", marginBottom: "2.5rem", color: "#1e293b" }}>Our Roadmap</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.2rem" }}>
            {roadmap.map((item, idx) => (
<div key={idx} className="roadmap-item">
<span style={{ color: "#3b82f6", fontWeight: "600", fontSize: "0.9rem" }}>{item.year}</span>
<h3 style={{ fontSize: "1.3rem", fontWeight: "700", margin: "0.3rem 0", color: "#1e293b" }}>{item.title}</h3>
<p style={{ fontSize: "0.9rem", color: "#475569" }}>{item.desc}</p>
</div>
            ))}
</div>
</div>
</div>
 
      {/* Vision - White Background */}
<div className="section section-white">
<div style={containerStyle}>
<div style={{ background: "#f1f5f9", borderRadius: "32px", padding: "2.5rem 2rem", textAlign: "center" }}>
<h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1.2rem", color: "#1e293b" }}>Vision for Tomorrow</h2>
<div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
              {visionStats.map((item, idx) => (
<div key={idx}>
<div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#3b82f6" }}>{item.value}</div>
<div style={{ fontSize: "1rem", color: "#475569" }}>{item.label}</div>
</div>
              ))}
</div>
<p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto", color: "#475569" }}>
              From Telangana & Andhra Pradesh to a trusted verification standard across India.
</p>
</div>
</div>
</div>
 
      {/* CTA - Light Background */}
<div className="section section-light">
<div style={containerStyle}>
<div style={{ textAlign: "center" }}>
<h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "1rem", color: "#1e293b" }}>Ready to experience trusted real estate?</h2>
<button className="btn-primary">
              Get Started
</button>
</div>
</div>
</div>
</>
  );
};
 
export default AboutPage;
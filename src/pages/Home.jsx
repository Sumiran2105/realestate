import { useEffect, useRef } from "react";

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

      {/* ================= HERO (UNCHANGED) ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/city.jpg')",
            transform: "translateY(var(--parallax)) scale(1.08)",
          }}
        ></div>

        <div className="relative text-center px-6 max-w-5xl text-white">

          <p className="uppercase tracking-[0.3em] text-xs mb-6 text-brand-dark font-medium">
            ADVANCED SEARCH & DISCOVERY
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-brand-dark">
            Find Verified Properties
            <span className="block text-brand-dark mt-3">
              With Complete Transparency
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-900 max-w-3xl mx-auto leading-relaxed">
            Search using location intelligence, structured property filters,
            and government-backed verification criteria designed to
            eliminate risk and improve decision-making.
          </p>

          <div className="mt-20 relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl 
                          shadow-[0_40px_120px_rgba(0,0,0,0.25)] 
                          border border-white/20 p-10 text-slate-800 
                          transition-all duration-500 hover:shadow-[0_50px_150px_rgba(0,0,0,0.35)]">

           
            <div className="grid md:grid-cols-3 gap-5">
              <input
                type="text"
                placeholder="City, District, Mandal, Locality..."
                className="px-5 py-4 rounded-2xl border border-slate-200 
                          focus:ring-2 focus:ring-brand focus:border-brand 
                          outline-none transition"
              />

              <select className="px-5 py-4 rounded-2xl border border-slate-200 
                                focus:ring-2 focus:ring-brand focus:border-brand 
                                outline-none transition">
                <option>Budget Range</option>
                <option>₹10L - ₹25L</option>
                <option>₹25L - ₹50L</option>
                <option>₹50L - ₹1Cr</option>
                <option>₹1Cr - ₹5Cr+</option>
              </select>

              <select className="px-5 py-4 rounded-2xl border border-slate-200 
                                focus:ring-2 focus:ring-brand focus:border-brand 
                                outline-none transition">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Land</option>
              </select>
            </div>

            
            <div className="grid md:grid-cols-3 gap-5 mt-5">
              <select className="px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition">
                <option>Bedrooms</option>
                <option>1 BHK</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>4+ BHK</option>
              </select>

              <select className="px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition">
                <option>Area (sq.ft.)</option>
                <option>500 - 1000</option>
                <option>1000 - 2000</option>
                <option>2000+</option>
              </select>

              <select className="px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition">
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
              className="mt-10 w-full bg-brand-dark text-white py-5 rounded-2xl
                         hover:bg-brand hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-300 font-semibold text-lg 
                         shadow-xl"
            >
              Search Verified Properties
            </button>

          </div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-semibold text-brand-dark">
              The Critical Market Problem
            </h2>
            <p className="mt-8 text-lg text-slate-600">
              Systemic inefficiencies create trust gaps and financial exposure.
            </p>
          </div>

          <div ref={timelineRef} className="mt-24 relative pl-12">

            <div className="timeline-line"></div>

            <div className="space-y-20">
              {problems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className="relative timeline-item"
                >
                  <div className="timeline-dot absolute -left-[38px] top-1 w-7 h-7 bg-brand rounded-full"></div>

                  <h3 className="text-xl font-semibold text-brand-dark">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-slate-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

{/* ================= OUR COMPREHENSIVE SOLUTION ================= */}
{/* ================= OUR COMPREHENSIVE SOLUTION ================= */}
<section className="relative py-32 bg-white overflow-hidden">

  {/* Soft Background Accent */}
  <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-brand-light rounded-full blur-3xl opacity-30"></div>

  <div className="relative max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto">
      <p className="uppercase tracking-widest text-sm text-brand mb-4">
        The Solution
      </p>

      <h2 className="text-4xl md:text-5xl font-semibold text-brand-dark">
        Our Comprehensive Platform
      </h2>

      <p className="mt-8 text-lg text-slate-600 leading-relaxed">
        A unified, blockchain-backed verification ecosystem designed to
        restore trust, eliminate risk, and modernize property transactions.
      </p>
    </div>

    {/* ================= FEATURED CORE ENGINE ================= */}
    <div className="mt-24 bg-gradient-to-br from-brand-soft to-white 
                    rounded-3xl p-14 shadow-[0_40px_120px_rgba(0,0,0,0.08)]">

      <h3 className="text-2xl font-semibold text-brand-dark">
        Automated Legal Verification Engine
      </h3>

      <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-4xl">
        Direct government API integration enables instant ownership
        verification, encumbrance checks, RERA validation,
        and document authentication — removing ambiguity
        from high-value property decisions.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-8 text-sm text-slate-600">
        <div>✓ Ownership Cross-Verification</div>
        <div>✓ Encumbrance Certificate Validation</div>
        <div>✓ Survey & Land Record Confirmation</div>
      </div>

    </div>

    {/* ================= SUPPORTING FEATURES ================= */}
    <div className="grid md:grid-cols-2 gap-10 mt-20">

      {[
        {
          title: "Price Intelligence Engine",
          desc: "AI-driven valuation models analyze comparable sales, density patterns, and infrastructure growth signals."
        },
        {
          title: "Trusted Agent Network",
          desc: "Performance-rated professionals with verified credentials and transaction transparency."
        },
        {
          title: "Secure Escrow Framework",
          desc: "Token-based financial safeguards protecting both buyers and sellers during transactions."
        },
        {
          title: "Legal Document Automation",
          desc: "Auto-generated, jurisdiction-compliant agreements tailored for TS & AP."
        },
        {
          title: "Post-Sale Services",
          desc: "Mutation tracking, tax integration, and lifecycle property management support."
        }
      ].map((feature, index) => (
        <div
          key={index}
          className="bg-white border border-slate-100 rounded-3xl p-10 
                     shadow-sm hover:shadow-xl 
                     transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-brand-dark">
            {feature.title}
          </h3>

          <p className="mt-4 text-slate-600 leading-relaxed">
            {feature.desc}
          </p>
        </div>
      ))}

    </div>

  </div>
</section>
    </div>
  );
}
import React from 'react';
import {
  FaSearch,
  FaFileAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaMapMarkedAlt,
  FaUniversity,
  FaBalanceScale,
  FaClock,
  FaPhoneAlt,
  FaStar,
  FaGem,
  FaCrown,
  FaExclamationTriangle,
  FaHistory,
  FaChartLine,
  FaUsers,
  FaBuilding,
  FaRegClock,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaRegBuilding
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const verificationChecks = [
  {
    title: 'Ownership Validation',
    description: 'Cross-check owner details with available records and submitted documents.',
    icon: <FaSearch className="text-2xl text-blue-600" />,
    color: 'blue',
    features: [
      'Title deed verification with sub-registrar office',
      'Owner name matching with revenue records',
      'Previous sale deed chain verification',
      'Power of attorney validity check'
    ],
    stats: 'Reduces ownership fraud by 95%'
  },
  {
    title: 'Document Consistency',
    description: 'Verify deed copies, EC references, tax details, and supporting paperwork.',
    icon: <FaFileAlt className="text-2xl text-purple-600" />,
    color: 'purple',
    features: [
      'Encumbrance certificate cross-verification',
      'Property tax receipt validation',
      'Khata certificate & extract verification',
      'Approved plan vs. actual construction check'
    ],
    stats: '300+ documents verified daily'
  },
  {
    title: 'Legal & Dispute Risk',
    description: 'Identify common legal red flags before token payment or agreement signing.',
    icon: <FaBalanceScale className="text-2xl text-amber-600" />,
    color: 'amber',
    features: [
      'Court case/litigation history check',
      'Government acquisition notification scan',
      'Mortgage/loan outstanding verification',
      'Succession/will-related dispute analysis'
    ],
    stats: '80% risks identified early'
  },
  {
    title: 'Approval Snapshot',
    description: 'Review available approval status points related to layout/building compliance.',
    icon: <FaUniversity className="text-2xl text-emerald-600" />,
    color: 'emerald',
    features: [
      'BBMP/panchayat approval verification',
      'BCD/Karnataka RERA compliance check',
      'Layout regularization status',
      'Zonal regulation compliance'
    ],
    stats: 'Covers 50+ approval points'
  }
];

const steps = [
  {
    title: 'Submit Property Inputs',
    description: 'Share location, owner details, and available documents to start verification.',
    icon: <FaMapMarkedAlt className="text-blue-600" />,
    details: [
      'Property address & survey number',
      'Owner name & contact details',
      'Upload available documents (sale deed, tax receipts, EC)',
      'Any existing approvals or permits'
    ],
    time: '10-15 mins'
  },
  {
    title: 'Verification Run',
    description: 'Our team performs ownership, document, and risk checks in a structured workflow.',
    icon: <FaSearch className="text-blue-600" />,
    details: [
      'Multi-level verification by legal experts',
      'Cross-reference with government databases',
      'Physical document inspection if required',
      'Site visit for high-value properties'
    ],
    time: '24-48 hours'
  },
  {
    title: 'Receive Report',
    description: 'Get a simple, decision-ready report with issues, risk level, and recommendations.',
    icon: <FaFileAlt className="text-blue-600" />,
    details: [
      'Color-coded risk assessment (Green/Amber/Red)',
      'Document-by-document verification status',
      'Clear findings with evidence',
      'Actionable next steps checklist'
    ],
    time: 'Instant download'
  },
  {
    title: 'Expert Follow-up',
    description: 'Discuss report findings and next legal or transactional steps with support.',
    icon: <FaShieldAlt className="text-blue-600" />,
    details: [
      'Free consultation with legal expert',
      'Clarification on any red flags',
      'Guidance on documentation correction',
      'Support during property registration'
    ],
    time: 'Lifetime support'
  }
];

const plans = [
  {
    title: 'Basic Verify',
    price: '₹299',
    summary: 'Quick first-level screening',
    points: ['Ownership snapshot', 'Basic document checklist', 'High-level risk markers'],
    icon: <FaStar className="text-amber-500" />,
    features: [
      'Title deed verification',
      'Basic EC check (last 5 years)',
      'Owner name verification',
      'Digital report within 24 hours'
    ],
    bestFor: 'Initial property shortlisting',
    savings: 'Save 40%'
  },
  {
    title: 'Standard Verify',
    price: '₹599',
    summary: 'Most suitable before token',
    points: ['Detailed document verification', 'Risk-tagged observations', 'Actionable recommendations'],
    icon: <FaGem className="text-blue-600" />,
    features: [
      'Complete EC check (13+ years)',
      'Tax receipt & khata verification',
      'Legal heir/succession check',
      'Approved plan verification',
      'Detailed risk assessment report'
    ],
    bestFor: 'Token payment stage',
    savings: 'Save 33%',
    popular: true
  },
  {
    title: 'Premium Verify',
    price: '₹999',
    summary: 'Comprehensive due diligence',
    points: ['End-to-end verification summary', 'Priority processing support', 'Expert guidance call'],
    icon: <FaCrown className="text-purple-600" />,
    features: [
      'Everything in Standard, plus:',
      'Physical document inspection',
      'Site visit (within city limits)',
      'Litigation/departmental query check',
      '1-hour expert consultation call',
      'Registration document assistance'
    ],
    bestFor: 'High-value property purchases',
    savings: 'Save 50%'
  }
];

const whyChooseData = [
  {
    title: '10+ Years Experience',
    description: 'Over a decade of property verification expertise',
    icon: <FaHistory className="text-blue-600" />,
    stat: '10,000+ properties verified'
  },
  {
    title: 'Legal Expert Team',
    description: 'Qualified lawyers and documentation specialists',
    icon: <FaUsers className="text-purple-600" />,
    stat: '50+ legal experts'
  },
  {
    title: 'Government Database Access',
    description: 'Direct integration with revenue and registration departments',
    icon: <FaBuilding className="text-emerald-600" />,
    stat: 'Real-time verification'
  },
  {
    title: '98% Accuracy Rate',
    description: 'Proven track record of accurate verifications',
    icon: <FaChartLine className="text-amber-600" />,
    stat: '<1% error rate'
  }
];

const faqData = [
  {
    question: 'What documents are needed for verification?',
    answer: 'Sale deed, latest tax paid receipt, encumbrance certificate, khata certificate, and approved building plan (if applicable).'
  },
  {
    question: 'How long does verification take?',
    answer: 'Basic verification takes 24 hours, Standard takes 48 hours, and Premium takes 72 hours including expert consultation.'
  },
  {
    question: 'Is site visit included?',
    answer: 'Site visit is included only in Premium plan. For Standard plan, it\'s available at additional cost.'
  },
  {
    question: 'What if issues are found?',
    answer: 'We provide detailed findings and expert guidance on how to proceed or resolve the issues.'
  }
];

const VerifyProperty = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaShieldAlt className="text-blue-800 text-sm" />
                <span className="text-sm font-medium text-blue-700">Property Verification Services</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                Verify Property <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">Before You Buy</span>
              </h1>
              <p className="text-black text-base sm:text-lg max-w-2xl">
                Protect your investment with structured checks on ownership, records, and legal risks before making any major payment.
              </p>
              
              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-xs text-blue-600">Properties Verified</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-xs text-blue-600">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-xs text-blue-600">Legal Experts</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Verification <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-all"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="/Land.png"
                alt="Land verification"
                className="w-full h-[280px] sm:h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - NEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-12 text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Trust Us</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Why Choose PropertyVerify</h2>
          <p className="text-slate-600 mt-2">Industry-leading verification with expert legal backing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 mb-3">{item.description}</p>
              <p className="text-xs font-semibold text-blue-600">{item.stat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Verify - Enhanced with Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-12 text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Verify</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Comprehensive Verification Checks</h2>
          <p className="text-slate-600 mt-2">Core checks designed to reduce fraud and documentation gaps.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verificationChecks.map((item) => (
            <article 
              key={item.title} 
              className="group bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-${item.color}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {item.stats}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 mb-4">{item.description}</p>
              
              {/* Feature List */}
              <ul className="space-y-2 mb-4">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm">View details</span>
                <FaArrowRight className="text-xs ml-2" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process Section - Enhanced with Details */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Verification Process</h2>
            <p className="text-slate-600 mt-2">Four simple steps to get your property verified</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, index) => (
              <article 
                key={step.title} 
                className="relative rounded-2xl border border-slate-200 p-6 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute -top-3 left-6 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                {/* Time Badge */}
                <div className="absolute top-4 right-4 bg-slate-100 px-2 py-1 rounded-full text-xs font-medium text-slate-600">
                  <FaRegClock className="inline mr-1" size={10} />
                  {step.time}
                </div>

                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 mt-2">
                  {step.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                
                {/* Process Details */}
                <ul className="space-y-1.5 border-t border-slate-100 pt-3 mt-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                      <FaRegCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={10} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Process Note */}
          <div className="mt-8 bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-800">
              <FaRegFileAlt className="inline mr-2" />
              All reports are digitally signed and legally admissible
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans - Enhanced with Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Verification Plans</h2>
          <p className="text-slate-600 mt-2">Choose the plan that fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <article
              key={plan.title}
              className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                idx === 1 
                  ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg scale-105' 
                  : 'bg-white border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  MOST POPULAR
                </div>
              )}
              
              {/* Savings Badge */}
              <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${
                idx === 1 ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
              }`}>
                {plan.savings}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${idx === 1 ? 'bg-white/20' : 'bg-slate-100'} flex items-center justify-center`}>
                  {plan.icon}
                </div>
                <h3 className={`text-xl font-bold ${idx === 1 ? 'text-white' : 'text-slate-900'}`}>{plan.title}</h3>
              </div>

              <p className={`mt-2 text-3xl font-bold ${idx === 1 ? 'text-white' : 'text-slate-900'}`}>
                {plan.price}
                <span className={`text-sm font-normal ml-2 ${idx === 1 ? 'text-blue-200' : 'text-slate-500'}`}>
                  {plan.summary}
                </span>
              </p>

              {/* Best For */}
              <p className={`text-xs mt-2 ${idx === 1 ? 'text-blue-200' : 'text-slate-500'}`}>
                Best for: {plan.bestFor}
              </p>

              {/* Feature List */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <FaCheckCircle className={`mt-0.5 flex-shrink-0 ${idx === 1 ? 'text-white' : 'text-blue-600'}`} size={14} />
                    <span className={`text-sm ${idx === 1 ? 'text-blue-100' : 'text-slate-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  idx === 1 
                    ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-md' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Choose {plan.title} <FaArrowRight className="text-xs" />
              </Link>
            </article>
          ))}
        </div>

        {/* Pricing Note */}
        <p className="text-center text-xs text-slate-500 mt-6">
          * All prices are inclusive of GST. Volume discounts available for builders and agents.
        </p>
      </section>
    </div>
  );
};

export default VerifyProperty;
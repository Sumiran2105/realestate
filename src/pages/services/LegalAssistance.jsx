import React from 'react';
import {
  FaGavel,
  FaFileSignature,
  FaSearch,
  FaRegClock,
  FaArrowRight,
  FaCheckCircle,
  FaHome,
  FaBalanceScale,
  FaUserTie,
  FaFileAlt,
  FaShieldAlt,
  FaPhoneAlt,
  FaStar,
  FaGem,
  FaCrown,
  FaHistory,
  FaChartLine,
  FaUsers,
  FaBuilding,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaRegBuilding,
  FaExclamationTriangle,
  FaUniversity
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const keyServices = [
  {
    title: 'Property Title Verification',
    description: 'Complete legal due-diligence including ownership history, encumbrance checks, and dispute risk review.',
    icon: <FaSearch className="text-2xl text-blue-600" />,
    color: 'blue',
    features: [
      'Title deed verification with sub-registrar office',
      'Owner name matching with revenue records',
      'Previous sale deed chain verification',
      'Legal heir/succession verification'
    ],
    stats: 'Reduces title fraud by 95%'
  },
  {
    title: 'Agreement Drafting & Review',
    description: 'Drafting and legal review of sale agreements, MoUs, and token advance terms before you sign.',
    icon: <FaFileSignature className="text-2xl text-purple-600" />,
    color: 'purple',
    features: [
      'Sale agreement clause-by-clause review',
      'Token advance agreement drafting',
      'Builder-buyer agreement analysis',
      'Non-disclosure agreement drafting'
    ],
    stats: '500+ agreements reviewed monthly'
  },
  {
    title: 'Legal Consultation',
    description: 'One-to-one consultation with verified legal experts for property compliance and transaction safety.',
    icon: <FaGavel className="text-2xl text-amber-600" />, 
    color: 'amber',
    features: [
      '30-min video consultation with advocate',
      'Query resolution on legal documents',
      'Registration process guidance',
      'Stamp duty & registration fee calculation'
    ],
    stats: '50+ expert lawyers on panel'
  },
  {
    title: 'Fast Turnaround',
    description: 'Priority legal support for urgent transactions so you can move forward without unnecessary delays.',
    icon: <FaRegClock className="text-2xl text-emerald-600" />,
    color: 'emerald',
    features: [
      '24-hour express review available',
      'Same-day agreement drafting',
      'Emergency consultation slots',
      'Weekend support for urgent cases'
    ],
    stats: '70% faster than market'
  }
];

// const trustPoints = [
//   { 
//     title: 'Verified Legal Experts', 
//     description: 'Work with experienced property legal professionals.',
//     icon: <FaUserTie className="text-xl text-blue-600" />,
//     stat: '50+ empaneled advocates'
//   },
//   { 
//     title: 'State-Compliant Drafting', 
//     description: 'Documentation aligned with local registration requirements.',
//     icon: <FaBalanceScale className="text-xl text-purple-600" />,
//     stat: 'All 28 states covered'
//   },
//   { 
//     title: 'Risk-First Review', 
//     description: 'We flag legal and title issues before you commit funds.',
//     icon: <FaShieldAlt className="text-xl text-amber-600" />,
//     stat: '80% risks identified early'
//   },
//   { 
//     title: 'Buyer and Seller Support', 
//     description: 'Assistance for both parties from token to registration.',
//     icon: <FaHome className="text-xl text-emerald-600" />,
//     stat: '10,000+ transactions supported'
//   }
// ];

const processSteps = [
  { 
    title: 'Share Property Details', 
    description: 'Submit property documents and transaction context for legal assessment.',
    icon: <FaFileAlt className="text-blue-600" />,
    details: [
      'Property address & survey number',
      'Upload title deeds & tax receipts',
      'Share draft agreements (if any)',
      'Mention transaction timeline'
    ],
    time: '10-15 mins'
  },
  { 
    title: 'Legal Due Diligence', 
    description: 'Ownership, encumbrance, approvals, and record consistency checks are performed.',
    icon: <FaSearch className="text-blue-600" />,
    details: [
      'Multi-level verification by legal experts',
      'Title chain verification (30+ years)',
      'EC & tax record analysis',
      'Legal opinion preparation'
    ],
    time: '24-48 hours'
  },
  { 
    title: 'Draft / Review Agreements', 
    description: 'Token agreement, sale agreement, and clauses are drafted or reviewed.',
    icon: <FaFileSignature className="text-blue-600" />,
    details: [
      'Clause-by-clause review',
      'Risk clause flagging',
      'Custom drafting as needed',
      'Negotiation points suggested'
    ],
    time: '12-24 hours'
  },
  { 
    title: 'Consultation & Closure', 
    description: 'Final call with legal expert to resolve queries before transaction closure.',
    icon: <FaGavel className="text-blue-600" />,
    details: [
      'Free consultation with legal expert',
      'Query resolution session',
      'Registration process guidance',
      'Post-closing support'
    ],
    time: 'Lifetime support'
  }
];

const plans = [
  {
    title: 'Basic Legal Check',
    price: '₹499',
    summary: 'Quick first-level screening',
    points: ['Ownership summary', 'Basic document review', 'High-risk issue alerts'],
    icon: <FaStar className="text-amber-500" />,
    features: [
      'Title deed verification',
      'Basic EC check (last 5 years)',
      'Owner name verification',
      'Digital report within 24 hours'
    ],
    bestFor: 'Initial property shortlisting',
    savings: 'Save 40%',
    cta: 'Start Free',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100'
  },
  {
    title: 'Standard Legal Review',
    price: '₹1,499',
    summary: 'Ideal for active negotiations',
    points: ['Title + encumbrance validation', 'Agreement clause review', 'One legal consultation'],
    icon: <FaGem className="text-blue-600" />,
    features: [
      'Complete EC check (13+ years)',
      'Agreement drafting/review',
      'Tax receipt & khata verification',
      '30-min legal consultation',
      'Detailed risk assessment report'
    ],
    bestFor: 'Token payment stage',
    savings: 'Save 33%',
    popular: true,
    cta: 'Go Standard',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100'
  },
  {
    title: 'Complete Legal Assistance',
    price: '₹2,999',
    summary: 'End-to-end support',
    points: ['Comprehensive legal due diligence', 'Agreement drafting support', 'Priority consultation'],
    icon: <FaCrown className="text-purple-600" />,
    features: [
      'Everything in Standard, plus:',
      'Physical document inspection',
      'End-to-end due diligence',
      'Priority consultation access',
      'Registration document assistance',
      'Post-registration support'
    ],
    bestFor: 'High-value transactions',
    savings: 'Save 50%',
    cta: 'Go Premium',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100'
  }
];

const whyChooseData = [
  {
    title: '10+ Years Experience',
    description: 'Decade of property law expertise',
    icon: <FaHistory className="text-blue-600" />,
    stat: '10,000+ cases handled',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Expert Legal Team',
    description: 'Qualified property law specialists',
    icon: <FaUsers className="text-purple-600" />,
    stat: '50+ empaneled advocates',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Pan-India Coverage',
    description: 'Legal support across all states',
    icon: <FaBuilding className="text-emerald-600" />,
    stat: '28 states covered',
    bgColor: 'bg-emerald-50'
  },
  {
    title: '98% Success Rate',
    description: 'Proven track record',
    icon: <FaChartLine className="text-amber-600" />,
    stat: '<2% dispute rate',
    bgColor: 'bg-amber-50'
  }
];

const LegalAssistance = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <FaGavel className="text-blue-600 text-sm" />
                <span className="text-sm font-medium text-blue-700">Legal Assistance Services</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Legal Assistance for <span className="text-blue-600">Safe Property Transactions</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
                Reduce legal risk at every stage of your property journey with expert support for document checks, title validation, and agreement drafting.
              </p>
              
              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="text-2xl font-bold text-slate-900">10K+</div>
                  <div className="text-xs text-blue-600">Cases Handled</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">50+</div>
                  <div className="text-xs text-blue-600">Legal Experts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">98%</div>
                  <div className="text-xs text-blue-600">Success Rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Request Legal Help <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="/Law.jpeg"
                alt="Legal assistance"
                className="w-full h-[280px] sm:h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
        <div className="mb-12 text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Trust Us</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Why Choose Our Legal Services</h2>
          <p className="text-slate-600 mt-2">Industry-leading legal expertise for property transactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseData.map((item, index) => (
            <div key={index} className={`${item.bgColor} rounded-xl p-6 border border-slate-300 hover:shadow-lg transition-all`}>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 mb-3">{item.description}</p>
              <p className="text-xs font-semibold text-blue-600">{item.stat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
        <div className="mb-12 text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Cover</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Comprehensive Legal Services</h2>
          <p className="text-slate-600 mt-2">Core legal assistance for safer property decisions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyServices.map((item) => (
            <article 
              key={item.title} 
              className="group bg-white rounded-2xl p-6 sm:p-8 border border-slate-600 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={12} />
                    <span className='text-[16px]'>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm">Learn more</span>
                <FaArrowRight className="text-xs ml-2" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">How Legal Assistance Works</h2>
            <p className="text-slate-600 mt-2">Four simple steps to get expert legal support</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, index) => (
              <article 
                key={step.title} 
                className="relative rounded-2xl border border-slate-200 p-6 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                
                {/* Time Badge */}
                <div className="absolute top-4 right-4 bg-slate-100 px-2 py-1 rounded-full text-xs font-medium text-slate-600">
                  <FaRegClock className="inline mr-1" size={10} />
                  {step.time}
                </div>

                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 mt-2">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                <p className="text-md text-slate-600 mb-3">{step.description}</p>
                
                {/* Process Details */}
                <ul className="space-y-1.5 border-t border-slate-100 pt-3 mt-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                      <FaRegCheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={11} />
                      <span className='text-[14px]'>{detail}</span>
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
              All legal opinions are provided by empaneled advocates with 10+ years experience
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Choose a Legal Plan</h2>
          <p className="text-slate-600 mt-2">Select the plan that matches your legal requirements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.title}
              className={`relative rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${plan.popular
                  ? 'border-blue-400 shadow-blue-100'
                  : plan.borderColor
                } ${plan.bgColor} p-8`}
            >
              {/* Popular Badge - More Subtle */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg">
                  Recommended
                </div>
              )}

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${plan.iconBg} flex items-center justify-center`}>
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{plan.title}</h3>
                  <p className="text-sm text-slate-500">{plan.summary}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                {plan.price !== 'Free' && (
                  <span className="text-sm text-slate-500 ml-2">/one-time</span>
                )}
              </div>

              {/* Best For Tag */}
              <div className="mb-6">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Best for</span>
                <p className="text-sm font-semibold text-slate-800 mt-1">{plan.bestFor}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                to="/contact"
                className={`block text-center py-3 px-4 rounded-xl font-medium transition-all ${plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                  }`}
              >
                {plan.cta}
              </Link>
            </div>
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

export default LegalAssistance;
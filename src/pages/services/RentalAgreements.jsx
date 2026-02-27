import React from 'react';
import {
  FaFileSignature,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaPhoneAlt,
  FaFileAlt,
  FaUserTie,
  FaBalanceScale,
  FaHome,
  FaStar,
  FaGem,
  FaCrown,
  FaHistory,
  FaChartLine,
  FaUsers,
  FaBuilding,
  FaRegClock,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaRegBuilding,
  FaExclamationTriangle,
  FaFileContract,
  FaPenFancy,
  FaHandshake,
  FaRegSmile,
  FaBolt,
  FaRocket
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Drafted Rental Agreement',
    description: 'Professionally structured agreement format based on your tenancy details.',
    icon: <FaFileAlt className="text-2xl text-blue-600" />,
    color: 'blue',
    features: [
      'Rental agreement customized to your needs',
      'Covers all essential tenancy clauses',
      'Compliant with local rental laws',
      'Digital format ready for signature'
    ],
    stats: '100% customizable'
  },
  {
    title: 'Clause Review Support',
    description: 'Important clauses are reviewed to reduce disputes between owner and tenant.',
    icon: <FaBalanceScale className="text-2xl text-purple-600" />,
    color: 'purple',
    features: [
      'Rent amount & due date clarity',
      'Security deposit terms validation',
      'Maintenance responsibility definition',
      'Notice period & lock-in review'
    ],
    stats: 'Reduce disputes by 80%'
  },
  {
    title: 'Tenant & Owner Clarity',
    description: 'Clear terms for rent, deposit, maintenance, notice period, and renewal.',
    icon: <FaHome className="text-2xl text-amber-600" />,
    color: 'amber',
    features: [
      'Rent escalation terms',
      'Security deposit conditions',
      'Maintenance & repair responsibilities',
      'Renewal & termination clauses'
    ],
    stats: 'No confusion guarantee'
  },
  {
    title: 'Safer Documentation',
    description: 'Identity and basic document checkpoints for more secure onboarding.',
    icon: <FaShieldAlt className="text-2xl text-emerald-600" />,
    color: 'emerald',
    features: [
      'Tenant ID verification support',
      'Owner property document check',
      'Digital record keeping',
      'Secure agreement storage'
    ],
    stats: '100% secure'
  }
];

const trustPoints = [
  { 
    title: 'Legal Experts', 
    description: 'Drafted by property law professionals',
    icon: <FaUserTie className="text-xl text-blue-600" />,
    stat: '10+ years experience'
  },
  { 
    title: 'Fast Turnaround', 
    description: 'Agreement ready in 24 hours',
    icon: <FaClock className="text-xl text-purple-600" />,
    stat: 'Same-day delivery'
  },
  { 
    title: '100% Customizable', 
    description: 'Tailored to your specific needs',
    icon: <FaPenFancy className="text-xl text-amber-600" />,
    stat: 'Unlimited revisions'
  },
  { 
    title: 'Legal Validity', 
    description: 'Compliant with Indian rental laws',
    icon: <FaBalanceScale className="text-xl text-emerald-600" />,
    stat: 'Court admissible'
  }
];

const steps = [
  {
    title: 'Share Rental Details',
    description: 'Provide owner, tenant, property, rent, and lock-in terms.',
    icon: <FaUserTie className="text-blue-600" />,
    details: [
      'Owner & tenant contact details',
      'Property address & type',
      'Monthly rent & deposit amount',
      'Lock-in period & notice terms'
    ],
    time: '10-15 mins'
  },
  {
    title: 'Agreement Preparation',
    description: 'Draft is prepared with required terms and compliance-friendly structure.',
    icon: <FaFileSignature className="text-blue-600" />,
    details: [
      'First draft prepared by experts',
      'All standard clauses included',
      'Local rental law compliance',
      'Digital format delivery'
    ],
    time: '24 hours'
  },
  {
    title: 'Review & Revisions',
    description: 'Both parties review and update final clauses before execution.',
    icon: <FaCheckCircle className="text-blue-600" />,
    details: [
      'Clause-by-clause review',
      'Unlimited revisions',
      'Both party feedback incorporated',
      'Final version preparation'
    ],
    time: '24-48 hours'
  },
  {
    title: 'Finalize & Execute',
    description: 'Agreement is finalized for signing and safe record keeping.',
    icon: <FaHandshake className="text-blue-600" />,
    details: [
      'Final agreement delivery',
      'Digital signing support',
      'Stamp paper guidance',
      'Lifetime access to copy'
    ],
    time: 'Lifetime support'
  }
];

const plans = [
  {
    title: 'Basic',
    price: '₹499',
    summary: 'Quick standard agreement draft',
    points: ['Standard rental format', 'Essential clauses included', 'Single revision support'],
    icon: <FaStar className="text-amber-500" />,
    features: [
      'Standard rental agreement template',
      'Basic tenancy clauses',
      'Rent & deposit terms',
      'One revision round',
      'Digital copy delivery'
    ],
    bestFor: 'Simple rental arrangements',
    cta: 'Start Basic',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100'
  },
  {
    title: 'Standard',
    price: '₹999',
    summary: 'Best for most rentals',
    points: ['Detailed clause review', 'Two revision rounds', 'Execution guidance support'],
    icon: <FaBolt className="text-blue-600" />,
    features: [
      'Customized agreement drafting',
      'Detailed clause review',
      'Two revision rounds',
      'Maintenance clause included',
      'Notice period optimization',
      'Execution guidance'
    ],
    bestFor: 'Residential rentals',
    cta: 'Get Standard',
    popular: true,
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100'
  },
  {
    title: 'Premium',
    price: '₹1,499',
    summary: 'For tailored rental needs',
    points: ['Advanced custom clauses', 'Priority handling', 'Expert discussion support'],
    icon: <FaRocket className="text-purple-600" />,
    features: [
      'Everything in Standard, plus:',
      'Advanced custom clauses',
      'Unlimited revisions',
      'Priority handling',
      'Expert consultation call',
      'Commercial rental support',
      'Stamp paper guidance'
    ],
    bestFor: 'Commercial & complex rentals',
    cta: 'Go Premium',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100'
  }
];

const whyChooseData = [
  {
    title: '5+ Years Expertise',
    description: 'Specialized in rental agreements',
    icon: <FaHistory className="text-blue-600" />,
    stat: '10,000+ agreements',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Legal Expert Team',
    description: 'Qualified property lawyers',
    icon: <FaUsers className="text-purple-600" />,
    stat: '20+ legal experts',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Pan-India Coverage',
    description: 'Valid across all states',
    icon: <FaBuilding className="text-emerald-600" />,
    stat: '28 states covered',
    bgColor: 'bg-emerald-50'
  },
  {
    title: '99% Satisfaction',
    description: 'Trusted by thousands',
    icon: <FaRegSmile className="text-amber-600" />,
    stat: '4.9/5 rating',
    bgColor: 'bg-amber-50'
  }
];

const RentalAgreements = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <FaFileContract className="text-blue-600 text-sm" />
                <span className="text-sm font-medium text-blue-700">Rental Agreement Services</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Rental <span className="text-blue-600">Agreements</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
                Create clear, balanced rental agreements for owners and tenants with professional drafting and review support.
              </p>
              
              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="text-2xl font-bold text-slate-900">10K+</div>
                  <div className="text-xs text-blue-600">Agreements Made</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">24h</div>
                  <div className="text-xs text-blue-600">Fast Delivery</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">4.9</div>
                  <div className="text-xs text-blue-600">Customer Rating</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Rental Agreement <FaArrowRight className="text-sm" />
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
                src="/RentalAggrement.jpeg"
                alt="Rental agreement service"
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
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Why Choose Our Rental Agreements</h2>
          <p className="text-slate-600 mt-2">Professional, legally sound agreements for peace of mind</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseData.map((item, index) => (
            <div key={index} className={` ${item.bgColor} rounded-xl p-6 border border-slate-300 hover:shadow-lg transition-all`}>
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

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
        <div className="mb-12 text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What You Get</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Comprehensive Agreement Support</h2>
          <p className="text-slate-600 mt-2">Practical rental agreement support from draft to finalization</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item) => (
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
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">How It Works</h2>
            <p className="text-slate-600 mt-2">Four simple steps to get your rental agreement ready</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, index) => (
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
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                
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
              All agreements are drafted as per Indian Rental Laws and are court admissible
            </p>
          </div>
        </div>
      </section>

      {/* REDESIGNED PRICING PLANS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Simple, Transparent Plans</h2>
          <p className="text-slate-600 mt-2">Choose the perfect plan for your rental agreement needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={plan.title}
              className={`relative rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full ${plan.popular
                  ? 'border-blue-400 shadow-blue-100'
                  : plan.borderColor
                } ${plan.bgColor} p-5`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg z-10">
                  Recommended
                </div>
              )}

              {/* Content Container - takes all available space */}
              <div className="flex flex-col flex-grow">
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${plan.iconBg} flex items-center justify-center flex-shrink-0`}>
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
                  <span className="text-sm text-slate-500 ml-2">/one-time</span>
                </div>

                {/* Best For Tag */}
                <div className="mb-6">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Best for</span>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{plan.bestFor}</p>
                </div>

                {/* Features List - with reduced line height */}
                <ul className="space-y-2 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={13} />
                      <span className="text-sm text-slate-700 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button - always at bottom */}
              <div className="mt-auto pt-4">
                <Link
                  to="/contact"
                  className={`block text-center py-3 px-4 rounded-xl font-medium transition-all w-full ${plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                    }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Note */}
        <p className="text-center text-sm text-slate-500 mt-8 flex items-center justify-center gap-2">
          <FaRegCheckCircle className="text-green-500" />
          All plans include free consultation • No hidden charges • Unlimited revisions in Premium
        </p>
      </section>
    </div>
  );
};

export default RentalAgreements;
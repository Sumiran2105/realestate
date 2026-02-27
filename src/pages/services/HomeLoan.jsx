import React from 'react';
import {
  FaUniversity,
  FaCheckCircle,
  FaArrowRight,
  FaFileAlt,
  FaCalculator,
  FaClock,
  FaPercent,
  FaPhoneAlt,
  FaShieldAlt,
  FaUserTie,
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
  FaHome,
  FaRupeeSign,
  FaWallet,
  FaBolt,
  FaRocket
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const loanFeatures = [
  {
    title: 'Eligibility Assistance',
    description: 'Get guidance on income, credit profile, and property criteria before applying.',
    icon: <FaUserTie className="text-2xl text-blue-600" />,
    color: 'blue',
    features: [
      'Income & employment verification',
      'Credit score assessment',
      'Loan amount eligibility calculation',
      'Property type eligibility check'
    ],
    stats: '90% approval rate'
  },
  {
    title: 'Document Readiness',
    description: 'Structured checklist for KYC, income proofs, and property papers to avoid delays.',
    icon: <FaFileAlt className="text-2xl text-purple-600" />,
    color: 'purple',
    features: [
      'Complete document checklist',
      'KYC verification support',
      'Income proof preparation',
      'Property paper organization'
    ],
    stats: 'Zero document rejection'
  },
  {
    title: 'Rate & EMI Guidance',
    description: 'Understand interest rates, tenure impact, and EMI planning before commitment.',
    icon: <FaCalculator className="text-2xl text-amber-600" />,
    color: 'amber',
    features: [
      'Interest rate comparison',
      'EMI calculation for different tenures',
      'Prepayment & foreclosure clarity',
      'Tax benefit estimation'
    ],
    stats: 'Save up to ₹2L'
  },
  {
    title: 'Safer Loan Journey',
    description: 'Transparent support from inquiry to sanction stage with clear next steps.',
    icon: <FaShieldAlt className="text-2xl text-emerald-600" />,
    color: 'emerald',
    features: [
      'Lender coordination support',
      'Application tracking',
      'Query resolution assistance',
      'Sanction letter verification'
    ],
    stats: '100% transparency'
  }
];

const trustPoints = [
  { 
    title: '10+ Bank Partners', 
    description: 'Tie-ups with leading banks & NBFCs',
    icon: <FaBuilding className="text-xl text-blue-600" />,
    stat: 'SBI, HDFC, ICICI & more'
  },
  { 
    title: 'Expert Loan Advisors', 
    description: 'Dedicated team for loan guidance',
    icon: <FaUsers className="text-xl text-purple-600" />,
    stat: '20+ certified advisors'
  },
  { 
    title: 'Fast Processing', 
    description: 'Streamlined document verification',
    icon: <FaClock className="text-xl text-amber-600" />,
    stat: '70% faster processing'
  },
  { 
    title: 'Lowest Rates', 
    description: 'Access to best-in-class interest rates',
    icon: <FaPercent className="text-xl text-emerald-600" />,
    stat: 'From 8.5% p.a.'
  }
];

const processSteps = [
  {
    title: 'Initial Loan Assessment',
    description: 'We collect your requirements and evaluate eligibility basics for suitable options.',
    icon: <FaUniversity className="text-blue-600" />,
    details: [
      'Income & employment details',
      'Loan amount requirement',
      'Property value assessment',
      'Credit profile check'
    ],
    time: '15-20 mins'
  },
  {
    title: 'Document Screening',
    description: 'Your documents are checked for completeness before lender submission.',
    icon: <FaFileAlt className="text-blue-600" />,
    details: [
      'KYC document verification',
      'Income proof validation',
      'Property paper screening',
      'Document deficiency flagging'
    ],
    time: '24 hours'
  },
  {
    title: 'Lender Coordination',
    description: 'Application progress is tracked and support is provided during verification.',
    icon: <FaClock className="text-blue-600" />,
    details: [
      'Application submission',
      'Follow-up with lenders',
      'Query resolution support',
      'Status tracking updates'
    ],
    time: '48-72 hours'
  },
  {
    title: 'Sanction Support',
    description: 'Final clarification support and readiness guidance before disbursement.',
    icon: <FaCheckCircle className="text-blue-600" />,
    details: [
      'Sanction letter review',
      'Terms & conditions clarity',
      'Disbursement preparation',
      'Post-sanction support'
    ],
    time: 'Lifetime support'
  }
];

const plans = [
  {
    title: 'Starter',
    price: 'Free',
    summary: 'Best for first-time exploration',
    points: ['Basic eligibility guidance', 'Document checklist', 'EMI orientation support'],
    icon: <FaStar className="text-amber-500" />,
    features: [
      'Basic eligibility check',
      'Document checklist',
      'EMI calculator access',
      'Email support'
    ],
    bestFor: 'First-time home buyers',
    cta: 'Start Free',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100'
  },
  {
    title: 'Priority',
    price: '₹999',
    summary: 'Best for active applicants',
    points: ['End-to-end file preparation', 'Priority follow-up guidance', 'Dedicated support assistance'],
    icon: <FaBolt className="text-blue-600" />,
    features: [
      'Complete document preparation',
      'Dedicated loan advisor',
      'Priority lender coordination',
      'Application tracking',
      'Query resolution support'
    ],
    bestFor: 'Active loan applicants',
    cta: 'Get Priority Support',
    popular: true,
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100'
  },
  {
    title: 'Expert',
    price: '₹1,999',
    summary: 'Best for complex cases',
    points: ['Advanced case review', 'Personalized repayment planning', 'Extended expert consultation'],
    icon: <FaRocket className="text-purple-600" />,
    features: [
      'Everything in Priority, plus:',
      'Advanced case assessment',
      'Personalized repayment plan',
      'Tax saving guidance',
      'Legal document review',
      'Unlimited expert calls'
    ],
    bestFor: 'Self-employed & complex cases',
    cta: 'Go Expert',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100'
  }
];

const whyChooseData = [
  {
    title: '10+ Years Experience',
    description: 'Decade of home loan expertise',
    icon: <FaHistory className="text-blue-600" />,
    stat: '5,000+ loans processed',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Expert Advisor Team',
    description: 'Certified loan counselors',
    icon: <FaUsers className="text-purple-600" />,
    stat: '20+ advisors',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Pan-India Coverage',
    description: 'Support across all cities',
    icon: <FaHome className="text-emerald-600" />,
    stat: '50+ cities covered',
    bgColor: 'bg-emerald-50'
  },
  {
    title: '98% Satisfaction',
    description: 'Proven track record',
    icon: <FaChartLine className="text-amber-600" />,
    stat: '4.8/5 rating',
    bgColor: 'bg-amber-50'
  }
];

const HomeLoan = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <FaHome className="text-blue-600 text-sm" />
                <span className="text-sm font-medium text-blue-700">Home Loan Assistance Services</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Home Loan <span className="text-blue-600">Assistance</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
                Simplify your home loan process with guided eligibility checks, documentation support, and lender coordination.
              </p>
              
              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="text-2xl font-bold text-slate-900">5K+</div>
                  <div className="text-xs text-blue-600">Loans Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">10+</div>
                  <div className="text-xs text-blue-600">Bank Partners</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">8.5%</div>
                  <div className="text-xs text-blue-600">Lowest Rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Apply for Loan Help <FaArrowRight className="text-sm" />
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
                src="/Loan.jpeg"
                alt="Home loan support"
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
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Why Choose Our Loan Support</h2>
          <p className="text-slate-600 mt-2">Practical guidance to reduce delays and improve approval readiness</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseData.map((item, index) => (
            <div key={index} className="rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
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

      {/* Loan Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
        <div className="mb-12 text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Comprehensive Loan Support</h2>
          <p className="text-slate-600 mt-2">End-to-end guidance for your home loan journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loanFeatures.map((item) => (
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
                <span className="text-sm">Learn more</span>
                <FaArrowRight className="text-xs ml-2" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trust Points Section */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item) => (
            <article 
              key={item.title} 
              className="bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 mb-3">{item.description}</p>
              <p className="text-xs font-semibold text-blue-600">{item.stat}</p>
            </article>
          ))}
        </div>
      </section> */}

      {/* Process Section */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Loan Process in 4 Steps</h2>
            <p className="text-slate-600 mt-2">Four simple steps to get your home loan approved</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, index) => (
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
              All loan applications are tracked until sanction letter is issued
            </p>
          </div>
        </div>
      </section>

      {/* REDESIGNED PRICING PLANS SECTION - New Modern Look */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-10">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Simple, Transparent Plans</h2>
          <p className="text-slate-600 mt-2">Choose the perfect plan for your home loan journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.title}
              className={`relative rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.popular 
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
                className={`block text-center py-3 px-4 rounded-xl font-medium transition-all ${
                  plan.popular
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
        <p className="text-center text-sm text-slate-500 mt-8 flex items-center justify-center gap-2">
          <FaRegCheckCircle className="text-green-500" />
          All plans include free eligibility check • No hidden charges • Cancel anytime
        </p>
      </section>
    </div>
  );
};

export default HomeLoan;
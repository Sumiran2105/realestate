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
  FaHome
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Drafted Rental Agreement',
    description: 'Professionally structured agreement format based on your tenancy details.',
    icon: <FaFileAlt className="text-2xl text-brand-dark" />
  },
  {
    title: 'Clause Review Support',
    description: 'Important clauses are reviewed to reduce disputes between owner and tenant.',
    icon: <FaBalanceScale className="text-2xl text-brand-dark" />
  },
  {
    title: 'Tenant & Owner Clarity',
    description: 'Clear terms for rent, deposit, maintenance, notice period, and renewal.',
    icon: <FaHome className="text-2xl text-brand-dark" />
  },
  {
    title: 'Safer Documentation',
    description: 'Identity and basic document checkpoints for more secure onboarding.',
    icon: <FaShieldAlt className="text-2xl text-brand-dark" />
  }
];

const steps = [
  {
    title: 'Share Rental Details',
    description: 'Provide owner, tenant, property, rent, and lock-in terms.',
    icon: <FaUserTie className="text-brand-dark" />
  },
  {
    title: 'Agreement Preparation',
    description: 'Draft is prepared with required terms and compliance-friendly structure.',
    icon: <FaFileSignature className="text-brand-dark" />
  },
  {
    title: 'Review & Revisions',
    description: 'Both parties review and update final clauses before execution.',
    icon: <FaCheckCircle className="text-brand-dark" />
  },
  {
    title: 'Finalize & Execute',
    description: 'Agreement is finalized for signing and safe record keeping.',
    icon: <FaClock className="text-brand-dark" />
  }
];

const plans = [
  {
    title: 'Basic Rental Draft',
    price: '₹499',
    summary: 'Quick standard agreement draft',
    points: ['Standard rental format', 'Essential clauses included', 'Single revision support']
  },
  {
    title: 'Standard Rental Assist',
    price: '₹999',
    summary: 'Best for most rentals',
    points: ['Detailed clause review', 'Two revision rounds', 'Execution guidance support']
  },
  {
    title: 'Premium Rental Support',
    price: '₹1,499',
    summary: 'For tailored rental needs',
    points: ['Advanced custom clauses', 'Priority handling', 'Expert discussion support']
  }
];

const RentalAgreements = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-brand mb-3 uppercase tracking-wide">Services</p>
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">Rental Agreements</h1>
              <p className="mt-5 text-slate-600 text-base sm:text-lg max-w-2xl">
                Create clear, balanced rental agreements for owners and tenants with professional drafting and review support.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-dark text-white hover:opacity-90 transition"
                >
                  Start Rental Agreement <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white">
              <img
                src="/RentalAggrement.jpeg"
                alt="Rental agreement service"
                className="w-full h-[280px] sm:h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900">What You Get</h2>
          <p className="text-slate-900 text-center mt-2">Practical rental agreement support from draft to finalization.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item) => (
            <article key={item.title} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-brand-soft flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900">How It Works</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-slate-500 p-5 bg-slate-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="text-xs font-semibold text-brand mb-3">Step {index + 1}</div>
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-3">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-center justify-center gap-3 mb-8">
          
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">Agreement Plans</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <article
              key={plan.title}
              className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${idx === 1 ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white border-slate-500'}`}
            >
              <h3 className="text-xl font-semibold">{plan.title}</h3>
              <p className={`mt-2 text-3xl font-bold ${idx === 1 ? 'text-white' : 'text-slate-900'}`}>{plan.price}</p>
              <p className={`mt-3 text-sm ${idx === 1 ? 'text-slate-100' : 'text-slate-600'}`}>{plan.summary}</p>
              <ul className="mt-5 space-y-2">
                {plan.points.map((point) => (
                  <li key={point} className={`flex items-start gap-2 text-sm ${idx === 1 ? 'text-slate-100' : 'text-slate-700'}`}>
                    <FaCheckCircle className={`mt-0.5 ${idx === 1 ? 'text-slate-100' : 'text-brand-dark'}`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  idx === 1 ? 'bg-white text-brand-dark hover:bg-slate-100' : 'bg-brand-dark text-white hover:opacity-90'
                }`}
              >
                Choose Plan <FaArrowRight className="text-xs" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="rounded-3xl bg-brand-dark text-white p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-200">Fast, Clear, Reliable</p>
            <h2 className="text-2xl sm:text-4xl font-bold mt-2">Get Your Rental Agreement Ready</h2>
            <p className="text-slate-100 mt-3 max-w-2xl">
              Avoid confusion and disputes with a professionally structured rental agreement.
            </p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-dark rounded-xl font-semibold hover:bg-slate-100 transition">
            <FaPhoneAlt className="text-sm" />
            Talk to Agreement Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RentalAgreements;

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
  FaPhoneAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const verificationChecks = [
  {
    title: 'Ownership Validation',
    description: 'Cross-check owner details with available records and submitted documents.',
    icon: <FaSearch className="text-2xl text-brand-dark" />
  },
  {
    title: 'Document Consistency',
    description: 'Verify deed copies, EC references, tax details, and supporting paperwork.',
    icon: <FaFileAlt className="text-2xl text-brand-dark" />
  },
  {
    title: 'Legal & Dispute Risk',
    description: 'Identify common legal red flags before token payment or agreement signing.',
    icon: <FaBalanceScale className="text-2xl text-brand-dark" />
  },
  {
    title: 'Approval Snapshot',
    description: 'Review available approval status points related to layout/building compliance.',
    icon: <FaUniversity className="text-2xl text-brand-dark" />
  }
];

const steps = [
  {
    title: 'Submit Property Inputs',
    description: 'Share location, owner details, and available documents to start verification.',
    icon: <FaMapMarkedAlt className="text-brand-dark" />
  },
  {
    title: 'Verification Run',
    description: 'Our team performs ownership, document, and risk checks in a structured workflow.',
    icon: <FaSearch className="text-brand-dark" />
  },
  {
    title: 'Receive Report',
    description: 'Get a simple, decision-ready report with issues, risk level, and recommendations.',
    icon: <FaFileAlt className="text-brand-dark" />
  },
  {
    title: 'Expert Follow-up',
    description: 'Discuss report findings and next legal or transactional steps with support.',
    icon: <FaShieldAlt className="text-brand-dark" />
  }
];

const plans = [
  {
    title: 'Basic Verify',
    price: '₹299',
    summary: 'Quick first-level screening',
    points: ['Ownership snapshot', 'Basic document checklist', 'High-level risk markers']
  },
  {
    title: 'Standard Verify',
    price: '₹599',
    summary: 'Most suitable before token',
    points: ['Detailed document verification', 'Risk-tagged observations', 'Actionable recommendations']
  },
  {
    title: 'Premium Verify',
    price: '₹999',
    summary: 'Comprehensive due diligence',
    points: ['End-to-end verification summary', 'Priority processing support', 'Expert guidance call']
  }
];

const VerifyProperty = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-brand mb-3 uppercase tracking-wide">Services</p>
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">Verify Property Before You Buy</h1>
              <p className="mt-5 text-slate-600 text-base sm:text-lg max-w-2xl">
                Protect your investment with structured checks on ownership, records, and legal risks before making any major payment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-dark text-white hover:opacity-90 transition"
                >
                  Start Verification <FaArrowRight className="text-sm" />
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
                src="/Land.png"
                alt="Land verification"
                className="w-full h-[280px] sm:h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What We Verify</h2>
          <p className="text-slate-600 mt-2">Core checks designed to reduce fraud and documentation gaps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verificationChecks.map((item) => (
            <article key={item.title} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-brand-soft flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Verification Process</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-slate-200 p-5 bg-slate-50">
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
        <div className="flex items-center gap-3 mb-8">
          <FaClock className="text-brand-dark" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Verification Plans</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <article
              key={plan.title}
              className={`rounded-2xl border p-6 ${idx === 1 ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white border-slate-200'}`}
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
            <p className="text-sm uppercase tracking-wide text-slate-200">Secure Your Transaction</p>
            <h2 className="text-2xl sm:text-4xl font-bold mt-2">Get a Verified Property Report</h2>
            <p className="text-slate-100 mt-3 max-w-2xl">
              Receive a clear report before payment so you can proceed with confidence.
            </p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-dark rounded-xl font-semibold hover:bg-slate-100 transition">
            <FaPhoneAlt className="text-sm" />
            Talk to Verification Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default VerifyProperty;

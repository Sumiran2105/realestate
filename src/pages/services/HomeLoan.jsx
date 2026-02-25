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
  FaUserTie
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const loanFeatures = [
  {
    title: 'Eligibility Assistance',
    description: 'Get guidance on income, credit profile, and property criteria before applying.',
    icon: <FaUserTie className="text-2xl text-brand-dark" />
  },
  {
    title: 'Document Readiness',
    description: 'Structured checklist for KYC, income proofs, and property papers to avoid delays.',
    icon: <FaFileAlt className="text-2xl text-brand-dark" />
  },
  {
    title: 'Rate & EMI Guidance',
    description: 'Understand interest rates, tenure impact, and EMI planning before commitment.',
    icon: <FaCalculator className="text-2xl text-brand-dark" />
  },
  {
    title: 'Safer Loan Journey',
    description: 'Transparent support from inquiry to sanction stage with clear next steps.',
    icon: <FaShieldAlt className="text-2xl text-brand-dark" />
  }
];

const processSteps = [
  {
    title: 'Initial Loan Assessment',
    description: 'We collect your requirements and evaluate eligibility basics for suitable options.',
    icon: <FaUniversity className="text-brand-dark" />
  },
  {
    title: 'Document Screening',
    description: 'Your documents are checked for completeness before lender submission.',
    icon: <FaFileAlt className="text-brand-dark" />
  },
  {
    title: 'Lender Coordination',
    description: 'Application progress is tracked and support is provided during verification.',
    icon: <FaClock className="text-brand-dark" />
  },
  {
    title: 'Sanction Support',
    description: 'Final clarification support and readiness guidance before disbursement.',
    icon: <FaCheckCircle className="text-brand-dark" />
  }
];

const plans = [
  {
    title: 'Starter Loan Help',
    price: 'Free',
    summary: 'Best for first-time exploration',
    points: ['Basic eligibility guidance', 'Document checklist', 'EMI orientation support']
  },
  {
    title: 'Priority Loan Support',
    price: '₹999',
    summary: 'Best for active applicants',
    points: ['End-to-end file preparation', 'Priority follow-up guidance', 'Dedicated support assistance']
  },
  {
    title: 'Expert Loan Advisory',
    price: '₹1,999',
    summary: 'Best for complex cases',
    points: ['Advanced case review', 'Personalized repayment planning', 'Extended expert consultation']
  }
];

const HomeLoan = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-brand mb-3 uppercase tracking-wide">Services</p>
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">Home Loan Assistance</h1>
              <p className="mt-5 text-slate-600 text-base sm:text-lg max-w-2xl">
                Simplify your home loan process with guided eligibility checks, documentation support, and lender coordination.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-dark text-white hover:opacity-90 transition"
                >
                  Apply for Loan Help <FaArrowRight className="text-sm" />
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
                src="/Loan.jpeg"
                alt="Home loan support"
                className="w-full h-[280px] sm:h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why Choose Our Loan Support</h2>
          <p className="text-slate-600 mt-2">Practical guidance to reduce delays and improve approval readiness.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loanFeatures.map((item) => (
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
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Loan Process in 4 Steps</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, index) => (
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
          <FaPercent className="text-brand-dark" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Support Plans</h2>
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
            <p className="text-sm uppercase tracking-wide text-slate-200">Get Loan-Ready Faster</p>
            <h2 className="text-2xl sm:text-4xl font-bold mt-2">Talk to Our Home Loan Team</h2>
            <p className="text-slate-100 mt-3 max-w-2xl">
              Get personalized support for eligibility, documents, and application follow-up.
            </p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-dark rounded-xl font-semibold hover:bg-slate-100 transition">
            <FaPhoneAlt className="text-sm" />
            Book Loan Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeLoan;

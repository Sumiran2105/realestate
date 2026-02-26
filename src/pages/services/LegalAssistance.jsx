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
  FaPhoneAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const keyServices = [
  {
    title: 'Property Title Verification',
    description: 'Complete legal due-diligence including ownership history, encumbrance checks, and dispute risk review.',
    icon: <FaSearch className="text-2xl text-brand-dark" />,
  },
  {
    title: 'Agreement Drafting & Review',
    description: 'Drafting and legal review of sale agreements, MoUs, and token advance terms before you sign.',
    icon: <FaFileSignature className="text-2xl text-brand-dark" />,
  },
  {
    title: 'Legal Consultation',
    description: 'One-to-one consultation with verified legal experts for property compliance and transaction safety.',
    icon: <FaGavel className="text-2xl text-brand-dark" />,
  },
  {
    title: 'Fast Turnaround',
    description: 'Priority legal support for urgent transactions so you can move forward without unnecessary delays.',
    icon: <FaRegClock className="text-2xl text-brand-dark" />,
  },
];

const trustPoints = [
  { title: 'Verified Legal Experts', description: 'Work with experienced property legal professionals.', icon: <FaUserTie className="text-xl text-brand-dark" /> },
  { title: 'State-Compliant Drafting', description: 'Documentation aligned with local registration requirements.', icon: <FaBalanceScale className="text-xl text-brand-dark" /> },
  { title: 'Risk-First Review', description: 'We flag legal and title issues before you commit funds.', icon: <FaShieldAlt className="text-xl text-brand-dark" /> },
  { title: 'Buyer and Seller Support', description: 'Assistance for both parties from token to registration.', icon: <FaHome className="text-xl text-brand-dark" /> }
];

const processSteps = [
  { title: 'Share Property Details', description: 'Submit property documents and transaction context for legal assessment.', icon: <FaFileAlt className="text-brand-dark" /> },
  { title: 'Legal Due Diligence', description: 'Ownership, encumbrance, approvals, and record consistency checks are performed.', icon: <FaSearch className="text-brand-dark" /> },
  { title: 'Draft / Review Agreements', description: 'Token agreement, sale agreement, and clauses are drafted or reviewed.', icon: <FaFileSignature className="text-brand-dark" /> },
  { title: 'Consultation & Closure', description: 'Final call with legal expert to resolve queries before transaction closure.', icon: <FaGavel className="text-brand-dark" /> }
];

const plans = [
  {
    title: 'Basic Legal Check',
    price: '₹499',
    description: 'Best for early screening before token payment.',
    points: ['Ownership summary', 'Basic document review', 'High-risk issue alerts']
  },
  {
    title: 'Standard Legal Review',
    price: '₹1,499',
    description: 'Ideal for active buy/sell negotiations.',
    points: ['Title + encumbrance validation', 'Agreement clause review', 'One legal consultation']
  },
  {
    title: 'Complete Legal Assistance',
    price: '₹2,999',
    description: 'End-to-end support until final registration stage.',
    points: ['Comprehensive legal due diligence', 'Agreement drafting support', 'Priority consultation and query handling']
  }
];

const faqs = [
  {
    q: 'What documents should I prepare first?',
    a: 'Start with title deed copies, EC details, tax receipts, ID proofs, and any draft agreements available.'
  },
  {
    q: 'How long does legal verification usually take?',
    a: 'Basic checks are usually quick, while detailed due diligence may take longer depending on document completeness.'
  },
  {
    q: 'Can you review agreements made by builder or seller?',
    a: 'Yes. We review existing drafts, highlight risky clauses, and suggest legally safer changes.'
  }
];

const LegalAssistance = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-brand mb-3 uppercase tracking-wide">Services</p>
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">Legal Assistance for Safe Property Transactions</h1>
              <p className="mt-5 text-slate-600 text-base sm:text-lg max-w-3xl">
                Reduce legal risk at every stage of your property journey with expert support for document checks, title validation, and agreement drafting.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-dark text-white hover:opacity-90 transition"
                >
                  Request Legal Help <FaArrowRight className="text-sm" />
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
                src="/Law.jpeg"
                alt="Legal assistance"
                className="w-full h-[280px] sm:h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPoints.map((item) => (
            <article key={item.title} className="bg-white border border-slate-500 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-brand-soft flex items-center justify-center mb-3">{item.icon}</div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900">What We Cover</h2>
          <p className="text-slate-900 text-center mt-2">Core legal assistance services for safer property decisions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyServices.map((service) => (
            <article
              key={service.title}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-soft flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{service.title}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900">How Legal Assistance Works</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, index) => (
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
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900">Choose a Plan</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <article
              key={plan.title}
              className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${idx === 1 ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white border-slate-500'}`}
            >
              <h3 className="text-xl font-semibold">{plan.title}</h3>
              <p className={`mt-2 text-3xl font-bold ${idx === 1 ? 'text-white' : 'text-slate-900'}`}>{plan.price}</p>
              <p className={`mt-3 text-sm ${idx === 1 ? 'text-slate-100' : 'text-slate-600'}`}>{plan.description}</p>
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
                Get Started <FaArrowRight className="text-xs" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {faqs.map((faq) => (
              <article key={faq.q} className="rounded-2xl border border-slate-500 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                <p className="text-sm text-slate-600 mt-3">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="rounded-3xl bg-brand-dark text-white p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-200">Need Immediate Help?</p>
            <h2 className="text-2xl sm:text-4xl font-bold mt-2">Talk to a Legal Property Expert Today</h2>
            <p className="text-slate-100 mt-3 max-w-2xl">
              Get personalized legal guidance before you sign, pay token, or finalize registration.
            </p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-dark rounded-xl font-semibold hover:bg-slate-100 transition">
            <FaPhoneAlt className="text-sm" />
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LegalAssistance;

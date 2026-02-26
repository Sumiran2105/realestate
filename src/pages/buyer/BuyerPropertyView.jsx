import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaComments,
  FaDownload,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShareAlt,
  FaShieldAlt,
  FaStar,
  FaTrain,
  FaVideo,
  FaEye,
  FaChartLine,
} from 'react-icons/fa';
import { getAllSellerListings, getSellerListingByIdFromAll } from '../../utils/sellerListings';

const statusConfig = {
  verified: { color: 'bg-green-100 text-green-700', label: 'Green' },
  under_review: { color: 'bg-yellow-100 text-yellow-700', label: 'Yellow' },
  pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Yellow' },
  sold: { color: 'bg-red-100 text-red-700', label: 'Red' },
  draft: { color: 'bg-red-100 text-red-700', label: 'Red' },
};

const formatCurrency = (value) => {
  if (!value || Number.isNaN(value)) return 'N/A';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const toNumber = (value) => {
  const parsed = Number(String(value ?? '').replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const BuyerPropertyView = () => {
  const { id } = useParams();
  const listing = getSellerListingByIdFromAll(id);
  const allListings = getAllSellerListings();

  const [loanAmount, setLoanAmount] = useState('5000000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [loanTenure, setLoanTenure] = useState('20');

  if (!listing) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-xl border border-slate-300 p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Property Not Found</h1>
          <p className="text-slate-600 mt-2">This listing is unavailable.</p>
          <Link to="/buyer/home" className="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Buyer Home
          </Link>
        </div>
      </div>
    );
  }

  const details = listing.details || {};
  const propertyType = details.propertyType || {};
  const propertyDetails = details.propertyDetails || {};
  const location = details.locationIntelligence || {};
  const pricing = details.pricing || {};
  const media = details.media || {};

  const sellerListingsCount = allListings.filter((item) => item.sellerId === listing.sellerId).length || 1;

  const askingPrice = toNumber(listing.price || pricing.expectedPrice || listing.expectedPrice);
  const totalArea = toNumber(propertyDetails.totalArea || listing.totalArea);
  const pricePerSqFt = askingPrice && totalArea ? Math.round(askingPrice / totalArea) : 0;
  const aiFairPrice = askingPrice ? Math.round(askingPrice * 0.95) : 0;

  const trendValues = [
    Math.max(pricePerSqFt - 180, 0),
    Math.max(pricePerSqFt - 120, 0),
    Math.max(pricePerSqFt - 80, 0),
    Math.max(pricePerSqFt - 40, 0),
    Math.max(pricePerSqFt - 20, 0),
    pricePerSqFt,
  ];
  const maxTrend = Math.max(...trendValues, 1);

  const completionScore = 8;
  const legalRisk = listing.status === 'verified' ? 'Low' : listing.status === 'sold' ? 'Medium' : 'Moderate';
  const encumbranceStatus = listing.status === 'verified' ? 'No Active Encumbrance Found' : 'Needs Final Verification';

  const rate = Number(interestRate) / 12 / 100;
  const tenureMonths = Number(loanTenure) * 12;
  const principal = Number(loanAmount);
  const emi = rate > 0 && tenureMonths > 0
    ? Math.round((principal * rate * (1 + rate) ** tenureMonths) / ((1 + rate) ** tenureMonths - 1))
    : 0;

  const imageGallery = [
    listing.image,
    listing.image,
    listing.image,
  ].filter(Boolean);

  const statusInfo = statusConfig[listing.status] || statusConfig.pending;

  const buttonAction = (label) => {
    window.alert(`${label} action triggered for ${listing.title}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Link to="/buyer/home" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100">
            Back to Buyer Home
          </Link>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
            Verification Status: {statusInfo.label}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-300 overflow-hidden">
          <img src={listing.image || 'https://via.placeholder.com/1200x360'} alt={listing.title} className="w-full h-80 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-slate-900">{listing.title}</h1>
            <p className="text-slate-600 mt-2 flex items-center gap-2"><FaMapMarkerAlt /> {listing.location}</p>
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-slate-300 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">1. Photo Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {imageGallery.map((img, idx) => (
              <img key={`${img}-${idx}`} src={img} alt={`Property ${idx + 1}`} className="w-full h-48 object-cover rounded-lg border border-slate-300" />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => buttonAction('360° virtual tour')} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-sm flex items-center gap-2"><FaEye /> 360° Virtual Tour</button>
            <button onClick={() => buttonAction('Video walkthrough')} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-sm flex items-center gap-2"><FaVideo /> Video Walkthrough</button>
            <button onClick={() => buttonAction('Street view')} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-sm">Street View Integration</button>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-300 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">2. Verification Report Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg bg-slate-50 border border-slate-300 p-4">
              <p className="text-xs uppercase text-slate-500">Status Badge</p>
              <p className="mt-1 font-semibold text-slate-900">{statusInfo.label}</p>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-300 p-4">
              <p className="text-xs uppercase text-slate-500">Doc Completeness</p>
              <p className="mt-1 font-semibold text-slate-900">{completionScore}/10</p>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-300 p-4">
              <p className="text-xs uppercase text-slate-500">Legal Risk</p>
              <p className="mt-1 font-semibold text-slate-900">{legalRisk}</p>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-300 p-4">
              <p className="text-xs uppercase text-slate-500">Last Verified</p>
              <p className="mt-1 font-semibold text-slate-900">{listing.listedDate || '-'}</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-300 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">3. Property Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Key Features</h3>
              <ul className="text-sm text-slate-700 space-y-2">
                {(propertyDetails.amenities || listing.amenities || ['Parking', 'Security']).map((item) => (
                  <li key={item} className="flex items-center gap-2"><FaCheckCircle className="text-green-600" />{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Nearby Infrastructure</h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li><FaMapMarkerAlt className="inline mr-2 text-blue-700" />Hospital - 1.8 km</li>
                <li><FaMapMarkerAlt className="inline mr-2 text-blue-700" />School - 1.2 km</li>
                <li><FaTrain className="inline mr-2 text-blue-700" />Metro Station - 2.4 km</li>
                <li><FaStar className="inline mr-2 text-blue-700" />Upcoming ORR expansion nearby</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-300 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">4. Price Intelligence</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="rounded-lg bg-slate-50 border border-slate-300 p-4"><p className="text-xs uppercase text-slate-500">Current Asking Price</p><p className="mt-1 font-semibold text-slate-900">{formatCurrency(askingPrice)}</p></div>
            <div className="rounded-lg bg-slate-50 border border-slate-300 p-4"><p className="text-xs uppercase text-slate-500">Price / sq.ft.</p><p className="mt-1 font-semibold text-slate-900">{pricePerSqFt ? `${formatCurrency(pricePerSqFt)}` : 'N/A'}</p></div>
            <div className="rounded-lg bg-slate-50 border border-slate-300 p-4"><p className="text-xs uppercase text-slate-500">AI Fair Price</p><p className="mt-1 font-semibold text-slate-900">{formatCurrency(aiFairPrice)}</p></div>
            <div className="rounded-lg bg-slate-50 border border-slate-300 p-4"><p className="text-xs uppercase text-slate-500">Trend (6 months)</p><p className="mt-1 font-semibold text-slate-900 flex items-center gap-1"><FaChartLine /> Stable Growth</p></div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-slate-900 mb-3">Price Trend Graph (6 Months)</h3>
            <div className="h-36 bg-slate-50 border border-slate-300 rounded-lg p-4 flex items-end gap-3">
              {trendValues.map((value, idx) => (
                <div key={idx} className="flex-1">
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(value / maxTrend) * 100}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3">EMI Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="Loan Amount" className="px-3 py-2 border border-slate-300 rounded-lg" />
              <input value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="Interest %" className="px-3 py-2 border border-slate-300 rounded-lg" />
              <input value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} placeholder="Tenure (years)" className="px-3 py-2 border border-slate-300 rounded-lg" />
              <div className="px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold">EMI: {formatCurrency(emi)}</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-300 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">5. Legal Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div><p className="text-xs uppercase text-slate-500">Survey Number</p><p className="mt-1 text-sm font-semibold">{propertyDetails.surveyNumber || listing.surveyNumber || '-'}</p></div>
            <div><p className="text-xs uppercase text-slate-500">Land Use Zone</p><p className="mt-1 text-sm font-semibold">{location.zone || listing.zone || '-'}</p></div>
            <div><p className="text-xs uppercase text-slate-500">Encumbrance Status</p><p className="mt-1 text-sm font-semibold">{encumbranceStatus}</p></div>
            <div><p className="text-xs uppercase text-slate-500">Last Transaction</p><p className="mt-1 text-sm font-semibold">{listing.listedDate || '-'}</p></div>
            <div><p className="text-xs uppercase text-slate-500">Property Tax</p><p className="mt-1 text-sm font-semibold">Paid / Up to date</p></div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-300 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">6. Seller Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div><p className="text-xs uppercase text-slate-500">Seller Name</p><p className="mt-1 text-sm font-semibold">{listing.sellerName || 'Verified Seller'}</p></div>
            <div><p className="text-xs uppercase text-slate-500">Verification Badge</p><p className="mt-1 text-sm font-semibold flex items-center gap-1"><FaShieldAlt className="text-green-600" /> Verified</p></div>
            <div><p className="text-xs uppercase text-slate-500">Member Since</p><p className="mt-1 text-sm font-semibold">{listing.listedDate || '-'}</p></div>
            <div><p className="text-xs uppercase text-slate-500">Response Rate / Time</p><p className="mt-1 text-sm font-semibold">92% / ~20 mins</p></div>
            <div><p className="text-xs uppercase text-slate-500">Other Listings</p><p className="mt-1 text-sm font-semibold">{sellerListingsCount}</p></div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-300 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">7. Action Buttons</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button onClick={() => buttonAction('Contact owner')} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center gap-2"><FaPhoneAlt /> Contact Owner</button>
            <button onClick={() => buttonAction('Chat with seller')} className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm flex items-center justify-center gap-2"><FaComments /> Chat</button>
            <button onClick={() => buttonAction('Schedule visit')} className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm flex items-center justify-center gap-2"><FaCalendarAlt /> Schedule Visit</button>
            <button onClick={() => buttonAction('Download full report (paid)')} className="px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm flex items-center justify-center gap-2"><FaDownload /> Full Report</button>
            <button onClick={() => buttonAction('Save/Share/Report')} className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 text-sm flex items-center justify-center gap-2"><FaShareAlt /> Save/Share/Report</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuyerPropertyView;

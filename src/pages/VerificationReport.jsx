import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaDownload, FaPrint, FaShareAlt } from 'react-icons/fa';
import propertiesData from '../data/properties.json';

const VerificationReport = () => {
  const { propertyId } = useParams();
  const property = propertiesData?.listings?.find((item) => item.property_id === propertyId);

  const handlePrint = () => window.print();

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Verification Report',
          text: `Full verification report for ${property?.title || 'property'}`,
          url: shareUrl,
        });
      } catch {
        // noop
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      window.alert('Report link copied to clipboard.');
    } catch {
      window.alert('Unable to copy link.');
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-slate-300 p-8 text-center max-w-xl">
          <h1 className="text-2xl font-bold text-slate-900">Report Not Found</h1>
          <p className="mt-2 text-slate-600">This verification report is unavailable.</p>
          <Link to="/" className="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-300 p-5 sm:p-6 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Full Verification Report</h1>
            <p className="text-slate-600 mt-1">{property.title}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-2">
              <FaPrint /> Print
            </button>
            <button onClick={handlePrint} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-2">
              <FaDownload /> PDF
            </button>
            <button onClick={handleShare} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
              <FaShareAlt /> Share
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Survey & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Survey Number:</span> {property?.government_approvals?.land_ownership?.survey_number || '-'}</p>
            <p><span className="font-semibold text-slate-900">Village:</span> {property?.location?.address?.split(',')?.[0] || '-'}</p>
            <p><span className="font-semibold text-slate-900">District:</span> {property?.location?.district || '-'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Ownership Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Current Owner:</span> {property?.government_approvals?.land_ownership?.pattadar_name || '-'}</p>
            <p><span className="font-semibold text-slate-900">Ownership Type:</span> {property?.seller_information?.type || '-'}</p>
            <p><span className="font-semibold text-slate-900">Verification Status:</span> {property?.government_approvals?.land_ownership?.verification_status || '-'}</p>
            <p><span className="font-semibold text-slate-900">Encumbrance:</span> {property?.government_approvals?.land_ownership?.encumbrance_status || '-'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Land Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Total Area:</span> {property?.property_details?.plot_area_sq_yards || '-'} sq.yds</p>
            <p><span className="font-semibold text-slate-900">Land Type:</span> {property?.property_details?.permissible_usage || '-'}</p>
            <p><span className="font-semibold text-slate-900">Classification:</span> {property?.location?.zone || '-'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Legal Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Title:</span> {property?.verification_report_card?.title_verification || '-'}</p>
            <p><span className="font-semibold text-slate-900">Owner Verification:</span> {property?.verification_report_card?.owner_verification || '-'}</p>
            <p><span className="font-semibold text-slate-900">Last Verified Date:</span> {property?.verification_report_card?.last_verified_date || '-'}</p>
            <p><span className="font-semibold text-slate-900">Report Summary:</span> {property?.verification_report_card?.report_summary || '-'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Documents Available</h2>
          <ul className="mt-4 text-sm text-slate-700 space-y-2">
            <li>✅ ROR-1B (Download)</li>
            <li>✅ Pahani (Download)</li>
            <li>✅ Encumbrance Certificate (Download)</li>
            <li>✅ Pattadar Passbook (Download)</li>
            <li>✅ Cadastral Map (View)</li>
          </ul>
        </div>

        <div className="pb-6">
          <Link to="/" className="inline-block px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationReport;

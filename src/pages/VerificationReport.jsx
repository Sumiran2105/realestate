import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaDownload, FaPrint, FaShareAlt, FaFilePdf, FaFileAlt, FaMapMarkedAlt, FaCheckCircle, FaExclamationTriangle, FaHourglassHalf } from 'react-icons/fa';
import propertiesData from '../data/properties.json';

const VerificationReport = () => {
  const { propertyId } = useParams();
  const property = propertiesData?.listings?.find((item) => item.property_id === propertyId);

  const handlePrint = () => window.print();

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    window.alert('PDF download functionality would be implemented here');
  };

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

  const getVerificationBadgeColor = (badge) => {
    switch(badge) {
      case 'Fully Verified':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'Partially Verified':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Not Verified':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getDocumentIcon = (docName) => {
    if (docName.toLowerCase().includes('map') || docName.toLowerCase().includes('cadastral')) {
      return <FaMapMarkedAlt className="text-blue-600" />;
    } else if (docName.toLowerCase().includes('encumbrance')) {
      return <FaFileAlt className="text-purple-600" />;
    } else {
      return <FaFilePdf className="text-red-600" />;
    }
  };

  const handleDownloadDocument = (docName) => {
    // In a real app, this would download the actual document
    window.alert(`Downloading ${docName}... (Demo functionality)`);
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
        {/* Header with Verification Badge */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Full Verification Report</h1>
              <p className="text-slate-600 mt-1">{property.title}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrint} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                <FaPrint /> Print
              </button>
              <button onClick={handleDownloadPDF} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                <FaDownload /> PDF
              </button>
              <button onClick={handleShare} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
                <FaShareAlt /> Share
              </button>
            </div>
          </div>
          
          {/* Verification Status Badge */}
          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getVerificationBadgeColor(property.verified_badge)}`}>
            {property.verified_badge === 'Fully Verified' && <FaCheckCircle className="text-green-700" />}
            {property.verified_badge === 'Partially Verified' && <FaHourglassHalf className="text-yellow-700" />}
            {property.verified_badge === 'Not Verified' && <FaExclamationTriangle className="text-red-700" />}
            <span className="font-semibold">{property.verified_badge}</span>
          </div>
        </div>

        {/* Survey & Location */}
        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Survey & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Survey Number:</span> {
              property?.government_approvals?.land_ownership?.survey_number || 
              (property?.government_approvals?.land_ownership?.survey_numbers?.join(', ')) || '-'
            }</p>
            <p><span className="font-semibold text-slate-900">Village:</span> {property?.location?.address?.split(',')?.[0] || '-'}</p>
            <p><span className="font-semibold text-slate-900">District:</span> {property?.location?.district || '-'}</p>
            <p><span className="font-semibold text-slate-900">City:</span> {property?.location?.city || '-'}</p>
            <p><span className="font-semibold text-slate-900">Pincode:</span> {property?.location?.pincode || '-'}</p>
            <p><span className="font-semibold text-slate-900">Zone:</span> {property?.location?.zone || '-'}</p>
          </div>
        </div>

        {/* Ownership Details */}
        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Ownership Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Current Owner:</span> {property?.government_approvals?.land_ownership?.pattadar_name || '-'}</p>
            <p><span className="font-semibold text-slate-900">Ownership Type:</span> {property?.seller_information?.type || '-'}</p>
            <p><span className="font-semibold text-slate-900">Verification Status:</span> {
              <span className={`inline-flex items-center gap-1 ${
                property?.government_approvals?.land_ownership?.verification_status === 'Clear Title' ? 'text-green-700' : 
                property?.government_approvals?.land_ownership?.verification_status === 'Pending' ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {property?.government_approvals?.land_ownership?.verification_status === 'Clear Title' && <FaCheckCircle className="text-green-700" />}
                {property?.government_approvals?.land_ownership?.verification_status === 'Pending' && <FaHourglassHalf className="text-yellow-700" />}
                {property?.government_approvals?.land_ownership?.verification_status || '-'}
              </span>
            }</p>
            <p><span className="font-semibold text-slate-900">Encumbrance:</span> {
              <span className={`${
                property?.government_approvals?.land_ownership?.encumbrance_status === 'No Encumbrances' ? 'text-green-700' : 
                property?.government_approvals?.land_ownership?.encumbrance_status === 'Verification Required' ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {property?.government_approvals?.land_ownership?.encumbrance_status || '-'}
              </span>
            }</p>
          </div>
        </div>

        {/* Land Details */}
        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Land Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Total Area:</span> {
              property?.property_details?.plot_area_sq_yards ? `${property.property_details.plot_area_sq_yards} sq.yds` :
              property?.property_details?.total_land_area_acres ? `${property.property_details.total_land_area_acres} acres` : '-'
            }</p>
            <p><span className="font-semibold text-slate-900">Land Type:</span> {property?.property_details?.permissible_usage || property?.property_details?.land_use || '-'}</p>
            <p><span className="font-semibold text-slate-900">Classification:</span> {property?.location?.zone || '-'}</p>
            {property?.property_details?.dimensions && (
              <p><span className="font-semibold text-slate-900">Dimensions:</span> {property.property_details.dimensions}</p>
            )}
            {property?.property_details?.facing && (
              <p><span className="font-semibold text-slate-900">Facing:</span> {property.property_details.facing}</p>
            )}
            {property?.property_details?.soil_type && (
              <p><span className="font-semibold text-slate-900">Soil Type:</span> {property.property_details.soil_type}</p>
            )}
          </div>
        </div>

        {/* Government Approvals */}
        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Government Approvals</h2>
          <div className="space-y-4 mt-4">
            {property?.government_approvals?.layout_approval && (
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-semibold text-slate-900 mb-2">Layout Approval</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p><span className="text-slate-600">Authority:</span> {property.government_approvals.layout_approval.authority || '-'}</p>
                  <p><span className="text-slate-600">Number:</span> {property.government_approvals.layout_approval.approval_number || 'Pending'}</p>
                  <p><span className="text-slate-600">Date:</span> {property.government_approvals.layout_approval.approved_date || '-'}</p>
                  <p><span className="text-slate-600">Status:</span> 
                    <span className={`ml-1 ${
                      property.government_approvals.layout_approval.status === 'Approved' ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {property.government_approvals.layout_approval.status || '-'}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {property?.government_approvals?.rera_details && (
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-semibold text-slate-900 mb-2">RERA Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p><span className="text-slate-600">Applicable:</span> {property.government_approvals.rera_details.applicable ? 'Yes' : 'No'}</p>
                  {property.government_approvals.rera_details.rera_number && (
                    <p><span className="text-slate-600">Number:</span> {property.government_approvals.rera_details.rera_number}</p>
                  )}
                  {property.government_approvals.rera_details.reason && (
                    <p><span className="text-slate-600">Note:</span> {property.government_approvals.rera_details.reason}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legal Status */}
        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Legal Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Title Verification:</span> 
              <span className={`ml-1 ${
                property?.verification_report_card?.title_verification === 'Clear' ? 'text-green-700' : 
                property?.verification_report_card?.title_verification === 'Pending' ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {property?.verification_report_card?.title_verification || '-'}
              </span>
            </p>
            <p><span className="font-semibold text-slate-900">Owner Verification:</span> 
              <span className={`ml-1 ${
                property?.verification_report_card?.owner_verification === 'Passed' ? 'text-green-700' : 
                property?.verification_report_card?.owner_verification === 'In Progress' ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {property?.verification_report_card?.owner_verification || '-'}
              </span>
            </p>
            <p><span className="font-semibold text-slate-900">Overall Risk Score:</span> 
              <span className={`ml-1 ${
                property?.verification_report_card?.overall_risk_score <= 2 ? 'text-green-700' : 
                property?.verification_report_card?.overall_risk_score <= 5 ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {property?.verification_report_card?.overall_risk_score || '-'}/10
              </span>
            </p>
            <p><span className="font-semibold text-slate-900">Document Completeness:</span> 
              <span className={`ml-1 ${
                property?.verification_report_card?.document_completeness_score >= 8 ? 'text-green-700' : 
                property?.verification_report_card?.document_completeness_score >= 5 ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {property?.verification_report_card?.document_completeness_score || '-'}/10
              </span>
            </p>
            <p><span className="font-semibold text-slate-900">Last Verified Date:</span> {property?.verification_report_card?.last_verified_date || '-'}</p>
            {property?.verification_report_card?.report_summary && (
              <p className="md:col-span-2"><span className="font-semibold text-slate-900">Report Summary:</span> {property.verification_report_card.report_summary}</p>
            )}
          </div>
        </div>

        {/* Documents Available Section - Uncommented and populated from JSON */}
        <div className="bg-white rounded-xl border border-slate-300 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Documents Available</h2>
          
          {/* Verified Documents */}
          {property?.verification_report_card?.verified_documents && 
           property.verification_report_card.verified_documents.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                <FaCheckCircle /> Verified Documents ({property.verification_report_card.verified_documents.length})
              </h3>
              <ul className="space-y-2">
                {property.verification_report_card.verified_documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getDocumentIcon(doc)}
                      <span className="text-sm text-slate-700">{doc}</span>
                    </div>
                    <button 
                      onClick={() => handleDownloadDocument(doc)}
                      className="px-3 py-1 text-xs bg-white border border-green-300 text-green-700 rounded hover:bg-green-100 flex items-center gap-1"
                    >
                      <FaDownload size={12} /> Download
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pending Documents (for Partially Verified) */}
          {property?.verified_badge === 'Partially Verified' && 
           property?.verification_report_card?.pending_documents && 
           property.verification_report_card.pending_documents.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-yellow-700 mb-2 flex items-center gap-2">
                <FaHourglassHalf /> Pending Documents ({property.verification_report_card.pending_documents.length})
              </h3>
              <ul className="space-y-2">
                {property.verification_report_card.pending_documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <FaFileAlt className="text-yellow-600" />
                    <span className="text-sm text-slate-700">{doc}</span>
                    <span className="ml-auto text-xs text-yellow-600 font-medium">(Awaiting)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Documents (for Not Verified) */}
          {property?.verified_badge === 'Not Verified' && 
           property?.verification_report_card?.pending_documents && 
           property.verification_report_card.pending_documents.length > 0 && (
            <div>
              <h3 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                <FaExclamationTriangle /> Required Documents ({property.verification_report_card.pending_documents.length})
              </h3>
              <ul className="space-y-2">
                {property.verification_report_card.pending_documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <FaFileAlt className="text-red-600" />
                    <span className="text-sm text-slate-700">{doc}</span>
                    <span className="ml-auto text-xs text-red-600 font-medium">(Not Provided)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verification Notes */}
          {property?.verification_report_card?.verification_notes && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Verification Notes</h3>
              <p className="text-sm text-blue-700">{property.verification_report_card.verification_notes}</p>
            </div>
          )}
        </div>

        {/* Utility Connections */}
        {property?.government_approvals?.utility_connections && (
          <div className="bg-white rounded-xl border border-slate-300 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Utility Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.government_approvals.utility_connections.electricity && (
                <div className={`p-4 rounded-lg border ${
                  property.government_approvals.utility_connections.electricity.verified 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-yellow-200 bg-yellow-50'
                }`}>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    ⚡ Electricity
                    {property.government_approvals.utility_connections.electricity.verified 
                      ? <span className="text-xs text-green-700">(Verified)</span>
                      : <span className="text-xs text-yellow-700">(Pending)</span>
                    }
                  </h3>
                  <p className="text-sm">Provider: {property.government_approvals.utility_connections.electricity.provider || '-'}</p>
                  <p className="text-sm">Service No: {property.government_approvals.utility_connections.electricity.service_number || '-'}</p>
                  <p className="text-sm">Dues: {property.government_approvals.utility_connections.electricity.dues_status || '-'}</p>
                </div>
              )}
              
              {property.government_approvals.utility_connections.water && (
                <div className={`p-4 rounded-lg border ${
                  property.government_approvals.utility_connections.water.verified 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-yellow-200 bg-yellow-50'
                }`}>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    💧 Water
                    {property.government_approvals.utility_connections.water.verified 
                      ? <span className="text-xs text-green-700">(Verified)</span>
                      : <span className="text-xs text-yellow-700">(Pending)</span>
                    }
                  </h3>
                  <p className="text-sm">Provider: {property.government_approvals.utility_connections.water.provider || '-'}</p>
                  <p className="text-sm">Connection No: {property.government_approvals.utility_connections.water.connection_number || '-'}</p>
                  <p className="text-sm">Dues: {property.government_approvals.utility_connections.water.dues_status || '-'}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Back Button */}
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
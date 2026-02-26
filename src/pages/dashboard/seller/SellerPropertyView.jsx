import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { getSellerListingById } from '../../../utils/sellerListings';

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    <p className="text-sm text-gray-900 mt-1">{value || '-'}</p>
  </div>
);

const FileList = ({ title, items = [] }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4">
    <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
    {items.length === 0 ? (
      <p className="text-sm text-gray-500">No files added.</p>
    ) : (
      <ul className="text-sm text-gray-700 space-y-1">
        {items.map((item) => (
          <li key={item} className="truncate">• {item}</li>
        ))}
      </ul>
    )}
  </div>
);

const SellerPropertyView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const listing = getSellerListingById(user?.id, id);

  if (!listing) {
    return (
      <DashboardLayout title="Property Details">
        <div className="bg-white rounded-xl border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Listing Not Found</h2>
          <p className="text-gray-600 mt-2">This listing may have been deleted or is unavailable.</p>
          <Link
            to="/dashboard/seller/properties"
            className="inline-block mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to My Properties
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const details = listing.details || {};
  const locationData = details.locationIntelligence || {};
  const legalDocuments = details.legalDocuments || {};
  const propertyDetails = details.propertyDetails || {};
  const pricing = details.pricing || {};
  const media = details.media || {};

  const category = details.propertyType?.category || listing.propertyCategory;
  const subCategory = details.propertyType?.subCategory || listing.subCategory;
  const surveyNumber = propertyDetails.surveyNumber || listing.surveyNumber;
  const totalArea = propertyDetails.totalArea || listing.totalArea;
  const areaUnit = propertyDetails.areaUnit || listing.areaUnit;
  const rooms = propertyDetails.rooms || listing.rooms;
  const furnishing = propertyDetails.furnishing || listing.furnishing;
  const propertyAgeCondition = propertyDetails.propertyAgeCondition || listing.propertyAgeCondition;
  const amenities = propertyDetails.amenities || listing.amenities || [];

  const pinnedLocation = locationData.pinnedLocation || listing.pinnedLocation || listing.location;
  const landmarkReferences = locationData.landmarkReferences || listing.landmarkReferences;
  const zone = locationData.zone || listing.zone;
  const latitude = locationData.latitude || listing.latitude;
  const longitude = locationData.longitude || listing.longitude;
  const gpsEnabled = typeof locationData.gpsEnabled === 'boolean'
    ? locationData.gpsEnabled
    : !!listing.gpsEnabled;

  const expectedPrice = pricing.expectedPrice || listing.expectedPrice || listing.price;
  const negotiability = pricing.negotiability || listing.negotiability;
  const paymentTerms = pricing.paymentTerms || listing.paymentTerms;
  const possessionStatus = pricing.possessionStatus || listing.possessionStatus;

  const mediaPhotos = media.photos || listing.photos || [];
  const mediaVideos = media.videosOrTours || listing.videosOrTours || [];
  const mediaFloorPlans = media.floorPlans || listing.floorPlans || [];
  const mediaDrone = media.droneFootage || listing.droneFootage || [];

  const legalDocRows = [
    ['Sale Deed', legalDocuments.saleDeed || listing.saleDeed],
    ['Encumbrance Certificate', legalDocuments.encumbranceCertificate || listing.encumbranceCertificate],
    ['Pattadar/Pahani', legalDocuments.pattadarOrPahani || listing.pattadarOrPahani],
    ['Tax Receipts', legalDocuments.taxReceipts || listing.taxReceipts],
    ['Approvals', legalDocuments.approvals || listing.approvals],
  ];

  return (
    <DashboardLayout title="Property Details">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <img
            src={listing.image || 'https://via.placeholder.com/1200x350'}
            alt={listing.title}
            className="w-full h-72 object-cover"
          />
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
                <p className="text-gray-600 mt-1">{listing.location}</p>
              </div>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 uppercase">
                {(listing.status || 'under_review').replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Expected Price</p>
                <p className="font-semibold text-gray-900 mt-1">{listing.price}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Views</p>
                <p className="font-semibold text-gray-900 mt-1">{listing.views || 0}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Inquiries</p>
                <p className="font-semibold text-gray-900 mt-1">{listing.inquiries || 0}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Listed Date</p>
                <p className="font-semibold text-gray-900 mt-1">{listing.listedDate || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Category" value={category} />
            <Field label="Sub-category" value={subCategory} />
            <Field label="Survey Number" value={surveyNumber} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Location Intelligence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Pinned Location" value={pinnedLocation} />
            <Field label="Landmarks" value={landmarkReferences} />
            <Field label="Zone" value={zone} />
            <Field label="Latitude" value={latitude} />
            <Field label="Longitude" value={longitude} />
            <Field label="GPS Enabled" value={gpsEnabled ? 'Yes' : 'No'} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Legal Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legalDocRows.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-gray-200 p-3">
                <p className="text-xs text-gray-500 uppercase">{label}</p>
                <p className="text-sm text-gray-900 mt-1">{value || 'Not uploaded'}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Total Area" value={totalArea ? `${totalArea} ${areaUnit || ''}` : '-'} />
            <Field label="Rooms" value={rooms} />
            <Field label="Furnishing" value={furnishing} />
            <Field label="Age & Condition" value={propertyAgeCondition} />
            <Field label="Amenities" value={amenities.join(', ')} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field label="Expected Price" value={expectedPrice} />
            <Field label="Negotiability" value={negotiability} />
            <Field label="Payment Terms" value={paymentTerms} />
            <Field label="Possession Status" value={possessionStatus} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileList title="Photos" items={mediaPhotos} />
          <FileList title="Videos / 360 Tours" items={mediaVideos} />
          <FileList title="Floor Plans" items={mediaFloorPlans} />
          <FileList title="Drone Footage" items={mediaDrone} />
        </div>

        <div className="flex gap-3">
          <Link
            to="/dashboard/seller/properties"
            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Back to My Properties
          </Link>
          <Link
            to="/dashboard/seller"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerPropertyView;

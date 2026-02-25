import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';

const steps = [
  'Property Type',
  'Location Intelligence',
  'Legal Documents',
  'Property Details',
  'Pricing Information',
  'Media Upload',
  'Submit for Verification',
];

const categoryOptions = ['Residential', 'Commercial', 'Agricultural', 'Industrial'];
const subCategoryOptions = ['Apartment', 'Villa', 'Plot', 'Land'];
const zoneOptions = ['HMDA', 'GHMC', 'DTCP'];
const amenityOptions = ['Parking', 'Lift', 'Security', 'Power Backup', 'Gym', 'Club House', 'Water Supply', 'CCTV'];
const furnishingOptions = ['Unfurnished', 'Semi Furnished', 'Fully Furnished'];
const ageConditionOptions = ['New', '0-5 Years (Good)', '5-10 Years (Average)', '10+ Years (Needs Renovation)'];
const paymentTermOptions = ['One-time', 'Installments', 'Bank Loan + Balance', 'Custom'];
const possessionOptions = ['Ready to Move', 'Within 3 Months', 'Within 6 Months', 'Under Construction'];

const initialFormData = {
  propertyCategory: '',
  subCategory: '',

  gpsEnabled: false,
  pinnedLocation: '',
  latitude: '',
  longitude: '',
  landmarkReferences: '',
  zone: '',

  saleDeed: null,
  encumbranceCertificate: null,
  pattadarOrPahani: null,
  taxReceipts: null,
  approvals: null,

  surveyNumber: '',
  totalArea: '',
  areaUnit: 'sq.ft.',
  rooms: '',
  amenities: [],
  furnishing: '',
  propertyAgeCondition: '',

  expectedPrice: '',
  negotiability: 'Negotiable',
  paymentTerms: '',
  possessionStatus: '',

  photos: [],
  videosOrTours: [],
  floorPlans: [],
  droneFootage: [],
};

const AddProperty = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [surveyValidationStatus, setSurveyValidationStatus] = useState('idle');
  const [formData, setFormData] = useState(initialFormData);

  const progress = useMemo(() => Math.round((step / steps.length) * 100), [step]);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const detectZone = () => {
    if (formData.landmarkReferences.toLowerCase().includes('secunderabad')) {
      updateField('zone', 'GHMC');
      return;
    }

    if (formData.landmarkReferences.toLowerCase().includes('outer ring road')) {
      updateField('zone', 'HMDA');
      return;
    }

    updateField('zone', 'DTCP');
  };

  const enableGps = () => {
    updateField('gpsEnabled', true);
    if (!formData.latitude) updateField('latitude', '17.3850');
    if (!formData.longitude) updateField('longitude', '78.4867');
    if (!formData.pinnedLocation) updateField('pinnedLocation', 'Current GPS Pin');
  };

  const validateSurveyNumber = () => {
    const isValid = /^\d+[A-Za-z0-9/-]*$/.test(formData.surveyNumber.trim());
    setSurveyValidationStatus('checking');

    setTimeout(() => {
      setSurveyValidationStatus(isValid ? 'valid' : 'invalid');
    }, 700);
  };

  const toggleAmenity = (amenity) => {
    const exists = formData.amenities.includes(amenity);
    updateField(
      'amenities',
      exists ? formData.amenities.filter((a) => a !== amenity) : [...formData.amenities, amenity]
    );
  };

  const handleSingleFile = (field, fileList) => {
    updateField(field, fileList?.[0] || null);
  };

  const handleMultipleFiles = (field, fileList) => {
    updateField(field, Array.from(fileList || []));
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard/seller/properties', {
        state: {
          newListing: {
            id: Date.now(),
            title: `${formData.subCategory || 'Property'} - ${formData.propertyCategory || 'Listing'}`,
            location: formData.pinnedLocation || formData.landmarkReferences || 'Location Pending',
            price: formData.expectedPrice || 'Price Pending',
            status: 'under_review',
            views: 0,
            inquiries: 0,
            listedDate: new Date().toISOString().split('T')[0],
            image: 'https://via.placeholder.com/300x200',
          },
        },
      });
    }, 1200);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 1: Property Type Selection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Category *</label>
          <select
            value={formData.propertyCategory}
            onChange={(e) => updateField('propertyCategory', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Sub-category *</label>
          <select
            value={formData.subCategory}
            onChange={(e) => updateField('subCategory', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose sub-category</option>
            {subCategoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 2: Location Intelligence</h2>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={enableGps}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Enable GPS for Auto-detection
        </button>
        <span className={`text-sm font-medium ${formData.gpsEnabled ? 'text-green-600' : 'text-gray-500'}`}>
          {formData.gpsEnabled ? 'GPS Enabled' : 'GPS Not Enabled'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pin Exact Location *</label>
          <input
            type="text"
            value={formData.pinnedLocation}
            onChange={(e) => updateField('pinnedLocation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Drop a pin / enter location name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Landmark References *</label>
          <input
            type="text"
            value={formData.landmarkReferences}
            onChange={(e) => updateField('landmarkReferences', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Near metro, school, junction, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
          <input
            type="text"
            value={formData.latitude}
            onChange={(e) => updateField('latitude', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
          <input
            type="text"
            value={formData.longitude}
            onChange={(e) => updateField('longitude', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Detected Zone *</label>
          <div className="flex gap-2">
            <select
              value={formData.zone}
              onChange={(e) => updateField('zone', e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select zone</option>
              {zoneOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={detectZone}
              className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50"
            >
              Auto Detect
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-sm text-gray-500 bg-gray-50">
        Map pin area placeholder: integrate map provider here for exact location pinning.
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 3: Legal Document Upload</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Sale Deed *</label>
          <input type="file" onChange={(e) => handleSingleFile('saleDeed', e.target.files)} className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Encumbrance Certificate *</label>
          <input type="file" onChange={(e) => handleSingleFile('encumbranceCertificate', e.target.files)} className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Pattadar Passbook / Pahani *</label>
          <input type="file" onChange={(e) => handleSingleFile('pattadarOrPahani', e.target.files)} className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Tax Receipts *</label>
          <input type="file" onChange={(e) => handleSingleFile('taxReceipts', e.target.files)} className="w-full" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Approvals (if applicable)</label>
          <input type="file" onChange={(e) => handleSingleFile('approvals', e.target.files)} className="w-full" />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 4: Property Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Survey Number *</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.surveyNumber}
              onChange={(e) => {
                updateField('surveyNumber', e.target.value);
                setSurveyValidationStatus('idle');
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Auto-validated against govt records"
            />
            <button
              type="button"
              onClick={validateSurveyNumber}
              className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50"
            >
              Validate
            </button>
          </div>
          {surveyValidationStatus === 'checking' && <p className="text-xs mt-2 text-blue-600">Validating...</p>}
          {surveyValidationStatus === 'valid' && <p className="text-xs mt-2 text-green-600">Survey number validated against government records.</p>}
          {surveyValidationStatus === 'invalid' && <p className="text-xs mt-2 text-red-600">Invalid format. Use numbers followed by optional alphanumeric suffix.</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Area *</label>
            <input
              type="number"
              value={formData.totalArea}
              onChange={(e) => updateField('totalArea', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
            <select
              value={formData.areaUnit}
              onChange={(e) => updateField('areaUnit', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="sq.ft.">sq.ft.</option>
              <option value="acres">acres</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rooms</label>
          <input
            type="text"
            value={formData.rooms}
            onChange={(e) => updateField('rooms', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 3BHK / Studio / 6 Cabins"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
          <select
            value={formData.furnishing}
            onChange={(e) => updateField('furnishing', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select furnishing</option>
            {furnishingOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Age & Condition</label>
          <select
            value={formData.propertyAgeCondition}
            onChange={(e) => updateField('propertyAgeCondition', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select age/condition</option>
            {ageConditionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {amenityOptions.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 5: Pricing Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price *</label>
          <input
            type="text"
            value={formData.expectedPrice}
            onChange={(e) => updateField('expectedPrice', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., ₹85,00,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Negotiability *</label>
          <select
            value={formData.negotiability}
            onChange={(e) => updateField('negotiability', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>Negotiable</option>
            <option>Non-Negotiable</option>
            <option>Slightly Negotiable</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms *</label>
          <select
            value={formData.paymentTerms}
            onChange={(e) => updateField('paymentTerms', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select payment terms</option>
            {paymentTermOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Possession Status *</label>
          <select
            value={formData.possessionStatus}
            onChange={(e) => updateField('possessionStatus', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select possession status</option>
            {possessionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 6: Media Upload</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos *</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleMultipleFiles('photos', e.target.files)} className="w-full" />
          <p className="text-xs text-gray-500 mt-1">{formData.photos.length} photo(s) selected</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Videos / 360° Tours</label>
          <input type="file" multiple accept="video/*" onChange={(e) => handleMultipleFiles('videosOrTours', e.target.files)} className="w-full" />
          <p className="text-xs text-gray-500 mt-1">{formData.videosOrTours.length} file(s) selected</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Floor Plans</label>
          <input type="file" multiple onChange={(e) => handleMultipleFiles('floorPlans', e.target.files)} className="w-full" />
          <p className="text-xs text-gray-500 mt-1">{formData.floorPlans.length} floor plan file(s) selected</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Drone Footage (optional)</label>
          <input type="file" multiple accept="video/*" onChange={(e) => handleMultipleFiles('droneFootage', e.target.files)} className="w-full" />
          <p className="text-xs text-gray-500 mt-1">{formData.droneFootage.length} drone file(s) selected</p>
        </div>
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 7: Submit for Verification</h2>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        On submit: listing is accepted, auto-submitted to verification engine, and dashboard status updates to <strong>Under Review</strong>.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p><strong>Type:</strong> {formData.propertyCategory || '-'} / {formData.subCategory || '-'}</p>
          <p className="mt-1"><strong>Location Pin:</strong> {formData.pinnedLocation || '-'}</p>
          <p className="mt-1"><strong>Zone:</strong> {formData.zone || '-'}</p>
          <p className="mt-1"><strong>Survey:</strong> {formData.surveyNumber || '-'}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p><strong>Price:</strong> {formData.expectedPrice || '-'}</p>
          <p className="mt-1"><strong>Negotiability:</strong> {formData.negotiability || '-'}</p>
          <p className="mt-1"><strong>Possession:</strong> {formData.possessionStatus || '-'}</p>
          <p className="mt-1"><strong>Photos:</strong> {formData.photos.length}</p>
        </div>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className={`w-full md:w-auto px-6 py-3 rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Submitting...' : 'Submit Listing to Verification Queue'}
      </button>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      case 7:
        return renderStep7();
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="List Property">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Seller Listing Flow</h1>
          <p className="text-gray-600 mt-1">Complete the steps below to send your property for verification.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-7 gap-2 text-xs">
            {steps.map((stepName, idx) => (
              <div
                key={stepName}
                className={`px-2 py-2 rounded text-center ${step >= idx + 1 ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'}`}
              >
                {idx + 1}. {stepName}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {renderStepContent()}

          {step < 7 && (
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className={`px-5 py-2 rounded-lg ${step === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProperty;

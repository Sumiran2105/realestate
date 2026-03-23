import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { appendSellerListing } from '@/features/listings/store/sellerListings';
import { getPropertyManagerBasePath, getPropertyManagerLabel } from '@/shared/utils/dashboard';

const steps = [
  'Create Listing',
  'Location Information',
  'Legal Documents',
  'Property Details',
  'Pricing Information',
  'Media Upload',
  'Submit for Verification',
];

const categoryOptions = ['Residential', 'Commercial', 'Agricultural', 'Industrial'];
const subCategoryOptions = ['Apartment', 'Villa', 'Plot', 'Land'];
const amenityOptions = ['Parking', 'Lift', 'Security', 'Power Backup', 'Gym', 'Club House', 'Water Supply', 'CCTV'];
const furnishingOptions = ['Unfurnished', 'Semi Furnished', 'Fully Furnished'];
const ageConditionOptions = ['New', '0-5 Years (Good)', '5-10 Years (Average)', '10+ Years (Needs Renovation)'];
const paymentTermOptions = ['One-time', 'Installments', 'Bank Loan + Balance', 'Custom'];
const possessionOptions = ['Ready to Move', 'Within 3 Months', 'Within 6 Months', 'Under Construction'];
const DRAFT_STORAGE_KEY = 'seller_add_property_draft_v1';

const initialFormData = {
  propertyCategory: '',
  subCategory: '',
  address: '',
  village: '',
  mandal: '',
  district: '',
  state: 'Telangana',
  pincode: '',
  landmark: '',
  zoneType: '',

  gpsEnabled: false,
  pinnedLocation: '',
  latitude: '',
  longitude: '',
  landmarkReferences: '',
  zone: '',

  saleDeed: null,
  encumbranceCertificate: null,
  pattadarOrPahani: null,
  taxReceipts: [],
  conversionCertificate: null,

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

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const fileName = (file) => (file ? file.name : null);

const fileNames = (files) => (Array.isArray(files) ? files.map((file) => file.name) : []);

const buildLocationPreviewMapUrl = ({ address, village, mandal, district, state, landmark }) => {
  const query = [address, landmark, village, mandal, district, state].filter(Boolean).join(', ');
  if (!query) return '';
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
};

const mapMarkerIcon = L.divIcon({
  className: 'custom-map-marker',
  html: '<div style="width:18px;height:18px;border-radius:9999px;background:#2563eb;border:3px solid #ffffff;box-shadow:0 8px 20px rgba(37,99,235,0.35);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const parseCoordinate = (value, fallback) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const MapViewportSync = ({ center }) => {
  const map = useMap();

  React.useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

const LocationPicker = ({ center, markerPosition, onPick }) => {
  useMapEvents({
    click(event) {
      onPick(event.latlng);
    },
  });

  return (
    <>
      <MapViewportSync center={center} />
      {markerPosition ? <Marker position={markerPosition} icon={mapMarkerIcon} /> : null}
    </>
  );
};

const AddProperty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const roleLabel = getPropertyManagerLabel(user?.role);
  const basePath = getPropertyManagerBasePath(user?.role);
  const [step, setStep] = useState(() => {
    try {
      const rawDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!rawDraft) return 1;
      const parsedDraft = JSON.parse(rawDraft);
      return Number.isInteger(parsedDraft?.step) ? parsedDraft.step : 1;
    } catch {
      return 1;
    }
  });
  const [loading, setLoading] = useState(false);
  const [surveyValidationStatus, setSurveyValidationStatus] = useState('idle');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [formData, setFormData] = useState(() => {
    try {
      const rawDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!rawDraft) return initialFormData;
      const parsedDraft = JSON.parse(rawDraft);
      const draftFormData = parsedDraft?.formData || {};
      return {
        ...initialFormData,
        ...draftFormData,
        taxReceipts: Array.isArray(draftFormData.taxReceipts) ? draftFormData.taxReceipts : [],
        photos: Array.isArray(draftFormData.photos) ? draftFormData.photos : [],
        videosOrTours: Array.isArray(draftFormData.videosOrTours) ? draftFormData.videosOrTours : [],
        floorPlans: Array.isArray(draftFormData.floorPlans) ? draftFormData.floorPlans : [],
        droneFootage: Array.isArray(draftFormData.droneFootage) ? draftFormData.droneFootage : [],
      };
    } catch {
      return initialFormData;
    }
  });

  const progress = useMemo(() => Math.round((step / steps.length) * 100), [step]);
  const mapPreviewUrl = useMemo(
    () =>
      buildLocationPreviewMapUrl({
        address: formData.address,
        village: formData.village,
        mandal: formData.mandal,
        district: formData.district,
        state: formData.state,
        landmark: formData.landmark,
      }),
    [formData.address, formData.village, formData.mandal, formData.district, formData.state, formData.landmark]
  );
  const mapCenter = useMemo(
    () => [parseCoordinate(formData.latitude, 17.385), parseCoordinate(formData.longitude, 78.4867)],
    [formData.latitude, formData.longitude]
  );
  const markerPosition = useMemo(() => {
    if (!formData.latitude || !formData.longitude) return null;

    return [parseCoordinate(formData.latitude, 17.385), parseCoordinate(formData.longitude, 78.4867)];
  }, [formData.latitude, formData.longitude]);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    const draft = {
      step,
      formData: {
        ...formData,
        saleDeed: null,
        encumbranceCertificate: null,
        pattadarOrPahani: null,
        taxReceipts: [],
        conversionCertificate: null,
        photos: [],
        videosOrTours: [],
        floorPlans: [],
        droneFootage: [],
      },
    };

    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  }, [formData, step]);

  const enableGps = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGpsError('Geolocation is not supported in this browser.');
      return;
    }

    setGpsLoading(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        updateField('gpsEnabled', true);
        updateField('latitude', coords.latitude.toFixed(6));
        updateField('longitude', coords.longitude.toFixed(6));
        if (!formData.pinnedLocation) {
          updateField('pinnedLocation', formData.address || 'Current GPS Pin');
        }
        setGpsLoading(false);
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? 'Location permission was denied. Please allow access and try again.'
            : 'Unable to detect your current location. Please try again or pin manually on the map.';
        setGpsError(message);
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleMapPick = ({ lat, lng }) => {
    updateField('latitude', lat.toFixed(6));
    updateField('longitude', lng.toFixed(6));
    updateField('gpsEnabled', true);
    if (!formData.pinnedLocation) {
      updateField('pinnedLocation', formData.address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
    setGpsError('');
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

    setTimeout(async () => {
      setLoading(false);
      let listingImage = 'https://via.placeholder.com/300x200';

      if (formData.photos.length > 0) {
        try {
          listingImage = await readFileAsDataUrl(formData.photos[0]);
        } catch {
          listingImage = 'https://via.placeholder.com/300x200';
        }
      }

      const newListing = {
        id: Date.now(),
        title: `${formData.subCategory || 'Property'} - ${formData.propertyCategory || 'Listing'}`,
        location:
          formData.address ||
          [formData.village, formData.district, formData.state].filter(Boolean).join(', ') ||
          formData.pinnedLocation ||
          formData.landmarkReferences ||
          'Location Pending',
        price: formData.expectedPrice || 'Price Pending',
        status: 'under_review',
        views: 0,
        inquiries: 0,
        listedDate: new Date().toISOString().split('T')[0],
        image: listingImage,
        propertyCategory: formData.propertyCategory,
        subCategory: formData.subCategory,
        address: formData.address,
        village: formData.village,
        mandal: formData.mandal,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark,
        zoneType: formData.zoneType,
        gpsEnabled: formData.gpsEnabled,
        pinnedLocation: formData.pinnedLocation,
        latitude: formData.latitude,
        longitude: formData.longitude,
        landmarkReferences: formData.landmarkReferences,
        zone: formData.zone,
        saleDeed: fileName(formData.saleDeed),
        encumbranceCertificate: fileName(formData.encumbranceCertificate),
        pattadarOrPahani: fileName(formData.pattadarOrPahani),
        taxReceipts: fileNames(formData.taxReceipts),
        conversionCertificate: fileName(formData.conversionCertificate),
        surveyNumber: formData.surveyNumber,
        totalArea: formData.totalArea,
        areaUnit: formData.areaUnit,
        rooms: formData.rooms,
        amenities: formData.amenities,
        furnishing: formData.furnishing,
        propertyAgeCondition: formData.propertyAgeCondition,
        expectedPrice: formData.expectedPrice,
        negotiability: formData.negotiability,
        paymentTerms: formData.paymentTerms,
        possessionStatus: formData.possessionStatus,
        photos: fileNames(formData.photos),
        videosOrTours: fileNames(formData.videosOrTours),
        floorPlans: fileNames(formData.floorPlans),
        droneFootage: fileNames(formData.droneFootage),
        details: {
          createListingPayload: {
            property_type: {
              property_category: formData.propertyCategory,
              property_subtype: formData.subCategory,
            },
            location: {
              address: formData.address,
              village: formData.village,
              mandal: formData.mandal,
              district: formData.district,
              state: formData.state,
              pincode: formData.pincode,
              landmark: formData.landmark,
              zone_type: formData.zoneType,
            },
          },
          propertyType: {
            category: formData.propertyCategory,
            subCategory: formData.subCategory,
          },
          locationIntelligence: {
            gpsEnabled: formData.gpsEnabled,
            pinnedLocation: formData.pinnedLocation,
            latitude: formData.latitude,
            longitude: formData.longitude,
            landmarkReferences: formData.landmarkReferences,
            zone: formData.zone,
          },
          legalDocuments: {
            saleDeed: fileName(formData.saleDeed),
            encumbranceCertificate: fileName(formData.encumbranceCertificate),
            pattadarOrPahani: fileName(formData.pattadarOrPahani),
            taxReceipts: fileNames(formData.taxReceipts),
            conversionCertificate: fileName(formData.conversionCertificate),
          },
          propertyDetails: {
            surveyNumber: formData.surveyNumber,
            totalArea: formData.totalArea,
            areaUnit: formData.areaUnit,
            rooms: formData.rooms,
            amenities: formData.amenities,
            furnishing: formData.furnishing,
            propertyAgeCondition: formData.propertyAgeCondition,
          },
          pricing: {
            expectedPrice: formData.expectedPrice,
            negotiability: formData.negotiability,
            paymentTerms: formData.paymentTerms,
            possessionStatus: formData.possessionStatus,
          },
          media: {
            photos: fileNames(formData.photos),
            videosOrTours: fileNames(formData.videosOrTours),
            floorPlans: fileNames(formData.floorPlans),
            droneFootage: fileNames(formData.droneFootage),
          },
        },
      };

      appendSellerListing(user?.id, newListing);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      navigate(basePath);
    }, 1200);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 1: Property Details</h2>
      {/* <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        This step is aligned to the initial <strong>`POST /api/v1/land/listings`</strong> payload and captures
        the required <strong>property_type</strong> and <strong>location</strong> fields.
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Category *</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Subtype *</label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => {
              updateField('address', e.target.value);
              if (!formData.pinnedLocation) updateField('pinnedLocation', e.target.value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Door no, street, area, or survey location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Village *</label>
          <input
            type="text"
            value={formData.village}
            onChange={(e) => updateField('village', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter village"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mandal *</label>
          <input
            type="text"
            value={formData.mandal}
            onChange={(e) => updateField('mandal', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter mandal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => updateField('district', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter district"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <select
            value={formData.state}
            onChange={(e) => updateField('state', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Telangana">Telangana</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => updateField('pincode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter pincode"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
          <input
            type="text"
            value={formData.landmark}
            onChange={(e) => {
              updateField('landmark', e.target.value);
              if (!formData.landmarkReferences) updateField('landmarkReferences', e.target.value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Nearby school, junction, temple, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Zone Type *</label>
          <input
            type="text"
            value={formData.zoneType}
            onChange={(e) => {
              updateField('zoneType', e.target.value);
              updateField('zone', e.target.value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter zone type"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 2: Location Details</h2>
      {/* <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        This step is where seller pins the property on the map. To actually call
        <strong> `GET /api/v1/land/listings/{'{listing_id}'}/coordinates` </strong> and
        <strong> `POST /api/v1/land/listings/{'{listing_id}'}/coordinates` </strong>, we will need the
        backend `listing_id` returned after the create-listing step.
      </div> */}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={enableGps}
          disabled={gpsLoading}
          className={`px-4 py-2 rounded-lg text-white ${gpsLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {gpsLoading ? 'Detecting location...' : 'Use Current GPS Location'}
        </button>
        <span className={`text-sm font-medium ${formData.gpsEnabled ? 'text-green-600' : 'text-gray-500'}`}>
          {formData.gpsEnabled ? 'Location selected' : 'Location not selected'}
        </span>
      </div>

      {gpsError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {gpsError}
        </div>
      ) : null}

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
          <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
          <input
            type="text"
            value={formData.zone}
            onChange={(e) => {
              updateField('zone', e.target.value);
              if (!formData.zoneType) updateField('zoneType', e.target.value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter zone"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-6">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Property Map Holder</h3>
              <p className="mt-1 text-xs text-gray-500">Preview the listing area and reserve space for pin-drop interaction.</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Step 2
            </span>
          </div>

          {mapPreviewUrl ? (
            <div className="relative h-[360px] bg-gray-100">
              <MapContainer center={mapCenter} zoom={15} scrollWheelZoom className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPicker center={mapCenter} markerPosition={markerPosition} onPick={handleMapPick} />
              </MapContainer>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 text-white">
                <p className="text-sm font-medium">Click on the map to pin the property</p>
                <p className="mt-1 text-xs text-white/85">
                  The selected point will update latitude and longitude automatically.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-[360px] items-center justify-center bg-[linear-gradient(135deg,_#eff6ff_0%,_#f8fafc_48%,_#eef2ff_100%)] p-6">
              <div className="max-w-sm text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                  <span className="text-2xl text-gray-700">+</span>
                </div>
                <h4 className="text-base font-semibold text-gray-900">Map preview will load from step 1 address</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Fill address, village, mandal, district, state, and landmark in step 1 to see the location preview here.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-900">Current Coordinates</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                <span className="text-gray-500">Latitude</span>
                <span className="font-medium text-gray-900">{formData.latitude || 'Not selected'}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                <span className="text-gray-500">Longitude</span>
                <span className="font-medium text-gray-900">{formData.longitude || 'Not selected'}</span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-gray-600">
              Select coordinates by either using the GPS button or clicking directly on the map.
            </p>
          </div>

          {/* <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-900">API Wiring Plan</h3>
            <p className="mt-2 text-xs leading-5 text-gray-600">1. Create listing in step 1 and store returned `listing_id`.</p>
            <p className="mt-1 text-xs leading-5 text-gray-600">2. Load saved coordinates with the coordinates GET API.</p>
            <p className="mt-1 text-xs leading-5 text-gray-600">3. Save map-picked coordinates with the coordinates POST API.</p>
          </div> */}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Step 3: Legal Document Upload</h2>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        These uploads map to document APIs and will require the backend <strong>`listing_id`</strong> created in step 1.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Sale Deed *</label>
          <input type="file" onChange={(e) => handleSingleFile('saleDeed', e.target.files)} className="w-full" />
          <p className="mt-1 text-xs text-gray-500">API: `POST /documents/sale-deed`</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Encumbrance Certificate *</label>
          <input type="file" onChange={(e) => handleSingleFile('encumbranceCertificate', e.target.files)} className="w-full" />
          <p className="mt-1 text-xs text-gray-500">API: `POST /documents/encumbrance`</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Tax Receipts *</label>
          <input type="file" multiple onChange={(e) => handleMultipleFiles('taxReceipts', e.target.files)} className="w-full" />
          <p className="mt-1 text-xs text-gray-500">
            API: `POST /documents/tax-receipt` | {formData.taxReceipts.length} file(s) selected
          </p>
        </div>

        {formData.propertyCategory === 'Agricultural' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Pattadar Passbook *</label>
            <input type="file" onChange={(e) => handleSingleFile('pattadarOrPahani', e.target.files)} className="w-full" />
            <p className="mt-1 text-xs text-gray-500">Required for agricultural land | API: `POST /documents/pattadar`</p>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
            Pattadar Passbook is only required for listings under <strong>Agricultural</strong> category.
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Land Use Conversion Certificate</label>
          <input type="file" onChange={(e) => handleSingleFile('conversionCertificate', e.target.files)} className="w-full" />
          <p className="mt-1 text-xs text-gray-500">Optional | API: `POST /documents/conversion`</p>
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
          <p className="mt-1"><strong>Address:</strong> {formData.address || '-'}</p>
          <p className="mt-1"><strong>Village / Mandal:</strong> {[formData.village, formData.mandal].filter(Boolean).join(' / ') || '-'}</p>
          <p className="mt-1"><strong>Zone:</strong> {formData.zoneType || formData.zone || '-'}</p>
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
    <DashboardLayout title={`List ${roleLabel} Property`}>
      <div className="space-y-6">
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

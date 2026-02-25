import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';

const AddProperty = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    propertyType: '',
    listingType: 'sale',
    price: '',
    priceNegotiable: false,
    
    // Step 2: Location
    location: '',
    address: '',
    city: '',
    pincode: '',
    landmark: '',
    
    // Step 3: Property Details
    bedrooms: '',
    bathrooms: '',
    area: '',
    areaUnit: 'sqft',
    floor: '',
    totalFloors: '',
    furnishing: '',
    age: '',
    
    // Step 4: Amenities
    amenities: [],
    
    // Step 5: Documents & Media
    images: [],
    documents: []
  });

  const [loading, setLoading] = useState(false);

  const propertyTypes = [
    'Apartment', 'Independent House', 'Villa', 'Plot', 'Commercial Space', 'Farm House'
  ];

  const furnishingOptions = ['Fully Furnished', 'Semi Furnished', 'Unfurnished'];
  
  const ageOptions = ['New Construction', 'Less than 5 years', '5-10 years', '10+ years'];
  
  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Park', 'Club House', 'Security', 'Power Backup',
    'Lift', 'Parking', 'Children\'s Play Area', 'Jogging Track', 'Rainwater Harvesting'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: newAmenities });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, documents: [...formData.documents, ...files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard/seller/properties');
    }, 2000);
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="seller" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Add New Property" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= i ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {i}
                    </div>
                    {i < 5 && (
                      <div className={`w-16 h-1 mx-2 ${
                        step > i ? 'bg-blue-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>Basic Info</span>
                <span>Location</span>
                <span>Details</span>
                <span>Amenities</span>
                <span>Media</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 3BHK Luxury Apartment in Gachibowli"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Type *
                        </label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select type</option>
                          {propertyTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Listing Type *
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="listingType"
                              value="sale"
                              checked={formData.listingType === 'sale'}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            For Sale
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="listingType"
                              value="rent"
                              checked={formData.listingType === 'rent'}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            For Rent
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price *
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 1.2 Cr"
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="priceNegotiable"
                            checked={formData.priceNegotiable}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          Price Negotiable
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Location Details</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location/Locality *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Gachibowli"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter complete address"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Hyderabad"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="500032"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Landmark
                        </label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Near Hitech City"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Property Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bathrooms
                        </label>
                        <input
                          type="number"
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Area *
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="1500"
                          />
                          <select
                            name="areaUnit"
                            value={formData.areaUnit}
                            onChange={handleChange}
                            className="w-20 px-2 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50"
                          >
                            <option value="sqft">sq.ft</option>
                            <option value="sqyd">sq.yd</option>
                            <option value="acre">acre</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Floor
                        </label>
                        <input
                          type="text"
                          name="floor"
                          value={formData.floor}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Floors
                        </label>
                        <input
                          type="text"
                          name="totalFloors"
                          value={formData.totalFloors}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Furnishing Status
                        </label>
                        <select
                          name="furnishing"
                          value={formData.furnishing}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          {furnishingOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Age
                        </label>
                        <select
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          {ageOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Amenities */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {amenitiesList.map((amenity) => (
                        <label key={amenity} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="rounded text-blue-600"
                          />
                          <span className="text-sm">{amenity}</span>
                        </label>
                      ))}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Select all amenities available in your property. This helps buyers find your property in filtered searches.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 5: Media & Documents */}
                {step === 5 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Photos & Documents</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Property Photos *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <span className="text-4xl mb-2 block">📸</span>
                          <span className="text-blue-600">Click to upload photos</span>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG (max 10 photos, 5MB each)</p>
                        </label>
                      </div>
                      {formData.images.length > 0 && (
                        <p className="mt-2 text-sm text-green-600">
                          {formData.images.length} photos selected
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Property Documents
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleDocumentUpload}
                          className="hidden"
                          id="document-upload"
                        />
                        <label htmlFor="document-upload" className="cursor-pointer">
                          <span className="text-4xl mb-2 block">📄</span>
                          <span className="text-blue-600">Click to upload documents</span>
                          <p className="text-xs text-gray-500 mt-1">Sale deed, EC, tax receipts (PDF max 10MB)</p>
                        </label>
                      </div>
                      {formData.documents.length > 0 && (
                        <p className="mt-2 text-sm text-green-600">
                          {formData.documents.length} documents selected
                        </p>
                      )}
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-yellow-800 mb-2">📋 Verification Notice</h4>
                      <p className="text-xs text-yellow-700">
                        Uploaded documents will be verified against government databases. Verified properties get a "Verified" badge and rank higher in search results.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Back
                    </button>
                  )}
                  
                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className={`ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Submitting...' : 'List Property'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProperty;
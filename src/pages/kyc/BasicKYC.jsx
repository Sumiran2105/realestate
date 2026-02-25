import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const BasicKYC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Phone & Email Verification
    phone: '',
    email: '',
    phoneOtp: '',
    emailOtp: '',
    
    // Step 2: Basic Profile
    fullName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    pincode: '',
    
    // Step 3: Profile Photo
    profilePhoto: null,
    photoPreview: null
  });
  
  const [otpSent, setOtpSent] = useState({ phone: false, email: false });
  const [verified, setVerified] = useState({ phone: false, email: false });
  const [loading, setLoading] = useState(false);
  
  const { user, updateKYCStatus } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = (type) => {
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent({ ...otpSent, [type]: true });
      setLoading(false);
      alert(`OTP sent to ${type === 'phone' ? formData.phone : formData.email}`);
    }, 1000);
  };

  const handleVerifyOtp = (type) => {
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setVerified({ ...verified, [type]: true });
      setLoading(false);
      alert(`${type === 'phone' ? 'Phone' : 'Email'} verified successfully!`);
    }, 1000);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePhoto: file,
          photoPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateKYCStatus('identity_pending');
      navigate('/kyc/identity');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your KYC</h1>
          <p className="text-gray-600 mt-2">Step 1 of 3: Basic Verification</p>
          
          <div className="mt-4 flex items-center">
            <div className="flex-1 h-2 bg-blue-600 rounded-l-lg"></div>
            <div className="flex-1 h-2 bg-gray-200"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-r-lg"></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-blue-600 font-medium">Basic Info</span>
            <span className="text-gray-500">Identity</span>
            <span className="text-gray-500">Professional</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Contact Verification */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Verify Your Contact Details</h2>
                
                {/* Phone Verification */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={verified.phone}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter 10-digit mobile number"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendOtp('phone')}
                      disabled={!formData.phone || verified.phone || otpSent.phone}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      Send OTP
                    </button>
                  </div>
                  
                  {otpSent.phone && !verified.phone && (
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={formData.phoneOtp}
                        onChange={(e) => setFormData({ ...formData, phoneOtp: e.target.value })}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Enter 6-digit OTP"
                      />
                      <button
                        type="button"
                        onClick={() => handleVerifyOtp('phone')}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Verify
                      </button>
                    </div>
                  )}
                  
                  {verified.phone && (
                    <div className="mt-2 text-green-600 flex items-center">
                      <span className="mr-2">✓</span> Phone verified
                    </div>
                  )}
                </div>

                {/* Email Verification */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={verified.email}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendOtp('email')}
                      disabled={!formData.email || verified.email || otpSent.email}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      Send OTP
                    </button>
                  </div>
                  
                  {otpSent.email && !verified.email && (
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={formData.emailOtp}
                        onChange={(e) => setFormData({ ...formData, emailOtp: e.target.value })}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Enter 6-digit OTP"
                      />
                      <button
                        type="button"
                        onClick={() => handleVerifyOtp('email')}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Verify
                      </button>
                    </div>
                  )}
                  
                  {verified.email && (
                    <div className="mt-2 text-green-600 flex items-center">
                      <span className="mr-2">✓</span> Email verified
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!verified.phone || !verified.email}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Basic Profile */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name (as per Aadhaar) *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Residential Address *
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your complete address"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="6-digit pincode"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Profile Photo */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Upload Profile Photo</h2>
                
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-gray-100 rounded-full mb-4 overflow-hidden border-4 border-blue-200">
                    {formData.photoPreview ? (
                      <img src={formData.photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-6xl">📷</span>
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                    Choose Photo
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Upload a clear photo showing your face
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <h3 className="font-medium text-blue-800 mb-2">Photo Guidelines:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Clear, well-lit photo</li>
                    <li>• No sunglasses or hat</li>
                    <li>• Face should be clearly visible</li>
                    <li>• Accepted formats: JPG, PNG (max 5MB)</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !formData.photoPreview}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Submitting...' : 'Submit & Continue'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your information is secure and encrypted. We only use this for verification purposes as per DPDPA 2023 guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicKYC;
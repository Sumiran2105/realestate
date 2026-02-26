import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

const KYCVerification = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Aadhaar Details
    aadhaarNumber: '',
    aadhaarFront: null,
    aadhaarBack: null,
    
    // PAN Details
    panNumber: '',
    panCard: null,
    
    // Selfie
    selfie: null,
    selfiePreview: null
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  
  const { user, updateKYCStatus } = useAuth();
  const navigate = useNavigate();

  const handleFileUpload = (field, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        [field]: file,
        [`${field}Preview`]: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const validateAadhaar = () => {
    const newErrors = {};
    
    if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
      newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
    }
    if (!formData.aadhaarFront) {
      newErrors.aadhaarFront = 'Please upload front side of Aadhaar';
    }
    if (!formData.aadhaarBack) {
      newErrors.aadhaarBack = 'Please upload back side of Aadhaar';
    }
    
    return newErrors;
  };

  const validatePAN = () => {
    const newErrors = {};
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    
    if (!formData.panNumber || !panRegex.test(formData.panNumber)) {
      newErrors.panNumber = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
    }
    if (!formData.panCard) {
      newErrors.panCard = 'Please upload your PAN card';
    }
    
    return newErrors;
  };

  const validateSelfie = () => {
    const newErrors = {};
    
    if (!formData.selfie) {
      newErrors.selfie = 'Please take a selfie';
    }
    
    return newErrors;
  };

  const handleNext = () => {
    let stepErrors = {};
    
    if (step === 1) {
      stepErrors = validateAadhaar();
    } else if (step === 2) {
      stepErrors = validatePAN();
    }
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate selfie before submission
    const selfieErrors = validateSelfie();
    if (Object.keys(selfieErrors).length > 0) {
      setErrors(selfieErrors);
      return;
    }
    
    setLoading(true);
    setVerificationStatus('processing');
    
    // Simulate KYC verification process
    setTimeout(() => {
      setVerificationStatus('success');
      
      setTimeout(() => {
        updateKYCStatus('verified');
        
        // Redirect based on user role
        switch(user?.role) {
          case 'agent':
            navigate('/dashboard/agent');
            break;
          case 'seller':
            navigate('/dashboard/seller');
            break;
          default:
            navigate('/buyer/home');
        }
      }, 2000);
    }, 3000);
  };

  // Progress indicators
  const steps = [
    { number: 1, name: 'Aadhaar Verification', icon: '🆔' },
    { number: 2, name: 'PAN Verification', icon: '📄' },
    { number: 3, name: 'Selfie Verification', icon: '📸' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
          <p className="text-gray-600 mt-2">
            Complete your verification to start using all features
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    step > s.number 
                      ? 'bg-green-500 text-white' 
                      : step === s.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > s.number ? '✓' : s.icon}
                  </div>
                  <span className="text-xs mt-2 text-gray-600">{s.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {verificationStatus === 'processing' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔄</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Your Documents</h2>
              <p className="text-gray-600 mb-6">
                Please wait while we verify your Aadhaar, PAN, and selfie...
              </p>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Verified Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your identity has been verified. Redirecting to dashboard...
              </p>
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          {verificationStatus === 'pending' && (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Aadhaar Verification */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 flex items-center">
                      <span className="text-xl mr-2">🆔</span>
                      Enter your Aadhaar details and upload clear images of both sides
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.aadhaarNumber}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        aadhaarNumber: e.target.value.replace(/\D/g, '').slice(0, 12)
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="XXXX XXXX XXXX"
                    />
                    {errors.aadhaarNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.aadhaarNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Front Side <span className="text-red-500">*</span>
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        errors.aadhaarFront ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('aadhaarFront', e.target.files[0])}
                          className="hidden"
                          id="aadhaar-front"
                        />
                        <label htmlFor="aadhaar-front" className="cursor-pointer block">
                          {formData.aadhaarFrontPreview ? (
                            <img 
                              src={formData.aadhaarFrontPreview} 
                              alt="Aadhaar Front" 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <div>
                              <span className="text-3xl mb-2 block">📄</span>
                              <span className="text-blue-600 text-sm">Click to upload</span>
                              <p className="text-xs text-gray-500 mt-1">Front side of Aadhaar</p>
                            </div>
                          )}
                        </label>
                      </div>
                      {errors.aadhaarFront && (
                        <p className="mt-1 text-sm text-red-600">{errors.aadhaarFront}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Back Side <span className="text-red-500">*</span>
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        errors.aadhaarBack ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('aadhaarBack', e.target.files[0])}
                          className="hidden"
                          id="aadhaar-back"
                        />
                        <label htmlFor="aadhaar-back" className="cursor-pointer block">
                          {formData.aadhaarBackPreview ? (
                            <img 
                              src={formData.aadhaarBackPreview} 
                              alt="Aadhaar Back" 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <div>
                              <span className="text-3xl mb-2 block">📄</span>
                              <span className="text-blue-600 text-sm">Click to upload</span>
                              <p className="text-xs text-gray-500 mt-1">Back side of Aadhaar</p>
                            </div>
                          )}
                        </label>
                      </div>
                      {errors.aadhaarBack && (
                        <p className="mt-1 text-sm text-red-600">{errors.aadhaarBack}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: PAN Verification */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 flex items-center">
                      <span className="text-xl mr-2">📄</span>
                      Enter your PAN details and upload a clear image of your PAN card
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.panNumber}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        panNumber: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.panNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="ABCDE1234F"
                    />
                    {errors.panNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.panNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Card Image <span className="text-red-500">*</span>
                    </label>
                    <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
                      errors.panCard ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('panCard', e.target.files[0])}
                        className="hidden"
                        id="pan-upload"
                      />
                      <label htmlFor="pan-upload" className="cursor-pointer block">
                        {formData.panCardPreview ? (
                          <img 
                            src={formData.panCardPreview} 
                            alt="PAN Card" 
                            className="w-full h-48 object-contain rounded-lg"
                          />
                        ) : (
                          <div>
                            <span className="text-4xl mb-2 block">📎</span>
                            <span className="text-blue-600">Click to upload PAN card</span>
                            <p className="text-xs text-gray-500 mt-1">JPG or PNG (max 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {errors.panCard && (
                      <p className="mt-1 text-sm text-red-600">{errors.panCard}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Selfie Verification */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 flex items-center">
                      <span className="text-xl mr-2">📸</span>
                      Take a clear selfie holding your PAN card near your face
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        errors.selfie ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={(e) => handleFileUpload('selfie', e.target.files[0])}
                          className="hidden"
                          id="selfie-capture"
                        />
                        <label htmlFor="selfie-capture" className="cursor-pointer block">
                          {formData.selfiePreview ? (
                            <img 
                              src={formData.selfiePreview} 
                              alt="Selfie" 
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="py-8">
                              <span className="text-6xl mb-4 block">📸</span>
                              <span className="text-blue-600 text-lg">Take Photo</span>
                              <p className="text-xs text-gray-500 mt-2">Click to open camera</p>
                            </div>
                          )}
                        </label>
                      </div>
                      {errors.selfie && (
                        <p className="mt-1 text-sm text-red-600">{errors.selfie}</p>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-3">Guidelines:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Hold your PAN card near your face
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Ensure both face and card are clearly visible
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Good lighting is important
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          No filters or editing
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Look directly at the camera
                        </li>
                      </ul>
                    </div>
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
                
                {step < 3 ? (
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
                    className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Submitting...' : 'Submit for Verification'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">🔒 Your Data is Secure</h4>
          <p className="text-xs text-gray-600">
            All documents are encrypted. We use secure government APIs for verification 
            and never store your full document numbers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const IdentityVerification = () => {
  const [verificationMethod, setVerificationMethod] = useState('aadhaar');
  const [formData, setFormData] = useState({
    // Aadhaar
    aadhaarNumber: '',
    aadhaarFront: null,
    aadhaarBack: null,
    
    // PAN
    panNumber: '',
    panCard: null,
    
    // DigiLocker
    digilockerConsent: false,
    
    // Selfie
    selfie: null,
    selfiePreview: null
  });
  
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState('upload');
  
  const { updateKYCStatus } = useAuth();
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

  const handleSelfieCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload('selfie', file);
    }
  };

  const handleDigilockerConnect = () => {
    setLoading(true);
    // Simulate DigiLocker OAuth flow
    setTimeout(() => {
      setVerificationStep('processing');
      setTimeout(() => {
        setVerificationStep('success');
        setLoading(false);
      }, 2000);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setVerificationStep('processing');
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationStep('success');
      setTimeout(() => {
        updateKYCStatus('professional_pending');
        navigate('/kyc/professional');
        setLoading(false);
      }, 1500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Identity Verification</h1>
          <p className="text-gray-600 mt-2">Step 2 of 3: Verify Your Identity</p>
          
          <div className="mt-4 flex items-center">
            <div className="flex-1 h-2 bg-blue-600 rounded-l-lg"></div>
            <div className="flex-1 h-2 bg-blue-600"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-r-lg"></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-500">Basic Info</span>
            <span className="text-blue-600 font-medium">Identity</span>
            <span className="text-gray-500">Professional</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Verification Status */}
          {verificationStep === 'success' ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verified!</h2>
              <p className="text-gray-600 mb-6">
                Your identity has been successfully verified. Redirecting to professional verification...
              </p>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : verificationStep === 'processing' ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔄</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Your Identity</h2>
              <p className="text-gray-600 mb-6">
                Please wait while we verify your documents with government databases...
              </p>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Verification Method Selection */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Verification Method</h2>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setVerificationMethod('aadhaar')}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      verificationMethod === 'aadhaar'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <span className="text-3xl mb-2 block">🆔</span>
                    <span className="font-medium">Aadhaar</span>
                    <span className="text-xs text-gray-500 block mt-1">eKYC via UIDAI</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setVerificationMethod('digilocker')}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      verificationMethod === 'digilocker'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <span className="text-3xl mb-2 block">📱</span>
                    <span className="font-medium">DigiLocker</span>
                    <span className="text-xs text-gray-500 block mt-1">Instant verification</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setVerificationMethod('manual')}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      verificationMethod === 'manual'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <span className="text-3xl mb-2 block">📄</span>
                    <span className="font-medium">Manual Upload</span>
                    <span className="text-xs text-gray-500 block mt-1">PAN + Selfie</span>
                  </button>
                </div>
              </div>

              {/* Aadhaar eKYC */}
              {verificationMethod === 'aadhaar' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Aadhaar eKYC is the fastest way to verify your identity. We'll connect securely with UIDAI to verify your details instantly.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Number *
                    </label>
                    <input
                      type="text"
                      value={formData.aadhaarNumber}
                      onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="XXXX XXXX XXXX"
                      maxLength="12"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter 12-digit Aadhaar number (will be encrypted)
                    </p>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.aadhaarConsent}
                        onChange={(e) => setFormData({ ...formData, aadhaarConsent: e.target.checked })}
                        className="rounded text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        I consent to UIDAI verifying my Aadhaar details for KYC purposes
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* DigiLocker */}
              {verificationMethod === 'digilocker' && (
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      Connect your DigiLocker account to instantly share your verified documents.
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleDigilockerConnect}
                    className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <span>🔗</span>
                    <span>Connect DigiLocker</span>
                  </button>
                  
                  <div className="text-center text-sm text-gray-500">
                    You'll be redirected to DigiLocker for authentication
                  </div>
                </div>
              )}

              {/* Manual Upload */}
              {verificationMethod === 'manual' && (
                <div className="space-y-6">
                  {/* PAN Card */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Card Number *
                    </label>
                    <input
                      type="text"
                      value={formData.panNumber}
                      onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="ABCDE1234F"
                      maxLength="10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload PAN Card *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload('panCard', e.target.files[0])}
                        className="hidden"
                        id="pan-upload"
                      />
                      <label htmlFor="pan-upload" className="cursor-pointer">
                        {formData.panCard ? (
                          <div>
                            <span className="text-green-600">✓</span>
                            <span className="ml-2">{formData.panCard.name}</span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-4xl mb-2 block">📎</span>
                            <span className="text-blue-600">Click to upload PAN card</span>
                            <p className="text-xs text-gray-500 mt-1">JPG, PNG or PDF (max 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Selfie */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live Selfie with ID *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {formData.selfiePreview ? (
                          <img src={formData.selfiePreview} alt="Selfie" className="w-full h-48 object-cover rounded-lg" />
                        ) : (
                          <>
                            <input
                              type="file"
                              accept="image/*"
                              capture="user"
                              onChange={handleSelfieCapture}
                              className="hidden"
                              id="selfie-capture"
                            />
                            <label htmlFor="selfie-capture" className="cursor-pointer block">
                              <span className="text-4xl mb-2 block">📸</span>
                              <span className="text-blue-600">Take Photo</span>
                            </label>
                          </>
                        )}
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">Guidelines:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Hold your PAN card near your face</li>
                          <li>• Ensure both face and card are clearly visible</li>
                          <li>• Good lighting is important</li>
                          <li>• No filters or editing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {verificationMethod !== 'digilocker' && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Verifying...' : 'Verify Identity'}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">🔒 Your Data is Secure</h4>
          <p className="text-xs text-gray-600">
            All documents are encrypted using AES-256. We never store your full Aadhaar number. 
            Verification is done through secure government APIs and data is masked in our systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;
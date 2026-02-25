import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProfessionalVerification = () => {
  const [formData, setFormData] = useState({
    // Agent fields
    reraNumber: '',
    reraCertificate: null,
    experience: '',
    specialization: [],
    agencyName: '',
    gstNumber: '',
    bankAccountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    
    // Seller fields
    propertyDocuments: [],
    taxReceipts: []
  });
  
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  
  const { user, updateKYCStatus } = useAuth();
  const navigate = useNavigate();

  const specializations = [
    'Residential', 'Commercial', 'Luxury Properties', 'Agricultural Land',
    'Industrial', 'Rental Properties', 'Investment Properties', 'NRIs'
  ];

  const handleFileUpload = (field, files) => {
    setFormData({
      ...formData,
      [field]: files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setVerificationStatus('processing');
    
    // Simulate professional verification
    setTimeout(() => {
      setVerificationStatus('success');
      updateKYCStatus('completed');
      
      // Redirect based on role
      setTimeout(() => {
        if (user?.role === 'agent') {
          navigate('/dashboard/agent');
        } else if (user?.role === 'seller') {
          navigate('/dashboard/seller');
        } else {
          navigate('/');
        }
      }, 2000);
    }, 3000);
  };

  const handleSkip = () => {
    updateKYCStatus('skipped');
    if (user?.role === 'agent' || user?.role === 'seller') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Professional Verification</h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'agent' ? 'Step 3 of 3: Verify Your Agent Credentials' : 'Step 3 of 3: Verify Your Property Documents'}
          </p>
          
          <div className="mt-4 flex items-center">
            <div className="flex-1 h-2 bg-blue-600 rounded-l-lg"></div>
            <div className="flex-1 h-2 bg-blue-600"></div>
            <div className="flex-1 h-2 bg-blue-600 rounded-r-lg"></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-500">Basic Info</span>
            <span className="text-gray-500">Identity</span>
            <span className="text-blue-600 font-medium">Professional</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Verification Status */}
          {verificationStatus === 'success' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Completed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your verification is complete. You can now access all platform features.
              </p>
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          {verificationStatus === 'processing' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔄</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Your Documents</h2>
              <p className="text-gray-600 mb-6">
                We're verifying your professional credentials with RERA and other authorities...
              </p>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          {verificationStatus === 'pending' && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {user?.role === 'agent' ? (
                /* Agent Professional Verification */
                <>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      As per RERA guidelines, all real estate agents must be verified. This information will be displayed on your public profile.
                    </p>
                  </div>

                  {/* RERA Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">RERA Registration</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RERA License Number *
                      </label>
                      <input
                        type="text"
                        value={formData.reraNumber}
                        onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="RERA/TS/2024/000001"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Enter the license number as shown on your RERA certificate
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload RERA Certificate *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload('reraCertificate', e.target.files)}
                          className="hidden"
                          id="rera-upload"
                        />
                        <label htmlFor="rera-upload" className="cursor-pointer">
                          {formData.reraCertificate ? (
                            <div>
                              <span className="text-green-600">✓</span>
                              <span className="ml-2">{formData.reraCertificate[0]?.name}</span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-4xl mb-2 block">📄</span>
                              <span className="text-blue-600">Click to upload certificate</span>
                              <p className="text-xs text-gray-500 mt-1">PDF or Image (max 10MB)</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Experience & Specialization */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Professional Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience *
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {specializations.map((spec) => (
                          <label key={spec} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                            <input
                              type="checkbox"
                              value={spec}
                              onChange={(e) => {
                                const newSpecializations = e.target.checked
                                  ? [...formData.specialization, spec]
                                  : formData.specialization.filter(s => s !== spec);
                                setFormData({ ...formData, specialization: newSpecializations });
                              }}
                              className="rounded text-blue-600"
                            />
                            <span className="text-sm">{spec}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Agency Name (if applicable)
                      </label>
                      <input
                        type="text"
                        value={formData.agencyName}
                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Your agency name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.gstNumber}
                        onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="22AAAAA0000A1Z5"
                      />
                    </div>
                  </div>

                  {/* Bank Details for Commission */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Bank Account Details</h3>
                    <p className="text-sm text-gray-600">
                      For commission payouts and transaction facilitation
                    </p>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        value={formData.accountHolderName}
                        onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="As per bank records"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Number *
                        </label>
                        <input
                          type="text"
                          value={formData.bankAccountNumber}
                          onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter account number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          IFSC Code *
                        </label>
                        <input
                          type="text"
                          value={formData.ifscCode}
                          onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="SBIN0001234"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Seller Professional Verification */
                <>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      As a seller, you need to verify your property documents to list properties on our platform.
                    </p>
                  </div>

                  {/* Property Documents */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Property Documents</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Sale Deed / Title Deed *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload('propertyDocuments', e.target.files)}
                          className="hidden"
                          id="property-docs"
                        />
                        <label htmlFor="property-docs" className="cursor-pointer">
                          {formData.propertyDocuments.length > 0 ? (
                            <div>
                              <span className="text-green-600">✓</span>
                              <span className="ml-2">{formData.propertyDocuments.length} files selected</span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-4xl mb-2 block">📑</span>
                              <span className="text-blue-600">Click to upload documents</span>
                              <p className="text-xs text-gray-500 mt-1">Upload sale deed, EC, pattadar passbook</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Latest Tax Receipts *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload('taxReceipts', e.target.files)}
                          className="hidden"
                          id="tax-receipts"
                        />
                        <label htmlFor="tax-receipts" className="cursor-pointer">
                          {formData.taxReceipts.length > 0 ? (
                            <div>
                              <span className="text-green-600">✓</span>
                              <span className="ml-2">{formData.taxReceipts.length} files selected</span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-4xl mb-2 block">💰</span>
                              <span className="text-blue-600">Click to upload tax receipts</span>
                              <p className="text-xs text-gray-500 mt-1">Property tax receipts for last 3 years</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details for Transactions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Bank Account Details</h3>
                    <p className="text-sm text-gray-600">
                      For secure transaction handling and escrow payments
                    </p>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        value={formData.accountHolderName}
                        onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="As per bank records"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Number *
                        </label>
                        <input
                          type="text"
                          value={formData.bankAccountNumber}
                          onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter account number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          IFSC Code *
                        </label>
                        <input
                          type="text"
                          value={formData.ifscCode}
                          onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="SBIN0001234"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Submit Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Skip for Now
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  {loading ? 'Submitting...' : 'Complete Verification'}
                </button>
              </div>

              {/* Skip Warning */}
              <p className="text-xs text-gray-500 text-center">
                Note: Skipping will limit your ability to list properties. You can complete verification later from your dashboard.
              </p>
            </form>
          )}
        </div>

        {/* Benefits of Verification */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <span className="text-2xl mb-2 block">✓</span>
            <h4 className="font-medium text-gray-900 text-sm">Verified Badge</h4>
            <p className="text-xs text-gray-600 mt-1">Build trust with buyers</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <span className="text-2xl mb-2 block">📈</span>
            <h4 className="font-medium text-gray-900 text-sm">Higher Ranking</h4>
            <p className="text-xs text-gray-600 mt-1">Priority in search results</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <span className="text-2xl mb-2 block">🔒</span>
            <h4 className="font-medium text-gray-900 text-sm">Escrow Access</h4>
            <p className="text-xs text-gray-600 mt-1">Secure transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalVerification;
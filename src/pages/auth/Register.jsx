import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    
    // Step 2: Additional Info
    city: '',
    preferredLocations: [],
    budget: '',
    propertyType: '',
    
    // Step 3: Professional Info (for agents/sellers)
    licenseNumber: '',
    experience: '',
    companyName: '',
    gstNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { value: 'buyer', label: 'I want to buy property', icon: '🏠', description: 'Find your dream home' },
    { value: 'agent', label: 'I am a real estate agent', icon: '🤝', description: 'List properties & get leads' },
    { value: 'seller', label: 'I want to sell property', icon: '📋', description: 'List your property' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleNext = () => {
    if (step === 1) {
      const stepErrors = validateStep1();
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await register(formData);
      if (result.success) {
        // Redirect to KYC if agent or seller
        if (formData.role === 'agent' || formData.role === 'seller') {
          navigate('/kyc/basic');
        } else {
          navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        }
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {i}
                </div>
                {i < 3 && (
                  <div className={`w-24 h-1 mx-2 ${
                    step > i ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Basic Info</span>
            <span>Preferences</span>
            <span>Professional</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h2>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: role.value })}
                        className={`p-4 border rounded-lg text-left transition-all ${
                          formData.role === role.value
                            ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <span className="text-3xl mb-2 block">{role.icon}</span>
                        <span className="font-medium text-sm">{role.label}</span>
                        <span className="text-xs text-gray-500 block mt-1">{role.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Preferences */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select city</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="warangal">Warangal</option>
                    <option value="nizamabad">Nizamabad</option>
                    <option value="karimnagar">Karimnagar</option>
                    <option value="khammam">Khammam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Locations (select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Gachibowli', 'Hitech City', 'Banjara Hills', 'Jubilee Hills', 'Kukatpally', 'Madhapur'].map((loc) => (
                      <label key={loc} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          value={loc}
                          onChange={(e) => {
                            const newLocations = e.target.checked
                              ? [...formData.preferredLocations, loc]
                              : formData.preferredLocations.filter(l => l !== loc);
                            setFormData({ ...formData, preferredLocations: newLocations });
                          }}
                          className="rounded text-blue-600"
                        />
                        <span className="text-sm">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select budget</option>
                    <option value="20-40l">₹20L - ₹40L</option>
                    <option value="40-60l">₹40L - ₹60L</option>
                    <option value="60l-1cr">₹60L - ₹1Cr</option>
                    <option value="1-2cr">₹1Cr - ₹2Cr</option>
                    <option value="2cr+">₹2Cr+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type Interested
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Apartment', 'Villa', 'Independent House', 'Land', 'Commercial', 'Farm House'].map((type) => (
                      <label key={type} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                        <input
                          type="radio"
                          name="propertyType"
                          value={type.toLowerCase()}
                          onChange={handleChange}
                          checked={formData.propertyType === type.toLowerCase()}
                          className="text-blue-600"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Professional Info (for agents/sellers) */}
            {step === 3 && (formData.role === 'agent' || formData.role === 'seller') && (
              <div className="space-y-6">
                {formData.role === 'agent' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RERA License Number *
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="RERA/TS/2024/000001"
                      />
                      <p className="mt-1 text-xs text-gray-500">Enter your valid RERA license number</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </>
                )}

                {formData.role === 'seller' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How many properties do you own?
                      </label>
                      <select
                        name="propertiesOwned"
                        value={formData.propertiesOwned}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2-3">2-3</option>
                        <option value="4-6">4-6</option>
                        <option value="7+">7+</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Business Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">Next Steps:</h4>
                  <p className="text-xs text-yellow-700">
                    After registration, you'll need to complete KYC verification to start listing properties.
                    This includes Aadhaar eKYC, PAN verification, and professional document validation.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3 for buyers (simpler) */}
            {step === 3 && formData.role === 'buyer' && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">You're almost there!</h3>
                <p className="text-gray-600 mb-6">
                  Complete your registration to start exploring verified properties
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-left">
                  <h4 className="font-medium text-blue-800 mb-2">As a buyer, you can:</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Browse 10,000+ verified properties
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Get AI-powered price estimates
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Access detailed verification reports
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Connect with trusted agents
                    </li>
                  </ul>
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
                  className={`ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
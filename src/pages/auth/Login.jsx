import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'buyer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { value: 'buyer', label: 'Buyer', icon: '🏠' },
    { value: 'agent', label: 'Agent', icon: '🤝' },
    { value: 'seller', label: 'Seller', icon: '📋' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // In Login.js, update handleSubmit:

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const result = await login(formData.email, formData.password);
    if (result.success) {
      // Check if KYC is needed
      if (result.user.kycStatus === 'not_started') {
        navigate('/kyc');
      } else {
        // Redirect based on role
        switch(result.user.role) {
          case 'agent':
            navigate('/dashboard/agent');
            break;
          case 'seller':
            navigate('/dashboard/seller');
            break;
          default:
            navigate('/buyer/home');
        }
      }
    } else {
      setError('Invalid credentials');
    }
  } catch (err) {
    setError('Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  // Demo credentials for quick testing
  const fillDemoCredentials = (role) => {
    const demos = {
      buyer: { email: 'buyer@example.com', password: 'password123' },
      agent: { email: 'agent@example.com', password: 'password123' },
      seller: { email: 'seller@example.com', password: 'password123' }
    };
    setFormData({ ...formData, ...demos[role], role });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        

        {/* Quick Demo Login */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-2">Quick Demo Access:</p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => fillDemoCredentials('buyer')}
              className="text-xs bg-white px-3 py-1 rounded-full text-blue-600 hover:bg-blue-100"
            >
              Buyer Demo
            </button>
            
            <button
              onClick={() => fillDemoCredentials('agent')}
              className="text-xs bg-white px-3 py-1 rounded-full text-blue-600 hover:bg-blue-100"
            >
              Agent Demo
            </button>
            <button
              onClick={() => fillDemoCredentials('seller')}
              className="text-xs bg-white px-3 py-1 rounded-full text-blue-600 hover:bg-blue-100"
            >
              Seller Demo
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up now
          </Link>
        </p>

        {/* Role-based info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Why choose our platform?</h3>
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
            <div className="text-center">
              <span className="block text-lg mb-1">✓</span>
              <span>Verified Properties</span>
            </div>
            <div className="text-center">
              <span className="block text-lg mb-1">🛡️</span>
              <span>Secure Escrow</span>
            </div>
            <div className="text-center">
              <span className="block text-lg mb-1">🤖</span>
              <span>AI Price Intel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@/features/auth/api/authApi';
import { useToast } from '@/shared/hooks/useToast';

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authApi.forgotPassword(identifier);
      setResponse(result);
      setSubmitted(true);
      success(result.message || 'Password reset OTP sent.', 'Reset OTP Sent');
    } catch (submitError) {
      const message = submitError.message || 'Failed to send password reset OTP.';
      setError(message);
      showError(message, 'Reset Request Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Forgot Password?</h2>
          <p className="text-gray-600 mt-2">
            {!submitted 
              ? "Enter your email or phone number and we'll send you a reset OTP" 
              : "Use the OTP to reset your password"}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address or Phone Number
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com or 9876543210"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
               className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium ${
              loading
                ? 'bg-[#4d6f69] cursor-not-allowed'
                : 'bg-[#1F4B43] hover:bg-[#173730] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F4B43]'
            }`}
            >
              {loading ? 'Sending...' : 'Send Reset OTP'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <p className="text-gray-600 mb-6">
              {response?.message || 'Password reset OTP sent.'}
            </p>
            {response?.masked_identifier && (
              <p className="mb-6 text-sm text-gray-500">
                Sent to <strong>{response.masked_identifier}</strong>
              </p>
            )}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/reset-password', { state: { identifier } })}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
              >
                Continue to Reset Password
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setResponse(null);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Try a different email or phone
              </button>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

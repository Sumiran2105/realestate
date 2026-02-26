import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const OTPVerification = () => {
  const [otp, setOtp] = useState({ email: ['', '', '', '', '', ''], phone: ['', '', '', '', '', ''] });
  const [activeTab, setActiveTab] = useState('email');
  const [timer, setTimer] = useState({ email: 60, phone: 60 });
  const [canResend, setCanResend] = useState({ email: false, phone: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationStatus, setVerificationStatus] = useState({ email: false, phone: false });
  
  const emailInputs = useRef([]);
  const phoneInputs = useRef([]);
  
  const { verifyOTP, resendOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, phone } = location.state || { email: 'user@example.com', phone: '9876543210' };

  useEffect(() => {
    // Start timers for both OTPs
    startTimer('email');
    startTimer('phone');
  }, []);

  useEffect(() => {
    // Check if both OTPs are verified
    if (verificationStatus.email && verificationStatus.phone) {
      handleVerificationComplete();
    }
  }, [verificationStatus]);

  const startTimer = (type) => {
    setCanResend(prev => ({ ...prev, [type]: false }));
    setTimer(prev => ({ ...prev, [type]: 60 }));
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev[type] <= 1) {
          clearInterval(interval);
          setCanResend(prev => ({ ...prev, [type]: true }));
          return { ...prev, [type]: 0 };
        }
        return { ...prev, [type]: prev[type] - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleOtpChange = (type, index, value) => {
    if (value.length > 1) {
      // Handle paste
      const pastedValue = value.slice(0, 6).split('');
      const newOtp = [...otp[type]];
      pastedValue.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp({ ...otp, [type]: newOtp });
      
      // Focus last input
      if (type === 'email') {
        emailInputs.current[5]?.focus();
      } else {
        phoneInputs.current[5]?.focus();
      }
    } else {
      // Handle single digit
      const newOtp = [...otp[type]];
      newOtp[index] = value;
      setOtp({ ...otp, [type]: newOtp });
      
      // Auto-focus next input
      if (value && index < 5) {
        if (type === 'email') {
          emailInputs.current[index + 1]?.focus();
        } else {
          phoneInputs.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (type, index, e) => {
    if (e.key === 'Backspace' && !otp[type][index] && index > 0) {
      // Focus previous input on backspace
      if (type === 'email') {
        emailInputs.current[index - 1]?.focus();
      } else {
        phoneInputs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyOTP = async (type) => {
    const otpString = otp[type].join('');
    if (otpString.length !== 6) {
      setError(`Please enter complete 6-digit ${type} OTP`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In real app, verify OTP with backend
      // For demo, accept 123456 as valid OTP
      if (otpString === '123456') {
        setVerificationStatus(prev => ({ ...prev, [type]: true }));
        setError('');
        
        // Show success message
        if (type === 'email') {
          setActiveTab('phone');
        }
      } else {
        setError(`Invalid ${type} OTP`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async (type) => {
    if (!canResend[type]) return;
    
    setLoading(true);
    try {
      await resendOTP(type);
      startTimer(type);
      setOtp({ ...otp, [type]: ['', '', '', '', '', ''] });
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationComplete = async () => {
    setLoading(true);
    try {
      const result = await verifyOTP(otp.email.join(''), otp.phone.join(''));
      if (result.success) {
        // Redirect to login with success message
        navigate('/login', { 
          state: { 
            message: 'Email and phone verified successfully! Please login to continue.' 
          } 
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = (type) => {
    return otp[type].every(digit => digit !== '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-3xl font-bold text-gray-900">Verify Your Contact</h2>
          <p className="text-gray-600 mt-2">
            We've sent verification codes to:
          </p>
          <div className="mt-2 text-sm font-medium text-blue-600">
            <div>{email}</div>
            <div>{phone}</div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="mb-6 flex justify-center space-x-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${verificationStatus.email ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-xs ml-1">Email</span>
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${verificationStatus.phone ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-xs ml-1">Phone</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === 'email'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📧 Email OTP
            {verificationStatus.email && <span className="ml-2 text-green-500">✓</span>}
          </button>
          <button
            onClick={() => setActiveTab('phone')}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === 'phone'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📱 Phone OTP
            {verificationStatus.phone && <span className="ml-2 text-green-500">✓</span>}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Email OTP Section */}
        {activeTab === 'email' && !verificationStatus.email && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Enter 6-digit code sent to {email}
              </label>
              
              <div className="flex justify-between gap-2">
                {otp.email.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => emailInputs.current[index] = el}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange('email', index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown('email', index, e)}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => handleVerifyOTP('email')}
              disabled={loading || !isOtpComplete('email')}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                loading || !isOtpComplete('email')
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify Email OTP'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive code?{' '}
                <button
                  onClick={() => handleResendOTP('email')}
                  disabled={!canResend.email || loading}
                  className={`font-medium ${
                    canResend.email && !loading
                      ? 'text-blue-600 hover:text-blue-800'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Resend {timer.email > 0 && `(${timer.email}s)`}
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Phone OTP Section */}
        {activeTab === 'phone' && !verificationStatus.phone && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Enter 6-digit code sent to {phone}
              </label>
              
              <div className="flex justify-between gap-2">
                {otp.phone.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => phoneInputs.current[index] = el}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange('phone', index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown('phone', index, e)}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => handleVerifyOTP('phone')}
              disabled={loading || !isOtpComplete('phone')}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                loading || !isOtpComplete('phone')
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify Phone OTP'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive code?{' '}
                <button
                  onClick={() => handleResendOTP('phone')}
                  disabled={!canResend.phone || loading}
                  className={`font-medium ${
                    canResend.phone && !loading
                      ? 'text-blue-600 hover:text-blue-800'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Resend {timer.phone > 0 && `(${timer.phone}s)`}
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {verificationStatus.email && verificationStatus.phone && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Complete!</h3>
            <p className="text-gray-600 mb-6">
              Both email and phone have been verified successfully.
            </p>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-500 mt-4">Redirecting to login...</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            For demo, use OTP: <span className="font-mono font-bold">123456</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
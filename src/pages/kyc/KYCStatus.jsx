import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const KYCStatus = () => {
  const { user } = useAuth();

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const kycSteps = [
    { 
      name: 'Basic Verification', 
      status: user?.kycStatus === 'completed' ? 'completed' : 'pending',
      icon: '📱',
      description: 'Phone & email verification'
    },
    { 
      name: 'Identity Verification', 
      status: user?.kycStatus === 'completed' ? 'completed' : user?.kycStatus === 'identity_pending' ? 'pending' : 'not_started',
      icon: '🆔',
      description: 'Aadhaar/PAN verification'
    },
    { 
      name: 'Professional Verification', 
      status: user?.kycStatus === 'completed' ? 'completed' : user?.kycStatus === 'professional_pending' ? 'pending' : 'not_started',
      icon: user?.role === 'agent' ? '🤝' : '📋',
      description: user?.role === 'agent' ? 'RERA & professional details' : 'Property documents'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">KYC Verification Status</h1>
            <p className="text-gray-600 mt-2">
              Track your verification progress
            </p>
          </div>

          {/* Overall Status */}
          <div className={`p-6 rounded-lg mb-8 text-center ${
            user?.kycStatus === 'completed' ? 'bg-green-50' : 'bg-yellow-50'
          }`}>
            <div className="text-4xl mb-3">
              {user?.kycStatus === 'completed' ? '✅' : '⏳'}
            </div>
            <h2 className={`text-xl font-semibold ${
              user?.kycStatus === 'completed' ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {user?.kycStatus === 'completed' 
                ? 'KYC Successfully Completed!' 
                : 'KYC Verification in Progress'}
            </h2>
            <p className={`mt-2 ${
              user?.kycStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {user?.kycStatus === 'completed'
                ? 'You now have full access to all platform features'
                : 'Please complete all steps to access full platform features'}
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="space-y-6">
            {kycSteps.map((step, index) => (
              <div key={index} className="relative">
                {index < kycSteps.length - 1 && (
                  <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-300"></div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    step.status === 'completed' ? 'bg-green-100' :
                    step.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    {step.status === 'completed' ? '✓' : step.icon}
                  </div>
                  
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{step.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        getStatusColor(step.status)
                      }`}>
                        {step.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    
                    {step.status === 'pending' && (
                      <Link
                        to={`/kyc/${index === 0 ? 'basic' : index === 1 ? 'identity' : 'professional'}`}
                        className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Continue Verification →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
            
            {user?.kycStatus !== 'completed' && (
              <Link
                to="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Browse Properties
              </Link>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Why KYC is important?</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Verified badge builds trust with buyers and sellers</li>
              <li>• Access to premium features and higher listing visibility</li>
              <li>• Eligible for escrow-protected transactions</li>
              <li>• Required for agents and sellers to list properties</li>
              <li>• Compliant with RERA and government regulations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCStatus;
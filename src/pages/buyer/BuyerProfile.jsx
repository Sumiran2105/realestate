import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const BuyerProfile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-slate-300 p-8">
          <h1 className="text-3xl font-bold text-slate-900">Buyer Profile</h1>
          <p className="text-slate-600 mt-2">Dummy buyer profile for workflow testing.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Name</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">{user?.name || 'Buyer User'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">{user?.email || 'buyer@example.com'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">{user?.role || 'buyer'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">KYC Status</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">{user?.kycStatus || 'verified'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;

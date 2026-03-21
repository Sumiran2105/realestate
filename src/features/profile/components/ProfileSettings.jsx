import React, { useState } from 'react';
import { KeyRound, LockKeyhole, Save } from 'lucide-react';
import { profileApi } from '@/features/profile/api/profileApi';
import { useToast } from '@/shared/hooks/useToast';

const initialFormState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ProfileSettings = ({ className = '' }) => {
  const { success, error: showError } = useToast();
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All password fields are required.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    setLoading(true);

    try {
      const result = await profileApi.changePassword(formData);
      setFormData(initialFormState);
      success(result?.message || 'Password changed successfully.', 'Password Updated');
    } catch (submitError) {
      const message = submitError.message || 'Failed to update password.';
      setError(message);
      showError(message, 'Password Update Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7 ${className}`}>
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 ring-1 ring-slate-200">
          <KeyRound size={18} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Profile Settings</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">Change Password</h3>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-500">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Enter current password"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-500">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-500">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <p className="text-sm text-slate-500">
          Use your current password and set a new password that follows the backend policy.
        </p>

        <div className="flex justify-stretch sm:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            <LockKeyhole size={16} />
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;

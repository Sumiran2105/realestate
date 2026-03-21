import { apiClient } from '@/shared/axios/client';
import { normalizeProfileUser } from '@/features/profile/utils/normalizeProfile';

export const profileApi = {
  async getCurrentUser() {
    const response = await apiClient.request('/api/v1/me');
    return normalizeProfileUser(response);
  },

  async getVerificationStatus() {
    return apiClient.request('/api/v1/verification-status');
  },

  async getKycStatus() {
    return apiClient.request('/api/v1/status');
  },

  async changePassword({ currentPassword, newPassword, confirmPassword }) {
    return apiClient.request('/api/v1/change-password', {
      method: 'POST',
      body: {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
    });
  },
};

import { apiClient } from '@/shared/axios/client';

export const adminApi = {
  async getUsersDashboard() {
    return apiClient.request('/api/v1/users/dashboard');
  },

  async getAllKyc() {
    return apiClient.request('/api/v1/kyc/all');
  },

  async suspendUser(userId, reason) {
    return apiClient.request(`/api/v1/users/${userId}/suspend`, {
      method: 'POST',
      body: {
        reason,
      },
    });
  },

  async getKycStatistics() {
    return apiClient.request('/api/v1/kyc/statistics');
  },

  async getPendingKyc() {
    return apiClient.request('/api/v1/kyc/pending');
  },

  async getKycDetail(kycId) {
    return apiClient.request(`/api/v1/kyc/${kycId}`);
  },

  async approveKyc(kycId) {
    return apiClient.request(`/api/v1/kyc/${kycId}/approve`, {
      method: 'POST',
    });
  },

  async rejectKyc(kycId, rejectionReason) {
    return apiClient.request(`/api/v1/kyc/${kycId}/reject`, {
      method: 'POST',
      body: {
        rejection_reason: rejectionReason,
      },
    });
  },
};

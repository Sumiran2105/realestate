import { apiClient } from '@/shared/api/client';

export const kycApi = {
  async getRequirements() {
    return apiClient.request('/api/v1/requirements');
  },

  async submitAadhaar({ aadhaarNumber, file }) {
    const formData = new FormData();
    formData.append('aadhaar_number', aadhaarNumber);
    formData.append('file', file);

    return apiClient.request('/api/v1/basic/aadhaar', {
      method: 'POST',
      body: formData,
    });
  },

  async submitPan({ panNumber, file }) {
    const formData = new FormData();
    formData.append('pan_number', panNumber);
    formData.append('file', file);

    return apiClient.request('/api/v1/basic/pan', {
      method: 'POST',
      body: formData,
    });
  },
};

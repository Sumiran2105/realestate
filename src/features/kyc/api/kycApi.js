import { apiClient } from '@/shared/axios/client';

export const kycApi = {
  async getRequirements() {
    return apiClient.request('/api/v1/requirements');
  },

  async submitKyc() {
    return apiClient.request('/api/v1/submit', {
      method: 'POST',
    });
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

  async submitRera({ licenseNumber, state, expiryDate, file }) {
    const formData = new FormData();
    formData.append('license_number', licenseNumber);
    formData.append('state', state);
    formData.append('expiry_date', expiryDate);
    formData.append('file', file);

    return apiClient.request('/api/v1/professional/rera', {
      method: 'POST',
      body: formData,
    });
  },

  async submitGst({ gstNumber, file }) {
    const formData = new FormData();
    formData.append('gst_number', gstNumber);
    formData.append('file', file);

    return apiClient.request('/api/v1/professional/gst', {
      method: 'POST',
      body: formData,
    });
  },

  async submitCompany({ registrationNumber, companyName, file }) {
    const formData = new FormData();
    formData.append('registration_number', registrationNumber);
    formData.append('company_name', companyName);
    formData.append('file', file);

    return apiClient.request('/api/v1/professional/company', {
      method: 'POST',
      body: formData,
    });
  },
};

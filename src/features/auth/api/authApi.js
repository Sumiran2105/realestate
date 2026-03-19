import { apiClient } from '@/shared/api/client';
import { authStorage } from '@/store/auth/authStorage';
import { normalizeProfileUser } from '@/features/profile/utils/normalizeProfile';

export const authApi = {
  async register(userData) {
    const payload = {
      phone: userData.phone,
      email: userData.email,
      user_type: userData.role,
      full_name: userData.name,
      password: userData.password,
      confirm_password: userData.confirmPassword,
    };

    const response = await apiClient.request('/api/v1/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return {
      ...response,
      tempRegistrationData: {
        id: response.user?.id || Date.now(),
        name: userData.name,
        full_name: response.user?.full_name || userData.name,
        email: response.user?.email || userData.email,
        phone: response.user?.phone || userData.phone,
        role: userData.role,
        user_type: response.user?.user_type || userData.role,
        createdAt: response.user?.created_at || new Date().toISOString(),
      },
    };
  },

  async verifyOtp({ emailOTP, phoneOTP, tempRegistrationData }) {
    const pendingUser = authStorage.getPendingUser() || tempRegistrationData;
    authStorage.savePendingUser({
      ...pendingUser,
      kycStatus: 'not_started',
      emailVerified: true,
      phoneVerified: true,
      lastVerifiedEmailOtp: emailOTP,
      lastVerifiedPhoneOtp: phoneOTP,
    });

    return { success: true, message: 'Verification successful! Please login.' };
  },

  async verifyEmailOtp({ email, otp }) {
    return apiClient.request('/api/v1/verify-email-otp', {
      method: 'POST',
      body: JSON.stringify({
        email,
        otp,
      }),
    });
  },

  async resendEmailOtp(email) {
    const formData = new URLSearchParams();
    formData.append('email', email);

    return apiClient.request('/api/v1/resend-email-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
  },

  async verifyPhoneOtp({ phone, otp }) {
    return apiClient.request('/api/v1/verify-phone-otp', {
      method: 'POST',
      body: JSON.stringify({
        phone,
        otp,
      }),
    });
  },

  async resendPhoneOtp(phone) {
    const formData = new URLSearchParams();
    formData.append('phone', phone);

    return apiClient.request('/api/v1/resend-phone-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
  },

  async resendOtp(type) {
    return { success: true, message: `OTP resent to your ${type}` };
  },

  async forgotPassword(identifier) {
    return apiClient.request('/api/v1/forgot-password', {
      method: 'POST',
      body: JSON.stringify({
        identifier,
      }),
    });
  },

  async resetPassword({ identifier, otp, newPassword }) {
    return apiClient.request('/api/v1/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        identifier,
        otp,
        new_password: newPassword,
      }),
    });
  },

  async login({ identifier, password }) {
    const response = await apiClient.request('/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const normalizedUser = normalizeProfileUser(response.user);

    const accessToken = response.tokens?.access_token;
    authStorage.saveSession({ user: normalizedUser, token: accessToken });
    authStorage.clearPendingUser();

    return {
      success: true,
      user: normalizedUser,
      token: accessToken,
      refreshToken: response.tokens?.refresh_token,
      expiresIn: response.tokens?.expires_in,
    };
  },

  async logout() {
    return apiClient.request('/api/v1/logout', {
      method: 'POST',
    });
  },
};

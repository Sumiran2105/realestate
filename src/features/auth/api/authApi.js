import { authStorage } from '@/features/auth/store/authStorage';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const buildDemoUser = (email) => {
  if (email === 'admin@example.com') {
    return {
      id: 999,
      name: 'Admin User',
      email,
      role: 'admin',
      kycStatus: 'verified',
      emailVerified: true,
      phoneVerified: true,
      createdAt: new Date().toISOString(),
    };
  }

  if (email.includes('agent')) {
    return {
      id: 2,
      name: 'Mike Agent',
      email,
      role: 'agent',
      kycStatus: 'verified',
      emailVerified: true,
      phoneVerified: true,
      agentId: 'RERA12345',
      rating: 4.5,
      createdAt: new Date().toISOString(),
    };
  }

  if (email.includes('seller')) {
    return {
      id: 3,
      name: 'Sarah Seller',
      email,
      role: 'seller',
      kycStatus: 'verified',
      emailVerified: true,
      phoneVerified: true,
      createdAt: new Date().toISOString(),
    };
  }

  return {
    id: 1,
    name: 'John Buyer',
    email,
    role: 'buyer',
    kycStatus: 'not_started',
    emailVerified: true,
    phoneVerified: true,
    createdAt: new Date().toISOString(),
  };
};

export const authApi = {
  async register(userData) {
    await delay(1000);

    return {
      success: true,
      message: 'Registration initiated. Please verify OTP.',
      tempRegistrationData: {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      },
    };
  },

  async verifyOtp({ emailOTP, phoneOTP, tempRegistrationData }) {
    await delay(1500);

    if (emailOTP !== '123456' || phoneOTP !== '123456') {
      throw new Error('Invalid OTP');
    }

    const pendingUser = {
      ...tempRegistrationData,
      kycStatus: 'not_started',
      emailVerified: true,
      phoneVerified: true,
    };

    authStorage.savePendingUser(pendingUser);

    return {
      success: true,
      message: 'Verification successful! Please login.',
    };
  },

  async resendOtp(type) {
    await delay(1000);
    return { success: true, message: `OTP resent to your ${type}` };
  },

  async login({ email }) {
    await delay(1000);

    const pendingUser = authStorage.getPendingUser();
    let user = null;

    if (pendingUser?.email === email) {
      user = pendingUser;
      authStorage.clearPendingUser();
    }

    if (!user) {
      user = buildDemoUser(email);
    }

    const token = `mock_token_${Date.now()}`;
    authStorage.saveSession({ user, token });

    return { success: true, user, token };
  },
};

export const normalizeProfileUser = (user) => ({
  id: user?.id,
  name: user?.full_name || user?.email,
  full_name: user?.full_name,
  email: user?.email,
  phone: user?.phone,
  role: user?.user_type,
  user_type: user?.user_type,
  emailVerified: user?.is_email_verified,
  phoneVerified: user?.is_phone_verified,
  accountStatus: user?.account_status,
  kycStatus: user?.account_status === 'active' ? 'verified' : 'pending',
  createdAt: user?.created_at,
  updatedAt: user?.updated_at,
});

const pickBoolean = (...values) => values.find((value) => typeof value === 'boolean');

export const normalizeVerificationStatus = (status) => ({
  emailVerified:
    pickBoolean(
      status?.email_verified,
      status?.is_email_verified,
      status?.email?.verified,
      status?.email?.is_verified,
      status?.email_verification?.verified,
      status?.email_verification?.is_verified
    ) ?? false,
  phoneVerified:
    pickBoolean(
      status?.phone_verified,
      status?.is_phone_verified,
      status?.phone?.verified,
      status?.phone?.is_verified,
      status?.phone_verification?.verified,
      status?.phone_verification?.is_verified
    ) ?? false,
});

const pickString = (...values) => values.find((value) => typeof value === 'string' && value.trim());

export const normalizeKycStatus = (status) => {
  const rawStatus =
    pickString(
      status?.kyc_status,
      status?.status,
      status?.verification_status,
      status?.kyc?.status,
      status?.verification?.status
    ) || 'not_started';

  const normalizedStatus = rawStatus.toLowerCase().replace(/\s+/g, '_');

  return {
    kycStatus: normalizedStatus,
    kycCompleted: ['completed', 'verified', 'active'].includes(normalizedStatus),
    kycLabel: normalizedStatus.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
  };
};

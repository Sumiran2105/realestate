import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/shared/hooks/useToast';
import { profileApi } from '@/features/profile/api/profileApi';
import { normalizeKycStatus, normalizeVerificationStatus } from '@/features/profile/utils/normalizeProfile';

export const useCurrentProfile = () => {
  const { user, updateUser } = useAuth();
  const { error } = useToast();
  const [profile, setProfile] = useState(user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await profileApi.getCurrentUser();
        let mergedProfile = currentUser;

        try {
          const verificationStatus = await profileApi.getVerificationStatus();
          const normalizedVerification = normalizeVerificationStatus(verificationStatus);
          mergedProfile = {
            ...mergedProfile,
            ...normalizedVerification,
          };
        } catch {}

        try {
          const kycStatus = await profileApi.getKycStatus();
          const normalizedKyc = normalizeKycStatus(kycStatus);
          mergedProfile = {
            ...mergedProfile,
            ...normalizedKyc,
          };
        } catch {}

        updateUser(mergedProfile);
        setProfile(mergedProfile);
        return;
      } catch (loadError) {
        error(loadError.message || 'Failed to load profile details.', 'Profile Load Failed');
        setProfile(user);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user?.id]);

  return {
    profile,
    isLoading,
  };
};

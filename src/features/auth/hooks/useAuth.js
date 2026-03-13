import { useDispatch, useSelector } from 'react-redux';
import {
  clearAuthError,
  logoutUser,
  updateKycStatus,
  updateUser,
} from '@/features/auth/store/authSlice';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthUser,
  selectIsAdmin,
  selectIsAgent,
  selectIsAuthenticated,
  selectIsBuyer,
  selectIsSeller,
  selectNeedsKyc,
} from '@/features/auth/store/authSelectors';
import { loginUser, registerUser, resendOtp, verifyOtp } from '@/features/auth/store/authThunks';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const isAgent = useSelector(selectIsAgent);
  const isSeller = useSelector(selectIsSeller);
  const isBuyer = useSelector(selectIsBuyer);
  const needsKYC = useSelector(selectNeedsKyc);

  return {
    user,
    loading,
    error,
    login: (email, password) => dispatch(loginUser({ email, password })).unwrap(),
    register: (userData) => dispatch(registerUser(userData)).unwrap(),
    verifyOTP: (emailOTP, phoneOTP) => dispatch(verifyOtp({ emailOTP, phoneOTP })).unwrap(),
    resendOTP: (type) => dispatch(resendOtp(type)).unwrap(),
    logout: () => dispatch(logoutUser()),
    updateKYCStatus: (status) => dispatch(updateKycStatus(status)),
    updateUser: (updates) => dispatch(updateUser(updates)),
    clearError: () => dispatch(clearAuthError()),
    isAuthenticated,
    isAdmin,
    isAgent,
    isSeller,
    isBuyer,
    needsKYC,
  };
};

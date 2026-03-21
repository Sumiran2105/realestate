import { useDispatch, useSelector } from 'react-redux';
import {
  clearAuthError,
  completeLogout,
  updateKycStatus,
  updateUser,
} from '@/store/auth/authSlice';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthUser,
  selectIsAdmin,
  selectIsAgent,
  selectIsAuthenticated,
  selectIsBuilder,
  selectIsBuyer,
  selectIsSeller,
  selectNeedsKyc,
} from '@/store/auth/authSelectors';
import { loginUser, logoutUser, registerUser, resendOtp, verifyOtp } from '@/store/auth/authThunks';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const isAgent = useSelector(selectIsAgent);
  const isSeller = useSelector(selectIsSeller);
  const isBuilder = useSelector(selectIsBuilder);
  const isBuyer = useSelector(selectIsBuyer);
  const needsKYC = useSelector(selectNeedsKyc);

  return {
    user,
    loading,
    error,
    login: (identifier, password) => dispatch(loginUser({ identifier, password })).unwrap(),
    register: (userData) => dispatch(registerUser(userData)).unwrap(),
    verifyOTP: (emailOTP, phoneOTP) => dispatch(verifyOtp({ emailOTP, phoneOTP })).unwrap(),
    resendOTP: (type) => dispatch(resendOtp(type)).unwrap(),
    logout: () => dispatch(logoutUser()).unwrap().catch(() => dispatch(completeLogout())),
    updateKYCStatus: (status) => dispatch(updateKycStatus(status)),
    updateUser: (updates) => dispatch(updateUser(updates)),
    clearError: () => dispatch(clearAuthError()),
    isAuthenticated,
    isAdmin,
    isAgent,
    isSeller,
    isBuilder,
    isBuyer,
    needsKYC,
  };
};

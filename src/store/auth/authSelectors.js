export const selectAuthState = (state) => state.auth;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthToken = (state) => state.auth.token;
export const selectTempRegistrationData = (state) => state.auth.tempRegistrationData;
export const selectIsAuthenticated = (state) => !!state.auth.user;
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export const selectIsAgent = (state) => state.auth.user?.role === 'agent';
export const selectIsSeller = (state) => state.auth.user?.role === 'seller';
export const selectIsBuilder = (state) => state.auth.user?.role === 'builder';
export const selectIsBuyer = (state) => state.auth.user?.role === 'buyer';
export const selectNeedsKyc = (state) =>
  !!state.auth.user && (state.auth.user.kycStatus === 'not_started' || state.auth.user.kycStatus === 'pending');

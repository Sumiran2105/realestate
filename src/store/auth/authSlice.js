import { createSlice } from '@reduxjs/toolkit';
import { authStorage } from '@/store/auth/authStorage';
import { loginUser, logoutUser, registerUser, resendOtp, verifyOtp } from '@/store/auth/authThunks';

const storedUser = authStorage.getUser();
const storedToken = authStorage.getToken();

if ((storedUser && !storedToken) || (!storedUser && storedToken)) {
  authStorage.clearSession();
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser && storedToken ? storedUser : null,
    token: storedUser && storedToken ? storedToken : null,
    loading: false,
    error: null,
    tempRegistrationData: null,
  },
  reducers: {
    completeLogout(state) {
      state.user = null;
      state.token = null;
      state.tempRegistrationData = null;
      authStorage.clearAll();
    },
    updateKycStatus(state, action) {
      if (!state.user) return;
      state.user = { ...state.user, kycStatus: action.payload };
      authStorage.saveSession({ user: state.user, token: state.token || `mock_token_${Date.now()}` });
    },
    updateUser(state, action) {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
      authStorage.saveSession({ user: state.user, token: state.token || `mock_token_${Date.now()}` });
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tempRegistrationData = action.payload.tempRegistrationData;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.tempRegistrationData = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'OTP verification failed';
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to resend OTP';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.tempRegistrationData = null;
        authStorage.clearAll();
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.tempRegistrationData = null;
        authStorage.clearAll();
      });
  },
});

export const { completeLogout, updateKycStatus, updateUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

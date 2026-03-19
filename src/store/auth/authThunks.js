import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/api/authApi';

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    return await authApi.register(userData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({ emailOTP, phoneOTP }, { getState, rejectWithValue }) => {
  try {
    const { tempRegistrationData } = getState().auth;
    return await authApi.verifyOtp({ emailOTP, phoneOTP, tempRegistrationData });
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const resendOtp = createAsyncThunk('auth/resendOtp', async (type, { rejectWithValue }) => {
  try {
    return await authApi.resendOtp(type);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ identifier, password }, { rejectWithValue }) => {
  try {
    return await authApi.login({ identifier, password });
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await authApi.logout();
    return null;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

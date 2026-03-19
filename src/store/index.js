import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/authSlice';
import toastReducer from '@/store/ui/toastSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toasts: toastReducer,
  },
});

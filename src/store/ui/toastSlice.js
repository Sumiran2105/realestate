import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ title, message, type = 'info', duration = 3000 }) {
        return {
          payload: {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            title,
            message,
            type,
            duration,
          },
        };
      },
    },
    removeToast(state, action) {
      return state.filter((toast) => toast.id !== action.payload);
    },
    clearToasts() {
      return [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;

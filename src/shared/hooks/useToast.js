import { useDispatch } from 'react-redux';
import { addToast, removeToast } from '@/store/ui/toastSlice';

export const useToast = () => {
  const dispatch = useDispatch();

  return {
    showToast: (payload) => dispatch(addToast(payload)),
    success: (message, title = 'Success') =>
      dispatch(addToast({ title, message, type: 'success' })),
    error: (message, title = 'Error') =>
      dispatch(addToast({ title, message, type: 'error' })),
    info: (message, title = 'Info') =>
      dispatch(addToast({ title, message, type: 'info' })),
    dismissToast: (id) => dispatch(removeToast(id)),
  };
};

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '@/store/ui/toastSlice';

const toastStyles = {
  success: {
    border: 'border-green-200',
    bg: 'bg-green-50',
    title: 'text-green-800',
    message: 'text-green-700',
    icon: '✓',
  },
  error: {
    border: 'border-red-200',
    bg: 'bg-red-50',
    title: 'text-red-800',
    message: 'text-red-700',
    icon: '!',
  },
  info: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    title: 'text-blue-800',
    message: 'text-blue-700',
    icon: 'i',
  },
};

const ToastItem = ({ toast, onDismiss }) => {
  const style = toastStyles[toast.type] || toastStyles.info;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 3000);

    return () => window.clearTimeout(timeoutId);
  }, [toast.duration, toast.id, onDismiss]);

  return (
    <div className={`w-full max-w-sm rounded-xl border ${style.border} ${style.bg} shadow-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white ${style.title} text-sm font-bold`}>
          {style.icon}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-semibold ${style.title}`}>{toast.title}</p>
          <p className={`mt-1 text-sm ${style.message}`}>{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const ToastContainer = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toasts);

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={(id) => dispatch(removeToast(id))} />
      ))}
    </div>
  );
};

export default ToastContainer;

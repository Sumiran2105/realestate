import axios from 'axios';
import { authStorage } from '@/store/auth/authStorage';

const DEFAULT_DEV_API_BASE_URL = 'http://localhost:8000';
const TOKEN_STORAGE_KEY = 'token';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? DEFAULT_DEV_API_BASE_URL : '');

export const buildApiUrl = (path) => {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path}`;
};

const httpClient = axios.create({
  baseURL: API_BASE_URL || undefined,
});

const AUTH_EXCLUDED_PATHS = [
  '/api/v1/login',
  '/api/v1/register',
  '/api/v1/forgot-password',
  '/api/v1/reset-password',
  '/api/v1/verify-email-otp',
  '/api/v1/verify-phone-otp',
  '/api/v1/resend-email-otp',
  '/api/v1/resend-phone-otp',
];

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestPath = error?.config?.url || '';
    const isAuthExcludedPath = AUTH_EXCLUDED_PATHS.some((path) => requestPath.includes(path));

    if (status === 401 && !isAuthExcludedPath) {
      authStorage.clearAll();

      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }

    return Promise.reject(error);
  }
);

const resolveErrorMessage = (error) => {
  const detail = error?.response?.data?.detail;

  if (typeof detail === 'string') return detail;
  if (typeof detail?.message === 'string') return detail.message;
  if (typeof error?.response?.data?.message === 'string') return error.response.data.message;
  if (typeof error?.message === 'string') return error.message;

  return 'Request failed';
};

export const apiClient = {
  async request(path, options = {}) {
    const { body, ...restOptions } = options;

    try {
      const response = await httpClient.request({
        url: path,
        ...restOptions,
        data: body,
      });

      return response.status === 204 ? null : response.data;
    } catch (error) {
      throw new Error(resolveErrorMessage(error));
    }
  },
};

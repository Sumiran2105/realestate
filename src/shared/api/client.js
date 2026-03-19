const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const DEFAULT_DEV_API_BASE_URL = 'http://localhost:8000';

const TOKEN_STORAGE_KEY = 'token';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? DEFAULT_DEV_API_BASE_URL : '');

export const buildApiUrl = (path) => {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path}`;
};

export const apiClient = {
  async request(path, options = {}) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const isFormDataBody = typeof FormData !== 'undefined' && options.body instanceof FormData;

    const response = await fetch(buildApiUrl(path), {
      ...options,
      headers: {
        ...(isFormDataBody ? {} : DEFAULT_HEADERS),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      let message = 'Request failed';

      try {
        const errorBody = await response.json();
        if (typeof errorBody?.detail === 'string') {
          message = errorBody.detail;
        } else if (typeof errorBody?.detail?.message === 'string') {
          message = errorBody.detail.message;
        } else if (typeof errorBody?.message === 'string') {
          message = errorBody.message;
        }
      } catch {
        message = response.statusText || message;
      }

      throw new Error(message);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  },
};

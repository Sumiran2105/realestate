const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const buildApiUrl = (path) => {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path}`;
};

export const apiClient = {
  async request(path, options = {}) {
    const response = await fetch(buildApiUrl(path), {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      let message = 'Request failed';

      try {
        const errorBody = await response.json();
        message = errorBody.message || errorBody.detail || message;
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

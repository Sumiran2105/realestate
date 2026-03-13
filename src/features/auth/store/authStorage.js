const USER_STORAGE_KEY = 'user';
const TOKEN_STORAGE_KEY = 'token';
const PENDING_USER_STORAGE_KEY = 'pendingUser';

const readJson = (key) => {
  const rawValue = localStorage.getItem(key);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.error(`Failed to parse "${key}" from localStorage:`, error);
    localStorage.removeItem(key);
    return null;
  }
};

export const authStorage = {
  getUser: () => readJson(USER_STORAGE_KEY),
  getToken: () => localStorage.getItem(TOKEN_STORAGE_KEY),
  getPendingUser: () => readJson(PENDING_USER_STORAGE_KEY),
  saveSession: ({ user, token }) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },
  savePendingUser: (user) => {
    localStorage.setItem(PENDING_USER_STORAGE_KEY, JSON.stringify(user));
  },
  clearSession: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
  clearPendingUser: () => {
    localStorage.removeItem(PENDING_USER_STORAGE_KEY);
  },
  clearAll: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(PENDING_USER_STORAGE_KEY);
  },
};

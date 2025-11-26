export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
  },
  USER: {
    BY_ID: (id: string) => `/api/users/${id}`,
  },
} as const;

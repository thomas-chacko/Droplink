export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
  },
  USER: {
    BY_ID: (id: string) => `/api/users/${id}`,
  },
  LINKS: {
    ALL: '/api/links',
    BY_ID: (id: string) => `/api/links/${id}`,
    CREATE: '/api/links',
    UPDATE: (id: string) => `/api/links/${id}`,
    DELETE: (id: string) => `/api/links/${id}`,
  }
} as const;

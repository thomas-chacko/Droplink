/**
 * Client-side authentication utilities
 */

export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // Check if both token and user exist
    return !!(token && user);
};

export const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
};

export const getAuthUser = () => {
    if (typeof window === 'undefined') return null;

    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

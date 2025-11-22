/**
 * Client-side authentication utilities
 * Now using Zustand for state management with localStorage persistence
 */

import { useAuthStore } from '@/store/useAuthStore';

export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;
    return useAuthStore.getState().isAuthenticated;
};

export const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return useAuthStore.getState().token;
};

export const getAuthUser = () => {
    if (typeof window === 'undefined') return null;
    return useAuthStore.getState().user;
};

export const clearAuth = () => {
    if (typeof window === 'undefined') return;
    useAuthStore.getState().clearAuth();
};

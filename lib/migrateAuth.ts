/**
 * Migration utility to move from old localStorage auth to Zustand
 * This runs once to migrate existing users
 */

import { useAuthStore } from '@/store/useAuthStore';

export const migrateAuthToZustand = () => {
    if (typeof window === 'undefined') return;

    try {
        // Check if already migrated or if Zustand store has data
        const zustandState = useAuthStore.getState();
        if (zustandState.token && zustandState.user) {
            // Already using Zustand, clean up old localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
        }

        // Try to get old localStorage data
        const oldToken = localStorage.getItem('token');
        const oldUserStr = localStorage.getItem('user');

        if (oldToken && oldUserStr) {
            try {
                const oldUser = JSON.parse(oldUserStr);
                
                // Migrate to Zustand
                useAuthStore.getState().setAuth(oldToken, oldUser);
                
                // Clean up old localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                console.log('Successfully migrated auth data to Zustand');
            } catch (error) {
                console.error('Error parsing old user data:', error);
            }
        }
    } catch (error) {
        console.error('Error during auth migration:', error);
    }
};

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

/**
 * Component that protects routes from unauthenticated access
 * Redirects to login if user is not authenticated
 */
export default function ProtectedRoute({
    children,
    redirectTo = '/login'
}: ProtectedRouteProps) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated();

            if (!authenticated) {
                // User is not authenticated, redirect to login
                router.replace(redirectTo);
            } else {
                // User is authenticated, allow access
                setIsAuthorized(true);
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [router, redirectTo]);

    // Show loading while checking
    if (isChecking || !isAuthorized) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    <p className="mt-4 text-white text-lg">Verifying access...</p>
                </div>
            </div>
        );
    }

    // User is authenticated, show the protected content
    return <>{children}</>;
}

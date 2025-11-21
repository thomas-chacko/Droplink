'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

interface AuthRedirectProps {
    children: React.ReactNode;
    redirectTo?: string;
    redirectIfAuthenticated?: boolean;
}

/**
 * Component that handles authentication-based redirects
 * - If redirectIfAuthenticated is true, redirects authenticated users to redirectTo
 * - Shows a loading state during the check to prevent flash of content
 */
export default function AuthRedirect({
    children,
    redirectTo = '/dashboard',
    redirectIfAuthenticated = true
}: AuthRedirectProps) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Check authentication status
        const checkAuth = () => {
            const authenticated = isAuthenticated();

            if (redirectIfAuthenticated && authenticated) {
                // User is authenticated, redirect to dashboard
                router.replace(redirectTo);
            } else {
                // User is not authenticated or we don't need to redirect
                setIsChecking(false);
            }
        };

        // Run check after component mounts
        checkAuth();
    }, [router, redirectTo, redirectIfAuthenticated]);

    // Show nothing while checking (prevents flash of landing page)
    if (isChecking) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    <p className="mt-4 text-white text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    // User is not authenticated, show the page
    return <>{children}</>;
}

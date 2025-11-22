'use client';

import { useEffect } from 'react';
import { migrateAuthToZustand } from '@/lib/migrateAuth';

/**
 * Component that runs auth migration on app load
 * Migrates old localStorage auth to Zustand store
 */
export default function AuthMigration() {
    useEffect(() => {
        migrateAuthToZustand();
    }, []);

    return null;
}

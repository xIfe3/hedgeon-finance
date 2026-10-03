'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from './api/axiosInstance';

export default function ProtectedLayout({
    children,
    allowedRoles,
}: {
    children: React.ReactNode,
    allowedRoles?: string[],
}) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    const verifyAuth = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const role = localStorage.getItem('user_role');

            // Immediate check for token presence
            if (!token || !role) {
                throw new Error('No authentication tokens found');
            }

            // Role-based access check
            if (allowedRoles && !allowedRoles.includes(role)) {
                router.push('/unauthorized');
                return;
            }

            // Verify token validity with backend
            await axiosInstance.get("protected");

            // Only set authorized if all checks pass
            setAuthorized(true);

        } catch (error) {
            console.error("Authentication error:", error);

            localStorage.removeItem('access_token');
            localStorage.removeItem('user_role');

            router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        }
    }

    useEffect(() => {
        verifyAuth();
    }, []);

    if (!authorized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return <>{children}</>;
}
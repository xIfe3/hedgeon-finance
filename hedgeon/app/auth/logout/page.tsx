'use client';

import React, { useState } from 'react';
import { logoutApi } from '@/app/api/authApi';
import { useRouter } from 'next/navigation';

function LogoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await logoutApi();
            // Clear all user-related data
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_data');
            localStorage.removeItem('session_expiry');

            // Add visual feedback before redirect
            document.documentElement.classList.add('logout-animation');

            router.push('/auth/login');
            router.refresh(); // Clear client-side cache
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Logout failed. Please try again.');
            console.error('Logout error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-blue-900">
            <div className="max-w-md w-full bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 space-y-6 shadow-2xl border border-gray-700 transition-all duration-300 hover:border-gray-600">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 animate-pulse">
                    <svg
                        className="h-8 w-8 text-blue-500 transition-transform duration-300 hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white text-center animate-fade-in">
                        {loading ? 'Securing Your Session...' : 'Ready to Leave?'}
                    </h2>
                    {!loading && (
                        <p className="text-gray-300/90 text-center text-balance">
                            We take security seriously. Confirm logout to ensure your session is completely ended.
                        </p>
                    )}
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-red-300 text-sm">
                        ⚠️ {error}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        disabled={loading}
                        aria-disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 text-white font-medium rounded-lg transition-all transform
              ${loading
                                ? 'bg-blue-400/70 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0'}
              focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-gray-800`}
                        onClick={handleLogout}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Confirm Secure Logout
                            </>
                        )}
                    </button>

                    <button
                        disabled={loading}
                        className="w-full py-2.5 px-4 text-gray-300 hover:text-white font-medium rounded-lg border border-gray-600 hover:border-gray-400
              transition-colors focus:outline-none focus:ring-4 focus:ring-gray-400/20 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
                        onClick={() => router.push('/')}
                        aria-label="Cancel and return to home page"
                    >
                        Stay Logged In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutPage;
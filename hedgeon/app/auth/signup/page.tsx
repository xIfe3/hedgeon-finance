'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { signupApi } from '@/app/api/authApi';
import BreadcrumbsSection from "@/components/public/Breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

interface FormData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

const SignupForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });
    const router = useRouter()
    const { refreshUser } = useUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'password') {
            // Update password validation rules
            setPasswordValidation({
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                lowercase: /[a-z]/.test(value),
                number: /\d/.test(value),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            });
        }

        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const validateForm = () => {
        // Reset errors
        setError(null);

        // Check required fields
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            setError('All fields are required.');
            return false;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Invalid email address.');
            return false;
        }

        // Phone number format validation
        const phoneRegex = /^\+?\d{1,15}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('Invalid phone number. Only digits and optional + sign allowed.');
            return false;
        }

        // Password validation
        const passwordErrors: string[] = [];

        if (!passwordValidation.length) passwordErrors.push('at least 8 characters');
        if (!passwordValidation.uppercase) passwordErrors.push('one uppercase letter');
        if (!passwordValidation.lowercase) passwordErrors.push('one lowercase letter');
        if (!passwordValidation.number) passwordErrors.push('one number');
        if (!passwordValidation.special) passwordErrors.push('one special character');

        if (passwordErrors.length > 0) {
            setError(`Password must contain: ${passwordErrors.join(', ')}`);
            return false;
        }

        return true;
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            // Include recaptchaToken in the signup request
            const response = await signupApi({
                ...formData
            });

            const { accessToken, role } = response.data;

            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('user_role', role);

            setSignupSuccess(true);
            refreshUser();

            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push("/auth/email/verify");
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const CheckIcon = ({ active }) => (
        <svg
            className={`w-4 h-4 mr-2 ${active ? 'text-green-500' : 'text-gray-300'}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <circle cx="12" cy="12" r="11" strokeWidth="2" />
            {active && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4 8-8" />
            )}
        </svg>
    );

    return (
        <section className="space-y-6">
            <BreadcrumbsSection title='Sign Up' />

            <div className="max-w-3xl mx-auto py-16 px-4 h-fit">
                <div className="bg-white rounded-sm p-8 transition-all duration-300 hover:shadow-3xl">
                    <div className="text-center mb-10">
                        <div className="mb-6">
                            <svg className="mx-auto h-12 w-12  text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-extrabold  text-primary mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-500 font-medium">Start your secure journey with us</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        {/* Name Field */}
                        <div className="group">
                            <Label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </Label>
                            <div className="relative">
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder-gray-400 peer"
                                    placeholder="John Doe"
                                    required
                                    autoComplete="name"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 peer-focus:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="group">
                            <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder-gray-400 peer"
                                    placeholder="name@company.com"
                                    required
                                    autoComplete="email"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 peer-focus:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="group">
                            <Label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <Input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder-gray-400 peer"
                                    placeholder="+1 234 567 890"
                                    required
                                    autoComplete="tel"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 peer-focus:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Password Field with Toggle */}
                        <div className="group">
                            <Label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder-gray-400 peer pr-12"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {/* Password Validation Indicators */}
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <CheckIcon active={passwordValidation.length} />
                                    <span className="text-xs text-gray-600">8+ characters</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckIcon active={passwordValidation.uppercase} />
                                    <span className="text-xs text-gray-600">Uppercase letter</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckIcon active={passwordValidation.lowercase} />
                                    <span className="text-xs text-gray-600">Lowercase letter</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckIcon active={passwordValidation.number} />
                                    <span className="text-xs text-gray-600">Number</span>
                                </div>
                                <div className="flex items-center col-span-2">
                                    <CheckIcon active={passwordValidation.special} />
                                    <span className="text-xs text-gray-600">Special character (!@#$%^&*)</span>
                                </div>
                            </div>
                        </div>

                        {/* Alerts */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3 animate-shake"
                            >
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            </motion.div>
                        )}
                        {signupSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-green-50 border border-green-100 rounded-sm flex items-center space-x-3 animate-shake"
                            >
                                <Alert variant="default">
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertTitle>Success</AlertTitle>
                                    <AlertDescription>
                                        Signup successful! Please check your email to verify your account.
                                    </AlertDescription>
                                </Alert>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 px-6 rounded-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-100 flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <span className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>Create Account</span>
                                </span>
                            )}
                        </Button>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors">
                                Login here
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignupForm;
'use client';

import { CheckCircle, Eye, EyeOff, XCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { changePasswordApi } from "@/app/api/userApi";
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface PasswordRequirements {
    isValid: boolean;
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

const ChangePasswordForm = () => {
    const [formData, setFormData] = useState<PasswordData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
        isValid: false,
        hasMinLength: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecialChar: false
    });
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Partial<PasswordData>>({});

    useEffect(() => {
        validatePassword(formData.newPassword);
    }, [formData.newPassword]);

    const validatePassword = (password: string) => {
        const requirements = {
            hasMinLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        };
        setPasswordRequirements({
            ...requirements,
            isValid: Object.values(requirements).every(Boolean)
        });
    };

    const validateForm = () => {
        const newErrors: Partial<PasswordData> = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!passwordRequirements.isValid) {
            newErrors.newPassword = 'Password does not meet requirements';
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmissionStatus('loading');

        try {
            // Simulate API call
            const response = await (await changePasswordApi(formData)).data

            setSubmissionStatus('success');
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSubmissionStatus('idle'), 3000);
        } catch (error) {
            console.log("Error from change password API:", error);
            setSubmissionStatus('error');
            setTimeout(() => setSubmissionStatus('idle'), 3000);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const togglePasswordVisibility = (field: keyof typeof showPassword) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="rounded-md b-6 w-full">

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {/* Current Password */}
                    <div className="relative">
                        <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Current Password
                        </label>
                        <input
                            type={showPassword.current ? "text" : "password"}
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('current')}
                            className="absolute right-2 top-10 text-gray-500"
                        >
                            {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            New Password
                        </label>
                        <input
                            type={showPassword.new ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('new')}
                            className="absolute right-2 top-10 text-gray-500"
                        >
                            {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                        )}
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="text-sm font-semibold mb-2">Password Requirements</h3>
                        <ul className="space-y-1 text-sm">
                            <RequirementItem valid={passwordRequirements.hasMinLength} text="Minimum 8 characters" />
                            <RequirementItem valid={passwordRequirements.hasUppercase} text="At least one uppercase letter" />
                            <RequirementItem valid={passwordRequirements.hasNumber} text="At least one number" />
                            <RequirementItem valid={passwordRequirements.hasSpecialChar} text="At least one special character" />
                        </ul>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('confirm')}
                            className="absolute right-2 top-10 text-gray-500"
                        >
                            {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
                    disabled={submissionStatus === 'loading'}
                >
                    {submissionStatus === 'loading' ? 'Updating...' : 'Change Password'}
                </button>

                {submissionStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-100 rounded-sm flex items-center space-x-3 animate-shake"
                    >
                        <Alert variant="default">
                            <CheckCircle className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                Password updated successfully
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
                {submissionStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3 animate-shake"
                    >
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Current password is incorrect!
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </form>
        </div>
    );
};

const RequirementItem = ({ valid, text }: { valid: boolean; text: string }) => (
    <li className={`flex items-center gap-2 ${valid ? 'text-green-600' : 'text-gray-500'}`}>
        {valid ? <CheckCircle size={16} /> : <XCircle size={16} />}
        <span>{text}</span>
    </li>
);

export default ChangePasswordForm;
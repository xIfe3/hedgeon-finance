'use client'

import { useState } from "react"
import { forgotPasswordApi } from "@/app/api/authApi"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { InfoCircleOutlined } from "@ant-design/icons"
import BreadcrumbsSection from "@/components/public/Breadcrumb";

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: '',
    })
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false)


    async function handleForgotPassword(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)           // reset success state at start

        try {
            await forgotPasswordApi(formData.email)
            setSuccess(true)          // only set true on success
        } catch (error) {
            setSuccess(false)         // explicitly false on error
        } finally {
            setLoading(false)         // always turn loading off, but don’t touch success here
        }
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData(({
            ...formData,
            [name]: value
        }))
    }

    return (
        <section className="bg-gradient-to-br from-gray-50 to-gray-100">
            <BreadcrumbsSection title="Forgot Password" />

            <div className="max-w-3xl mx-auto py-16 px-4 h-fit">
                <div className="bg-white rounded-sm p-8 transition-all duration-300 hover:shadow-3xl">
                    <div className="text-center mb-10">
                        <div className="mb-6">
                            <svg className="mx-auto h-12 w-12  text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <h1 className="text-4xl font-extrabold  text-primary mb-2">
                                Forgot Your Password
                            </h1>
                            <p className="text-gray-500 font-medium">
                                Enter the email address associated with your account and we’ll send you a link to reset your password.
                            </p>

                        </div>

                        <form onSubmit={handleForgotPassword} className="space-y-6">
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


                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-50 border border-green-100 rounded-sm flex items-center space-x-3 animate-shake"
                                >
                                    <Alert variant="default">
                                        <InfoCircleOutlined className="h-4 w-4" />
                                        <AlertTitle>Info</AlertTitle>
                                        <AlertDescription>
                                            If your account exists, you''ll receive an email with instructions to reset your password.
                                        </AlertDescription>

                                    </Alert>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 px-6 rounded-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-100 flex items-center justify-center"
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        <span>Looking for your account...</span>
                                    </div>
                                ) : (
                                    <span className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <span>Submit</span>
                                    </span>
                                )}
                            </Button>

                            <p className="mt-8 text-center text-sm text-gray-600">
                                No account?{' '}
                                <Link href="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors">
                                    Signup here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    )
}
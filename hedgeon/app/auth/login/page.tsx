'use client'

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import BreadcrumbsSection from "@/components/public/Breadcrumb";
import { loginApi } from "@/app/api/authApi"
import { useUser } from "@/context/UserContext"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function Login() {
    return (
        <Suspense fallback={
            <div className="loader"></div>
        }>
            <LoginForm />
        </Suspense>
    )
}

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { refreshUser } = useUser()

    const [loginError, setLoginError] = useState('')
    const [loginSuccess, setLoginSuccess] = useState(false)


    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setLoginError('')

        try {
            const response = await loginApi(formData)
            const { accessToken, role, isVerified } = response?.data

            localStorage.setItem('access_token', accessToken)
            localStorage.setItem('user_role', role)

            setLoginSuccess(true)
            refreshUser();

            await new Promise(resolve => setTimeout(resolve, 1000))
            if (redirect) {
                router.push(redirect);
            }
            else if (role === 'admin') {
                router.push('/admin/dashboard')
            } else if (role === 'user') {
                if (isVerified) router.push('/personal/dashboard')
                else router.push('/auth/email/verify')
            } else {
                setLoginError("Invalid role. Please contact support.")
            }
        } catch (error: any) {
            if (error.status === 404) {
                setLoginError("Account not found! Make sure your login information is correct")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData(({
            ...formData,
            [name]: value
        }))
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Suspense fallback={<div>Loading....</div>}>
            <section className="bg-gradient-to-br from-gray-50 to-gray-100">
                <BreadcrumbsSection title="Login" />

                <div className="max-w-3xl mx-auto py-16 px-4 h-fit">
                    <div className="bg-white rounded-sm p-8 transition-all duration-300 hover:shadow-3xl">
                        <div className="text-center mb-10">
                            <div className="mb-6">
                                <svg className="mx-auto h-12 w-12  text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-extrabold  text-primary mb-2">
                                Log in
                            </h1>
                            <p className="text-gray-500 font-medium">Resume your</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
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

                            <div className="group">
                                <Label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </Label>
                                <div className="relative mb-2">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder-gray-400 peer pr-12"
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
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
                                <Link href="/auth/forgot-password" className="text-right underline hover:text-blue-700">Forgot Password?</Link>
                            </div>


                            {loginError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3 animate-shake"
                                >
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
                                            {loginError}
                                        </AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                            {loginSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-50 border border-green-100 rounded-sm flex items-center space-x-3 animate-shake"
                                >
                                    <Alert variant="default">
                                        <CheckCircle className="h-4 w-4" />
                                        <AlertTitle>Success</AlertTitle>
                                        <AlertDescription>
                                            Login successful! Redirecting to your dashboard. Please Wait....
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
                                        <span>Logging in...</span>
                                    </div>
                                ) : (
                                    <span className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <span>Log In</span>
                                    </span>
                                )}
                            </Button>

                            <p className="mt-8 text-center text-sm text-gray-600">
                                No account?{' '}
                                <a href="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors">
                                    Signup here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </section >
        </Suspense>
    )
}
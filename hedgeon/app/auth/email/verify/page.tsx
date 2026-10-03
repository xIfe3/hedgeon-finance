'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BreadcrumbsSection from "@/components/public/Breadcrumb"
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { verifyEmail, resendEmail } from "@/app/api/authApi"
import { useUser } from "@/context/UserContext"

export default function VerifyEmail() {
    const router = useRouter()
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [verifyError, setVerifyError] = useState('')
    const [verifySuccess, setVerifySuccess] = useState(false)
    const [resendTimer, setResendTimer] = useState(30)
    const [resending, setResending] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer(prev => prev - 1)
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [resendTimer])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setVerifyError('')

        try {
            const response = await verifyEmail(code);
            console.log("RESPONSE", response)

            setVerifySuccess(true)
            await new Promise(res => setTimeout(res, 2000))
            router.push('/personal/dashboard')

        } catch (err) {
            console.log("ERROR OCCURRED IN VERIFY EMAIL:", err)
            setVerifyError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleResendCode = async () => {
        setResending(true)
        try {
            const response = await resendEmail(user?.email!);
            console.log("RESPONSE FROM RESEND EMAIL", response); setResendTimer(30)
        } catch {
            setVerifyError('Unable to resend email. Please try again.')
        } finally {
            setResending(false)
        }
    }

    return (
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <BreadcrumbsSection title="Verify Email" />

            <div className="max-w-xl mx-auto py-20 px-4">
                <div className="bg-white rounded-sm p-8 transition-all duration-300 hover:shadow-3xl text-center">
                    <h1 className="text-3xl font-bold text-primary mb-4">Verify your Email</h1>
                    <p className="text-gray-600 mb-6">Enter the 6-digit code we sent to your email.</p>

                    <form onSubmit={handleSubmit} className="flex items-center flex-col space-y-6">
                        <InputOTP maxLength={6} value={code} onChange={setCode}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        {verifyError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3 animate-shake"
                            >
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{verifyError}</AlertDescription>
                                </Alert>
                            </motion.div>
                        )}

                        {verifySuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-green-50 border border-green-100 rounded-sm flex items-center space-x-3"
                            >
                                <Alert variant="default">
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertTitle>Success</AlertTitle>
                                    <AlertDescription>
                                        Your email has been verified! Redirecting to your dashboard...
                                    </AlertDescription>
                                </Alert>
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading || code.length < 6}
                            className="w-full bg-primary text-white py-3 px-6 rounded-sm font-semibold hover:scale-[1.02] transition-all duration-300"
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                <span>Verify Code</span>
                            )}
                        </Button>

                        <div className="mt-4 text-sm text-gray-600">
                            {resendTimer > 0 ? (
                                <p>Resend available in <span className="font-semibold">{resendTimer}s</span></p>
                            ) : (
                                <Button
                                    type="button"
                                    variant="link"
                                    disabled={resending}
                                    onClick={handleResendCode}
                                    className="text-primary hover:underline"
                                >
                                    {resending ? "Resending..." : "Resend Code"}
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

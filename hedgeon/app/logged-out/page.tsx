'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { RocketIcon, UserIcon } from "lucide-react";

function LoggedOutPage() {
    return (
        <section className="min-h-screen w-full bg-gray-950 overflow-hidden flex flex-col items-center justify-center relative">
            {/* Space background */}
            <div className="absolute inset-0 z-0">
                {/* Nebula effect */}
                <div className="absolute w-[800px] h-[800px] -top-1/2 -left-1/3 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute w-[800px] h-[800px] -bottom-1/2 -right-1/3 bg-gradient-to-l from-cyan-400/10 to-transparent rounded-full blur-3xl" />

                {/* Stars */}
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full animate-star"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: `${Math.random() * 0.8 + 0.2}`,
                            animationDuration: `${Math.random() * 3 + 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-md px-4">
                <div className="flex justify-center mb-6">
                    <RocketIcon className="h-16 w-16 text-primary" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                    You've Logged Out
                </h1>

                <p className="text-gray-400 mb-8 leading-relaxed">
                    Your financial journey continues. Your account is securely signed out.
                    Return anytime to continue exploring the financial cosmos.
                </p>

                <div className="space-y-4">
                    <Button
                        asChild
                        className="bg-gradient-to-r from-primary to-cyan-400 text-gray-900 w-full py-6 text-lg"
                    >
                        <Link href="/auth/login">
                            <UserIcon className="h-5 w-5 mr-2" />
                            Sign Back In
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="border-gray-700 text-gray-700 hover:bg-gray-800/50 w-full py-6 text-lg"
                    >
                        <Link href="/">
                            Return to Home
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 pt-6 border-t border-gray-800">
                    <p className="text-gray-500 text-sm">
                        Securely logged out • {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                        Hedgeon Finance • Secure Financial Platform
                    </p>
                </div>
            </div>
        </section>
    );
}

export default LoggedOutPage;
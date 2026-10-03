'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="relative min-h-screen w-full bg-gray-950 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute w-[800px] h-[800px] -top-1/2 -left-1/3 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute w-[800px] h-[800px] -bottom-1/2 -right-1/3 bg-gradient-to-l from-cyan-400/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center py-24">
                <div className="max-w-7xl mx-auto px-4 xl:px-0 w-full">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        {/* Animated 404 number */}
                        <div className="relative inline-block" data-aos="zoom-in">
                            <h1 className="text-[180px] md:text-[240px] font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                                404
                            </h1>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-10 blur-3xl -z-10" />
                        </div>

                        {/* Main content */}
                        <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-100">
                                Lost in Space?
                            </h2>

                            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                The page you're looking for seems to have drifted out of orbit.
                                Don't worry - our mission control team is on it. Let's get you
                                back to safety.
                            </p>

                            {/* Interactive planet illustration */}
                            <div className="relative w-64 h-64 mx-auto mt-12" data-aos="zoom-in">
                                <div className="absolute inset-0 animate-float">
                                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="100" cy="100" r="80" fill="none" strokeWidth="2" className="stroke-primary/30" />
                                        <circle cx="100" cy="100" r="60" fill="none" strokeWidth="2" className="stroke-cyan-400/30" />
                                        <path
                                            d="M40,100 Q100,40 160,100 Q100,160 40,100"
                                            fill="none"
                                            strokeWidth="2"
                                            className="stroke-white/10"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="140" cy="60" r="12" className="fill-primary animate-pulse" />
                                        <circle cx="60" cy="140" r="8" className="fill-cyan-400 animate-pulse" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-primary to-cyan-400 rounded-full animate-pulse opacity-20" />
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="mt-12" data-aos="fade-up" data-aos-delay="300">
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-cyan-400 rounded-lg text-gray-900 font-semibold hover:scale-[1.02] transition-transform duration-300 group"
                                >
                                    <span>Return to Home Base</span>
                                    <svg
                                        className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </Link>
                            </div>

                            {/* Additional navigation */}
                            <div className="mt-8 flex flex-wrap justify-center gap-4 text-gray-400" data-aos="fade-up" data-aos-delay="400">
                                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
                                <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link>
                                <Link href="/services" className="hover:text-primary transition-colors">Our Services</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating stars animation */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full animate-star"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        </section>
    )
}

'use client'

import { ArrowRight, Check, Download } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPlansApi } from './api/planApi';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas'
import { FiCheckCircle } from 'react-icons/fi'
import Testimonials from '@/components/public/Home/Testimonials'
import LatestNews from '@/components/public/Home/LatestNews'
import Faqs from '@/components/public/Home/Faqs'
import ContactSection from '@/components/public/Home/Contact'
import PartnersSection from '@/components/public/Home/Partners'


function Home() {
    const features = [
        "Expert Investment Management",
        "Transparent Performance Tracking",
        "Real-Time ROI Monitoring",
        "Secure Crypto Transactions",
        "Diversified Portfolio Options",
        "24/7 Support & Consultation"
    ];

    const [plans, setPlans] = useState<any[]>([])

    const fetchPlans = async () => {
        const response = await getPlansApi();
        console.log("Plans Response from api", response)
        setPlans(response.data['plans']);
    }

    useEffect(() => {
        fetchPlans();
    }, [])

    const getButtonText = (plan) => {
        switch (plan.name) {
            case 'Trial Package':
                return 'Try Now & Upgrade Later'
            case 'Basic Package':
                return 'Start with Basic'
            case 'Standard Package':
                return 'Go Standard '
            case 'Premium Package':
                return 'Go Premium'
            default:
                return `Go ${plan.name}`;
        }
    }

    const investmentFeatures = [
        {
            title: "Proven Investment Strategies",
            description:
                "We combine fundamental and technical analysis to ensure high returns with controlled risk exposure.",
            aosDelay: 300,
        },
        {
            title: "Expert Fund Management",
            description:
                "Our team consists of top-tier financial analysts, hedge fund managers, and market strategists who navigate market volatility with precision.",
            aosDelay: 400,
        },
        {
            title: "Comprehensive Portfolio Management",
            description:
                "We offer access to forex, stocks, hedge funds, real estate, and alternative investments all under one trusted firm.",
            aosDelay: 500,
        },
        {
            title: "Secure & Transparent Transactions",
            description:
                "Our robust security measures, escrow systems, and smart contract integration ensure financial safety and transparency.",
            aosDelay: 600,
        },
        {
            title: "Tailored Investment Plans",
            description:
                "We customize strategies to match our clients’ risk appetite, financial goals, and investment timeline.",
            aosDelay: 700,
        },
        {
            title: "Innovative Merchant Program",
            description:
                "We provide unique earning opportunities by allowing verified merchants to facilitate crypto transactions while ensuring fund security.",
            aosDelay: 800,
        },
    ];

    const fundTypes = ['Equity funds', 'Growth and Value Funds', 'Large - Cap and Small - Cap Funds', 'Bond Fund', 'Foreign Stocks Funds', 'Money Market Funds', 'Sector Funds & Asset Allocation Funds) & IPOs']


    return (
        <>
            <section className="relative min-h-screen w-full overflow-hidden bg-gray-900 py-26">
                {/* Animated background elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-primary/20" />

                    {/* Floating shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute w-[300px] h-[300px] bg-primary/10 rounded-full -top-32 -left-32 mix-blend-screen animate-pulse-slow" />
                        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-primary/20 to-transparent rounded-full -bottom-48 -right-48 animate-pulse-slower" />
                        <div className="absolute w-[250px] h-[250px] bg-cyan-400/10 rounded-full top-1/4 right-1/4 mix-blend-screen animate-pulse-medium" />
                        <div className="absolute w-[350px] h-[350px] bg-gradient-to-b from-cyan-400/10 to-transparent rounded-full bottom-0 left-1/4 animate-pulse-slow" />
                    </div>

                    {/* Grid overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.svg')] bg-[length:40px_40px]" />
                </div>

                <div className="relative z-10 min-h-screen flex flex-col justify-center pt-16 pb-24">
                    <div className="max-w-7xl mx-auto px-4 xl:px-0 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            {/* Left Content Column */}
                            <div className="lg:col-span-5 space-y-8">
                                {/* Subheading */}
                                <div className="flex items-center gap-4" data-aos="fade-up" data-aos-delay="100">
                                    <div className="w-12 h-0.5 bg-primary animate-pulse" />
                                    <p className="text-lg font-semibold tracking-wide text-primary bg-gradient-to-r from-primary/30 to-transparent px-4 py-1 rounded-l-full">
                                        SMART INVESTING
                                    </p>
                                </div>

                                {/* Main Heading */}
                                <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white"
                                    data-aos="fade-up" data-aos-delay="200">
                                    <span className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                                        Future-Focused
                                    </span>{' '}
                                    Wealth Solutions
                                </h1>

                                {/* Description */}
                                <p className="text-xl text-gray-200 leading-relaxed"
                                    data-aos="fade-up" data-aos-delay="300">
                                    Hedgeon Finance is a premier fund management and asset investment firm committed to delivering strategic, data-driven, and high-yield investment solutions. With expertise spanning Hedge funds, Mutual funds, Forex, Stocks, Crypto and Real estate, we provide tailored investment opportunities designed to maximize wealth while minimizing risk.
                                </p>

                                {/* Features List */}
                                <div className="grid grid-cols-2 gap-4 pt-4" data-aos="fade-up" data-aos-delay="350">
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">AI-Powered Analytics</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">Global Opportunities</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">Tax Optimization</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">Risk Management</span>
                                    </div>
                                </div>

                                {/* Stats Container */}
                                <div className="flex gap-8 py-6" data-aos="fade-up" data-aos-delay="350">
                                    <div className="flex flex-col">
                                        <div className="text-3xl font-bold text-primary">15+</div>
                                        <div className="text-gray-300">Years Experience</div>
                                    </div>
                                    <div className="h-12 w-px bg-gray-600/50" />
                                    <div className="flex flex-col">
                                        <div className="text-3xl font-bold text-primary">$4.2B+</div>
                                        <div className="text-gray-300">Assets Managed</div>
                                    </div>
                                    <div className="h-12 w-px bg-gray-600/50" />
                                    <div className="flex flex-col">
                                        <div className="text-3xl font-bold text-primary">97%</div>
                                        <div className="text-gray-300">Client Retention</div>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-4 pt-4" data-aos="fade-up" data-aos-delay="400">
                                    <Link
                                        href="/auth/signup"
                                        className="relative inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 rounded-lg text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <span>Get Started Now</span>
                                        <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>

                                    <Link
                                        href="/about"
                                        className="relative inline-flex items-center justify-center px-8 py-4 text-gray-300 hover:text-white font-medium rounded-lg border-2 border-gray-600 hover:border-primary/50 hover:bg-gray-900/30 transition-all duration-300 group"
                                    >
                                        <span>Explore Strategies</span>
                                        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </div>

                            {/* Center Graphic Column */}
                            <div className="lg:col-span-7 relative">
                                <div className="relative z-10">
                                    <div className="bg-gradient-to-br from-primary/20 to-cyan-400/10 border border-gray-700/50 rounded-2xl backdrop-blur-sm p-6">
                                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                                            <div className="h-6 bg-gray-800 border-b border-gray-700 flex items-center px-4">
                                                <div className="flex space-x-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                {/* Chart visualization */}
                                                <div className="h-64 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg relative overflow-hidden">
                                                    {/* Chart lines */}
                                                    <div className="absolute inset-0 flex items-end">
                                                        {[30, 50, 70, 40, 80, 60, 90, 50, 70, 60].map((height, index) => (
                                                            <div
                                                                key={index}
                                                                className={`flex-1 mx-0.5 bg-gradient-to-t ${index === 6 ? 'from-cyan-500 to-cyan-400' : 'from-primary to-primary/70'} rounded-t`}
                                                                style={{ height: `${height}%` }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                    {/* Growth indicator */}
                                                    <div className="absolute top-4 right-4 bg-green-900/30 text-green-400 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                                        </svg>
                                                        +24.3% YTD
                                                    </div>
                                                </div>

                                                {/* Performance indicators */}
                                                <div className="grid grid-cols-3 gap-4 mt-6">
                                                    {[
                                                        { name: 'Portfolio Value', value: '$142,850', change: '+2.4%' },
                                                        { name: 'Today\'s Gain', value: '+$3,420', change: '+1.2%' },
                                                        { name: 'Risk Level', value: 'Balanced', change: 'Optimal' }
                                                    ].map((item, index) => (
                                                        <div key={index} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                                            <div className="text-gray-400 text-sm">{item.name}</div>
                                                            <div className="text-white font-medium mt-1">{item.value}</div>
                                                            <div className={`text-xs mt-1 ${index !== 2 ? 'text-green-400' : 'text-cyan-400'}`}>{item.change}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating cards */}
                                    <div className="absolute -bottom-6 -left-6 z-0" data-aos="fade-right" data-aos-delay="500">
                                        <div className="bg-gradient-to-br from-cyan-500/10 to-primary/10 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-5 w-64 shadow-lg">
                                            <div className="flex items-center">
                                                <div className="bg-cyan-500/10 p-2 rounded-lg">
                                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-gray-300 text-sm">Diversification</div>
                                                    <div className="text-white font-medium">12 Industries</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute -top-6 -right-6 z-0" data-aos="fade-left" data-aos-delay="500">
                                        <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 backdrop-blur-sm border border-primary/30 rounded-xl p-5 w-64 shadow-lg">
                                            <div className="flex items-center">
                                                <div className="bg-primary/10 p-2 rounded-lg">
                                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-gray-300 text-sm">AI Predictions</div>
                                                    <div className="text-white font-medium">92% Accuracy</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Client Logos */}
                    <div className="max-w-7xl mx-auto px-4 xl:px-0 w-full mt-16 pt-8 border-t border-gray-800" data-aos="fade-up" data-aos-delay="600">
                        <div className="text-center text-gray-500 text-sm mb-6">TRUSTED BY INDUSTRY LEADERS</div>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                            {[
                                {
                                    name: "Forbes",
                                    logo: "/images/logos/forbes.png",
                                    width: 120,
                                    height: 32
                                },
                                {
                                    name: "Bloomberg",
                                    logo: "/images/logos/bloomberg.png",
                                    width: 150,
                                    height: 32
                                },
                                {
                                    name: "Wall Street Journal",
                                    logo: "/images/logos/wsj.webp",
                                    width: 160,
                                    height: 32
                                },
                                {
                                    name: "McKinsey",
                                    logo: "/images/logos/mckinsey.webp",
                                    width: 130,
                                    height: 32
                                },
                                {
                                    name: "The Economist",
                                    logo: "/images/logos/economist.png",
                                    width: 150,
                                    height: 32
                                }
                            ].map((company, index) => (
                                <div
                                    key={index}
                                    className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                                    title={company.name}
                                >
                                    <Image
                                        src={company.logo}
                                        alt={company.name}
                                        width={company.width}
                                        height={company.height}
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scrolling indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20" data-aos="fade-up" data-aos-delay="700">
                    <div className="animate-bounce w-8 h-14 rounded-full border-2 border-gray-400 flex items-center justify-center">
                        <div className="w-1 h-3 bg-gray-400 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Floating particles */}
                {[...Array(150)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-primary animate-float"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            animationDuration: `${Math.random() * 10 + 10}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center px-4">
                    <div
                        className="bg-white p-6 rounded-xl shadow-sm"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    >
                        <p className="text-4xl font-bold text-blue-900 mb-2">$2.1B+</p>
                        <p className="text-gray-600">Assets Under Management</p>
                    </div>
                    <div
                        className="bg-white p-6 rounded-xl shadow-sm"
                        data-aos="flip-left"
                        data-aos-delay="200"
                    >
                        <p className="text-4xl font-bold text-green-500 mb-2">18.7%</p>
                        <p className="text-gray-600">Average Annual Returns</p>
                    </div>
                    <div
                        className="bg-white p-6 rounded-xl shadow-sm"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <p className="text-4xl font-bold text-blue-900 mb-2">94%</p>
                        <p className="text-gray-600">Positive Performance Months</p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div
                            className="space-y-5 w-full"
                            data-aos="fade-left"
                            data-aos-delay="200"
                            data-aos-duration="1000"
                        >
                            <h1 className="text-4xl text-primary">
                                Welcome To Hedgeon Finance
                            </h1>
                            <p>
                                Created in 2001, Our aim is to help others achieve their
                                aim in life, we saw the opportunity to help others and we took it, and so are we passionate about it.
                                Investments are life-savers and shouldn’t be rejected by anyone, you’re helping yourself and no one
                                else, this goes to answer the question of “why do I invest?”
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2 mb-4"
                                        data-aos="zoom-in-up"
                                        data-aos-delay={index * 100 + 300}
                                    >
                                        <div className="bg-blue-100 rounded-full p-2">
                                            <div className="bg-blue-700 w-3 h-3 rounded-full animate-pulse"></div>
                                        </div>
                                        <p className="text-sm">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="relative w-full"
                            data-aos="fade-right"
                            data-aos-duration="800"
                        >
                            <Image
                                src="/images/about.jpg"
                                alt="James P. Morrison"
                                className="rounded-lg shadow-xl h-full w-full"
                                height={500}
                                width={400}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 md:py-24"
                data-aos="fade-up"
                data-aos-duration="800"
            >
                <div className="max-w-6xl mx-auto px-4 xl:px-0 space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-primary/20 pb-6"
                        data-aos="fade-down"
                        data-aos-delay="200"
                    >
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-2xl font-bold text-primary-dark mb-2 relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-primary">
                                Our Expertise
                            </h4>
                        </div>

                        <Link href="/auth/signup" className="flex rounded-full px-8 py-2 items-center bg-primary text-white hover:bg-[#30D0B3] duration-300">
                            Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>

                    {/* Title Section */}
                    <div className="w-full md:w-4/5 space-y-4"
                        data-aos="fade-right"
                        data-aos-delay="300">
                        <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Hedgeon Finance?</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Empowering your financial future through innovative solutions and decades of market expertise.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {investmentFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                                data-aos="fade-up"
                                data-aos-delay={feature.aosDelay}
                                data-aos-duration="600"
                            >
                                <div className="p-6 bg-white relative rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-b from-gray-100/50 to-white py-16 lg:py-24 relative overflow-hidden" data-aos="fade-up">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* Text Content */}
                        <div className="relative space-y-6">
                            <div className="absolute -left-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>

                            <div className="space-y-4">
                                <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase" data-aos="fade-up" data-aos-delay="100">
                                    How We Work
                                </span>
                                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight" data-aos="fade-right" data-aos-delay="300">
                                    Pioneering Investment Management Excellence
                                </h2>
                                <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-secondary mb-6"></div>
                                <p className="text-lg text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="500">
                                    Leveraging cutting-edge strategies and decades of expertise, we deliver tailored financial solutions that drive sustainable growth and maximize returns.
                                </p>
                            </div>

                            {/* Enhanced CTA Button */}
                            <Link
                                href="#"
                                className="inline-flex items-center group font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
                                data-aos="fade-up" data-aos-delay="500"
                            >
                                <span className="mr-3">Explore Our Methodology</span>
                                <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </Link>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-6 pt-8">
                                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100/50" data-aos="fade-right" data-aos-delay="600">
                                    <div className="text-2xl font-bold text-gray-900">15+</div>
                                    <div className="text-sm text-gray-600 mt-1">Years Experience</div>
                                </div>
                                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100/50" data-aos="fade-left" data-aos-delay="600">
                                    <div className="text-2xl font-bold text-gray-900">$4.2B+</div>
                                    <div className="text-sm text-gray-600 mt-1">Assets Managed</div>
                                </div>
                            </div>
                        </div>

                        {/* Image/Content Placeholder */}
                        <div className="relative aspect-video bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl shadow-lg overflow-hidden"
                            data-aos="fade-left" data-aos-delay="800">
                            {/* Add your image here */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400"
                            >
                                <Image
                                    src="/images/how-we-work.jpg"
                                    alt="How we work"
                                    className="rounded-lg shadow-xl h-full w-full"
                                    height={500}
                                    width={400}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12 mb-12">
                        {/* Image Column */}
                        <div className="w-full lg:w-7/12" data-aos="fade-left"
                            data-aos-delay="100">
                            <div className="relative rounded-2xl overflow-hidden">
                                <Image
                                    src="/images/affiliate.png"
                                    alt="Hedgeon Community Platform"
                                    className="rounded-lg shadow-xl h-full w-full"
                                    height={300}
                                    width={400}
                                />
                            </div>
                        </div>

                        {/* Text Content Column */}
                        <div className="w-full lg:w-5/12">
                            <div className="space-y-4">
                                <div className="flex space-x-4 items-center"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div className="w-16 h-1 bg-primary"></div>
                                    <span className="text-md font-semibold text-primary-600 uppercase tracking-wide">
                                        At Hedgeon Community
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-4xl font-bold text-gray-900 leading-tight"
                                    data-aos="fade-up"
                                    data-aos-delay="200">
                                    Earn more than just commission
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed"
                                    data-aos="fade-up"
                                    data-aos-delay="300">
                                    Join thousands of affiliates from across the globe and access exclusive opportunities while earning competitive referral commissions, and elevating yourselves as leaders in the industry.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Safe & Secure Transactions", color: "green", fade: 'right', delay: 100 },
                            { title: "Encrypted and Kept Private", color: "blue", fade: 'up', delay: 200 },
                            { title: "Multiple Payment Gateway", color: "yellow", fade: 'down', delay: 300 },
                            { title: "KYC Verification", color: "purple", fade: 'left', delay: 400 },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                data-aos={`fade-${feature.fade}`}
                                data-aos-delay={feature.delay}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`flex-shrink-0 w-12 h-12 p-3 rounded-full flex items-center justify-center bg-${feature.color}-100`}>
                                        <div className={`p-2 rounded-full border-2 border-${feature.color}-700 font-bold text-${feature.color}-700`}>
                                            <Check />
                                        </div>
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section className="bg-gray-60 py-12" data-aos="fade-up">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center space-y-2 mb-14" data-aos="fade-up" data-aos-delay="100">
                        <h4 className="text-primary font-semibold text-xl">Our Pricing</h4>
                        <h2 className="text-2xl md:text-4xl font-semibold text-center">
                            Featured investment opportunities
                        </h2>
                        <p className='text-center text-sm md:text-md w-full md:w-3/5 mx-auto'>
                            Explore our curated selection of investment plans designed to suit every financial goal. Whether you're a beginner or a seasoned investor, our flexible packages offer competitive returns, transparent fees, and expert management to help you grow and protect your wealth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {plans.map((plan, index) => (
                            <div
                                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl overflow-hidden"
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Glowing border effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative p-5 sm:p-6 md:p-8 space-y-5">
                                    {/* Plan Header */}
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                                {plan?.name}
                                            </h3>
                                            <p className="text-sm text-slate-400 mt-1">Investment Plan</p>
                                        </div>
                                        <span className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs sm:text-sm border border-cyan-400/20 w-max self-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Active
                                        </span>
                                    </div>

                                    {/* ROI Section */}
                                    <div className="pb-4 border-b border-slate-700/50 relative">
                                        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                            {plan?.estimatedROI}%
                                        </p>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                            <p className="text-sm text-slate-400">Monthly ROI</p>
                                            <span className="text-xs bg-green-400/10 text-green-400 px-2 py-1 rounded-full w-max">
                                                +{plan?.bonus}% bonus
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stats Grid - Improved for mobile */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                                        {/* Investment Range - Stacked on mobile */}
                                        <div className="space-y-1 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-400/30 transition-colors">
                                            <div className="text-sm text-slate-400 flex items-center gap-2 mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Investment Range
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                                <p className="font-mono text-base md:text-lg text-slate-200">
                                                    ${formatNumberWithCommas(plan?.minAmount)}
                                                </p>
                                                <span className="hidden md:inline mx-1">-</span>
                                                <span className="md:hidden text-xs text-slate-500">to</span>
                                                <p className="font-mono text-base md:text-lg text-slate-200">
                                                    ${formatNumberWithCommas(plan?.maxAmount)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-1 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-400/30 transition-colors">
                                            <div className="text-sm text-slate-400 flex items-center gap-2 mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Duration
                                            </div>
                                            <p className="font-mono text-base md:text-lg text-slate-200">
                                                {plan?.minDuration} - {plan?.maxDuration} {plan.durationType}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Benefits List */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-semibold text-cyan-400 tracking-wide">
                                            ✨ Key Benefits
                                        </h4>
                                        <ul className="grid grid-cols-1 gap-2">
                                            {plan.benefits.map((benefit, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start p-3 rounded-lg bg-slate-800/20 hover:bg-slate-800/40 transition-colors cursor-pointer group/benefit"
                                                >
                                                    <FiCheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 mr-3 flex-shrink-0 transition-transform group-hover/benefit:scale-110" />
                                                    <span className="text-sm text-gray-300 group-hover/benefit:text-slate-50 transition-colors">
                                                        {benefit}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <div className="pt-4">
                                        <Link
                                            href={`/personal/explore/invest/${plan._id}`}
                                            className="w-full inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/30 text-sm md:text-base"
                                        >
                                            <span>{getButtonText(plan)}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 -mr-1 animate-bounce-x" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50" id="document">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Heading */}
                    <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
                        <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                            Documents
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            Read Our Documents
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Here are our full documents to help you understand us better.
                        </p>
                    </div>

                    {/* Documents Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Terms of Sale",
                                fileType: "PDF",
                                image: "/images/terms-of-sale.png",
                                link: "The terms of sales governing Hedgeon Finance.pdf",
                                fade: 'right',
                                delay: 200
                            },
                            {
                                title: "White Paper",
                                fileType: "PDF",
                                image: "/images/white-paper.png",
                                link: "Hedgeon Finance white paper.pdf",
                                fade: 'down',
                                delay: 400
                            },
                            {
                                title: "Privacy & Policy",
                                fileType: "PDF",
                                image: "/images/privacy-policy.png",
                                link: "Hedgeon Finance privacy policy pg.pdf",
                                fade: 'left',
                                delay: 600
                            }
                        ].map((doc, index) => (
                            <div key={index}
                                data-aos={`fade-${doc.fade}`}
                                data-aos-delay={doc.delay}
                            >
                                <Image
                                    src={doc.image}
                                    alt={doc.title}
                                    className="object-contain rounded-sm mx-auto"
                                    width={100}
                                    height={200}
                                />
                                <div className="py-5 flex items-center justify-center space-x-5">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                                        <span className="text-sm text-gray-500">{doc.fileType}</span>
                                    </div>
                                    <Link
                                        href={doc.link}
                                        download
                                        className="ml-4 p-3 bg-gray-100 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                                        aria-label={`Download ${doc.title}`}
                                    >
                                        <Download />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Testimonials />

            <LatestNews />

            <Faqs />

            <ContactSection />

            <PartnersSection />
        </>
    )
}

export default Home
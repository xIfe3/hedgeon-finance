import BreadcrumbsSection from '@/components/public/Breadcrumb'
import Faqs from '@/components/public/Home/Faqs'
import {
    Check, TrendingUp, Globe, BarChart, ArrowRight, Target, Eye, ShieldCheck, Cpu, User,
    Activity, Leaf, Lock, Sparkles, Rocket,
    Shield,
    CheckCircle,
    Star,
    HeartHandshake,
    Zap,
    Users
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
function About() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="About Us"
            />

            {/* Company Overview */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Text Content */}
                        <div className="space-y-8 relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100/50 rounded-full blur-xl"></div>

                            <div className="space-y-4">
                                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                                    Trusted Since 2001
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    Pioneering Smarter <br className="hidden md:block" />
                                    <span className="text-primary">Wealth Management</span>
                                </h2>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-white p-6 rounded-lg border-l-4 border-primary shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Founding Vision</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Established in 2001, Hedgeon Finance was built on the principle that everyone deserves
                                        access to intelligent investment strategies. We democratize wealth management through...
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900">Global Reach</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Serving clients across 35+ countries with localized strategies and 24/7 support.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900">Secure & Regulated</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Fully compliant with SEC, FCA, and CySEC regulations. Your security is our priority.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-semibold text-gray-900">Innovation Through Technology</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        We combine financial expertise with AI-driven analytics to identify opportunities and
                                        mitigate risks in real-time. Our proprietary platform offers:
                                    </p>
                                    <ul className="grid gap-3 sm:grid-cols-2">
                                        <li className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-primary" />
                                            <span className="text-gray-600">Predictive market analytics</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-primary" />
                                            <span className="text-gray-600">Portfolio stress-testing</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-primary" />
                                            <span className="text-gray-600">Customizable risk profiles</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-primary" />
                                            <span className="text-gray-600">Real-time performance tracking</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-xl">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Client-Centric Approach</h3>
                                    <p className="text-gray-600 leading-relaxed italic">
                                        "Our success is measured by your financial milestones. We develop personalized strategies
                                        through in-depth consultations, ensuring alignment with your unique goals."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card - Keep existing improvements */}
                        <div className="bg-gradient-to-br from-primary to-indigo-600 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                            <h3 className="text-2xl font-bold text-white mb-8">By The Numbers</h3>
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white text-primary p-3 rounded-lg">
                                            <TrendingUp className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-white">20+</p>
                                            <p className="text-gray-200">Years Experience</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white text-primary p-3 rounded-lg">
                                            <Globe className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-white">10k+</p>
                                            <p className="text-gray-200">Global Clients</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white text-primary p-3 rounded-lg">
                                            <BarChart className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-white">$15B+</p>
                                            <p className="text-gray-200">Assets Managed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="relative py-20 md:py-28 bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/graph-pattern.svg')" }}></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        <div className="bg-white/5 p-8 lg:p-12 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-green-400/10 p-4 rounded-xl">
                                    <Target className="w-8 h-8 text-green-400" />
                                </div>
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                    Our Mission
                                </h3>
                            </div>
                            <p className="text-lg text-gray-200 leading-relaxed">
                                At Hedgeon Finance, our mission is clear: to empower our clients with exceptional investment
                                opportunities, intelligent risk management, and sustainable wealth-building strategies. We are
                                committed to helping our investors achieve their financial goals through expert guidance, innovative
                                solutions, and a disciplined approach to fund management.
                            </p>
                        </div>

                        <div className="bg-white/5 p-8 lg:p-12 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-blue-400/10 p-4 rounded-xl">
                                    <Eye className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Our Vision
                                </h3>
                            </div>
                            <p className="text-lg text-gray-200 leading-relaxed">
                                To be the leading global investment management firm, transforming financial futures through
                                cutting-edge investment strategies, client-focused solutions, and long-term wealth creation.
                                We envision a future where Hedgeon Finance is synonymous with trust, performance, and
                                innovation in fund management.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 md:py-28 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-semibold mb-4">
                            Philosophy
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Foundational principles driving our relentless pursuit of financial innovation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Integrity & Transparency',
                                desc: 'We operate with honesty and openness, ensuring that every investment decision aligns with the best interests of our clients',
                                icon: ShieldCheck,
                                color: 'text-green-500'
                            },
                            {
                                title: 'Strategic Growth',
                                desc: ' We focus on long-term wealth accumulation while minimizing risks through smart, data- backed investment choices',
                                icon: Cpu,
                                color: 'text-purple-500'
                            },
                            {
                                title: 'Client-Centric Approach',
                                desc: 'Our clients are at the heart of everything we do. We customize investment strategies to fit unique financial needs',
                                icon: User,
                                color: 'text-blue-500'
                            },
                            {
                                title: 'Risk Management',
                                desc: 'With hedging techniques and diversified portfolios, we protect assets while optimizing returns',
                                icon: Activity,
                                color: 'text-red-500'
                            },
                            {
                                title: 'Innovation & Excellence',
                                desc: 'We integrate the latest financial technologies and market research to stay ahead of industry trends',
                                icon: Leaf,
                                color: 'text-emerald-500'
                            },
                        ].map((value, idx) => (
                            <div
                                key={idx}
                                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
                            >
                                <div className={`mb-6 ${value.color}`}>
                                    <value.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Differentiators */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-semibold mb-4">
                            What Sets Us Apart
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Strategic Pillars
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Client Focus Card */}
                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-primary hover:shadow-lg transition-all">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Client Focus</h3>
                            <p className="text-gray-600 mb-6">
                                At Hedgeon Finance, our clients are our greatest asset. We prioritize customer satisfaction,
                                financial security, and personalized investment solutions to ensure that each investor
                                experiences growth, stability, and trust in their financial journey
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-gray-600">Personalized Wealth Management</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-gray-600">Dedicated Relationship Managers</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-gray-600">Real-Time Market Insights</span>
                                </div>
                            </div>
                        </div>

                        {/* Execution Orientation Card */}
                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-blue-500 hover:shadow-lg transition-all">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                    <Rocket className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Execution Excellence</h3>
                            <p className="text-gray-600 mb-6">
                                We believe in results-driven performance backed by a disciplined execution process. Our fund
                                management approach includes:
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600">Market Analysis & Research</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600">Risk Mitigation Strategies</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600">Proactive Investment Adjustments</span>
                                </div>
                            </div>
                        </div>

                        {/* Culture & Principles Card */}
                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-green-500 hover:shadow-lg transition-all">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                                    <HeartHandshake className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Culture & Principles</h3>
                            <p className="text-gray-600 mb-6">
                                Hedgeon Finance fosters a culture of innovation, collaboration, and client empowerment. Our
                                principles are rooted in:
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600">Commitment to Excellence</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600">Ethical Investment Practices</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600">Continuous Learning & Adaptation</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Get in Touch CTA */}
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                            Ready for First-Class Financial Strategy?
                        </h3>
                        <Link href="/contact-us" className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all hover:shadow-lg">
                            Get in Touch
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <Faqs />
        </div>
    )
}


export default About

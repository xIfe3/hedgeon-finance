import BreadcrumbsSection from '@/components/public/Breadcrumb'
import React from 'react'
import {
    PieChart, Check, ArrowRight, Briefcase, Building2,
    DollarSign,
} from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'

function page() {
    const whyPMSItems = [
        {
            title: 'Dedicated Portfolio Composition', description: 'Client’s portfolio is managed individually as per investment goals'
        },
        {
            title: 'Monitoring/ Swift decision making', description: 'There is no need for investor to follow the market fluctuations on continuous basis'
        },
        {
            title: 'Flexibility', description: 'Complete flexibility to Switch between equity or debt or liquid funds'
        },
        {
            title: 'Control & Transparency', description: 'Access to back office gives absolute information on the portfolio and transactions.'
        },
        {
            title: 'Knowledge Sharing', description: 'Better interaction with fund management team provides regular updates on the changing dynamics of the equity markets'
        },
        {
            title: 'Ownership', description: 'All transactions done in the client’s account so ownership remains with client'
        },
    ]

    const fundTypes = ['Equity funds', 'Growth and Value Funds', 'Large - Cap and Small - Cap Funds', 'Bond Fund', 'Foreign Stocks Funds', 'Money Market Funds', 'Sector Funds & Asset Allocation Funds) & IPOs']

    const merchantServices = [
        {
            title: 'Crypto Brokerage Service',
            description: 'Verified merchants can help investors buy and sell crypto, earning commissions while ensuring transaction security.'
        },
        {
            title: 'Business Loans & Credit Facilities',
            description: 'Loans are offered for entrepreneurs and businesses using their investment portfolios as collateral.'
        }
    ]

    const copyTrading = [
        {
            title: 'Copy Trading',
            description: 'Automatically replicate trades of our expert traders in real-time—ideal for both novice investors and busy professionals.'
        },
        {
            title: 'Trading Signal Subscription',
            description: 'Receive daily and weekly market signals with actionable trade setups for forex, stocks, and crypto. Get clear entry, exit, and stop loss levels along with detailed market insights and strategy reports.'
        },
    ]

    const realEstateBenefits = [
        'Earn passive income through rental yields',
        'Capital appreciation as property values increase',
        'Hands-off management – we handle property acquisition, tenant management, and maintenance.'
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="Services"
            />

            <section className="space-y-24 py-20 bg-gradient-to-b from-slate-950 via-sky-950 to-indigo-950">
                <div className="max-w-7xl mx-auto px-6 space-y-20">
                    {/* PMS Section */}
                    <div className="relative bg-gradient-to-br from-slate-800/50 to-blue-900/30 rounded-[3rem] p-5 md:p-12 border border-sky-800/30 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                        <div className="relative z-10">
                            <div className="flex items-start gap-6 mb-8">
                                <div className="bg-sky-400/10 p-4 rounded-2xl border border-sky-400/20">
                                    <PieChart className="w-12 h-12 text-sky-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent mb-2">
                                        Portfolio Management Services (PMS)
                                    </h2>
                                    <div className="h-1 w-24 bg-sky-400/30 rounded-full mb-6"></div>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="bg-slate-900/40 p-8 rounded-2xl border border-sky-800/30">
                                        <h3 className="text-2xl font-semibold text-sky-300 mb-4">What is PMS?</h3>
                                        <p className="text-slate-300 leading-relaxed">
                                            Portfolio Management Services (PMS) is an investment portfolio in stocks, fixed income, debt, cash, structured products and other individual securities, managed by a professional money manager that can potentially be tailored to meet specific investment objectives. When one invests in PMS, the investor owns individual securities. You have the freedom and flexibility to tailor the portfolio to address personal preferences and financial goals. Although portfolio managers may oversee hundreds of portfolios, each individual account may be unique.
                                        </p>
                                    </div>

                                    <Link href="/auth/signup" className="w-full">
                                        <span className="flex items-center justify-center gap-3 bg-orange-700 text-white w-fit px-4 py-3 rounded-sm">
                                            Open Live Account
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                </div>

                                <div className="bg-slate-900/40 p-8 rounded-2xl border border-sky-800/30">
                                    <h3 className="text-2xl font-semibold text-emerald-300 mb-6">Why PMS?</h3>
                                    <ul className="space-y-6">
                                        {whyPMSItems.map((item, index) => (
                                            <li key={index} className="flex items-start gap-4 group">
                                                <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center mt-1">
                                                    <Check className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-slate-100 font-medium mb-1">{item.title}</h4>
                                                    <p className="text-slate-300/90">{item.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mutual Funds & IPOs */}
                    <div className="bg-slate-900/40  p-5 md:p-12 rounded-3xl border border-purple-800/30 shadow-xl">
                        <div className="flex items-center gap-6 mb-10">
                            <DollarSign className="w-12 h-12 text-purple-400" />
                            <h2 className="text-2xl md:text-4xl font-bold text-purple-200">Mutual Funds & IPOs</h2>
                        </div>

                        <div className="">
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Mutual Funds and Initial Public Offerings (IPOs)offer an opportunity to invest in a diversified,
                                professionally managed basket of securities at a relatively low cost. They are an excellent option for
                                clients who are looking for a diversified investment portfolio offering liquidity and transparency.
                                Fundacion Finance provides comprehensive transaction support to its clients for undertaking
                                investments in the primary markets via mutual funds & IPOs.
                            </p>
                            <p className="text-gray-300 mb-4 leading-relaxed">
                                We, at Fundacion Finance we offer personalized services for investments (including mutual funds of
                                all types: Equity funds, Growth and Value Funds, Large- Cap and Small-Cap Funds, Bond Fund,
                                Foreign Stocks Funds, Money Market Funds, Sector Funds & Asset Allocation Funds) & IPOs.
                            </p>
                            <div className="bg-slate-800/30 p-6 rounded-xl">
                                <h4 className="text-lg font-semibold text-purple-300 mb-4">Fund Types We Offer:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {fundTypes.map((type) => (
                                        <div key={type} className="flex items-center gap-2 text-slate-300">
                                            <Check className="w-4 h-4 text-emerald-400" />
                                            {type}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Merchant Program */}
                    <div className="bg-gradient-to-br from-slate-900 to-emerald-900/20  p-5 md:p-12 rounded-3xl border border-emerald-800/30">
                        <div className="flex items-center gap-6 mb-10">
                            <Briefcase className="w-12 h-12 text-emerald-400" />
                            <h2 className="text-2xl md:text-4xl font-bold text-emerald-200">Merchant Program & Financial Services</h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-12">
                            <p className="text-slate-300 leading-relaxed">
                                Highly qualified and experienced staff give independent advice on such financial services as
                                pensions, inheritance tax, life assurance and protection, health insurance, employee benefits,
                                investments, business protection and wealth planning. We help companies pivot into more
                                profitable directions where they can expand and grow. It is inevitable that individuals and companies
                                will end up making a few mistakes; we help them correct these mistakes.
                                We help companies turnaround their non-profitable ventures into something that benefits them. Our
                                specialty lies in understanding what makes a company special and what makes it tick.

                            </p>
                            <div className="space-y-8">
                                {merchantServices.map((service) => (
                                    <div key={service.title} className="bg-slate-800/30 p-6 rounded-xl border border-emerald-800/30">
                                        <h4 className="text-lg font-semibold text-emerald-300 mb-3">{service.title}</h4>
                                        <p className="text-slate-300">{service.description}</p>
                                    </div>
                                ))}
                            </div>

                            <Link href="/auth/login?redirect=/personal/merchant/apply" className='px-5 py-3 font-medium bg-amber-600 rounded-sm w-fit'>Become a Merchant</Link>
                        </div>

                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-emerald-900/20  p-5 md:p-12 rounded-3xl border border-emerald-800/30">
                        <div className="flex items-center gap-6 mb-10">
                            <Briefcase className="w-12 h-12 text-emerald-400" />
                            <h2 className="text-2xl md:text-4xl font-bold text-emerald-200">Copy Trading & Signal Subscription Service</h2>
                        </div>

                        <div className="flex md:flex-row flex-col justify-between gap-12">
                            <div className="space-y-3 lg:w-1/2">
                                <p className="text-slate-300 leading-relaxed">
                                    At Hedgeon Finance, we understand that not every investor has the time or expertise to actively
                                    trade the markets. That’s why we offer a <span className="font-bold text-primary">Copy Trading & Signal Subscription Service</span>, allowing
                                    traders to benefit from our expert trading strategies and market insights—whether they trade with
                                    us or another broker.
                                </p>
                                <p className='text-slate-300 leading-relaxed'>
                                    Copy trading allows investors to automatically replicate the trades of our expert traders in realtime. This service is ideal for:
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Investors who want to profit from the markets but lack trading experience',
                                        'Busy professionals who prefer passive income opportunities',
                                        'Traders looking to diversify their strategies by following proven experts'
                                    ].map((insight, index) => (
                                        <li
                                            key={index}
                                            className="group relative transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            {/* Pulsing outer glow */}
                                            <div className="absolute -inset-1 rounded-xl bg-emerald-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-30 animate-pulse"></div>

                                            {/* Main content */}
                                            <div className="relative flex space-x-3 items-start p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 transition-all duration-300 group-hover:border-emerald-500/30">
                                                {/* Animated checkmark container */}
                                                <div className="flex-shrink-0 pt-0.5">
                                                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30 transition-all duration-300 group-hover:bg-emerald-500/30 group-hover:ring-emerald-500/50">
                                                        <Check className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                                                    </span>
                                                </div>

                                                {/* Text content with hover effects */}
                                                <p className="text-gray-300 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white">
                                                    {insight}
                                                    <span className="ml-2 text-emerald-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                        →
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <p className='text-slate-300 leading-relaxed'>
                                    Already trading with another broker? No problem! Our premium Trading Signal Subscription allows
                                    you to receive expert trade alerts and execute them manually on your preferred platform.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        { title: 'Daily & Weekly Market Signals', content: 'Actionable trade setups for forex, stocks, and crypto' },
                                        { title: 'Entry, Exit & Stop Loss Levels', content: 'Clear instructions to maximize profit and minimize risk' },
                                        { title: 'Real-Time Alerts', content: 'Receive signals via email, SMS, or our mobile app' },
                                        { title: 'Market Insights & Strategy Reports', content: 'Exclusive access to in-depth technical and fundamental analysis.' },
                                    ].map(({ title, content }, index) => (
                                        <li className="group relative" key={index}>
                                            <div className="absolute -inset-1 rounded-lg bg-emerald-500/20 opacity-20 transition-all duration-300 group-hover:opacity-30 animate-pulse"></div>

                                            <div className="relative flex space-x-3 items-start p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50">
                                                <div className="flex-shrink-0">
                                                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500/20 ring-2 ring-emerald-500/30 transition-all duration-300 group-hover:ring-emerald-500/50">
                                                        <Check className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                                                    </span>
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-gray-100 transition-colors duration-300 group-hover:text-white">
                                                        {title}
                                                        <span className="ml-2 text-emerald-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                            ✓
                                                        </span>
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                                                        {content}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-slate-300 leading-relaxed italic">
                                    Stay ahead of the market with professional-grade trading signals from Hedgeon Finance!
                                </p>
                            </div>

                            <Image
                                src="/images/copy-trading.jpg"
                                alt="Copy trading"
                                width={500}
                                height={350}
                                className="rounded-xl shadow-xl object-contain"
                            />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-emerald-900/20  p-5 md:p-12 rounded-3xl border border-emerald-800/30">
                        <div className="flex items-center gap-6 mb-10">
                            <Briefcase className="w-12 h-12 text-emerald-400" />
                            <h2 className="text-2xl md:text-4xl font-bold text-emerald-200">Consulting Services</h2>
                        </div>

                        <div className="flex md:flex-row flex-col justify-between gap-12">
                            <div className="space-y-3 lg:w-1/2">
                                <p className="text-slate-300 leading-relaxed">
                                    Our management consulting services focus on our clients’ most critical issues and opportunities:
                                    strategy, marketing, organization, operations, technology, transformation, digital, advanced
                                    analytics, corporate finance, mergers & acquisitions and sustainability across all industries and
                                    geographies
                                </p>
                                <p className='text-slate-300 leading-relaxed'>
                                    We bring deep, functional expertise, but are known for our holistic perspective: we capture value
                                    across boundaries and between the silos of any organization. We have proven a multiplier effect
                                    from optimizing the sum of the parts, not just the individual pieces
                                </p>
                            </div>
                            <div className="lg:w-1/2">
                                <ul className="space-y-3">
                                    {[
                                        'Travel and Aviation Consulting',
                                        'Business Services Consulting',
                                        'Consumer Products Consulting',
                                        'Financial Services Consulting',
                                        'Energy Consulting',
                                        'Transport & Logistics Consulting',
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            className="group relative transition-all duration-300 hover:-translate-y-0.5"
                                        >

                                            {/* Main content */}
                                            <div className={`relative flex space-x-3 items-start p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 bg-gray-800/50 border-gray-700 group-hover:border-emerald-500/30 `}>
                                                {/* Text content */}
                                                <p className={`text-gray-300 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white`}>
                                                    {item}
                                                    {index !== 0 && item !== 'Consulting' && (
                                                        <span className="ml-2 text-emerald-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                            →
                                                        </span>
                                                    )}
                                                    {item === 'Consulting' && (
                                                        <span className="ml-2 text-purple-400 text-xs bg-purple-900/30 px-2 py-1 rounded-full">
                                                            Available
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Real Estate Section */}
                    <div className="bg-slate-900/40  p-5 md:p-12 rounded-3xl border border-amber-800/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/real-estate-pattern.svg')] opacity-10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-6 mb-10">
                                <Building2 className="w-12 h-12 text-amber-400" />
                                <h2 className="text-2xl md:text-4xl font-bold text-amber-200">Real Estate Investment</h2>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                                <div className="space-y-6">
                                    <p className="text-slate-300 leading-relaxed">
                                        At Hedgeon Finance, we offer strategic real estate investment services, allowing clients to
                                        diversify their portfolios with high-value property investments while ensuring consistent returns
                                        and capital growth. Whether you’re an individual investor or a business looking for profitable real
                                        estate opportunities, our expert-led investment approach minimizes risk and maximizes longterm value.
                                    </p>
                                    <div className="bg-slate-800/30 p-6 rounded-xl">
                                        <h4 className="text-lg font-semibold text-amber-300">How Our Real Estate Investment Works</h4>
                                        <p className="text-slate-300 mb-4">
                                            Investors can own a share in income-generating properties, such as:
                                        </p>
                                        <ul className="space-y-4">
                                            {['Commercial buildings', 'Residential apartments', 'Short-term rental properties (Airbnb-style investments)', 'Land banking for future appreciation'].map((benefit) => (
                                                <li key={benefit} className="flex items-center gap-3 text-slate-300">
                                                    <Check className="w-5 h-5 text-amber-400" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-slate-800/30 p-6 rounded-xl">
                                        <h4 className="text-lg font-semibold text-amber-300 mb-4">How it benefits you</h4>
                                        <ul className="space-y-4">
                                            {realEstateBenefits.map((benefit) => (
                                                <li key={benefit} className="flex items-center gap-3 text-slate-300">
                                                    <Check className="w-5 h-5 text-amber-400" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>


                                    <div className="md:flex-row flex flex-col items-center gap-5">
                                        <p className='text-slate-300'>Want to buy a Real estate?</p>
                                        <Link href="/contact-us" className='bg-amber-600 hover:bg-amber-400 duration-300 text-slate-300 px-10 py-3 rounded-md'>Get In Touch</Link>
                                    </div>
                                </div>

                                <div className="hidden lg:flex items-center justify-center">
                                    <Image
                                        src="/images/real-estate.jpg"
                                        alt="Modern real estate buildings"
                                        width={500}
                                        height={400}
                                        className="h-full rounded-xl shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default page

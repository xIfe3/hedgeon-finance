import BreadcrumbsSection from '@/components/public/Breadcrumb'
import { HelpCircle, LifeBuoy, MessageSquareText, Search } from 'lucide-react'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';

function page() {
    const faqsAccount = [
        {
            trigger: "How do I create an account?",
            content: "Click on the 'Get Started' button on the homepage and follow the prompts to register with your valid details and complete KYC verification."
        },
        {
            trigger: "Can I reset my password if I forget it?",
            content: "Yes, click on 'Forgot Password' on the login page and follow the instructions sent to your email to reset your password."
        },
        {
            trigger: "How do I enable two-factor authentication (2FA)?",
            content: "Go to your account settings and toggle on 2FA. You'll be prompted to scan a QR code with an authenticator app."
        },
        {
            trigger: "Is my personal information secure?",
            content: "Absolutely. We use bank-level encryption, secure data centers, and follow strict data protection policies."
        },
        {
            trigger: "What should I do if I suspect unauthorized activity?",
            content: "Immediately change your password and contact our support team. We'll temporarily lock your account and investigate."
        },
    ];


    const faqsInvestments = [
        {
            trigger: "What investment plans do you offer?",
            content: "We offer Trial, Basic, Standard, and Premium plans, each with varying durations, ROI rates, and withdrawal limits."
        },
        {
            trigger: "When will I start seeing returns on my investment?",
            content: "Returns begin accumulating 24 hours after your investment is verified and activated, depending on your chosen plan."
        },
        {
            trigger: "Can I withdraw my profits anytime?",
            content: "Withdrawals can be made based on the specific terms of your investment plan. Some plans offer weekly or monthly withdrawals."
        },
        {
            trigger: "What happens if the market crashes?",
            content: "We have risk mitigation strategies and diversified investment portfolios to minimize impact during market downturns."
        },
        {
            trigger: "Is there a minimum amount required to invest?",
            content: "Yes, the minimum investment starts at $100 for the Trial plan. Higher plans may require larger amounts."
        },
    ];


    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="FAQs"
            />

            <section className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-indigo-950 py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Header */}
                    <div className="text-center mb-20">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-slate-300 text-xl max-w-3xl mx-auto">
                            Find quick answers to common queries about our investment services, account management,
                            and financial strategies. Can't find what you need? Contact our support team anytime.
                        </p>

                        {/* Search Bar */}
                        <div className="mt-10 max-w-2xl mx-auto">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search questions..."
                                    className="w-full bg-slate-900/50 border border-sky-800/30 rounded-2xl py-4 pl-6 pr-14
                                  text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30
                                  backdrop-blur-lg placeholder-slate-500 transition-all"
                                />
                                <Search className="w-6 h-6 text-slate-500 absolute right-6 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>
                    </div>

                    {/* FAQ Grid */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Category 1 - General */}
                        <div className="bg-slate-900/40 p-8 rounded-3xl border border-sky-800/30 backdrop-blur-lg">
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-sky-800/20">
                                <HelpCircle className="w-8 h-8 text-sky-400" />
                                <h2 className="text-2xl font-semibold text-sky-200">General Questions</h2>
                            </div>

                            <div className="space-y-6">
                                <Accordion type="single" collapsible className="w-full space-y-5">
                                    {faqsAccount.map(({ trigger, content }, index) => (
                                        <AccordionItem value={trigger}>
                                            <AccordionTrigger className='px-5 bg-primary-fade cursor-pointer rounded py-5 text-lg text-primary font-bold' style={{ textDecoration: 'none' }}>{trigger}</AccordionTrigger>
                                            <AccordionContent className='py-10 px-2 text-white'>
                                                {content}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>

                        <div className="bg-slate-900/40 p-8 rounded-3xl border border-sky-800/30 backdrop-blur-lg">
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-sky-800/20">
                                <HelpCircle className="w-8 h-8 text-sky-400" />
                                <h2 className="text-2xl font-semibold text-sky-200">Invstment Related Questions</h2>
                            </div>

                            <div className="space-y-6">
                                <Accordion type="single" collapsible className="w-full space-y-5">
                                    {faqsInvestments.map(({ trigger, content }, index) => (
                                        <AccordionItem value={trigger}>
                                            <AccordionTrigger className='px-5 bg-primary-fade cursor-pointer rounded py-5 text-lg text-primary font-bold' style={{ textDecoration: 'none' }}>{trigger}</AccordionTrigger>
                                            <AccordionContent className='py-10 px-2 text-white'>
                                                {content}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    </div>

                    {/* Support CTA */}
                    <div className="mt-20 text-center">
                        <div className="bg-gradient-to-br from-sky-900/30 to-cyan-900/20 p-12 rounded-3xl border
                           border-sky-800/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-semibold text-slate-100 mb-4">
                                    Still have questions?
                                </h3>
                                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                                    Our expert support team is available 24/7 to help with any inquiries about
                                    your investments, account management, or financial strategies.
                                </p>
                                <Link href="/contact-us" className="w-fit bg-gradient-to-r from-sky-500 to-cyan-600 px-10 py-5 rounded-xl
                                    font-semibold hover:shadow-2xl transition-all flex items-center
                                    gap-3 mx-auto hover:scale-[1.02]">
                                    <MessageSquareText className="w-6 h-6" />
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Help Button */}
                <div className="fixed bottom-8 right-8">
                    <button className="bg-sky-500 p-4 rounded-full shadow-2xl hover:bg-sky-400 transition-all
                         flex items-center justify-center group">
                        <LifeBuoy className="w-8 h-8 text-white group-hover:animate-spin-slow" />
                    </button>
                </div>
            </section>
        </div>
    )
}

export default page

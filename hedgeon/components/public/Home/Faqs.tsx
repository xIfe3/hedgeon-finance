import { HelpCircle, MessageSquareText, Search } from 'lucide-react';
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';

function Faqs() {
    const faqs = [
        {
            trigger: "How do I create an account?",
            content: "Click on the 'Get Started' button on the homepage, fill in your details, and complete the KYC verification to activate your account."
        },
        {
            trigger: "Can I reset my password if I forget it?",
            content: "Yes. Click on 'Forgot Password' on the login page and follow the instructions sent to your registered email."
        },
        {
            trigger: "How do I enable two-factor authentication (2FA)?",
            content: "Go to your account settings and enable 2FA. Use an authenticator app to scan the QR code and complete the setup."
        },
        {
            trigger: "Is my personal information secure?",
            content: "Yes. We use bank-grade encryption and secure infrastructure to protect your data at all times."
        },
        {
            trigger: "What should I do if I suspect unauthorized activity?",
            content: "Immediately change your password and contact our support team. Your account will be temporarily locked while we investigate."
        },
        {
            trigger: "How long does KYC verification take?",
            content: "KYC verification typically takes 1–2 business days. You'll receive a notification once it's complete."
        },
        {
            trigger: "What documents are required for KYC?",
            content: "A valid government-issued ID (e.g., passport or driver's license) and a proof of address such as a utility bill or bank statement."
        },
        {
            trigger: "Can I change my registered email address?",
            content: "Yes. Go to Account Settings > Personal Info to request an email change. You’ll need to verify the new email address."
        },
        {
            trigger: "How can I contact customer support?",
            content: "You can reach our support team via the 'Contact Us' page or by emailing support@yourdomain.com."
        },
        {
            trigger: "Are there any fees for transactions?",
            content: "Most services are free, but some transactions may incur minor fees. Please refer to our Pricing page for details."
        }
    ];


    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-indigo-950 py-28 px-6">
            <div className="max-w-6xl mx-auto">
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
                    <div className="space-y-4">
                        <div className="flex space-x-4 items-center">
                            <div className="w-16 h-1 bg-primary"></div>
                            <span className="text-md font-semibold text-gray-300 uppercase tracking-wide">
                                Frequently Asked Questions
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-4xl font-bold text-gray-200 leading-tight">
                            Your Questions, Answered
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            We’ve compiled answers to the most common questions from our users. If you still need help, feel free to reach out to our support team anytime.
                        </p>
                    </div>


                    <div className="space-y-6">
                        <Accordion type="single" collapsible className="w-full space-y-5">
                            {faqs.map(({ trigger, content }, index) => (
                                <AccordionItem value={trigger} key={index}>
                                    <AccordionTrigger className='px-5 bg-primary-fade cursor-pointer rounded py-5 text-lg text-primary font-bold' style={{ textDecoration: 'none' }}>{trigger}</AccordionTrigger>
                                    <AccordionContent className='py-10 px-2 text-white'>
                                        {content}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
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
        </section>
    )
}

export default Faqs

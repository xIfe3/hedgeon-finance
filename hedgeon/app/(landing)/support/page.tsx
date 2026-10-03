import { LegalLayout } from '@/components/legal/Layout'
import Section from '@/components/legal/Section'
import BreadcrumbsSection from '@/components/public/Breadcrumb'
import { IconExclamationCircle } from '@tabler/icons-react'
import React from 'react'


function Support() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="Support"
            />

            <LegalLayout
                title="Support Center"
                subtitle="We're here to help 24/7"
            >
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h3 className="text-xl font-semibold mb-6">Contact Options</h3>
                        <ul className="space-y-4">
                            <SupportLink
                                title="Live Chat"
                                description="Instant messaging support"
                                icon="💬"
                            />
                            <SupportLink
                                title="Email Support"
                                description="support@hedgeonfinance.com"
                                icon="📧"
                            />
                            <SupportLink
                                title="Phone Support"
                                description="+1 (580) 304-2990"
                                icon="📞"
                            />
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h3 className="text-xl font-semibold mb-6">Contact Form</h3>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </LegalLayout>
        </div>
    )
}

const SupportLink = ({ title, description, icon }: any) => (
    <li className="flex items-start p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
        <span className="text-2xl mr-4">{icon}</span>
        <div>
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </li>
)


export default Support

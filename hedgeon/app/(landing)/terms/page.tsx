import { LegalLayout } from '@/components/legal/Layout'
import ListItem from '@/components/legal/ListItem'
import Section from '@/components/legal/Section'
import BreadcrumbsSection from '@/components/public/Breadcrumb'
import { IconFile } from '@tabler/icons-react'
import { ShieldCheckIcon } from 'lucide-react'
import React from 'react'


function Terms() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="Terms"
            />

            <LegalLayout
                title="Terms of Service"
                subtitle="Understanding our mutual responsibilities"
            >
                <div className="space-y-12">
                    <Section
                        icon={<IconFile className="h-8 w-8" />}
                        title="User Agreement"
                    >
                        <p>By using our services, you agree to comply with...</p>
                    </Section>

                    <Section
                        icon={<IconFile className="h-8 w-8" />}
                        title="Payments & Subscriptions"
                    >
                        <p>All transactions are processed securely through...</p>
                    </Section>

                    {/* Add more sections */}
                </div>
            </LegalLayout>
        </div>
    )
}


export default Terms

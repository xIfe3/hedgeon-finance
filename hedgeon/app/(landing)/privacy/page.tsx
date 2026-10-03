import { LegalLayout } from '@/components/legal/Layout'
import BreadcrumbsSection from '@/components/public/Breadcrumb'
import { ShieldCheckIcon } from 'lucide-react'
import React from 'react'
import Section from '@/components/legal/Section'
import ListItem from '@/components/legal/ListItem'

function Privacy() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="Privacy Policy"
            />

            <LegalLayout
                title="Privacy Policy"
                subtitle="Your data security is our top priority"
            >
                <div className="space-y-12">
                    <Section
                        icon={<ShieldCheckIcon className="h-8 w-8" />}
                        title="Data Collection"
                    >
                        <p>We collect minimal information necessary to provide our services...</p>
                    </Section>

                    <Section
                        icon={<ShieldCheckIcon className="h-8 w-8" />}
                        title="Data Usage"
                    >
                        <ul className="space-y-4">
                            <ListItem>Service personalization</ListItem>
                            <ListItem>Performance improvement</ListItem>
                            <ListItem>Security enhancements</ListItem>
                        </ul>
                    </Section>
                </div>
            </LegalLayout>
        </div>
    )
}

export default Privacy

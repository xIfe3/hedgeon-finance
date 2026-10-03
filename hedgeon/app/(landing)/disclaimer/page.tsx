import { LegalLayout } from '@/components/legal/Layout'
import Section from '@/components/legal/Section'
import BreadcrumbsSection from '@/components/public/Breadcrumb'
import { IconExclamationCircle } from '@tabler/icons-react'
import React from 'react'


function Disclaimer() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="Disclaimer"
            />

            <LegalLayout
                title="Legal Disclaimer"
                subtitle="Important information about content responsibility"
            >
                <div className="space-y-12">
                    <Section
                        icon={<IconExclamationCircle className="h-8 w-8" />}
                        title="Content Accuracy"
                    >
                        <p>While we strive to maintain accurate information...</p>
                    </Section>

                    <Section
                        icon={<IconExclamationCircle className="h-8 w-8" />}
                        title="External Links"
                    >
                        <p>We may link to third-party websites that have separate...</p>
                    </Section>
                </div>
            </LegalLayout>
        </div>
    )
}


export default Disclaimer

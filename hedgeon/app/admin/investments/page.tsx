import Section from '@/components/admin/Section'
import React from 'react'
import InvestmentStats from './InvestmentStats'
import InvestmentManager from './InvestmentManager'

function AdminInvestmentPage() {
    return (
        <Section>
            <h1 className="text-3xl font-bold">Investment Management</h1>

            <InvestmentManager />
        </Section>
    )
}

export default AdminInvestmentPage

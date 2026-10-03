'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // To access route parameters
import { getPlanDetailsApi } from '@/app/api/planApi';
import {
    FiClock, FiTrendingUp, FiShield, FiGift, FiTag
} from 'react-icons/fi';
import { InvestmentPlan } from '../page';
import Link from 'next/link';

interface InvestmentPlanDetails extends InvestmentPlan {
}

const PlanDetailsPage = () => {
    const { planId } = useParams();
    const [plan, setPlan] = useState<InvestmentPlanDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                setLoading(true);
                const response = await getPlanDetailsApi(planId as string);
                setPlan(response.data['plan']);
            } catch (err: any) {
                console.error('Error fetching plan details:', err);
                setError('Failed to load plan details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlanDetails();
    }, [planId]);

    if (loading) {
        return <div className="loader"></div>
    }

    if (error || !plan) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Plan details not found.'}</div>;
    }

    const riskLevelColors = {
        CONSERVATIVE: 'bg-green-100 text-green-700 border-green-200',
        MODERATE: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        AGGRESSIVE: 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{plan.name}</h1>
                    <div className="flex items-center space-x-2 mb-3">
                        <FiShield className={`w-6 h-6 ${riskLevelColors[plan.riskLevel]?.split(' ')[1]}`} />
                        <span className={`text-lg font-medium ${riskLevelColors[plan.riskLevel]?.split(' ')[1]}`}>
                            {plan.riskLevel} Risk
                        </span>
                    </div>

                    <div className="py-4 border-t border-b border-gray-200 mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-600"><FiClock className="inline mr-1" /> Duration:</span>
                            <span className="text-lg text-gray-800">{plan.duration} {plan.durationType === 'weeks' ? 'weeks' : 'months'}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-green-600"><FiTrendingUp className="inline mr-1" /> Est. ROI:</span>
                            <span className="text-lg text-green-700">{plan.estimatedROI}% APR</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-600"><FiTag className="inline mr-1" /> Tax on Profit:</span>
                            <span className="text-lg text-gray-800">{plan.taxOnProfit}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-blue-600"><FiGift className="inline mr-1" /> Referral Bonus:</span>
                            <span className="text-lg text-blue-700">{plan.referralBonus}%</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 uppercase tracking-wide mb-3">Key Benefits</h4>
                        <ul className="list-disc pl-5 text-gray-600 leading-relaxed">
                            {plan.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end">
                    <Link href={`/personal/explore/invest/${plan._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1">
                        Invest Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PlanDetailsPage;
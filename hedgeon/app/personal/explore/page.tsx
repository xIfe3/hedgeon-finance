'use client';

import React, { useEffect, useState } from 'react';
import { getPlansApi } from '../../api/planApi';
import {
    FiClock, FiTrendingUp, FiShield, FiGift, FiTag,
    FiStar,
    FiArrowRight,
    FiCheckCircle,
    FiPlusCircle,
    FiArrowUpRight
} from 'react-icons/fi';
import Link from 'next/link';

export interface InvestmentPlan {
    _id: string;
    name: string;
    minAmount: number;
    maxAmount: number;
    minDuration: number;
    maxDuration: number;
    durationType: string;
    duration: number;
    estimatedROI: number;
    taxOnProfit: number;
    referralBonus: number;
    riskLevel: string;
    benefits: string[];
}

const InvestmentsPage = () => {
    const [plans, setPlans] = useState<InvestmentPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await getPlansApi();
                setPlans(response.data['plans']);
            } catch (error) {
                console.error('Error fetching plans:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    if (loading) {
        return <div className="loader"></div>
    }

    const riskLevelColors = {
        CONSERVATIVE: 'bg-green-100 text-green-700 border-green-200',
        MODERATE: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        AGGRESSIVE: 'bg-red-100 text-red-700 border-red-200',
    };

    const getButtonText = (plan) => {
        switch (plan.name) {
            case 'Trial Package':
                return 'Try Now & Upgrade Later'
            case 'Basic Package':
                return 'Start with Basic'
            case 'Standard Package':
                return 'Go Standard '
            case 'Premium Package':
                return 'Go Premium'
            default:
                break;
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Explore Investment Opportunities
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-8 px-4 sm:px-6 lg:px-8">
                    {plans.map((plan) => (
                        <div
                            key={plan._id}
                            className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-out overflow-hidden border border-gray-100/70 hover:border-gray-200"
                        >
                            {/* Popular Ribbon */}
                            {plan.name === "Standard Package" && (
                                <div className="absolute -right-8 top-6 w-32 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold py-1 text-center rotate-45 z-10">
                                    <span className="flex items-center justify-center gap-1">
                                        <FiStar className="w-3 h-3" /> Popular
                                    </span>
                                </div>
                            )}

                            <div className="p-8">
                                {/* Plan Header */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                        <FiShield className={`w-8 h-8 p-2 rounded-full ${riskLevelColors[plan.riskLevel]} bg-opacity-20`} />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                        <FiClock className="w-4 h-4" />
                                        <span>{plan.minDuration}-{plan.maxDuration} {plan.durationType}</span>
                                    </div>
                                </div>

                                {/* Pricing Range */}
                                <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                                    <div className="text-center mb-3">
                                        <span className="text-sm text-gray-500">Investment Range</span>
                                    </div>
                                    <div className="flex justify-center items-center gap-2">
                                        <span className="text-xl font-bold text-gray-900">
                                            ${plan.minAmount.toLocaleString()}
                                        </span>
                                        <FiArrowRight className="w-4 h-4 text-gray-400" />
                                        <span className="text-xl font-bold text-gray-900">
                                            ${plan.maxAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="text-sm text-gray-500 mb-1">ROI</div>
                                        <div className="text-lg font-bold text-green-600">{plan.estimatedROI}%</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="text-sm text-gray-500 mb-1">Tax</div>
                                        <div className="text-lg font-bold text-gray-900">{plan.taxOnProfit}%</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="text-sm text-gray-500 mb-1">Bonus</div>
                                        <div className="text-lg font-bold text-blue-600">{plan.referralBonus}%</div>
                                    </div>
                                </div>

                                {/* Benefits List */}
                                <div className="mb-8">
                                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 border-b pb-2">
                                        Key Benefits
                                    </h4>
                                    <ul className="space-y-3">
                                        {plan.benefits.slice(0, 3).map((benefit, index) => (
                                            <li key={index} className="flex items-start">
                                                <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                                <span className="text-gray-600">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {plan.benefits.length > 3 && (
                                        <Link href={`explore/${plan._id}`} className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            <FiPlusCircle className="w-4 h-4 mr-1" /> Show all benefits
                                        </Link>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href={`explore/invest/${plan._id}`}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:-translate-y-0.5"
                                >
                                    <FiArrowUpRight className="w-5 h-5" />
                                    {getButtonText(plan)}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvestmentsPage;
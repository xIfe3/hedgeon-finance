'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { differenceInDays, format, isAfter } from 'date-fns';
import { Clock, TrendingUp, FileText } from 'lucide-react';
import { getAllInvestments } from '@/app/api/userApi';

interface Plan {
    id: string;
    name: string;
    investedAmount: number;
    roi: number;
    startDate: string | Date;
    endDate: string | Date;
}

export default function InvestmentHistory() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const res = await getAllInvestments();
                console.log(res.data['investments'])
                setPlans(res.data['investments']); // Make sure res.data is an array of Plan
            } catch (error) {
                console.error('Failed to fetch investments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvestments();
    }, []);

    const completedPlans = plans.filter(plan => isAfter(new Date(), new Date(plan.endDate)));

    const getDuration = (startDate: string | Date, endDate: string | Date) => {
        const totalDays = differenceInDays(new Date(endDate), new Date(startDate));
        return totalDays >= 365
            ? `${Math.floor(totalDays / 365)} year(s)`
            : `${totalDays} day(s)`;
    };

    if (loading) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>Loading investment history...</p>
            </div>
        );
    }

    if (!completedPlans.length) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No investment history available yet.</p>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Investment History</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedPlans.map(plan => (
                        <div key={plan.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl p-6 border border-gray-50 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                                <div className="h-full bg-green-500" style={{ width: `100%` }} />
                            </div>

                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {format(new Date(plan.startDate), 'MMM yyyy')} - {format(new Date(plan.endDate), 'MMM yyyy')}
                                    </p>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Completed
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Invested</p>
                                        <p className="font-semibold text-gray-900">${plan.investedAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 mb-1">ROI</p>
                                        <p className="font-semibold text-green-600 flex items-center gap-1">
                                            <TrendingUp className="w-4 h-4" />
                                            ${plan.roi.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700">
                                            Duration: {getDuration(plan.startDate, plan.endDate)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50">
                                    <FileText className="w-5 h-5" />
                                    View Documents
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { differenceInDays, format, isBefore } from 'date-fns';
import { Clock, TrendingUp, FileText, ArrowUpRight } from 'lucide-react';
import { getAllInvestments } from '@/app/api/userApi';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

interface Plan {
    _id: string;
    name: string;
    amount: number;
    roiAccumulated: number
    startDate: string | Date;
    endDate: string | Date;
    status: "active" | "completed" | "pending" | "cancelled";
    currency: string;
    // ... rest of your interface fields
}

export default function ActiveInvestments() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const res = await getAllInvestments();
                console.log(res);
                setPlans(res.data['investments']);
            } catch (error) {
                console.error('Failed to fetch investments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvestments();
    }, []);

    const activePlans = plans.filter(plan => isBefore(new Date(), new Date(plan.endDate)));

    const getDuration = (startDate: string | Date, endDate: string | Date) => {
        const totalDays = differenceInDays(new Date(endDate), new Date(startDate));
        return totalDays >= 365
            ? `${Math.floor(totalDays / 365)} year(s)`
            : `${totalDays} day(s)`;
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Active Investments</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-48 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50" />
                    ))}
                </div>
            </div>
        );
    }

    if (!activePlans.length) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center p-12 rounded-xl border-2 border-dashed border-gray-100">
                    <div className="mb-4 text-gray-400 mx-auto flex justify-center">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No active investments</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">Start a new investment to see it appear here.</p>
                    <Button className="mt-4">Start Investing</Button>
                </div>
            </div>
        );
    }

    const statusColorMap = {
        active: 'bg-green-50 text-green-700 border-green-100',
        completed: 'bg-blue-50 text-blue-700 border-blue-100',
        pending: 'bg-amber-50 text-amber-700 border-amber-100',
        cancelled: 'bg-red-50 text-red-700 border-red-100',
    };

    return (
        <div className="max-w-full mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Active Investments</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Link href="/personal/investments/history">
                            History
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activePlans.map(plan => (
                    <div key={plan._id} className="group relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 ease-out hover:shadow-lg">
                        <div className="absolute top-3 right-3">
                            <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColorMap[plan.status] || 'bg-gray-50 text-gray-700 border-gray-100'
                                    }`}
                            >
                                {plan.status}
                            </span>
                        </div>

                        <div className="p-5">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {format(new Date(plan.startDate), 'MMM dd, yyyy')} – {format(new Date(plan.endDate), 'MMM dd, yyyy')}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Invested Amount</p>
                                        <p className="font-semibold text-gray-900">
                                            ${formatNumberWithCommas(plan.amount)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Profit Earned</p>
                                        <div className="flex items-center gap-1 font-semibold text-green-600">
                                            <TrendingUp className="w-4 h-4" />
                                            ${formatNumberWithCommas(plan.roiAccumulated || 0)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-700">
                                            {getDuration(plan.startDate, plan.endDate)}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-700">
                                        {differenceInDays(new Date(plan.endDate), new Date())} days left
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="link"
                                className="w-full mt-4 text-gray-600 hover:bg-gray-50 flex items-center justify-between"
                            >
                                <Link href={`/personal/investments/${plan._id}`} className='w-full flex items-center justify-center space-x-3 underline-none'>
                                    <span>View Details</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { differenceInDays, formatDistanceToNowStrict, isAfter, format } from 'date-fns';
import { ArrowUpRight, Clock, Wallet, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Plan {
    id: string;
    investmentId: string;
    name: string;
    investedAmount: number;
    roi: number;
    startDate: string | Date;
    endDate: string | Date;
    status: "active" | "completed" | "pending" | "cancelled";
}

interface Props {
    plans: Plan[];
}

export default function TopPlans({ plans }: Props) {

    const getTimeLeft = (endDate: string | Date) => {
        const now = new Date();
        const end = new Date(endDate);
        if (isAfter(now, end)) return 'Completed';
        return formatDistanceToNowStrict(end, { unit: 'day' }) + ' left';
    };

    const getProgress = (startDate: string | Date, endDate: string | Date) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const totalDays = differenceInDays(end, start);
        const daysPassed = differenceInDays(new Date(), start);
        return Math.min((daysPassed / totalDays) * 100, 100);
    };

    if (!plans.length) {
        return (
            <div className="border rounded-2xl p-8 text-center max-w-md flex flex-col items-center">
                <div className="mb-6 flex justify-center">
                    <Wallet className="h-12 w-12 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">No Active Investment Plans</h2>
                <p className="text-gray-600 mb-6">Start growing your wealth by creating your first investment plan.</p>
                <Link href="/personal/explore" className="px-8 py-3 text-white rounded-sm text-sm font-semibold gap-2 flex w-fit bg-primary hover:bg-primary-fade">
                    <ArrowUpRight className="w-5 h-5" />
                    Start Investing
                </Link>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
                const progress = getProgress(plan.startDate, plan.endDate);
                const isCompleted = isAfter(new Date(), new Date(plan.endDate));

                return (
                    <div key={plan.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl p-6 border border-gray-50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                            <div
                                className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                                style={{ width: `${isCompleted ? 100 : progress}%` }}
                            />
                        </div>

                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {format(new Date(plan.startDate), 'MMM yyyy')} - {format(new Date(plan.endDate), 'MMM yyyy')}
                                </p>
                            </div>
                            <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColorMap[plan.status] || 'bg-gray-50 text-gray-700 border-gray-100'
                                    }`}
                            >
                                {plan.status}
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
                                        {isCompleted ? 'Term Completed' : getTimeLeft(plan.endDate)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-2">
                            <Button
                                variant="default"
                                className="w-full text-gray-600 hover:bg-gray-50 flex items-center justify-between"
                            >
                                <Link href={`/personal/investments/${plan.investmentId}`} className='w-full flex items-center justify-center space-x-3 underline-none text-white'>
                                    <span>View Details</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
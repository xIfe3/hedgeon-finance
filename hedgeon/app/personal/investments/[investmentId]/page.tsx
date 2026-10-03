'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiCalendar, FiDollarSign, FiPieChart, FiClock, FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';
import { motion } from 'framer-motion';
import { format, differenceInDays, parseISO, formatDistanceToNowStrict, isAfter } from 'date-fns';
import { getInvestmentById } from '@/app/api/userApi';
import { ArrowUpRight, Info } from 'lucide-react';

const ProgressBar = ({ value }: { value: number }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${value}%` }}
        />
    </div>
);

const InvestmentDetailsPage = () => {
    const { investmentId } = useParams();
    const router = useRouter();
    const [investment, setInvestment] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvestment = async () => {
            try {
                const response = await getInvestmentById(investmentId as string);
                setInvestment(response.data.investment);
            } catch (err) {
                setError('Failed to load investment details');
            } finally {
                setLoading(false);
            }
        };

        fetchInvestment();
    }, [investmentId]);

    const calculateInvestmentProgress = () => {
        if (!investment) return 0;
        const start = investment.startDate;
        const end = investment.endDate;
        const today = new Date();
        const totalDays = differenceInDays(end, start);
        const daysPassed = differenceInDays(today, start);
        return Math.min((daysPassed / totalDays) * 100, 100);
    };

    const getTimeLeft = (endDate: string | Date) => {
        const now = new Date();
        const end = new Date(endDate);
        if (isAfter(now, end)) return 'Completed';
        return formatDistanceToNowStrict(end, { unit: 'day' }) + ' left';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FiClock className="animate-spin text-3xl text-blue-600" />
            </div>
        );
    }

    if (error || !investment) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-red-500 p-4">
                <div className="max-w-md text-center">
                    <FiAlertTriangle className="text-4xl mb-4 mx-auto" />
                    <p className="text-lg mb-4">{error || 'Investment not found'}</p>
                    <button
                        onClick={() => router.push('/personal/investments')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View Investments
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                    <FiArrowLeft className="mr-2" />
                    Back to Investments
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                >
                    <div className="p-8 md:p-12 space-y-8">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{investment.plan.name}</h1>
                                <p className="text-gray-500 mt-1">
                                    Invested {format(parseISO(investment.startDate.toString()), 'MMM dd, yyyy')}
                                </p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${investment.status === 'active' ? 'bg-green-100 text-green-800' :
                                investment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                {investment.status.toUpperCase()}
                            </span>
                        </div>

                        {/* Progress Section */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium text-gray-900">Investment Progress</h3>
                                <span className="text-sm text-gray-500">
                                    {Math.round(calculateInvestmentProgress())}% Completed
                                </span>
                            </div>
                            <ProgressBar value={calculateInvestmentProgress()} />
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Start: {format(new Date(investment.startDate), 'MMM dd, yyyy')}</span>
                                <span>End: {format(new Date(investment.endDate), 'MMM dd, yyyy')}</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FiCalendar className="text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Days Remaining</p>
                                        <p className="text-xl font-semibold">{getTimeLeft(investment.endDate)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FiDollarSign className="text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Total Returns</p>
                                        <p className="text-xl font-semibold">
                                            ${formatNumberWithCommas(investment.profitAccumulated || 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FiPieChart className="text-purple-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">ROI Accumulated</p>
                                        <p className="text-xl font-semibold">
                                            {investment.roiAccumulated?.toFixed(2) || 0}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-500 mb-4">INVESTMENT BREAKDOWN</h3>
                                <dl className="space-y-3">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Principal Amount</dt>
                                        <dd className="font-medium">
                                            ${formatNumberWithCommas(investment.amount)} {investment.currency}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Investment Period</dt>
                                        <dd className="font-medium">
                                            {differenceInDays(investment.endDate.toString(), investment.startDate.toString())} Days
                                        </dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Next Payout</dt>
                                        <dd className="font-medium">
                                            {format(new Date(), 'MMM dd')} (Estimated)
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-500 mb-4">TRANSACTION DETAILS</h3>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-gray-600">Transaction ID</dt>
                                        <dd className="font-mono text-sm break-all">{investment.transactionId}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600">Payment Method</dt>
                                        <dd className="font-medium">{investment.currency}</dd>
                                    </div>
                                    {investment.receiptUrl && (
                                        <div>
                                            <dt className="text-gray-600">Receipt</dt>
                                            <dd>
                                                <a
                                                    href={investment.receiptUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline flex items-center gap-1"
                                                >
                                                    Download Receipt <ArrowUpRight className="inline" />
                                                </a>
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>

                        {/* Support Section */}
                        <div className="border-t pt-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Info className="text-xl" />
                                    <p className="text-sm">
                                        Need assistance with your investment?{' '}
                                        <a href="/support" className="text-blue-600 hover:underline">
                                            Contact Support
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default InvestmentDetailsPage;
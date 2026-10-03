'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiCheckCircle, FiClock, FiDollarSign, FiInfo, FiLoader, FiArrowLeft } from 'react-icons/fi';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { getInvestmentById } from '@/app/api/userApi';

const InvestmentReceipt = () => {
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FiLoader className="animate-spin text-3xl text-blue-600" />
            </div>
        );
    }

    if (error || !investment) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-red-500 p-4">
                <div className="max-w-md text-center">
                    <FiInfo className="text-4xl mb-4 mx-auto" />
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
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => router.push('/personal/investments/active')}
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
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
                                {investment.status === 'pending' ? (
                                    <FiClock className="text-3xl text-yellow-600" />
                                ) : (
                                    <FiCheckCircle className="text-3xl text-green-600" />
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Investment {investment.status === 'pending' ? 'Pending' : 'Confirmed'}
                            </h1>
                            <p className="text-gray-500">
                                {investment.status === 'pending'
                                    ? 'Your investment is being processed'
                                    : `Invested on ${format(new Date(investment.startDate), 'MMM dd, yyyy HH:mm')}`}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-500 mb-4">INVESTMENT DETAILS</h3>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm text-gray-500">Amount Invested</dt>
                                        <dd className="font-semibold text-lg">
                                            ${formatNumberWithCommas(investment.amount)} {investment.currency}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Plan Name</dt>
                                        <dd className="font-semibold">{investment.plan.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Investment Period</dt>
                                        <dd className="font-semibold">
                                            {format(new Date(investment.startDate), 'MMM dd, yyyy')} -{' '}
                                            {format(new Date(investment.endDate), 'MMM dd, yyyy')}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-500 mb-4">PAYMENT INFORMATION</h3>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm text-gray-500">Transaction ID</dt>
                                        <dd className="font-mono text-sm break-all">{investment.transactionId}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Payment Method</dt>
                                        <dd className="font-semibold">{investment.currency}</dd>
                                    </div>
                                    {investment.receiptUrl && (
                                        <div>
                                            <dt className="text-sm text-gray-500">Receipt</dt>
                                            <dd>
                                                <a
                                                    href={investment.receiptUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline flex items-center"
                                                >
                                                    View Receipt <ArrowUpRight className="ml-1" />
                                                </a>
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center space-x-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${investment.status === 'active' ? 'bg-green-100 text-green-800' :
                                        investment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {investment.status.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Need help? Contact our support team
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default InvestmentReceipt;
'use client';
import { useState, useEffect } from 'react';
import {
    FiDollarSign, FiActivity, FiTrendingUp, FiList, FiStar, FiArrowUpRight
} from 'react-icons/fi';
import { useUser } from '@/context/UserContext';
import TransactionAndWithdrawalSection from './TransactionAndWithdrawSection';
import { getPlansApi } from '@/app/api/planApi';
import Link from 'next/link';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';
import TopPlans from './TopPlans';


const PersonalDashboard = () => {
    const { user } = useUser();
    const [plans, setPlans] = useState<any[]>([])

    const fetchData = async () => {
        try {
            const response = await getPlansApi()
            setPlans(response.data['plans']);
        } catch (err) {
            console.error("Error fetching plans:", err);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const transformedPlans = (user?.currentPlan || []).map(plan => ({
        id: plan.planId,
        investmentId: plan.investmentId,
        name: plan.name,
        investedAmount: plan.investedAmount,
        roi: plan.roiAccumulated,
        startDate: plan.startDate,
        endDate: plan.endDate,
        status: plan.status
    }));

    console.log("Transformed Plans", transformedPlans);

    return (
        <div className="bg-gray-50  rounded-lg ">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Investment Dashboard</h1>
            <section className="space-y-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Total Invested"
                        value={user?.totalInvested}
                        change="+2.4%"
                        icon={<FiDollarSign />}
                        color="bg-blue-100"
                    />
                    <MetricCard
                        title="Net Returns"
                        value={user?.netReturns}
                        change="+5.1%"
                        icon={<FiTrendingUp />}
                        color="bg-green-100"
                    />
                    <MetricCard
                        title="Withdrawable"
                        value={user?.walletBalance}
                        change="+1.2%"
                        icon={<FiActivity />}
                        color="bg-purple-100"
                    />
                </div>

                <div className="">
                    <TopPlans plans={transformedPlans} />
                </div>

                {/* Recommended Funds */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                        <FiStar className="text-xl text-yellow-500" />
                        <span>Recommended Funds</span>
                    </h2>
                    {plans.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {plans
                                .sort(() => 0.5 - Math.random()) // Shuffle the array
                                .slice(0, 3).map((plan, index) => (
                                    <div key={index} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                                        <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                                        <p className="text-sm text-gray-500">Risk: <span className="font-medium">{plan.riskLevel}</span></p>
                                        <p className="text-sm text-green-600">Returns: <span className="font-medium">{plan.estimatedROI}%</span></p>
                                        <a href={`explore/${plan._id}`} className="inline-flex items-center text-blue-500 hover:underline mt-2 text-sm">
                                            View Details <FiArrowUpRight className="ml-1" />
                                        </a>
                                    </div>

                                ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No plan recommendations available based on your risk profile.</p>
                    )}
                </div>

                {/* Explore More Funds */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                        <FiList className="text-xl text-green-500" />
                        <span>Explore More Funds</span>
                    </h2>
                    <p className="text-gray-600 mb-4">Browse available investment opportunities and manage your portfolio.</p>
                    <Link href="/personal/explore" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                        View All Funds
                    </Link>
                </div>

                <TransactionAndWithdrawalSection walletBalance={user?.walletBalance} />
            </section>
        </div>
    );
};

const MetricCard = ({ title, value, change, icon, color }: any) => (
    <div className="bg-white p-6 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-600 mb-2">{title}</p>
                <p className="text-2xl font-bold text-gray-800 mb-2">{`$${formatNumberWithCommas(value)}`}</p>
                <span className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {change} vs last month
                </span>
            </div>
            <div className={`${color} p-3 rounded-md text-white flex items-center justify-center`}>
                <span className="text-xl">{icon}</span>
            </div>
        </div>
    </div>
);

export default PersonalDashboard;
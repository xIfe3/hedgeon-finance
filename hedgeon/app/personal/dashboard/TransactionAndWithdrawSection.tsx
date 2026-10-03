import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiArrowUpRight, FiCheckCircle, FiClock, FiDollarSign, FiDownload, FiInfo, FiLoader, FiLock, FiMaximize2, FiShield, FiXCircle, FiZap } from 'react-icons/fi';
import { withdrawApi, getUserTransactions } from '@/app/api/userApi';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Wallet } from "lucide-react"
import { Table } from 'antd';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const WithdrawalSection = ({ walletBalance }: any) => {
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('USDT');
    const [walletAddress, setWalletAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
    const [withdrawalError, setWithdrawalError] = useState('');

    const handleWithdrawal = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setWithdrawalSuccess(false);
        setWithdrawalError('');

        try {
            await withdrawApi({ amount: withdrawalAmount, currency: selectedCurrency, walletAddress });
            setWithdrawalSuccess(true)
        } catch (err: any) {
            setWithdrawalError(`Withdrawal failed: ${err.response.data.message}`);
        } finally {
            setIsSubmitting(false);
        }

        if (!walletAddress || parseFloat(withdrawalAmount) <= 0) {
            setWithdrawalError('Please provide a valid amount and wallet address.');
            setIsSubmitting(false);
            return;
        }

        setWithdrawalAmount('');
        setWalletAddress('');
        setIsSubmitting(false);
    };

    const currencies = ['USDT (TRC-20)', 'BTC', 'SOL', 'ETH'];

    return (
        <div className="bg-white/80 rounded-2xl p-8 mb-8 shadow-md border border-gray-100 backdrop-blur-lg">
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-100 rounded-xl">
                    <FiDownload className="w-7 h-7 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Secure Funds Withdrawal</h2>
                    <p className="text-gray-500 mt-1">Transfer funds to your external wallet</p>
                </div>
            </div>

            {/* Status Alerts */}
            {withdrawalSuccess && (
                <div className="animate-fade-in-up mb-6">
                    <div className="bg-emerald-50/90 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm">
                        <FiCheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                        <div>
                            <p className="font-semibold text-emerald-800">Transaction Completed</p>
                            <p className="text-sm text-emerald-700 mt-1">Funds sent to your wallet (TXID: 0x...a43f)</p>
                        </div>
                    </div>
                </div>
            )}
            {withdrawalError && (
                <div className="animate-shake-x mb-6">
                    <div className="bg-rose-50/90 border border-rose-200 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm">
                        <FiXCircle className="w-6 h-6 text-rose-600 shrink-0" />
                        <div>
                            <p className="font-semibold text-rose-800">Transaction Failed</p>
                            <p className="text-sm text-rose-700 mt-1">{withdrawalError}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleWithdrawal} className="space-y-8">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-50/20 p-6 rounded-lg border border-indigo-100/50">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs font-semibold text-indigo-600/80 uppercase tracking-wide">Available Balance</p>
                            <p className="text-3xl font-bold text-primary mt-2">${walletBalance?.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-white/50 rounded-xl border border-indigo-100">
                            <FiLock className="w-6 h-6 text-indigo-500" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-indigo-600/80 text-sm">
                        <FiInfo className="w-4 h-4" />
                        <span>Funds become withdrawable after 24h security hold</span>
                    </div>
                </div>

                {/* Amount Input Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-gray-700">Withdrawal Amount</label>
                        <button
                            type="button"
                            onClick={() => setWithdrawalAmount(walletBalance || 0)}
                            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <FiZap className="w-4 h-4" />
                            Full Balance
                        </button>
                    </div>
                    <div className="relative group">
                        <div className="relative flex items-center bg-white rounded-md border-2 border-gray-200/80 hover:border-indigo-300 focus-within:border-indigo-400 focus-within:ring-4 ring-indigo-100/50 transition-all">
                            <span className="pl-4 pr-2 text-gray-400">
                                <FiDollarSign className="w-5 h-5" />
                            </span>
                            <input
                                type="number"
                                className="flex-1 py-2 pl-2 pr-4 border-0 bg-transparent text-lg font-semibold outline-none placeholder:text-gray-300"
                                placeholder="0.00"
                                value={withdrawalAmount}
                                onChange={(e) => setWithdrawalAmount(e.target.value)}
                                min="0"
                                step="50"
                                required
                            />
                            <span className="px-4 text-gray-500 font-medium">USD</span>
                        </div>
                    </div>
                </div>

                {/* Currency Selection */}
                <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700">Destination Currency</label>
                    <div className="relative">
                        <select
                            className="w-full py-2 px-4 border-2 border-gray-200/80 rounded-md appearance-none bg-white"
                            value={selectedCurrency}
                            onChange={(e) => setSelectedCurrency(e.target.value)}
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency} className='bg-gray-200'>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Wallet Address Input */}
                <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700">Recipient Wallet Address</label>
                    <div className="flex gap-2 relative">
                        <input
                            type="text"
                            className="flex-1 py-2 px-4 border-2 border-gray-200/80 rounded-md placeholder:text-gray-400 focus:border-indigo-400 focus:ring-4 ring-indigo-100/50 transition-all"
                            placeholder={`Paste ${selectedCurrency} address`}
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors flex items-center justify-center"
                            title="Scan QR Code"
                        >
                            <Wallet className="w-5 h-5 rotate-45" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                        <FiAlertCircle className="w-4 h-4" />
                        Triple-check wallet address - transactions are irreversible
                    </p>
                </div>

                {/* Security Assurance */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                        <FiShield className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Secure Transaction</p>
                        <p className="text-sm text-gray-500 mt-1">256-bit SSL encryption protected</p>
                    </div>
                </div>

                {withdrawalError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3 animate-shake"
                    >
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {withdrawalError}
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
                {withdrawalSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-100 rounded-sm flex items-center space-x-3 animate-shake"
                    >
                        <Alert variant="default">
                            <CheckCircle className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                Your withdrawal request has been received and is pending verification. You will be notified once it is processed.
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className='py-6 px-14 rounded-sm'
                >
                    {isSubmitting ? (
                        <>
                            <FiLoader className="animate-spin w-5 h-5" />
                            <span>Authorizing Transaction...</span>
                        </>
                    ) : (
                        <>
                            <span>Initiate Withdrawal</span>
                        </>
                    )}
                </Button>

                {/* Footer Note */}
                <div className="text-center text-sm text-gray-400 mt-4 flex items-center justify-center gap-2">
                    <FiClock className="w-4 h-4" />
                    <span>Typically processed within 2-5 network confirmations</span>
                </div>
            </form>
        </div>
    );
};


const TransactionHistory = () => {
    // Sample transaction data
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTransactions = async () => {
        setIsLoading(true)
        try {
            const response = await getUserTransactions();
            setTransactions(response.data.transactions)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error fetching transactions:', error);
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])


    // Define columns for the Ant Design Table
    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Plan',
            render: (record: any) => {
                return record.investment?.plan?.planId?.name || "-";
            },
            sorter: (a, b) => {
                const planA = a.investment?.plan?.planId?.name || "";
                const planB = b.investment?.plan?.planId?.name || "";
                return planA.localeCompare(planB);
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: any) => `$${formatNumberWithCommas(amount)}`, // Use render to format currency
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (createdAt: any) => new Date(createdAt).toLocaleDateString(), // Format date
        },
    ];

    return (
        // Keep the outer styling div
        <div className="bg-white shadow rounded-md p-6 mb-6">
            {/* Keep the header */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction History</h2>

            {/* Use Ant Design Table component */}
            {/* Ant Design Table automatically handles empty data when dataSource is an empty array */}
            <Table
                dataSource={transactions} // Pass your data array here
                columns={columns}       // Pass your column definitions here
                rowKey="id"             // Specify the unique key for each row
                loading={isLoading}      // Add loading={true} if fetching data asyncally
            />
        </div>
    );
};

const AutoReinvestOption = () => {
    const [isAutoReinvestEnabled, setIsAutoReinvestEnabled] = useState(false);

    const handleToggleAutoReinvest = () => {
        setIsAutoReinvestEnabled(!isAutoReinvestEnabled);
        // In a real application, you would handle saving this preference.
    };

    return (
        <div className="bg-white shadow rounded-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Auto Reinvestment</h2>
            <div className="flex items-center justify-between">
                <span className="text-gray-700">Automatically reinvest profits and dividends?</span>
                <Switch />
            </div>
            {isAutoReinvestEnabled && (
                <p className="text-sm text-gray-500 mt-2">Your profits and dividends will be automatically reinvested based on your portfolio allocation.</p>
            )}
            {!isAutoReinvestEnabled && (
                <p className="text-sm text-gray-500 mt-2">You will receive profits and dividends as withdrawable balance.</p>
            )}
        </div>
    );
};

const TransactionAndWithdrawalSection = ({ walletBalance }: any) => {
    return (
        <div className="mt-8">
            <WithdrawalSection walletBalance={walletBalance} />
            <TransactionHistory />
            <AutoReinvestOption />
        </div>
    );
};

export default TransactionAndWithdrawalSection;
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { InvestmentPlan } from '../../page';
import { getPlanDetailsApi } from '@/app/api/planApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiAlertCircle, FiArrowLeft, FiArrowUpRight, FiCopy, FiInfo, FiLoader } from 'react-icons/fi';
import { getAllCurrencies } from '@/app/api/utils';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';
import { investApi } from '@/app/api/userApi';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Image from 'next/image';

interface Fee {
    name: string;
    amount: number;
}

interface CryptoAddress {
    currency: string;
    address: string;
    qrCodeUrl: string; // URL for the QR code image
}

const PaymentPage = () => {
    const { planId } = useParams();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState<'form' | 'confirmation' | 'verification'>('form');
    const [plan, setPlan] = useState<InvestmentPlan | null>(null);
    const [investmentAmount, setInvestmentAmount] = useState<number>();
    const [selectedCurrency, setSelectedCurrency] = useState<'BTC' | 'USDT (TRC-20)' | 'ETH' | 'SOL'>('USDT (TRC-20)'); // Default to USDT
    const [fees, setFees] = useState<Fee[]>([]);
    const [estimatedReturn, setEstimatedReturn] = useState<number>(0);
    const [estimatedReturnPerPeriod, setEstimatedReturnPerPeriod] = useState(0);
    const [loadingPlan, setLoadingPlan] = useState(true);
    const [errorPlan, setErrorPlan] = useState<string | null>(null);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [cryptoAddress, setCryptoAddress] = useState<CryptoAddress | null>(null);

    const [initializing, setInitializing] = useState(false);
    const [investmentError, setInvestmentError] = useState('');

    const [selectedDuration, setSelectedDuration] = useState<number>(0);

    const [transactionId, setTransactionId] = useState('');
    const [screenshot, setScreenshot] = useState<File | null>(null);

    const availableCurrencies = ['BTC', 'USDT (TRC-20)', 'ETH', 'SOL'];

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                setLoadingPlan(true);
                const response = await getPlanDetailsApi(planId as string);
                const fetchedPlan = response.data['plan'];

                setPlan(fetchedPlan);
                setSelectedDuration(fetchedPlan.minDuration);

            } catch (err: any) {
                console.error('Error fetching plan details:', err);
                setErrorPlan('Failed to load plan details for investment.');
            } finally {
                setLoadingPlan(false);
            }
        };

        if (planId) {
            fetchPlanDetails();
        }
    }, [planId]);

    useEffect(() => {
        if (plan && typeof investmentAmount === 'number' && investmentAmount > 0) {
            // Use selected duration for calculations
            const periods = selectedDuration;
            const ratePerPeriod = plan.estimatedROI / 100;

            const perPeriodReturn = investmentAmount * ratePerPeriod;
            const totalReturn = perPeriodReturn * periods;

            setEstimatedReturn(totalReturn);
            setEstimatedReturnPerPeriod(perPeriodReturn);
            setFees([]);
        } else {
            setEstimatedReturn(0);
            setEstimatedReturnPerPeriod(0);
            setFees([]);
        }
    }, [plan, investmentAmount, selectedDuration]); // Add selectedDuration to dependencies


    const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = value === '' ? '' : parseFloat(value);
        setInvestmentAmount(numberValue as number);
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value as 'BTC' | 'USDT (TRC-20)' | 'ETH' | 'SOL');
        setCryptoAddress(null); // Clear previous address when currency changes
    };

    const handleInvestNow = async () => {
        if (!plan) {
            toast.error('Investment plan details are not loaded.');
            return;
        }
        if (typeof investmentAmount !== 'number' || investmentAmount <= 0) {
            toast.error('Please enter a valid investment amount.');
            return;
        }
        if (investmentAmount < plan.minAmount || investmentAmount > plan.maxAmount) {
            toast.error(`Amount must be between $${plan.minAmount} and $${plan.maxAmount}.`);
            return;
        }
        if (selectedDuration < plan.minDuration || selectedDuration > plan.maxDuration) {
            toast.error(`Duration must be between ${plan.minDuration}-${plan.maxDuration} ${plan.durationType}`);
            return;
        }


        setProcessingPayment(true);
        try {
            const response = await getAllCurrencies(selectedCurrency);
            const data = await response.data;
            console.log("Currency Fetched:", data)
            setCryptoAddress(data['currency'] as CryptoAddress);
            setCurrentStep('confirmation');
        } catch (error) {
            console.error('Error during investment initiation:', error);
            toast.error('An unexpected error occurred while initiating investment.');
        } finally {
            setProcessingPayment(false);
        }
    };

    const handleInitiateInvestment = async () => {
        setInvestmentError('');
        setInitializing(true);

        if (!transactionId || !screenshot) {
            setInvestmentError("Transaction ID and Screenshot are required.");
            setInitializing(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("planId", plan?._id!);
            formData.append("amount", investmentAmount!.toString());
            formData.append("currency", selectedCurrency);
            formData.append("transactionId", transactionId);
            formData.append("screenshot", screenshot);
            formData.append("duration", selectedDuration.toString());

            const response = await investApi(formData);

            const investmentId = response['data']['investment']['_id']

            router.push(`/personal/investments/${investmentId}/receipt`);
        } catch (error: any) {
            console.log(error);
            setInvestmentError(error?.response?.data?.message || "Something went wrong");
        } finally {
            setInitializing(false);
        }
    };


    if (loadingPlan) {
        return <div className="min-h-screen flex items-center justify-center">Loading payment details...</div>;
    }

    if (errorPlan || !plan) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
                {errorPlan || 'Could not load payment information.'}
                <button onClick={() => router.back()} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Go Back
                </button>
            </div>);
    }


    const renderFormStep = () => (
        <div className="min-h-fit py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-fullax-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-xl">
                <div className="p-8 space-y-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors"
                    >
                        <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Plan
                    </button>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Invest in {plan.name}</h1>
                        <p className="text-gray-500">Choose your investment amount and preferred cryptocurrency</p>
                    </div>

                    <div className="space-y-6">
                        {/* Amount Input */}
                        <div>
                            <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-2">
                                Investment Amount (USD)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="investmentAmount"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder={`$${formatNumberWithCommas(plan.minAmount)} - $${formatNumberWithCommas(plan.maxAmount)}`}
                                    value={investmentAmount}
                                    onChange={handleInvestmentAmountChange}
                                    min={plan.minAmount}
                                    max={plan.maxAmount}
                                />
                                <span className="absolute right-4 top-3.5 text-gray-400">USD</span>
                            </div>
                            {(typeof investmentAmount === 'number' && (investmentAmount < plan.minAmount || investmentAmount > plan.maxAmount)) && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiAlertCircle className="mr-1.5" />
                                    Amount must be between ${formatNumberWithCommas(plan.minAmount)} and ${formatNumberWithCommas(plan.maxAmount)}
                                </p>
                            )}
                        </div>

                        {/* Add this to renderFormStep() */}
                        <div className="space-y-2">
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                                Investment Duration ({plan.durationType})
                            </label>
                            <input
                                type="number"
                                id="duration"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={selectedDuration}
                                onChange={(e) => setSelectedDuration(Math.max(plan.minDuration, Math.min(plan.maxDuration, Number(e.target.value))))}
                                min={plan.minDuration}
                                max={plan.maxDuration}
                                placeholder={`${plan.minDuration} - ${plan.maxDuration}`}
                            />
                            <p className="text-sm text-gray-500">
                                Choose between {plan.minDuration} and {plan.maxDuration} {plan.durationType}
                            </p>
                        </div>

                        {/* Currency Selector */}
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Cryptocurrency
                            </label>
                            <div className="relative">
                                <select
                                    id="currency"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-no-repeat bg-[right_1rem_center] bg-[length:1.5em] transition-all"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236B7280'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e")` }}
                                    value={selectedCurrency}
                                    onChange={handleCurrencyChange}
                                >
                                    {availableCurrencies.map((currency) => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Investment Summary */}
                        {typeof investmentAmount === 'number' && investmentAmount > 0 && (
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h4>
                                <dl className="space-y-3">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Amount</dt>
                                        <dd className="font-medium">${investmentAmount.toLocaleString()}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Duration</dt>
                                        <dd className="font-medium">
                                            {selectedDuration} {plan.durationType}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-200">
                                        <dt className="text-gray-600">Estimated ROI</dt>
                                        <dd className="font-medium">
                                            {plan.estimatedROI}% {plan.durationType === 'weeks' ? 'weekly' : 'monthly'}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-200">
                                        <dt className="text-gray-600">Estimated Return (Complete)</dt>
                                        <dd className="font-medium">
                                            {formatNumberWithCommas(estimatedReturn)}
                                        </dd>

                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-200">
                                        <dt className="text-gray-600">Estimated Return ({plan?.durationType === 'weeks' ? 'weekly' : 'monthly'})</dt>
                                        <dd className="font-medium">
                                            {formatNumberWithCommas(estimatedReturnPerPeriod)}
                                        </dd>

                                    </div>
                                </dl>
                            </div>
                        )}

                        <button
                            onClick={handleInvestNow}
                            disabled={processingPayment}
                            className="w-full bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <div className="flex items-center justify-center">
                                {processingPayment ? (
                                    <>
                                        <FiLoader className="animate-spin mr-3" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FiArrowUpRight className="mr-3" />
                                        Proceed to Payment
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderConfirmationStep = () => (
        <div className="space-y-6">
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                    <FiInfo className="shrink-0 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Payment Instructions</h3>
                </div>

                <p className="text-gray-700 mb-4">
                    Send exactly <span className="font-semibold text-blue-600">${formatNumberWithCommas(investmentAmount as number)}</span> worth of{' '}
                    <span className="font-semibold">{selectedCurrency}</span> to:
                </p>

                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-sm break-all pr-4">{cryptoAddress?.address}</p>
                        <button
                            onClick={() => navigator.clipboard.writeText(cryptoAddress?.address || '')}
                            className="shrink-0 text-blue-600 hover:text-blue-800 p-2 rounded-md"
                        >
                            <FiCopy className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {cryptoAddress?.qrCodeUrl && (
                    <div className="text-center border-t pt-4 mt-4">
                        <p className="text-sm text-gray-600 mb-3">Scan QR Code</p>
                        <Image
                            src={cryptoAddress.qrCodeUrl}
                            alt="QR Code"
                            width={160} // Adjust width as needed
                            height={160} // Adjust height as needed
                            className="inline-block p-2 bg-white rounded-lg border border-gray-200"
                        />
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setCurrentStep('form');
                            setCryptoAddress(null);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Amount Selection
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h4>
                <dl className="space-y-3">
                    <div className="flex justify-between">
                        <dt className="text-gray-600">Plan Name</dt>
                        <dd className="font-medium">{plan.name}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-600">Investment Amount</dt>
                        <dd className="font-medium">${formatNumberWithCommas(investmentAmount as number)}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-600">Payment Currency</dt>
                        <dd className="font-medium">{selectedCurrency}</dd>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                        <dt className="text-green-700">Estimated Return</dt>
                        <dd className="font-semibold text-green-700">${formatNumberWithCommas(estimatedReturn)}</dd>
                    </div>
                    {/* In both renderFormStep and renderConfirmationStep */}
                    <div className="flex justify-between">
                        <dt className="text-gray-600">Duration</dt>
                        <dd className="font-medium">
                            {selectedDuration} {plan.durationType}
                        </dd>
                    </div>
                </dl>
            </div>

            {investmentError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3 animate-shake"
                >
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {investmentError}
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}

            <button
                onClick={() => setCurrentStep('verification')}
                className="w-full bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
                <div className="flex items-center justify-center">
                    <FiArrowUpRight className="mr-3" />
                    Confirm Deposit
                </div>
            </button>
        </div>
    );

    const renderConfirmPayment = () => (
        <div className="space-y-6">
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 space-y-4">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
                            Transaction ID
                        </label>
                        <input
                            type="text"
                            id="transactionId"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Paste your transaction ID here"
                        />
                    </div>

                    <div>
                        <label htmlFor="screenshot" className="block text-sm font-medium text-gray-700 mb-1">
                            Screenshot of Payment
                        </label>
                        <input
                            type="file"
                            id="screenshot"
                            accept="image/*"
                            onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                            required
                            className="w-full text-gray-700 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {investmentError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3 animate-shake"
                    >
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {investmentError}
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}

                <button
                    onClick={handleInitiateInvestment}
                    disabled={initializing}
                    className="w-full bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                    <div className="flex items-center justify-center">
                        {initializing ? (
                            <>
                                <FiLoader className="animate-spin mr-3" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <FiArrowUpRight className="mr-3" />
                                Make Investment
                            </>
                        )}
                    </div>
                </button>
            </div>
        </div>
    )

    const renderStep = () => {
        switch (currentStep) {
            case 'form':
                return renderFormStep();
            case 'confirmation':
                return renderConfirmationStep();
            case 'verification':
                return renderConfirmPayment();
            default:
                return null;
        }
    };


    return (
        <div className="min-h-screen py-12 px-2 sm:px-2 lg:px-8">
            <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden transition-all duration-200">
                <div className="space-y-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors"
                    >
                        <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Plan
                    </button>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {currentStep === 'form'
                                ? 'Invest in'
                                : currentStep === 'confirmation'
                                    ? 'Make deposit for'
                                    : 'Upload Transaction for'} {plan.name}
                        </h1>

                        <p className="text-gray-500">
                            {currentStep === 'form'
                                ? 'Choose your investment amount and preferred cryptocurrency'
                                : currentStep === 'confirmation'
                                    ? 'Complete your investment by sending the payment'
                                    : 'Upload your transaction screenshot or hash for verification'}
                        </p>
                    </div>

                    <>
                        {renderStep()}
                    </>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
import planModel from "../models/plan.model";
import currencyModel from "../models/currency"

const investmentPlans = [
    {
        name: "Trial Package",
        minAmount: 5000,
        maxAmount: 15000,
        minDuration: 3, // minimum duration
        maxDuration: 6, // maximum duration
        durationType: "weeks",
        estimatedROI: 5, // weekly
        taxOnProfit: 0,
        referralBonus: 3,
        riskLevel: "CONSERVATIVE",
        benefits: [
            "Hands-on experience with fund management",
            "Monthly profit payouts",
            "Access to selected market reports",
            "Flexible upgrade options—move to Basic, Standard, or Premium anytime",
            "Dedicated investment advisor for plan optimization"
        ],
        status: true,
        createdAt: new Date()
    },
    {
        name: "Basic Package",
        minAmount: 30000,
        maxAmount: 70000,
        minDuration: 6, // minimum duration
        maxDuration: 12, // maximum duration
        durationType: "months",
        estimatedROI: 7,
        taxOnProfit: 10,
        referralBonus: 5,
        riskLevel: "MODERATE",
        benefits: [
            "Managed portfolio in forex, stocks & real estate",
            "Access to basic market insights & trend reports",
            "Monthly profit withdrawals allowed",
            "Risk-managed strategies to ensure portfolio stability"
        ],
        status: true,
        createdAt: new Date()
    },
    {
        name: "Standard Package",
        minAmount: 100000,
        maxAmount: 500000,
        minDuration: 12, // minimum duration
        maxDuration: 24, // maximum duration
        durationType: "months",
        estimatedROI: 11,
        taxOnProfit: 15,
        referralBonus: 7,
        riskLevel: "AGGRESSIVE",
        benefits: [
            "Advanced asset allocation in forex, stocks, hedge funds, & real estate",
            "Personal financial advisor for portfolio optimization",
            "Quarterly performance reports & risk analysis",
            "Higher withdrawal limits & priority support",
            "Invitation to exclusive investment webinars & training"
        ],
        status: true,
        createdAt: new Date()
    },
    {
        name: "Premium Package",
        minAmount: 500000,
        maxAmount: 1500000,
        minDuration: 24, // minimum duration
        maxDuration: 36, // maximum duration
        durationType: "months",
        estimatedROI: 15,
        taxOnProfit: 20,
        referralBonus: 10,
        riskLevel: "AGGRESSIVE",
        benefits: [
            "VIP asset management across forex, stocks, hedge funds, private equity, & luxury real estate",
            "Dedicated investment manager with custom portfolio adjustments",
            "Exclusive access to private hedge funds & high-yield opportunities",
            "Tax-efficient investment strategies & wealth preservation plans",
            "Priority withdrawals with same-day processing",
            "Access to private investor events & networking sessions"
        ],
        status: true,
        createdAt: new Date()
    }
];


const currencies = [
    {
        name: 'USDT (TRC-20)',
        address: 'TKevn6mrvWitruLsruftTATtjnX1bek3u9', // Replace with your actual USDT address
        qrCodeUrl: 'https://res.cloudinary.com/dfeoowyra/image/upload/fl_preserve_transparency/v1746865902/USDT%20QR%20Code.jpg?_s=public-apps'
    },
    {
        name: 'BTC',
        address: 'bc1q6ujvvxafu4td0wpfm4eujyyrxec45wvu8m95lf',     // Replace with your actual BTC address
        qrCodeUrl: 'https://res.cloudinary.com/dfeoowyra/image/upload/fl_preserve_transparency/v1746865995/Bitcoin%20QR%20Code.jpg?_s=public-apps'
    },
    {
        name: 'ETH',
        address: '0x27F9165b31036D254E449325ef70c6bB4a998eAB',     // Replace with your actual ETH address
        qrCodeUrl: 'https://res.cloudinary.com/dfeoowyra/image/upload/fl_preserve_transparency/v1746865813/Ethereum%20QR%20Code.jpg?_s=public-apps',
    },
    {
        name: 'SOL',
        address: 'Bo47XfDUKcb31Bbq6661NoVZjZuW26s9Af7BK1mhn4ut',     // Replace with your actual TRX address
        qrCodeUrl: 'https://res.cloudinary.com/dfeoowyra/image/upload/fl_preserve_transparency/v1746865865/Solana%20QR%20Code.jpg?_s=public-apps'
    },
]

export const insertInvestmentPlans = async () => {
    try {
        for (const plan of investmentPlans) {
            const existingPlan = await planModel.findOne({ name: plan.name });

            if (!existingPlan) {
                await planModel.create(plan);
                console.log(`✅ Plan '${plan.name}' inserted successfully`);
            } else {
                console.log(`ℹ️ Plan '${plan.name}' already exists`);
            }
        }
        console.log("✅ Investment plan insertion process completed");
    } catch (error) {
        console.error("❌ Error adding predefined investment plans:", error);
    }
};

export const insertCurrency = async () => {
    try {
        for (const currency of currencies) {
            const existingCurrency = await currencyModel.findOne({ name: currency.name });

            if (!existingCurrency) {
                await currencyModel.create(currency);
                console.log(`✅ Currency '${currency.name}' inserted successfully`);
            } else {
                console.log(`ℹ️ Currency '${currency.name}' already exists`);
            }
        }
        console.log("✅ Configurrency insertion process completed");
    } catch (error) {
        console.error("❌ Error adding predefined currency:", error);
    }
};

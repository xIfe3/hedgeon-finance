import mongoose from "mongoose";

export interface IPlan {
    name: string;
    minAmount: number,
    maxAmount: number,
    minDuration: number; // Minimum duration (in weeks or months)
    maxDuration: number; // Maximum duration (in weeks or months)
    durationType: 'weeks' | 'months'; // <- this is new
    estimatedROI: number,
    taxOnProfit: number,
    referralBonus: number,
    riskLevel: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE'
    benefits: string[],
    status: boolean
    createdAt: Date
}

const planSchema = new mongoose.Schema<IPlan>(
    {
        name: {
            type: String,
            required: true,
        },
        minAmount: Number,
        maxAmount: Number,
        minDuration: {
            type: Number,
            required: true,
        },
        maxDuration: {
            type: Number,
            required: true,
        },
        durationType: {
            type: String,
            enum: ['weeks', 'months'],
            default: 'months'
        },
        estimatedROI: Number,
        taxOnProfit: Number,
        referralBonus: Number,
        riskLevel: String,
        benefits: {
            type: [String],
            required: true
        },
        status: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Plan ||
    mongoose.model<IPlan>("Plan", planSchema);

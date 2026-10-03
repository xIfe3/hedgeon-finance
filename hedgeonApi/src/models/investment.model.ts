import mongoose from "mongoose";
import { Currency } from "./transaction.model";

export interface IInvestment {
    user: mongoose.Schema.Types.ObjectId;
    plan: {
        planId: mongoose.Types.ObjectId;
        name: string;
    };
    amount: number;
    startDate: Date;
    endDate: string;
    roiAccumulated: number,
    autoReinvest: boolean,
    isReinvestment: boolean;
    status: "active" | "completed" | "pending" | "cancelled";
    profitAccumulated: number;
    currency: string
    transactionId: string
    receiptUrl: string
}

const investmentSchema = new mongoose.Schema<IInvestment>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: {
        planId: {
            type: mongoose.Types.ObjectId,
            ref: "Plan",
            default: null,
        },
        name: { type: String, default: null },
    },
    amount: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: String, required: true },
    roiAccumulated: Number,
    autoReinvest: {
        type: Boolean,
        default: false
    },
    currency: {
        type: String,
        enum: Object.values(Currency),
    },
    transactionId: String,
    receiptUrl: String,
    isReinvestment: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "completed", "pending", "cancelled"], default: "pending" },
});

export default mongoose.models.Investment ||
    mongoose.model<IInvestment>("Investment", investmentSchema);

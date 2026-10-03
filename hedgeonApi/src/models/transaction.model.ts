import mongoose, { Schema } from 'mongoose';

export enum Currency {
    USDT = 'USDT (TRC-20)',
    BTC = 'BTC',
    SOL = 'SOL',
    ETH = 'ETH'
}

export enum TransactionType {
    WITHDRAWAL = 'WITHDRAWAL',
    TRANSFER = 'TRANSFER',
    INVESTMENT = 'INVESTMENT',
    FEE = 'FEE'
}

// Interface for Transaction document
export interface ITransaction {
    userId: Schema.Types.ObjectId;
    amount: number;
    currency: Currency;
    type: TransactionType;
    investment?: Schema.Types.ObjectId;
    proofUrl?: string;
    txHash?: string;
    status: string;
    createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            enum: Object.values(Currency),
            required: true
        },
        type: {
            type: String,
            enum: Object.values(TransactionType),
            required: true,
        },
        investment: {
            type: Schema.Types.ObjectId,
            ref: 'Investment',
        },
        proofUrl: {
            type: String,
        },
        txHash: {
            type: String,
        },
        status: {
            type: String,
            default: 'PENDING',
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

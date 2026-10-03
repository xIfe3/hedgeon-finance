import { Request, Response } from "../utils/Types";
import withdrawalModel from "../models/withdrawal.model";
import asynchHandler from "express-async-handler";
import { logData, logError } from "../utils/logger";
import { getUserById } from "../services/user.service";
import { BadRequestError } from "../utils/errors";
import sendEmail from "../utils/mailer";

export const withdrawalHandler = asynchHandler(
    async (req: Request, res: Response) => {
        const { amount, currency, walletAddress } = req.body;

        // Get user details
        const user = await getUserById(req.session.user.id);

        // Validate sufficient funds
        if (user.walletBalance < amount) {
            return logError(res, new BadRequestError("Insufficient wallet balance to withdraw"));
        }

        // Deduct funds
        user.walletBalance -= amount;

        // Create withdrawal record
        const withdrawal = await withdrawalModel.create({
            userId: user?._id,
            amount,
            currency,
            walletAddress
        });

        // Add notification
        const notificationMessage = `You initiated a withdrawal of $${amount} in ${currency} to wallet address: ${walletAddress}. It is currently pending verification.`;
        user.notifications.push({
            message: notificationMessage,
            type: 'withdrawal',
            date: new Date(),
            read: false
        });

        try {
            // Save updated user data with new balance and notification
            await user.save();

            // Send withdrawal email
            await sendEmail(
                user.email,
                'Withdrawal Request Received',
                'withdrawalNotification',
                {
                    userName: user.name || 'User',
                    amount,
                    currency,
                    walletAddress,
                    message: notificationMessage,
                    date: new Date().toDateString()
                }
            );
        } catch (error) {
            console.error('Failed to send withdrawal notification or email:', error);
        }

        return logData(res, 201, {
            message: "Your withdrawal request has been received and is pending verification. You will be notified once it is processed."
        });
    }
);


export const getAllWithdrawals = asynchHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);

        const withdrawals = await withdrawalModel.find({ userId: user?._id });

        return logData(res, 201, { withdrawals });
    }
);

export const getTotalWithdrawal = asynchHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);

        const withdrawals = await withdrawalModel.find({
            userId: user?._id,
            status: "approved",
        });

        let totalAmount = 0;
        withdrawals.forEach((withdrawal) => {
            totalAmount += withdrawal.amount;
        });

        return logData(res, 201, { totalAmount });
    }
);

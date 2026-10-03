import { Request, Response } from "../utils/Types";
import asyncHandler from "express-async-handler";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors";
import { logData, logError } from "../utils/logger";
import { getUserById } from "../services/user.service";
import planModel from "../models/plan.model";
import Investment from "../models/investment.model";
import Transaction from "../models/transaction.model";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import userModel from "../models/user.model";
import sendEmail from "../utils/mailer";

export const createInvestment = asyncHandler(
    async (req: Request, res: Response) => {
        const { planId, amount, currency, transactionId, duration } = req.body;
        const user = await getUserById(req.session.user.id);
        const numericDuration = Number(duration);

        if (!planId || !amount || !transactionId || !req.file) {
            return logError(res, new BadRequestError("All fields are required"));
        }

        const buffer = req.file.buffer;
        const uploadToCloudinary = (): Promise<string> => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: "investment_receipts" }, (error, result) => {
                    if (result?.secure_url) resolve(result.secure_url);
                    else reject(error);
                });

                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        let receiptUrl;
        try {
            receiptUrl = await uploadToCloudinary();
        } catch (err) {
            return logError(res, new InternalServerError("Failed to upload receipt"));
        }

        // Get selected plan
        const plan = await planModel.findById(planId);
        if (!plan) return logError(res, new NotFoundError("Investment plan not found"))

        // Validate investment amount
        if (amount < plan.minAmount) {
            return logError(res, new BadRequestError(
                `Minimum investment for this plan is ${plan.minAmount}`
            ));
        }

        if (amount > plan.maxAmount) {
            return logError(res, new BadRequestError(`Maximum investment for this plan is ${plan.maxAmount}`));
        }

        if (
            isNaN(numericDuration) ||
            numericDuration < plan.minDuration ||
            numericDuration > plan.maxDuration
        ) {
            return logError(res, new BadRequestError('Invalid duration value'));
        }


        const startDate = new Date();
        const endDate = new Date(startDate);


        // Use the duration passed from frontend (after validation)
        if (plan.durationType === 'months') {
            endDate.setMonth(endDate.getMonth() + numericDuration); // Now uses numeric addition
        } else if (plan.durationType === 'weeks') {
            endDate.setDate(endDate.getDate() + (numericDuration * 7));
        }

        // Create investment
        const investment = await Investment.create({
            user: user._id,
            plan: {
                planId: plan._id,
                name: plan.name,
            },
            currency,
            amount,
            startDate,
            endDate,
            transactionId,
            receiptUrl, // ✅ Save receipt image URL
        });

        const planData = {
            planId: plan._id,
            investmentId: investment._id,
            name: plan.name,
            startDate: new Date(),
            endDate: investment.endDate,
            investedAmount: amount,
            daysGone: 0,
            roiAccumulated: 0,
            status: investment.status
        };

        // Ensure currentPlan exists and is an array
        if (!Array.isArray(user.currentPlan)) {
            user.currentPlan = [];
        }

        user.currentPlan.push(planData);
        await user.save();

        // Create transaction record
        await Transaction.create({
            userId: user._id,
            amount,
            investment,
            type: "INVESTMENT",
            status: "COMPLETED",
            currency
        });

        const notificationMessage = `Your investment in the "${plan.name}" plan was successful.`;
        user.notifications.push({
            message: notificationMessage,
            type: 'investment_created',
            date: new Date(),
            read: false
        });

        try {
            await user.save(); // This already exists, so ensure you don’t duplicate this save

            // Send email
            await sendEmail(
                user.email,
                'Investment Created Successfully',
                'investmentCreated',
                {
                    userName: user.name || 'User',
                    message: notificationMessage,
                    planName: plan.name,
                    amount,
                    startDate: startDate.toDateString(),
                    endDate: endDate.toDateString()
                }
            );
        } catch (error) {
            console.error('Failed to save notification or send email:', error);
        }


        logData(res, 201, {
            success: true,
            investment,
            newBalance: user.walletBalance,
        });
    }
);

export const reinvestEarnings = asyncHandler(
    async (req: Request, res: Response) => {
        const { amount, planId } = req.body;
        const user = await getUserById(req.session.user.id);

        if (!user.currentPlan?.roiAccumulated || user.currentPlan.roiAccumulated < amount) {
            throw new BadRequestError("Insufficient ROI earnings for reinvestment");
        }

        const plan = await planModel.findById(planId);
        if (!plan) throw new NotFoundError("Plan not found");

        // Deduct from ROI
        user.currentPlan.roiAccumulated -= amount;
        user.walletBalance += amount; // Add back to wallet for reinvestment

        // Create new investment
        const investment = await Investment.create({
            user: user._id,
            plan: {
                planId: plan._id,
                name: plan.name,
            },
            amount,
            isReinvestment: true,
            startDate: new Date(),
            endDate: new Date(Date.now() + plan.duration * 86400000),
        });

        // Update user's wallet and plan
        user.walletBalance -= amount;
        user.currentPlan = {
            planId: plan._id,
            name: plan.name,
            startDate: new Date(),
            endDate: investment.endDate,
            investedAmount: amount,
            roiAccumulated: 0,
            status: investment.status
        };

        await user.save();

        const notificationMessage = `You successfully reinvested $${amount} into the "${plan.name}" plan.`;
        user.notifications.push({
            message: notificationMessage,
            type: 'reinvestment',
            date: new Date(),
            read: false
        });

        try {
            await user.save(); // Already being called, so keep this outside if it's already used

            await sendEmail(
                user.email,
                'Reinvestment Successful',
                'reinvestmentNotification',
                {
                    userName: user.name || 'User',
                    message: notificationMessage,
                    amount,
                    planName: plan.name,
                    startDate: investment.startDate.toDateString(),
                    endDate: investment.endDate.toDateString()
                }
            );
        } catch (error) {
            console.error('Failed to send reinvestment notification or email:', error);
        }


        logData(res, 200, {
            success: true,
            investment,
            newROIBalance: user.currentPlan.roiAccumulated,
        });
    }
);

export const getUserInvestments = asyncHandler(async (req: Request, res: Response) => {
    const user = await getUserById(req.session.user.id);
    if (!user) throw new BadRequestError("User not found");

    const investments = await Investment.find({ user: user._id }).sort({ startDate: -1 });
    logData(res, 200, { success: true, investments });
});

export const getInvestmentById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("Investment ID", id)
    const investment = await Investment.findById(id);
    if (!investment) throw new NotFoundError("Investment not found");

    logData(res, 200, { success: true, investment });
});

export const updateUserInvestments = async () => {
    const users = await userModel.find({ currentPlan: { $exists: true, $not: { $size: 0 } } });

    console.log("users", users)

    for (const user of users) {
        let updated = false;

        for (const plan of user.currentPlan) {
            const planDetails = await planModel.findById(plan.planId);

            if (!planDetails) continue;

            const today = new Date();
            const startDate = new Date(plan.startDate);
            const endDate = new Date(plan.endDate);
            const isExpired = today >= endDate;

            if (isExpired) {
                // Move to pastPlans
                user.pastPlans.push({
                    planId: plan.planId,
                    name: plan.name,
                    startDate: plan.startDate,
                    endDate: plan.endDate,
                    investedAmount: plan.investedAmount,
                    roiAccumulated: plan.roiAccumulated,
                });

                // Remove from currentPlan
                user.currentPlan = user.currentPlan.filter((p: any) => p.planId.toString() !== plan.planId.toString());
                updated = true;
                continue;
            }


            // Calculate difference in days
            const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const daysToApply = daysSinceStart - plan.daysGone;

            if (daysToApply > 0) {
                const roiRate = planDetails.estimatedROI / 100;
                let periodsToApply = 0;

                if (planDetails.durationType === "weeks") {
                    periodsToApply = Math.floor(daysToApply / 7);
                } else if (planDetails.durationType === "months") {
                    periodsToApply = Math.floor(daysToApply / 30); // Approximate monthly
                }

                if (periodsToApply > 0) {
                    const roiPerPeriod = plan.investedAmount * roiRate;
                    const totalNewROI = periodsToApply * roiPerPeriod;

                    plan.roiAccumulated += totalNewROI;
                    plan.daysGone += daysToApply;

                    user.walletBalance += totalNewROI;
                    user.netReturns += totalNewROI;
                    updated = true;

                    user.notifications.push({
                        message: `You just earned $${totalNewROI.toFixed(2)} from your "${plan.name}" plan.`,
                        type: 'roi'
                    });

                    try {
                        await sendEmail(
                            user.email,
                            'ROI Earnings Update',
                            'roiUpdate',
                            {
                                userName: user.name || 'User',
                                message: `You just earned $${totalNewROI.toFixed(2)} from your "${plan.name}" plan.`,
                                roi: totalNewROI.toFixed(2),
                                planName: plan.name
                            }
                        );
                    } catch (emailError) {
                        console.error(`Failed to send ROI email to ${user.email}:`, emailError);
                    }

                }
            }
        }

        if (updated) {
            await user.save();
        }
    }

    return { message: "Investments updated successfully" };
};

export const allocateProfit = asyncHandler(async (req: Request, res: Response) => {
    const result = await updateUserInvestments();
    res.status(200).json(result);
})

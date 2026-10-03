import Investment from "../models/investment.model";
import KYC from "../models/kyc";
import Notification from "../models/notification.model";
import PayoutTracker from "../models/payoutTracker.model";
import Plan from "../models/plan.model";
import Transaction from "../models/transaction.model";
import User from "../models/user.model";
import Withdrawal from "../models/withdrawal.model";
import MerchantApplication from "../models/marchant.model";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors";
import { logError } from "../utils/logger";
import sendEmail from "../utils/mailer";
import userModel from "../models/user.model";

// -------------------- Investment Views --------------------
export const getAllInvestmentsView = asyncHandler(async (req: Request, res: Response) => {
    const investments = await Investment.find().populate('user', 'name email').populate('plan.planId', 'name');
    res.status(200).json(investments);
});

export const getInvestmentByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { investmentId } = req.params;
    const investment = await Investment.findById(investmentId).populate('user', 'name email').populate('plan.planId', 'name');
    if (!investment) {
        throw new NotFoundError(`Investment with ID ${investmentId} not found`);
    }
    res.status(200).json(investment);
});

export const getInvestmentsByUserView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const investments = await Investment.find({ user: userId }).populate('plan.planId', 'name');
    res.status(200).json(investments);
});

export const updateInvestmentStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const { id, status } = req.params;
        console.log(id);

        if (!['active', 'paused', 'completed', 'cancelled'].includes(status)) {
            return logError(res, new BadRequestError("Invalid status"));
        }

        const investment = await Investment.findById(id);
        if (!investment) {
            return logError(res, new NotFoundError("Investment not found"));
        }

        investment.status = status as 'active' | 'paused' | 'completed' | 'cancelled';
        await investment.save();

        const user = await User.findById(investment.user);
        if (!user) {
            return logError(res, new NotFoundError(`User not found for Investment ID: ${id}, User ID: ${investment.user}`));
        }

        // === 📌 Update currentPlan or move to pastPlans ===
        const currentPlanIndex = user.currentPlan.findIndex((plan: any) =>
            plan.investmentId?.toString() === investment._id.toString()
        );

        if (status === 'active' && currentPlanIndex !== -1) {
            // Update the current plan's status
            user.currentPlan[currentPlanIndex].status = 'active';
        }

        if ((status === 'completed' || status === 'cancelled') && currentPlanIndex !== -1) {
            const finishedPlan = user.currentPlan.splice(currentPlanIndex, 1)[0];
            finishedPlan.status = status;
            user.pastPlans.push(finishedPlan);
        }

        // === 🛎️ Add Notification ===
        const notificationMessage = `The status of your investment (Plan: ${investment.plan.name || 'N/A'}) has been updated to ${status}.`;
        const notificationType = 'investment_status';

        user.notifications.push({
            message: notificationMessage,
            type: notificationType,
            date: new Date(),
            read: false
        });

        // === 💾 Save user and handle errors ===
        try {
            await user.save();
        } catch (dbError) {
            console.log(`Failed to save notification for user ${user._id}: `, dbError);
            return logError(res, new InternalServerError(`Failed to save notification for user ${user._id}`));
        }

        // === 📧 Send Email Notification ===
        try {
            const emailSubject = `Update Regarding Your Recent Investment`;
            const templateData = {
                userName: user.name || 'User',
                message: notificationMessage,
                status
            };
            await sendEmail(user.email, emailSubject, 'investmentStatusUpdate', templateData);
        } catch (emailError) {
            console.error(`Failed to send investment status email to ${user.email}:`, emailError);
            return logError(res, new InternalServerError(`Failed to send investment status email to ${user.email}`));
        }

        const updatedInvestment = await Investment.findById(id)
            .populate('user', 'name email')
            .populate('plan.planId', 'name');

        res.status(200).json({ message: 'Investment status updated', updatedInvestment });
    }
);

export const updateInvestmentAdmin = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const {
            investmentAmount,
            startDate,
            endDate,
            roiAccumulated,
            autoReinvest,
            isReinvestment,
            profitAccumulated
        } = req.body;

        const investment = await Investment.findByIdAndUpdate(
            id,
            {
                amount: investmentAmount,
                startDate,
                endDate,
                roiAccumulated,
                autoReinvest,
                isReinvestment,
                profitAccumulated
            },
            { new: true }
        );

        if (!investment) {
            res.status(404).json({ message: 'Investment not found' });
            return;
        }

        res.status(200).json({ message: 'Investment updated', investment });
    }
);


// -------------------- KYC Views --------------------
export const getAllKYCSubmissionsView = asyncHandler(async (req: Request, res: Response) => {
    const kycSubmissions = await KYC.find().populate('userId', 'name email');
    res.status(200).json(kycSubmissions);
});

export const getKYCByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { kycId } = req.params;
    const kyc = await KYC.findById(kycId).populate('userId', 'name email');
    if (!kyc) {
        throw new NotFoundError(`KYC submission with ID ${kycId} not found`);
    }
    res.status(200).json(kyc);
});

export const getKYCByUserIdView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const kyc = await KYC.findOne({ userId: userId });
    res.status(200).json(kyc);
});

export const updateKYCVerificationStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { verified } = req.body;

        if (typeof verified !== 'boolean') {
            res.status(400).json({ message: 'Invalid verification status. Must be a boolean.' });
            return;
        }

        const kyc = await KYC.findById(id); // Find KYC first to get userId

        if (!kyc) {
            return logError(res, new NotFoundError("KYC Submission not found"))
        }

        // Now update the KYC status
        kyc.verified = verified;
        await kyc.save();

        // Find the user associated with this KYC
        const user = await User.findById(kyc.userId);

        if (!user) {
            console.error(`User not found for KYC ID: ${id}, User ID: ${kyc.userId}`);
            return logError(res, new NotFoundError("User not found"))
        } else {
            // --- Notification Logic ---
            const notificationMessage = `Your KYC submission has been ${verified ? 'approved' : 'rejected'}.`;
            const notificationType = 'kyc_status';

            // 1. Add notification to User model
            user.notifications.push({
                message: notificationMessage,
                type: notificationType,
                date: new Date(),
                read: false
            });
            try {
                await user.save();
            } catch (dbError) {
                return logError(res, new InternalServerError(`Failed to save notification for user ${user._id}`))
            }

            // 2. Send Email Notification
            const emailSubject = `KYC Status Update`;
            const templateName = "kycStatus"

            try {
                // Data to pass into the template
                const templateData = {
                    userName: user.name || 'User',
                    message: notificationMessage,
                    status: verified ? 'approved' : 'rejected',
                };

                await sendEmail(user.email, emailSubject, templateName, templateData);
            } catch (emailError) {
                return logError(res, new InternalServerError(`Failed to send KYC status email to ${user.email}: ${emailError}`))
            }
        }

        // Populate user details for the response (optional, based on your original code)
        const populatedKyc = await KYC.findById(id).populate('userId', 'name email');


        res.status(200).json({
            message: `KYC verification status updated to ${verified ? 'Verified' : 'Rejected'}`,
            data: populatedKyc // Send populated KYC back
        });
    }
);


// -------------------- Notification Views --------------------
export const getAllNotificationsView = asyncHandler(async (req: Request, res: Response) => {
    const notifications = await Notification.find().populate('userId', 'name email');
    res.status(200).json(notifications);
});

export const getNotificationByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId).populate('userId', 'name email');
    if (!notification) {
        throw new NotFoundError(`Notification with ID ${notificationId} not found`);
    }
    res.status(200).json(notification);
});

export const getNotificationsByUserView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId: userId });
    res.status(200).json(notifications);
});


// -------------------- PayoutTracker Views --------------------
export const getAllPayoutTrackersView = asyncHandler(async (req: Request, res: Response) => {
    const payoutTrackers = await PayoutTracker.find().populate('userId', 'name email').populate('investmentId', 'amount plan.name');
    res.status(200).json(payoutTrackers);
});

export const getPayoutTrackerByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { payoutTrackerId } = req.params;
    const payoutTracker = await PayoutTracker.findById(payoutTrackerId).populate('userId', 'name email').populate('investmentId', 'amount plan.name');
    if (!payoutTracker) {
        throw new NotFoundError(`Payout Tracker with ID ${payoutTrackerId} not found`);
    }
    res.status(200).json(payoutTracker);
});

export const getPayoutTrackerByInvestmentView = asyncHandler(async (req: Request, res: Response) => {
    const { investmentId } = req.params;
    const payoutTracker = await PayoutTracker.findOne({ investmentId: investmentId }).populate('userId', 'name email').populate('investmentId', 'amount plan.name');
    res.status(200).json(payoutTracker);
});


// -------------------- Plan Views --------------------
export const getAllPlansView = asyncHandler(async (req: Request, res: Response) => {
    const plans = await Plan.find();
    res.status(200).json(plans);
});

export const getPlanByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { planId } = req.params;
    const plan = await Plan.findById(planId);
    if (!plan) {
        throw new NotFoundError(`Plan with ID ${planId} not found`);
    }
    res.status(200).json(plan);
});

export const createPlanView = asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        minAmount,
        maxAmount,
        minDuration,
        maxDuration,
        durationType,
        estimatedROI,
        taxOnProfit,
        referralBonus,
        riskLevel,
        benefits,
        status
    } = req.body;

    const existingPlan = await Plan.findOne({ name });
    if (existingPlan) {
        res.status(400).json({ message: "Plan with this name already exists" });
    }

    const newPlan = await Plan.create({
        name,
        minAmount,
        maxAmount,
        minDuration,
        maxDuration,
        durationType,
        estimatedROI,
        taxOnProfit,
        referralBonus,
        riskLevel,
        benefits,
        status
    });

    res.status(201).json({ message: "Plan created successfully", plan: newPlan });
});

export const updatePlanView = asyncHandler(async (req: Request, res: Response) => {
    const { planId } = req.params;

    const updatedPlan = await Plan.findByIdAndUpdate(planId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedPlan) {
        throw new NotFoundError(`Plan with ID ${planId} not found`);
    }

    res.status(200).json({ message: "Plan updated successfully", plan: updatedPlan });
});

export const deletePlanView = asyncHandler(async (req: Request, res: Response) => {
    const { planId } = req.params;

    const plan = await Plan.findByIdAndDelete(planId);
    if (!plan) {
        throw new NotFoundError(`Plan with ID ${planId} not found`);
    }

    res.status(200).json({ message: "Plan deleted successfully" });
});



// -------------------- Transaction Views --------------------
export const getAllTransactionsView = asyncHandler(async (req: Request, res: Response) => {
    const transactions = await Transaction.find().populate('userId', 'name email');
    res.status(200).json(transactions);
});

export const getTransactionByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId).populate('userId', 'name email');
    if (!transaction) {
        throw new NotFoundError(`Transaction with ID ${transactionId} not found`);
    }
    res.status(200).json(transaction);
});

// -------------------- User Views --------------------
export const getAllUsersView = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
});

export const getUserByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError(`User with ID ${userId} not found`);
    }
    res.status(200).json(user);
});

export const updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { active, suspended } = req.body;

    // Validate that either 'active' or 'suspended' is provided
    if (active === undefined && suspended === undefined) {
        res.status(400).json({ message: 'Please provide either "active" or "suspended" in the request body' });
        return;
    }

    // Construct the update object
    const updateFields: { active?: boolean; suspended?: boolean } = {};
    if (active !== undefined) {
        updateFields.active = active;
    }
    if (suspended !== undefined) {
        updateFields.suspended = suspended;
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true, // Return the updated user
        runValidators: true, // Run schema validation
    }).select('-password'); // Exclude the password field from the response

    if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.status(200).json({
        message: 'User status updated successfully',
        data: updatedUser,
    });
});

export const viewUserReferralsView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('referrals.userId', 'name email');
    if (!user) {
        throw new NotFoundError(`User with ID ${userId} not found`);
    }
    res.status(200).json(user.referrals);
});

export const verifyUserEmail = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { verified } = req.body;

    // Validate that 'verified' is provided
    if (verified === undefined) {
        res.status(400).json({ message: 'Please provide "verified" in the request body' });
        return;
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isVerified: verified }, // Use isVerified to match your model
        {
            new: true, // Return the updated user
            runValidators: true, // Run schema validation
        }
    ).select('-password'); // Exclude the password field

    if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.status(200).json({
        message: 'User email verification status updated successfully',
        data: updatedUser,
    });
});

export const updateUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        const {
            name,
            email,
            phone
        } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                phone,
            },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User updated', user });
    }
);

export const deleteUserView = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError(`User with ID ${userId} not found`);
    }

    // Delete user-related documents
    await Promise.all([
        Investment.deleteMany({ user: userId }),
        KYC.deleteMany({ userId }),
        Notification.deleteMany({ userId }),
        PayoutTracker.deleteMany({ userId }),
        Transaction.deleteMany({ userId }),
        Withdrawal.deleteMany({ userId })
    ]);

    // Delete the user itself
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User and all related data deleted successfully" });
});


// -------------------- Withdrawal Views --------------------
export const getAllWithdrawalRequestsView = asyncHandler(async (req: Request, res: Response) => {
    const withdrawals = await Withdrawal.find().populate('userId', 'name email');
    res.status(200).json(withdrawals);
});

export const getWithdrawalRequestByIdView = asyncHandler(async (req: Request, res: Response) => {
    const { withdrawalId } = req.params;
    const withdrawal = await Withdrawal.findById(withdrawalId).populate('userId', 'name email');
    if (!withdrawal) {
        throw new NotFoundError(`Withdrawal request with ID ${withdrawalId} not found`);
    }
    res.status(200).json(withdrawal);
});

export const updateWithdrawalStatusView = asyncHandler(async (req: Request, res: Response) => {
    const { withdrawalId } = req.params;
    const { status } = req.body;

    if (!['APPROVED', 'DECLINED', 'FAILED'].includes(status)) {
        res.status(400);
        throw new Error('Invalid status. Must be APPROVED, DECLINED, or FAILED.');
    }

    const withdrawal = await Withdrawal.findById(withdrawalId);
    if (!withdrawal) {
        throw new NotFoundError(`Withdrawal request with ID ${withdrawalId} not found`);
    }

    if (withdrawal.status !== 'PENDING') {
        res.status(400);
        throw new Error('Only PENDING withdrawals can be updated');
    }

    // Update withdrawal status
    withdrawal.status = status;
    await withdrawal.save();

    // Fetch the user
    const user = await User.findById(withdrawal.userId);
    if (!user) {
        throw new NotFoundError(`User not found for Withdrawal ID: ${withdrawalId}`);
    }

    // Refund wallet if DECLINED or FAILED
    if (status === 'DECLINED' || status === 'FAILED') {
        user.walletBalance += withdrawal.amount; // assumes you have a walletBalance field
    }

    // Notify the user
    const notificationMessage = `Your withdrawal request of ${withdrawal.amount} ${withdrawal.currency} has been ${status.toLowerCase()}.`;
    const notificationType = 'withdrawal_status';

    user.notifications.push({
        message: notificationMessage,
        type: notificationType,
        date: new Date(),
        read: false
    });

    try {
        await user.save();
    } catch (dbError) {
        console.error(`Failed to save user updates for ${user._id}:`, dbError);
        throw new InternalServerError(`Failed to update user wallet or save notification`);
    }

    // Send Email Notification
    try {
        const emailSubject = `Update Regarding Your Recent Withdrawal Request`;
        const templateData = {
            userName: user.name || 'User',
            message: notificationMessage,
            status
        };
        await sendEmail(user.email, emailSubject, 'withdrawalStatusUpdate', templateData);
    } catch (emailError) {
        console.error(`Failed to send withdrawal status email to ${user.email}:`, emailError);
        throw new InternalServerError(`Failed to send withdrawal status email`);
    }

    res.status(200).json({ message: `Withdrawal ${status.toLowerCase()} successfully`, withdrawal });
});


// -------------------- Withdrawal Views --------------------
export const getAllMerchantApplications = asyncHandler(async (req, res) => {
    const applications = await MerchantApplication.find().populate('user', 'name email');
    res.status(200).json({ applications });
});


export const getMerchantApplication = asyncHandler(async (req, res) => {
    const application = await MerchantApplication.findById(req.params.id).populate('user', 'name email');
    if (!application) {
        throw new BadRequestError("Merchant application not found")
    }
    res.status(200).json({ application });
});


export const approveMerchantApplication = asyncHandler(async (req, res) => {
    const application = await MerchantApplication.findById(req.params.id).populate('user');
    if (!application) {
        throw new NotFoundError("Application not found")
    }

    application.status = 'approved';
    await application.save();

    const user = await userModel.findById(application?.user);
    if (!user) throw new NotFoundError("User assocaited with the application not found!")

    user.notifications.unshift({
        message: 'Your merchant application has been approved!',
        type: 'merchant_application',
        date: new Date(),
        read: false
    });
    user.isMerchant = true
    user.isPendingMerchantVerification = false;

    try {
        await user.save();
    } catch (dbError) {
        console.error(`Failed to save user updates for ${user._id}:`, dbError);
        throw new InternalServerError(`Failed to update user or save notification`);
    }

    // Send Email Notification
    try {
        const emailSubject = `Merchant Application Approved`;
        const templateData = {
            userName: user.name || 'User',
            message: 'Congratulations! Your merchant application has been approved.'
        };
        await sendEmail(user.email, emailSubject, 'merchantApplicationApproved', templateData);
    } catch (emailError) {
        console.error(`Failed to send approval email to ${user.email}:`, emailError);
        throw new InternalServerError(`Failed to send merchant application approval email`);
    }


    res.status(200).json({ message: 'Merchant approved successfully', application });
});


export const rejectMerchantApplication = asyncHandler(async (req, res) => {
    const application = await MerchantApplication.findById(req.params.id).populate('user');
    if (!application) {
        throw new NotFoundError("Application not found")
    }

    application.status = 'rejected';
    await application.save();

    const user = await userModel.findById(application.user);
    if (!user) throw new NotFoundError("User associated with the application was not found!");

    user.notifications.unshift({
        message: 'Your merchant application has been rejected.',
        type: 'merchant_application',
        date: new Date(),
        read: false
    });
    user.isPendingMerchantVerification = false;

    try {
        await user.save();
    } catch (dbError) {
        console.error(`Failed to save user updates for ${user._id}:`, dbError);
        throw new InternalServerError(`Failed to update user or save notification`);
    }

    try {
        const emailSubject = `Merchant Application Rejected`;
        const templateData = {
            userName: user.name || 'User',
            message: 'Unfortunately, your merchant application has been rejected. You may reapply or contact support for more details.'
        };
        await sendEmail(user.email, emailSubject, 'merchantApplicationRejected', templateData);
    } catch (emailError) {
        console.error(`Failed to send rejection email to ${user.email}:`, emailError);
        throw new InternalServerError(`Failed to send merchant application rejection email`);
    }

    res.status(200).json({ message: 'Merchant application rejected', application });
});


export const deleteMerchantApplication = asyncHandler(async (req, res) => {
    const application = await MerchantApplication.findById(req.params.id);
    if (!application) {
        throw new NotFoundError("Application not found")
    }

    await application.deleteOne();

    res.status(200).json({ message: 'Merchant application deleted successfully' });
});


export const getAllMerchants = asyncHandler(async (req, res) => {
    const merchants = await userModel.find({ isMerchant: true }).select('name email createdAt'); // You can project more fields if needed
    res.status(200).json({ merchants });
});


export const getMerchantById = asyncHandler(async (req, res) => {
    const merchant = await userModel.findOne({ _id: req.params.id, isMerchant: true });
    if (!merchant) {
        throw new NotFoundError("Merchant not found");
    }

    res.status(200).json({ merchant });
});


// Add this to user.controllers.ts
export const updateUserWallet = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { action, amount } = req.body;

        // Validate action
        if (!['ADD', 'SUBTRACT', 'SET'].includes(action)) {
            throw new BadRequestError('Invalid action. Use ADD/SUBTRACT/SET');
        }

        // Validate amount
        if (typeof amount !== 'number' || amount < 0) {
            throw new BadRequestError('Amount must be a positive number');
        }

        const user = await User.findById(userId);
        if (!user) throw new NotFoundError('User not found');

        // Apply wallet change
        switch (action) {
            case 'ADD':
                user.walletBalance += amount;
                break;
            case 'SUBTRACT':
                if (user.walletBalance < amount) {
                    throw new BadRequestError('Insufficient wallet balance');
                }
                user.walletBalance -= amount;
                break;
            case 'SET':
                user.walletBalance = amount;
                break;
        }

        await user.save();

        res.status(200).json({
            message: `Wallet ${action.toLowerCase()} successful`,
            newBalance: user.walletBalance
        });
    }
);
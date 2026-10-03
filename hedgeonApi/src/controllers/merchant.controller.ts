import { Request, Response } from "../utils/Types";
import asyncHandler from 'express-async-handler';
import MerchantApplication from '../models/marchant.model';
import { getUserById } from '../services/user.service';
import { BadRequestError, NotFoundError } from "../utils/errors";
import sendEmail from "../utils/mailer";
import { logData } from "../utils/logger";

export const applyForMerchant = asyncHandler(async (req: Request, res: Response) => {
    const user = await getUserById(req.session?.user?.id);

    if (!user) throw new NotFoundError("User not found!")


    const existing = await MerchantApplication.findOne({ user: user._id });
    if (existing) {
        throw new BadRequestError("You have already submitted a merchant application.")
    }

    const hasActiveInvestment = user.currentPlan && user.currentPlan.length > 0;
    if (!hasActiveInvestment || !user.kycVerified) {
        throw new BadRequestError("You must complete KYC and have an active investment to apply as a merchant.")
    }

    const newApplication = new MerchantApplication({
        user: user._id,
        businessInfo: req.body.businessInfo,
        bankInfo: req.body.bankInfo,
        beneficialOwners: req.body.beneficialOwners,
        amlCompliance: req.body.amlCompliance,
        authorizedSignatory: req.body.authorizedSignatory
    });

    await newApplication.save();

    const message = 'Your merchant application was submitted successfully.';

    user.notifications.unshift({
        message,
        type: 'merchant_application',
        date: new Date(),
        read: false
    });
    user.isPendingMerchantVerification = true;

    try {
        await user.save();

        await sendEmail(
            user.email,
            'Merchant Application Submitted',
            'merchantApplicationNotification', // Make sure you create this template
            {
                userName: user.name || 'User',
                message,
                submissionDate: new Date().toDateString(),
                status: 'Pending Review'
            }
        );
    } catch (error) {
        console.error('Failed to send merchant application notification or email:', error);
    }

    return logData(res, 201, {
        message: 'Merchant application submitted successfully.',
        application: newApplication
    });
});

import asyncHandler from "express-async-handler";
import { logData, logError } from "../utils/logger";
import {
    changeProfileImage,
    getUserById,
    updateUserProfile,
} from "../services/user.service";
import { Request, Response } from "../utils/Types";
import uploadImage from "../utils/uploader";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors";
import kycModel from "../models/kyc";
import userModel from "../models/user.model";
import sendEmail from "../utils/mailer";
import streamifier from 'streamifier';
import { v2 as cloudinary } from "cloudinary";

export const getUserProile = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);
        return logData(res, 200, { user });
    }
);

export const getAllReferrals = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);
        const referrals = user?.referrals;
        return logData(res, 200, { referrals });
    }
);

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await updateUserProfile(req.session.user.id, req.body);

    // Add notification
    const notificationMessage = "Your profile has been successfully updated.";
    user.notifications.push({
        message: notificationMessage,
        type: 'profile_update',
        date: new Date(),
        read: false
    });

    try {
        await user.save();

        await sendEmail(
            user.email,
            'Profile Updated Successfully',
            'profileUpdateNotification', // Ensure this template exists
            {
                userName: user.name || 'User',
                message: notificationMessage
            }
        );
    } catch (error) {
        console.error("Failed to send profile update notification or email:", error);
    }

    return logData(res, 200, { user });
});

export const uploadKYC = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session.user.id;
    const documentType = req.body.documentType;

    // Access files from multer
    const idProofFile = req.files?.['idProof']?.[0];
    const addressProofFile = req.files?.['addressProof']?.[0];
    const selfieFile = req.files?.['selfie']?.[0];

    if (!idProofFile || !addressProofFile || !selfieFile) {
        return res.status(400).json({ message: 'All files are required' });
    }

    const uploadToCloudinary = (fileBuffer: Buffer): Promise<string> => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "kyc_documents" }, (error, result) => {
                if (result?.secure_url) resolve(result.secure_url);
                else reject(error);
            });

            streamifier.createReadStream(fileBuffer).pipe(stream);
        });
    };

    let idDocumentUrl: string;
    let proofOfAddressUrl: string;
    let selfieUrl: string;

    try {
        idDocumentUrl = await uploadToCloudinary(idProofFile.buffer);
        proofOfAddressUrl = await uploadToCloudinary(addressProofFile.buffer);
        selfieUrl = await uploadToCloudinary(selfieFile.buffer);
    } catch (uploadError) {
        console.error("Error uploading files:", uploadError);
        return logError(res, new InternalServerError("File upload failed."));
    }

    // Create a new KYC record
    const kyc = new kycModel({
        userId,
        documentType,
        idDocumentUrl,
        proofOfAddress: proofOfAddressUrl,
        selfieUrl,
    });
    await kyc.save();

    // Find the user to update and send notifications
    const user = await userModel.findById(userId);
    if (!user) {
        return logError(res, new NotFoundError(`User not found with ID: ${userId}`));
    }

    //send notification to user
    const notificationMessage = "Your KYC documents have been received and are under review.";
    const notificationType = "kyc_submission";

    user.notifications.push({
        message: notificationMessage,
        type: notificationType,
        date: new Date(),
        read: false,
    });
    user.isPendingKYCVerified = true;

    try {
        await user.save();
    } catch (error) {
        console.error("Failed to save notification:", error);
        return logError(res, new InternalServerError("Failed to save notification."));
    }
    // Send email notification
    try {
        const emailSubject = "KYC Documents Received";
        const templateData = {
            userName: user.name || "User",
            documentType
        };
        await sendEmail(user.email, emailSubject, "kycSubmission", templateData); //  kycSubmission template.
    } catch (emailError) {
        console.error("Failed to send email:", emailError);
        return logError(res, new InternalServerError("Failed to send email notification."));
    }

    return logData(res, 200, { message: "KYC documents uploaded successfully.", kyc });
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    const user = await getUserById(req.session.user.id);

    if (!user || !(await user.comparePassword(currentPassword))) {
        return logData(res, 400, { message: "Invalid old password" });
    }

    user.password = newPassword;

    // Add password change notification
    const notificationMessage = "Your password has been changed successfully.";
    user.notifications.push({
        message: notificationMessage,
        type: 'password_change',
        date: new Date(),
        read: false
    });

    try {
        await user.save();

        await sendEmail(
            user.email,
            'Password Changed',
            'passwordChangeNotification', // Ensure this email template exists
            {
                userName: user.name || 'User',
                message: notificationMessage,
                date: new Date().toDateString()
            }
        );
    } catch (error) {
        console.error("Failed to send password change notification or email:", error);
    }

    return logData(res, 200, { message: "Password changed successfully!" });
});

export const deleteUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);
        await user?.deleteOne();

        return logData(res, 200, {
            message: "User deleted successfully!",
            user,
        });
    }
);

export const changeProfilePhoto = asyncHandler(
    async (req: Request, res: Response) => {

        const buffer = req.file.buffer;
        const uploadToCloudinary = (): Promise<string> => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: "profile_photos" }, (error, result) => {
                    if (result?.secure_url) resolve(result.secure_url);
                    else reject(error);
                });

                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        let imageUrl;
        try {
            imageUrl = await uploadToCloudinary();
            console.log("Image URL", imageUrl)
        } catch (err) {
            return logError(res, new InternalServerError("Failed to upload receipt"));
        }

        const user = await changeProfileImage(req.session.user.id, imageUrl);

        return logData(res, 200, {
            message: "Profile photo uploaded successfully!",
            imageUrl,
            user,
        });
    }
);

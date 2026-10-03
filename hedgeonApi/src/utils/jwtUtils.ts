import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userModel from "../models/user.model";

interface User {
    id: mongoose.Types.ObjectId;
    email: string;
    role: string;
    isVerified: boolean;
}

export const generateRefreshToken = (user: User) => {
    return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET || "", {
        expiresIn: "7d",
    });
};

export const generateAccessToken = (user: User) => {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "20m",
    });
};

export const verifyToken = (token: string, secretKey: string) => {
    return jwt.verify(token, secretKey);
};

export const generateToken = (
    userId: mongoose.Types.ObjectId,
): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
    );
};

export const generatePasswordResetLink = (userId: mongoose.Types.ObjectId) => {
    return `${process.env.CLIENT_URL}/auth/password-reset?token=${generateToken(
        userId,
    )}`;
};

export const generateVerificationToken = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Generate a random alphanumeric code
export const generateReferralLink = async (userId: mongoose.Types.ObjectId) => {
    const shortCode = crypto.randomBytes(4).toString("hex");
    await userModel.findByIdAndUpdate(userId, { referralCode: shortCode });
    return `${process.env.CLIENT_URL}/auth/signup?ref=${shortCode}`;
};

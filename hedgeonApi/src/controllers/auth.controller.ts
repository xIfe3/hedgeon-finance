import bcrypt from "bcrypt";
import {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ConflictError,
    InternalServerError,
} from "../utils/errors";
import asyncHandler from "express-async-handler";
import userModel from "../models/user.model";
import { logData, logError } from "../utils/logger";
import {
    generateAccessToken,
    generateRefreshToken,
    generateToken,
    verifyToken,
    generateReferralLink,
    generateVerificationToken,
} from "../utils/jwtUtils";
import jwt from "jsonwebtoken";
import { Request, Response } from "../utils/Types";
import sendEmail from "../utils/mailer";

const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || "fallbackkey";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const roleFromQuery = req.query.role as string; // Get role from query parameter
    const passkey = data.passkey;

    // 1. Validate Role
    const validRoles = ['user', 'admin']; // Define valid roles
    if (roleFromQuery && !validRoles.includes(roleFromQuery)) {
        return logError(res, new ConflictError("Invalid role provided.  Must be 'user' or 'admin'."));
    }

    // Set the role.  Default to 'user' if not provided.
    const userRole = roleFromQuery || 'user';
    data.role = userRole; // Ensure the role is in the data object for userModel.create

    // 2. Validate Passkey for Admin Role
    if (userRole === 'admin') {
        if (!passkey || passkey !== ADMIN_PASSKEY) {
            return logError(res, new UnauthorizedError("Unauthorized: Admin passkey is incorrect or missing."));
        }
    }
    // Remove passkey from data object so it does not get saved in database.
    delete data.passkey;

    // Check for existing email
    const filterByEmail = await userModel.findOne({ email: data.email });
    if (filterByEmail) {
        return logError(
            res,
            new ConflictError(
                "An account already exists with this email address"
            )
        );
    }

    // Check for existing phone number
    const filterByPhoneNumber = await userModel.findOne({
        phone: data.phone,
    });
    if (filterByPhoneNumber) {
        return logError(
            res,
            new ConflictError(
                "An account already exists with this phone number"
            )
        );
    }

    // Referral logic
    let referrerUser = null;
    if (data.referralToken) {
        try {
            referrerUser = await userModel.findOne({
                referralCode: data.referralToken,
            });
            if (!referrerUser) {
                return logError(
                    res,
                    new ConflictError("Token has expired or invalid")
                );
            }
        } catch (error) {
            console.log(error);
            return logError(res, new ConflictError("Invalid referral token"));
        }
    }

    // Create user
    const user = await userModel.create({ ...data, role: userRole }); // Use the determined role

    // Update the referrer's referral list if a referrer exists
    if (referrerUser) {
        referrerUser.referrals = referrerUser.referrals;
        referrerUser.referrals?.push({
            userId: user._id,
            email: user.email,
            name: user.name,
        });
        await referrerUser.save();
        user.referredBy = referrerUser._id;
        await user.save();
    }

    // Save the token in the user's record
    const verificationtoken = generateVerificationToken();
    user.emailVerificationToken = verificationtoken;

    // Send welcome + verification email
    try {
        const emailSubject = `Welcome to Hedgeon Finance Capital - Verify Your Email`;
        const templateData = {
            userName: user.name || 'User',
            verificationCode: verificationtoken
        };
        await sendEmail(user.email, emailSubject, 'welcomeAndVerify', templateData); // Use your combined template name here
    } catch (emailError) {
        console.error(`Failed to send welcome email to ${user.email}:`, emailError);
        return logError(res, new InternalServerError(`Failed to send welcome email to ${user.email}`));
    }

    // Generate tokens
    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role!,
        isVerified: user.isVerified,
    });

    const refreshToken = generateRefreshToken({
        id: user?._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
    });

    // Update user last login and refresh token
    user.lastLogin = new Date().toUTCString();
    user.refreshToken = refreshToken;
    user.referralLink = await generateReferralLink(user._id);
    await user.save();

    // Set session
    req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return logData(res, 201, {
        message: "Registration successful",
        user,
        accessToken,
        role: user.role,
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log(email, password)

    const foundUser = await userModel.findOne({
        email: email
    });

    console.log(foundUser);

    if (!foundUser)
        return logError(res, new NotFoundError("Invalid credentials"));

    if (!foundUser.active || foundUser.suspended)
        return logError(res, new NotFoundError("Your account is suspended or inactive!"));

    if (!(await bcrypt.compare(password, foundUser?.password))) {
        console.log("Password does not match");
        return logError(res, new NotFoundError("Account not found"));
    }

    // Send welcome + verification email
    try {
        const emailSubject = `Welcome to Hedgeon Finance Capital - Verify Your Email`;
        const templateData = {
            userName: foundUser.name
        };
        await sendEmail(foundUser.email, emailSubject, 'login', templateData); // Use your combined template name here
    } catch (emailError) {
        console.error(`Failed to send login email to ${foundUser.email}:`, emailError);
        return logError(res, new InternalServerError(`Failed to send login email to ${foundUser.email}`));
    }

    const accessToken = generateAccessToken({
        id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role!,
        isVerified: foundUser.isVerified,
    });

    const refreshToken = generateRefreshToken({
        id: foundUser?._id,
        email: foundUser.email,
        role: foundUser.role,
        isVerified: foundUser.isVerified,
    });

    foundUser.lastLogin = new Date().toUTCString();
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    if (!foundUser.isVerified) {
        const verificationtoken = generateVerificationToken();
        foundUser.emailVerificationToken = verificationtoken;
        await foundUser.save();

        try {
            const emailSubject = `Welcome to Hedgeon Finance Capital - Verify Your Email`;
            const templateData = {
                userName: foundUser.name,
                verificationCode: verificationtoken, // Include token in template
            };
            await sendEmail(foundUser.email, emailSubject, 'loginAndVerify', templateData);
        } catch (emailError) {
            console.error(`Failed to send verify email to ${foundUser.email}:`, emailError);
            return logError(res, new InternalServerError(`Failed to send verify email to ${foundUser.email}`));
        }
    }

    req.session.user = {
        id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
    };

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return logData(res, 200, {
        role: foundUser.role,
        isVerified: foundUser.isVerified,
        accessToken
    });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {

    const user = await userModel.findById(req.session.user.id);
    console.log(user)

    if (!user) return logError(res, new UnauthorizedError("Not logged in"));

    user.refreshToken = null;
    await user?.save();

    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: true,
        secure: true,
    });

    return logData(res, 200, { message: "Logged out" });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        async (err: any, decoded: any) => {
            if (err)
                return logError(
                    res,
                    new InternalServerError("Internal Server Error")
                );

            console.log(decoded);

            const user = await userModel.findOne({
                email: decoded.user.email,
            });

            if (!user)
                return logError(res, new UnauthorizedError("Not logged in"));

            const accessToken = generateAccessToken({
                ...user,
                id: user._id,
                role: user.role!,
                isVerified: user.isVerified,
            });

            res.cookie('access_token', accessToken, {
                httpOnly: true,
                secure: true, // ❗ Set to false if testing over HTTP
                sameSite: 'lax', // or 'none' if you're using different domains + https
                domain: 'localhost', // or your production domain
                maxAge: 15 * 60 * 1000,
            });

            logData(res, 201, { accessToken });
        }
    );
});

export const forgotPassword = asyncHandler(
    async (req: Request, res: Response) => {
        const data = req.body;

        const foundUser = await userModel.findOne({ email: data.email });
        if (!foundUser)
            return logError(res, new NotFoundError(`Account not found`));

        const token = generateToken(foundUser._id); // or your token generation logic
        foundUser.passwordResetToken = token;
        await foundUser.save();

        const passwordResetLink = `${process.env.CLIENT_URL}/auth/reset-password?token=${token}`;

        // Send password reset email
        try {
            const emailSubject = `Reset Your Password - Hedgeon Finance Capital`;
            const templateData = {
                userName: foundUser.name,
                passwordResetLink,
            };
            await sendEmail(foundUser.email, emailSubject, 'forgotPassword', templateData);
        } catch (emailError) {
            console.error(`Failed to send password reset email to ${foundUser.email}:`, emailError);
            return logError(res, new InternalServerError(`Failed to send password reset email to ${foundUser.email}`));
        }

        return logData(res, 200, {
            message: "A password reset link has been sent to your email address.",
        });
    }
);

export const resetPassword = asyncHandler(
    async (req: Request, res: Response) => {
        const { newPassword, token } = req.body;

        const decoded = verifyToken(token, process.env.JWT_SECRET!);
        if (!decoded)
            return logError(res, new BadRequestError("Invalid or expired password reset link."));

        const user = await userModel.findOne({ passwordResetToken: token });
        if (!user) return logError(res, new NotFoundError("User not found."));

        user.password = newPassword;
        user.passwordResetToken = null;
        await user.save();

        // Send confirmation email
        try {
            const emailSubject = `Your Password Has Been Reset - Hedgeon Finance Capital`;
            const templateData = { userName: user.name };
            await sendEmail(user.email, emailSubject, 'resetPasswordComplete', templateData);
        } catch (emailError) {
            console.error(`Failed to send password reset confirmation to ${user.email}:`, emailError);
            return logError(res, new InternalServerError(`Failed to send confirmation email to ${user.email}`));
        }

        return logData(res, 200, {
            message: "Your password has been reset successfully. You can now log in with your new password.",
        });
    }
);

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    const user = await userModel.findOne({ emailVerificationToken: token });
    if (!user) return logError(res, new BadRequestError("The verification code is invalid or has expired."));

    if (user.isVerified) {
        return logError(res, new ConflictError("Your email has already been verified."));
    }

    user.isVerified = true;
    user.emailVerificationToken = null;
    await user.save();

    // Send welcome email
    try {
        const emailSubject = `Your Email Has Been Verified - Hedgeon Finance Capital`;
        const templateData = { userName: user.name };
        await sendEmail(user.email, emailSubject, 'verifyEmailComplete', templateData);
    } catch (emailError) {
        console.error(`Failed to send verification confirmation to ${user.email}:`, emailError);
        return logError(res, new InternalServerError(`Failed to send verification email to ${user.email}`));
    }

    return logData(res, 200, {
        message: "Your email has been successfully verified.",
    });
});

export const resendVerificationEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return logError(res, new BadRequestError("Email address is required."));

    const user = await userModel.findOne({ email });
    if (!user) return logError(res, new BadRequestError("No user found with the provided email."));

    if (user.isVerified) {
        return logError(res, new ConflictError("Your email has already been verified."));
    }

    const verificationToken = generateVerificationToken();
    user.emailVerificationToken = verificationToken;
    await user.save();

    // Send verification email
    try {
        const emailSubject = `Verify Your Email Address - Hedgeon Finance Capital`;
        const templateData = {
            userName: user.name,
            verificationCode: verificationToken,
        };
        await sendEmail(user.email, emailSubject, 'loginAndVerify', templateData);
    } catch (emailError) {
        console.error(`Failed to send verification email to ${user.email}:`, emailError);
        return logError(res, new InternalServerError(`Failed to resend verification email.`));
    }

    return logData(res, 200, {
        message: "A new verification code has been sent to your email.",
    });
});

import express from "express";
import {
    register,
    login,
    logout,
    refresh,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
} from "../controllers/auth.controller";
import authGuard from "../middlewares/authGuard";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authGuard, logout);
router.get("/refresh", refresh);
router.post("/verify-email", verifyEmail);
router.post("/resend-email", resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;

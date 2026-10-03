import express from "express";
import authRoutes from "./auth.routes";
import withdrawalRoutes from "./withdrawal.routes";
import investmentRoutes from "./investment.routes";
import userRoutes from "./user.routes";
import planRoutes from "./plan.routes";
import adminRoutes from "./admin.routes";
import transactionRoutes from "./transaction.routes";
import cronRoutes from "./cron.routes";
import authGuard from "../middlewares/authGuard";
import adminOnly from "../middlewares/adminOnly";
import currencyModel from "../models/currency";
import merchantRoutes from "./merchant.routes";
import { logData } from "../utils/logger";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/invest", authGuard, investmentRoutes);
router.use("/withdrawals", authGuard, withdrawalRoutes);
router.use("/user", authGuard, userRoutes);
router.use("/plans", planRoutes);
router.use("/admin", authGuard, adminOnly, adminRoutes);
router.use("/transactions", authGuard, transactionRoutes);
router.use("/cron", cronRoutes);
router.use("/merchant", authGuard, merchantRoutes);

router.get("/currencies", async (req, res) => {
    const { name } = req.query
    const currency = await currencyModel.findOne({ name });
    return logData(res, 200, { currency });
})

router.get("/protected", authGuard, async (req, res) => {
    return logData(res, 200, { isAuthenticated: true, message: 'This is a protected endpoint, you are authenticated!' });
})

export default router;

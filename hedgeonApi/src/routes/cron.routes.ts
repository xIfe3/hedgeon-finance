import express from "express";
import { allocateProfit } from "../controllers/investment.controller";

const router = express.Router();

// Cron route
router.post("/allocate-profit", allocateProfit);

export default router;

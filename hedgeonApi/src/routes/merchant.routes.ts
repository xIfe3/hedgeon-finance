import express from "express";
import { applyForMerchant } from "../controllers/merchant.controller";

const router = express.Router();

router.post("/apply", applyForMerchant)

export default router;
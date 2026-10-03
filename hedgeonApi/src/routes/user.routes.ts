import {
    getUserProile,
    updateUser,
    deleteUserProfile,
    changeProfilePhoto,
    getAllReferrals,
    changePassword,
    uploadKYC
} from "../controllers/user.controller";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() })


router.get("/profile", getUserProile);
router.get("/referrals", getAllReferrals);
router.put("/update", updateUser);
router.post("/delete", deleteUserProfile);
router.put("/upload", upload.single("profilePicture"), changeProfilePhoto);
router.post("/kyc", upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "selfie", maxCount: 1 },
]), uploadKYC);
router.put("/change-password", changePassword);

export default router;

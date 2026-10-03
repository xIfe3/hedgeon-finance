import express from 'express';
import isAdmin from '../middlewares/adminOnly';
import {
    getAllInvestmentsView,
    getInvestmentByIdView,
    getInvestmentsByUserView,
    updateInvestmentStatus,
    updateInvestmentAdmin,
    getAllKYCSubmissionsView,
    getKYCByIdView,
    getKYCByUserIdView,
    updateKYCVerificationStatus,
    getAllNotificationsView,
    getNotificationByIdView,
    getNotificationsByUserView,
    getAllPayoutTrackersView,
    getPayoutTrackerByIdView,
    getPayoutTrackerByInvestmentView,
    getAllPlansView,
    getPlanByIdView,
    createPlanView,
    updatePlanView,
    deletePlanView,
    getAllTransactionsView,
    getTransactionByIdView,
    getAllUsersView,
    getUserByIdView,
    viewUserReferralsView,
    updateUserStatus,
    verifyUserEmail,
    updateUser,
    deleteUserView,
    getAllWithdrawalRequestsView,
    getWithdrawalRequestByIdView,
    updateWithdrawalStatusView,
    getAllMerchantApplications,
    getMerchantApplication,
    approveMerchantApplication,
    rejectMerchantApplication,
    deleteMerchantApplication,
    getAllMerchants,
    getMerchantById,
    updateUserWallet
} from '../controllers/admin.controller';

const router = express.Router();

// Investment Routes
router.get('/investments', isAdmin, getAllInvestmentsView);
router.get('/investments/:investmentId', isAdmin, getInvestmentByIdView);
router.get('/investments/user/:userId', isAdmin, getInvestmentsByUserView);
router.put('/investments/:id/:status', updateInvestmentStatus); //  Admin route
router.put('/investments/:id', updateInvestmentAdmin);

// KYC Routes
router.get('/kyc', isAdmin, getAllKYCSubmissionsView);
router.get('/kyc/:kycId', isAdmin, getKYCByIdView);
router.get('/kyc/user/:userId', isAdmin, getKYCByUserIdView);
router.put('/kyc/:id/verify', isAdmin, updateKYCVerificationStatus);

// Notification Routes
router.get('/notifications', isAdmin, getAllNotificationsView);
router.get('/notifications/:notificationId', isAdmin, getNotificationByIdView);
router.get('/notifications/user/:userId', isAdmin, getNotificationsByUserView);

// Payout Tracker Routes
router.get('/payout-trackers', isAdmin, getAllPayoutTrackersView);
router.get('/payout-trackers/:payoutTrackerId', isAdmin, getPayoutTrackerByIdView);
router.get('/payout-trackers/investment/:investmentId', isAdmin, getPayoutTrackerByInvestmentView);

// Plan Routes
router.get('/plans', isAdmin, getAllPlansView);
router.get('/plans/:planId', isAdmin, getPlanByIdView);
router.post("/plans", isAdmin, createPlanView);
router.put("/plans/:planId", isAdmin, updatePlanView);
router.delete("/plans/:planId", isAdmin, deletePlanView);

// Transaction Routes
router.get('/transactions', isAdmin, getAllTransactionsView);
router.get('/transactions/:transactionId', isAdmin, getTransactionByIdView);

// User Routes
router.get('/users', isAdmin, getAllUsersView);
router.get('/users/:userId', isAdmin, getUserByIdView);
router.get('/users/:userId/referrals', isAdmin, viewUserReferralsView);
router.put('/users/:userId/status', isAdmin, updateUserStatus);
router.put('/users/:userId/verify-email', isAdmin, verifyUserEmail);
router.put('/users/:userId/', isAdmin, updateUser);
router.put('/users/:userId/', isAdmin, deleteUserView);
router.put('/users/:userId/wallet', isAdmin, updateUserWallet);

// Withdrawal Routes
router.get('/withdrawals', isAdmin, getAllWithdrawalRequestsView);
router.get('/withdrawals/:withdrawalId', isAdmin, getWithdrawalRequestByIdView);
router.get('/withdrawals/:withdrawalId', isAdmin, updateWithdrawalStatusView);

// Merchant Application Routes
router.get('/merchant/applications', isAdmin, getAllMerchantApplications);
router.get('/merchant/applications/:id', isAdmin, getMerchantApplication);
router.patch('/merchant/applications/:id/approve', isAdmin, approveMerchantApplication);
router.patch('/merchant/applications/:id/reject', isAdmin, rejectMerchantApplication);
router.delete('/merchant/applications/:id/delete', isAdmin, deleteMerchantApplication);

router.get('/admin/merchants', isAdmin, getAllMerchants);
router.get('/admin/merchants/:id', isAdmin, getMerchantById);

export default router;
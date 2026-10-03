import axiosInstance from "./axiosInstance";

// -------------------- Investment API Calls --------------------
export const getAllInvestmentsAdminApi = () => {
    return axiosInstance.get("/admin/investments");
};

export const getInvestmentByIdAdminApi = (investmentId: string) => {
    return axiosInstance.get(`/admin/investments/${investmentId}`);
};

export const getInvestmentsByUserAdminApi = (userId: string) => {
    return axiosInstance.get(`/admin/investments/user/${userId}`);
};

export const updateInvestmentStatusAdminApi = (investmentId: string, status: "active" | "completed" | "pending" | "paused" | "cancelled") => {
    return axiosInstance.put(`/admin/investments/${investmentId}/${status}`);
};

export const updateInvestmentAdminApi = (investmentId: string, investmentData: any) => {
    return axiosInstance.put(`/admin/investments/${investmentId}`, investmentData);
};

export const triggerROIDistributionAdminApi = () => {
    return axiosInstance.post("/admin/roi/distribute");
};

export const triggerReinvestmentAdminApi = () => {
    return axiosInstance.post("/admin/investments/reinvest");
};

// -------------------- KYC API Calls --------------------
export const getAllKYCSubmissionsAdminApi = () => {
    return axiosInstance.get("/admin/kyc");
};

export const getKYCByIdAdminApi = (kycId: string) => {
    return axiosInstance.get(`/admin/kyc/${kycId}`);
};

export const getKYCByUserIdAdminApi = (userId: string) => {
    return axiosInstance.get(`/admin/kyc/user/${userId}`);
};

export const updateKYCVerificationStatus = (kycId: string, verifiedStatus: boolean) => {
    return axiosInstance.put(`/admin/kyc/${kycId}/verify`, { verified: verifiedStatus });
};

// -------------------- Notification API Calls --------------------
export const getAllNotificationsAdminApi = () => {
    return axiosInstance.get("/admin/notifications");
};

export const getNotificationByIdAdminApi = (notificationId: string) => {
    return axiosInstance.get(`/admin/notifications/${notificationId}`);
};

export const getNotificationsByUserAdminApi = (userId: string) => {
    return axiosInstance.get(`/admin/notifications/user/${userId}`);
};

export const markNotificationAsReadAdminApi = (notificationId: string) => {
    return axiosInstance.patch(`/admin/notifications/${notificationId}/read`);
};

export const sendNotificationToUserAdminApi = (userId: string, title: string, message: string, type: string) => {
    return axiosInstance.post("/admin/notifications/user", { userId, title, message, type });
};

export const sendGlobalNotificationAdminApi = (title: string, message: string, type: string) => {
    return axiosInstance.post("/admin/notifications/global", { title, message, type });
};

// -------------------- Payout Tracker API Calls --------------------
export const getAllPayoutTrackersAdminApi = () => {
    return axiosInstance.get("/admin/payout-trackers");
};

export const getPayoutTrackerByIdAdminApi = (payoutTrackerId: string) => {
    return axiosInstance.get(`/admin/payout-trackers/${payoutTrackerId}`);
};

export const getPayoutTrackerByInvestmentAdminApi = (investmentId: string) => {
    return axiosInstance.get(`/admin/payout-trackers/investment/${investmentId}`);
};

export const recordPayoutAdminApi = (payoutTrackerId: string, paidROI: number) => {
    return axiosInstance.patch(`/admin/payout-trackers/${payoutTrackerId}/record-payout`, { paidROI });
};

// -------------------- Plan API Calls --------------------
export const getAllPlansAdminApi = () => {
    return axiosInstance.get("/admin/plans");
};

export const getPlanByIdAdminApi = (planId: string) => {
    return axiosInstance.get(`/admin/plans/${planId}`);
};

export const createPlanAdminApi = (planData: any) => { // Adjust 'any' to your Plan creation DTO
    return axiosInstance.post("/admin/plans", planData);
};

export const updatePlanAdminApi = (planId: string, planData: any) => {
    return axiosInstance.put(`/admin/plans/${planId}`, planData);
};

export const activatePlanAdminApi = (planId: string) => {
    return axiosInstance.patch(`/admin/plans/${planId}/activate`);
};

export const deactivatePlanAdminApi = (planId: string) => {
    return axiosInstance.patch(`/admin/plans/${planId}/deactivate`);
};

// -------------------- Transaction API Calls --------------------
export const getAllTransactionsAdminApi = () => {
    return axiosInstance.get("/admin/transactions");
};

export const getTransactionByIdAdminApi = (transactionId: string) => {
    return axiosInstance.get(`/admin/transactions/${transactionId}`);
};

export const updateTransactionStatusAdminApi = (transactionId: string, status: string) => {
    return axiosInstance.patch(`/admin/transactions/${transactionId}/status`, { status });
};

// -------------------- User API Calls --------------------
export const getAllUsersAdminApi = () => {
    return axiosInstance.get("/admin/users");
};

export const getUserByIdAdminApi = (userId: string) => {
    return axiosInstance.get(`/admin/users/${userId}`);
};

export const updateUserAdminApi = (userId: string, userData: any) => {
    return axiosInstance.put(`/admin/users/${userId}`, userData);
};

export const updateUserWalletAdminApi = (
    userId: string,
    data: {
        action: 'ADD' | 'SUBTRACT' | 'SET';
        amount: number;
    }
) => {
    return axiosInstance.put(`/admin/users/${userId}/wallet`, data);
};

export const deleteUserAdminApi = (userId: string) => {
    return axiosInstance.delete(`/admin/users/${userId}`);
};

export const verifyUserEmailAdminApi = (userId: string, verified: boolean) => {
    return axiosInstance.put(`/admin/users/${userId}/verify-email`, { verified });
};

export const updateUserStatusAdminApi = (userId: string, active?: boolean, suspended?: boolean) => {
    const requestBody: { active?: boolean; suspended?: boolean } = {};
    if (active !== undefined) {
        requestBody.active = active;
    }
    if (suspended !== undefined) {
        requestBody.suspended = suspended;
    }
    return axiosInstance.put(`/admin/users/${userId}/status`, requestBody);
};

export const viewUserReferralsAdminApi = (userId: string) => {
    return axiosInstance.get(`/admin/users/${userId}/referrals`);
};

export const updateUserWalletBalanceAdminApi = (userId: string, walletBalance: number) => {
    return axiosInstance.patch(`/admin/users/${userId}/wallet-balance`, { walletBalance });
};

// -------------------- Withdrawal API Calls --------------------
export const getAllWithdrawalRequestsAdminApi = () => {
    return axiosInstance.get("/admin/withdrawals");
};

export const getWithdrawalRequestByIdAdminApi = (withdrawalId: string) => {
    return axiosInstance.get(`/admin/withdrawals/${withdrawalId}`);
};

export const approveWithdrawalRequestAdminApi = (withdrawalId: string) => {
    return axiosInstance.patch(`/admin/withdrawals/${withdrawalId}/approve`);
};

export const rejectWithdrawalRequestAdminApi = (withdrawalId: string, reason: string) => {
    return axiosInstance.patch(`/admin/withdrawals/${withdrawalId}/reject`, { reason });
};


// -------------------- Mercahant API Calls --------------------
export const getAllMerchantRequestsAdminApi = () => {
    return axiosInstance.get("/admin/merchant/applications");
};

export const getMerchantRequestByIdAdminApi = (applicationId: string) => {
    return axiosInstance.get(`/admin/merchant/applications/${applicationId}`);
};

export const approveMerchantRequestAdminApi = (applicationId: string) => {
    return axiosInstance.patch(`/admin/merchant/applications/${applicationId}/approve`);
};

export const rejectMerchantRequestAdminApi = (applicationId: string, reason: string) => {
    return axiosInstance.patch(`/admin/merchant/applications/${applicationId}/reject`, { reason });
};

export const deleteMerchantApplicationAdminApi = (applicationId: string) => {
    return axiosInstance.delete(`/admin/merchant/applications/${applicationId}/delete`);
};

export const getAllMerchantAdminApi = () => {
    return axiosInstance.get("/admin/merchants");
};

export const getMerchantByIdAdminApi = (merchantId: string) => {
    return axiosInstance.get(`/admin/merchants/${merchantId}`);
};
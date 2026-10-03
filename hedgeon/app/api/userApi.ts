import axiosInstance from "./axiosInstance";

export const withdrawApi = (withdrawalDetails: { amount: string, currency: string, walletAddress: string }) => {
    return axiosInstance.post('/withdrawals/', withdrawalDetails)
}

export const getUserTransactions = () => {
    return axiosInstance.get('/transactions')
}

export const investApi = (investData: FormData) => {
    return axiosInstance.post('/invest', investData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getAllInvestments = () => {
    return axiosInstance.get("invest/")
}

export const getInvestmentById = (investmentId: string) => {
    return axiosInstance.get(`invest/${investmentId}`);
}

export const getProfileApi = () => {
    return axiosInstance.get('/user/profile')
}

export const getReferralsApi = () => {
    return axiosInstance.get('/user/referrals')
}

export const updateProfileApi = (userData: { name: string, email: string, phone: string }) => {
    return axiosInstance.put('/user/update', userData)
}

export const deleteAccountApi = () => {
    return axiosInstance.post('/user/delete')
}

export const changePasswordApi = (formData: {
    currentPassword: string,
    newPassword: string
}) => {
    return axiosInstance.put('/user/change-password', formData)
}

export const uploadProfilePictureApi = async (file: File) => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    return axiosInstance.put('/user/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const uploadKycDocuments = async (formData: FormData) => {
    return axiosInstance.post('/user/kyc', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const applyAsMerchant = async (formDate: any) => {
    return axiosInstance.post("/merchant/apply");
}
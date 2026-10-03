import axiosInstance from "./axiosInstance";

export const loginApi = (credentials: { email: string, password: string }) => {
    return axiosInstance.post("/auth/login", credentials)
}

export const signupApi = (credentials: {
    email: string,
    password: string,
    name: string,
    phone: string,
    role?: string
}) => {
    return axiosInstance.post(`/auth/register?role=${credentials.role || "user"}`, credentials);
};

export const logoutApi = () => {
    return axiosInstance.post("/auth/logout")
}

export const verifyEmail = (code: string) => {
    return axiosInstance.post("/auth/verify-email", { token: code })
}

export const resendEmail = (email: string) => {
    return axiosInstance.post("/auth/resend-email", { email })
}

export const forgotPasswordApi = (email: string) => {
    return axiosInstance.post("/auth/forgot-password", { email })
}

export const resetPasswordApi = (newPassword: string, token: string | null) => {
    return axiosInstance.post("/auth/reset-password", { newPassword, token })
}
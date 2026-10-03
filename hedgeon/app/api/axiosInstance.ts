'use client'

import axios, { AxiosInstance, AxiosResponse } from "axios";

// const baseURL = "http://localhost:3500/api/v1/";
const baseURL = "https://hedgeon-finance-i9bz.onrender.com/api/v1/";

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request intercetor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return {
            ...response,
            data: response.data,
            status: response.status,
        };
    }, (error) => {
        console.log("Error in response interceptor!!!", error?.response?.status);

        return Promise.reject(error);

    }
);

export default axiosInstance;

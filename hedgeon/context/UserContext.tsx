'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getProfileApi } from '@/app/api/userApi'

type User = {
    id: string
    email: string
    name: string
    phone: string
    password: string
    role: 'user' | 'admin'
    isMerchant: boolean;
    kycVerified: boolean;
    isPendingMerchantVerification: boolean;
    isPendingKYCVerified: boolean;
    kyc: string
    twoFactorSecret: string
    currentPlan?: [{
        planId: string
        investmentId: string
        name: string
        startDate: Date
        endDate: Date
        daysGone: number
        investedAmount: number
        roiAccumulated: number
        status: string
    }]
    pastPlans: [{
        planId: string;
        investmentId: string;
        name: string;
        startDate: Date;
        endDate: Date;
        investedAmount: number;
        roiAccumulated: number;
        status: string
    }]
    notifications: [{
        message: string,
        type: string,
        date: Date,
        read: boolean
    }],
    walletBalance: number
    totalInvested: number
    netReturns: number
    referrals?: {
        userId: string
        name: string
        email: string
    }[]
    referredBy?: {
        userId: string
        name: string
        email: string
    }
    lastLogin: string
    refreshToken: string | null
    passwordResetToken: string | null
    emailVerificationToken: number | null
    isVerified: boolean
    active: boolean
    suspended: boolean
    referralCode: string | null
    referralLink: string | null
    profilePicture: string
}


type UserContextType = {
    user: User | null
    loading: boolean
    refreshUser: () => Promise<void>
    updateUser: (userData: Partial<User>) => void
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    refreshUser: async () => { },
    updateUser: (userData: Partial<User>) => { }
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const res = await getProfileApi();
            if (!(res.status === 200)) throw new Error('Unauthorized')
            setUser(res.data['user'])
        } catch (err) {
            console.log(err)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const updateUser = (userData: Partial<User>) => {
        setUser((prevUser) => {
            if (prevUser) {
                const updatedUser = { ...prevUser, ...userData };
                setUser(updatedUser);
                return updatedUser;
            }
            throw new Error("No user logged in to update");
        });
    };

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, loading, refreshUser: fetchUser, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)

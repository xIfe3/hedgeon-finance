'use client';

import React, { useEffect, useState } from 'react';
import DashboardStats from './DashboardStats';
import UsersManager from './UserManager';
import KYCApprovals from './KYCApprovals';
import WithdrawalRequests from './WithdrawalRequest';
import { useUser } from '@/context/UserContext';
import Section from '@/components/admin/Section';
import { getAllUsersAdminApi, getAllInvestmentsAdminApi, getAllKYCSubmissionsAdminApi, getAllWithdrawalRequestsAdminApi } from '@/app/api/adminApi';

const AdminDashboard = () => {
    const { user } = useUser();

    const [users, setUsers] = useState([])
    const [investments, setInvestments] = useState<any[]>([])
    const [kycs, setKycs] = useState<any[]>([])
    const [withdrawals, setWithdrawals] = useState<any[]>([])

    const fetchData = async () => {
        try {
            const usersResponse = await getAllUsersAdminApi();
            setUsers(usersResponse.data);

            const investmentsResponse = await getAllInvestmentsAdminApi();
            setInvestments(investmentsResponse.data);

            const kycsResponse = await getAllKYCSubmissionsAdminApi();
            setKycs(kycsResponse.data);

            const withdrawalResponse = await getAllWithdrawalRequestsAdminApi();
            setWithdrawals(withdrawalResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log("Users:", users);
        console.log("Investments:", investments);
        console.log("KYC Submissions:", kycs);
        console.log("Withdrawals:", withdrawals);
    }, [users, investments, kycs])

    const getActiveInvestments = () => {
        let amount;
        if (investments.length > 0) {
            amount = investments.filter(investment => investment?.status == 'active').reduce((acc, investment) => acc + investment.amount, 0);
        } else {
            amount = 0;
        }
        return amount;
    }

    return (
        <Section>
            <h1 className="text-3xl font-bold">Welcome back, Captain</h1>

            <DashboardStats totalUsers={users.length} activeInvestments={getActiveInvestments()} pendingKYC={kycs.filter(kyc => kyc.verified == false).length} />
            <UsersManager users={users} setUsers={setUsers} />
            {/* <KYCApprovals kycs={kycs} /> */}
            <WithdrawalRequests withdrawals={withdrawals} fetchData={fetchData} />
        </Section>
    );
};

export default AdminDashboard;
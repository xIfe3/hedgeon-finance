'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, notification, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllInvestmentsAdminApi } from '@/app/api/adminApi';
import InvestmentDetails from './InvestmentDetails';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';

const InvestmentManager = () => {
    const [investments, setInvestments] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<any>({
        pageSize: 10,
        current: 1,
    });
    const [selectedInvestment, setSelectedInvestment] =
        useState<any>(null);
    const [api, contextHolder] = notification.useNotification();

    const fetchInvestments = async () => {
        try {
            setLoading(true);
            const response = await getAllInvestmentsAdminApi();

            setInvestments(response.data);
            setPaginationInfo({
                ...paginationInfo,
                total: response.data,
            });

            console.log("RESPONSE", response)
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: `Failed to fetch investments requests: ${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    const handleSearch = (value: string) => {
        setSearchText(value);
        console.log('Searching:', value);
    };

    const handleTableChange = (newPagination: any) => {
        setPaginationInfo(newPagination);
    };

    const columns: ColumnsType<any> = [
        {
            title: 'User',
            dataIndex: ['user', 'name'], // Access nested user property
            render: (_, record) => record.user?.name,
            sorter: (a, b) => a.user.name.localeCompare(b.user.name),
        },
        {
            title: 'Plan',
            dataIndex: 'name',
            render: (_, record) => record.plan.name,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: (amount) => `$${formatNumberWithCommas(amount)}`,
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A',
            sorter: (a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A',
            sorter: (a, b) =>
                new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                switch (status) {
                    case 'active':
                        return <Badge status="success" text="Active" />;
                    case 'paused':
                        return <Badge status="warning" text="Paused" />;
                    case 'completed':
                        return <Badge status="success" text="Completed" />;
                    case 'cancelled':
                        return <Badge status="error" text="Cancelled" />;
                    case 'pending':
                        return <Badge status="processing" text="Pending" />;
                    default:
                        return <Badge text="Unknown" />;
                }
            },
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => handleViewDetails(record)}>
                        View
                    </Button>
                </Space>
            ),
        },
    ];

    const handleViewDetails = (investment: any) => {
        setSelectedInvestment(investment);
    };

    const handleBackToList: any = () => {
        setSelectedInvestment(null);
    };

    const handleInvestmentUpdate = () => {
        // Refresh the investment list after an update
        fetchInvestments();
    };

    const filteredInvestments = React.useMemo(() => {
        return investments.filter((investment) => {
            const searchTermLower = searchText.toLowerCase();
            return (
                investment.plan.name.toLowerCase().includes(searchTermLower) ||
                investment.status.toLowerCase().includes(searchTermLower) ||
                investment.user.name.toLowerCase().includes(searchTermLower) ||
                String(investment.investmentAmount).includes(searchTermLower) // Add more fields as needed
            );
        });
    }, [investments, searchText]);

    if (selectedInvestment) {
        return (
            <InvestmentDetails
                investment={selectedInvestment}
                onBack={handleBackToList}
                onUpdate={handleInvestmentUpdate}
            />
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Investment Management</h2>
            </div>
            {contextHolder}
            <Table
                columns={columns}
                dataSource={filteredInvestments}
                rowKey="_id"
                loading={loading}
                pagination={paginationInfo}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default InvestmentManager;
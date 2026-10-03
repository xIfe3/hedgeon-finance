'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message, Popconfirm, Tag } from 'antd';
import { getAllMerchantRequestsAdminApi, approveMerchantRequestAdminApi, rejectMerchantRequestAdminApi, deleteMerchantApplicationAdminApi } from '@/app/api/adminApi';
import type { ColumnsType } from 'antd/es/table';

interface Merchant {
    _id: string;
    fullName: string;
    email: string;
    status: string;
    createdAt: string;
}

const AdminMerchantPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Merchant[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    const fetchMerchants = async () => {
        try {
            setLoading(true);
            const res = await getAllMerchantRequestsAdminApi();
            setData(res.data.merchants || []);
        } catch (err) {
            message.error("Failed to fetch merchants");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMerchants();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await approveMerchantRequestAdminApi(id);
            message.success("Merchant approved");
            fetchMerchants();
        } catch {
            message.error("Approval failed");
        }
    };

    const handleReject = async () => {
        if (!selectedId) return;
        try {
            await rejectMerchantRequestAdminApi(selectedId, rejectReason);
            message.success("Merchant rejected");
            setRejectModalVisible(false);
            fetchMerchants();
        } catch {
            message.error("Rejection failed");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMerchantApplicationAdminApi(id);
            message.success("Merchant deleted");
            fetchMerchants();
        } catch {
            message.error("Deletion failed");
        }
    };

    const columns: ColumnsType<Merchant> = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'blue';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            }
        },
        {
            title: 'Applied On',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString()
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="link" href={`/admin/merchants/${record._id}`}>View</Button>
                    <Button type="primary" onClick={() => handleApprove(record._id)}>Approve</Button>
                    <Button danger onClick={() => {
                        setSelectedId(record._id);
                        setRejectModalVisible(true);
                    }}>Reject</Button>
                    <Popconfirm
                        title="Delete this merchant?"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button danger type="link">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        }
    ];

    return (
        <>
            <h1 className="text-xl font-semibold mb-4">Merchant Applications</h1>
            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                rowKey="_id"
            />

            <Modal
                title="Reject Merchant Application"
                visible={rejectModalVisible}
                onCancel={() => setRejectModalVisible(false)}
                onOk={handleReject}
                okText="Reject"
                okButtonProps={{ danger: true }}
            >
                <p>Please provide a reason for rejection:</p>
                <textarea
                    className="w-full mt-2 border border-gray-300 rounded p-2"
                    rows={4}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                />
            </Modal>
        </>
    );
};

export default AdminMerchantPage;

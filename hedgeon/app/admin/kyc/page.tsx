'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, notification, Badge, Card, Descriptions } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllKYCSubmissionsAdminApi, updateKYCVerificationStatus } from '@/app/api/adminApi'; // Adjust the path as necessary
import Section from '@/components/admin/Section';

// Interface for KYC data, matching your Mongoose schema
interface IKYC {
    _id: string;
    userId: { _id: string; name: string; email: string }; // Adjust based on your User model
    documentType: string;
    idDocumentUrl: string;
    proofOfAddress: string;
    selfieUrl: string;
    verified: boolean;
    createdAt: string; // Add if you want to display
    updatedAt: string; // Add if you want to display
}

// KYCDetails Component
const KYCDetails: React.FC<{ kyc: IKYC; onBack: () => void; onUpdate: () => void }> = ({ kyc, onBack, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    // Function to handle verification status update (you'll need to create this API)
    const handleVerify = async (verifiedStatus: boolean) => {
        try {
            setLoading(true);

            const response = await updateKYCVerificationStatus(kyc._id, verifiedStatus);
            console.log(response.data);

            api.success({
                message: 'Success',
                description: `KYC verification status updated to ${verifiedStatus ? 'Verified' : 'Unverified'}`,
            });

            onUpdate();
        } catch (error: any) {
            let message = 'An unexpected error occurred';
            if (error?.response) {
                // Handle known server errors
                if (error.response.status === 500) {
                    message = 'Server error (500): Something went wrong on the server. Please try again later.';
                } else {
                    message = error.response.data?.message || error.message || message;
                }
            } else if (error?.message) {
                message = error.message;
            }

            api.error({
                message: 'Error Verifying KYC',
                description: message,
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <Button onClick={onBack} className="mb-4">
                &larr; Back to List
            </Button>

            {contextHolder}

            <Card title={`KYC Details for ${kyc.userId.name}`}>
                <Descriptions bordered>
                    <Descriptions.Item label="User Name">{kyc.userId.name}</Descriptions.Item>
                    <Descriptions.Item label="User Email">{kyc.userId.email}</Descriptions.Item>
                    <Descriptions.Item label="ID Document">
                        <a href={kyc.idDocumentUrl} target="_blank" rel="noopener noreferrer">
                            View ID Document
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Proof of Address">
                        <a href={kyc.proofOfAddress} target="_blank" rel="noopener noreferrer">
                            View Proof Of Address
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Selfie">
                        <a href={kyc.selfieUrl} target="_blank" rel="noopener noreferrer">
                            View Selfie Image
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Verification Status" span={3}>
                        <Badge
                            status={kyc.verified ? 'success' : 'error'}
                            text={kyc.verified ? 'Verified' : 'Unverified'}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {new Date(kyc.createdAt).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {new Date(kyc.updatedAt).toLocaleString()}
                    </Descriptions.Item>
                </Descriptions>
                <div className="mt-4 flex gap-2">
                    <Button
                        type="primary"
                        onClick={() => handleVerify(true)}
                        disabled={kyc.verified || loading} // Disable if already verified
                    >
                        Verify
                    </Button>
                    <Button
                        type="default"
                        onClick={() => handleVerify(false)}
                        disabled={!kyc.verified || loading} // Disable if not verified
                    >
                        Set as Unverified
                    </Button>
                </div>
            </Card>
        </div>
    );
};

const KYCManager = () => {
    const [kycs, setKYCs] = useState<IKYC[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<any>({
        pageSize: 10,
        current: 1,
    });
    const [selectedKYC, setSelectedKYC] = useState<IKYC | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null); // null for all, true, or false

    const fetchKYCs = async () => {
        try {
            setLoading(true);

            const response = await getAllKYCSubmissionsAdminApi()
            const responseData = await response.data;

            setKYCs(responseData); // Adjust based on your API response structure
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to fetch KYC submissions',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKYCs();
    }, [])

    const handleSearch = (value: string) => {
        setSearchText(value);
    };
    const columns: ColumnsType<IKYC> = [
        {
            title: 'User',
            dataIndex: ['userId', 'name'], // Access nested user property
            render: (_, record) => record.userId.name,
        },
        {
            title: 'Document Type',
            dataIndex: 'documentType',
            render: (_, record) => record.documentType,
        },
        {
            title: 'Verified',
            dataIndex: 'verified',
            render: (verified) => (
                <Badge status={verified ? 'success' : 'error'} text={verified ? 'Yes' : 'No'} />
            ),
            filters: [ // Add filters for the verified column
                { text: 'Verified', value: 'true' },
                { text: 'Not Verified', value: 'false' },
            ],
            onFilter: (value, record) => record.verified === (value === 'true'),
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

    const handleViewDetails = (kyc: IKYC) => {
        setSelectedKYC(kyc);
    };

    const handleBackToList = () => {
        setSelectedKYC(null);
    };

    const handleKYCUpdate = () => {
        // Refresh the kYC list after an update
        fetchKYCs();
    };

    const filteredKYCs = React.useMemo(() => {
        let result = [...kycs];
        if (searchText) {
            const searchTermLower = searchText.toLowerCase();
            result = result.filter((kyc) => {
                return (
                    kyc.userId.name.toLowerCase().includes(searchTermLower) ||
                    kyc.userId.email.toLowerCase().includes(searchTermLower)
                    // Add more fields as needed
                );
            });
        }
        return result;
    }, [kycs, searchText]);

    if (selectedKYC) {
        return (
            <KYCDetails
                kyc={selectedKYC}
                onBack={handleBackToList}
                onUpdate={handleKYCUpdate}
            />
        );
    }

    return (
        <Section>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">KYC Management</h2>
                    <div className='flex gap-4'>
                        <Input.Search
                            placeholder="Search KYC..."
                            onSearch={handleSearch}
                            className="w-3/4"
                        />
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredKYCs}
                    rowKey="_id"
                    loading={loading}
                    pagination={paginationInfo}
                />
            </div>
        </Section>
    );
};

export default KYCManager;

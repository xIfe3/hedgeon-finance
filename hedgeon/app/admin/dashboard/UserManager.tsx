'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Space, Input, notification, Badge, Card, Descriptions, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    CheckCircle,
    BanIcon,
    Check,
    X,
    Edit
} from 'lucide-react'; // Import icons
import { getAllUsersAdminApi, updateUserAdminApi, updateUserStatusAdminApi, verifyUserEmailAdminApi } from '@/app/api/adminApi'; // Adjust the path
import Section from '@/components/admin/Section';
import { AxiosError } from 'axios';

// Interface for User data (adjust to match your actual User model)
interface UserType {
    _id: string;
    name: string;
    email: string;
    phone?: string; // Optional
    isVerified: boolean;
    active: boolean;
    suspended: boolean;
    role: string; // e.g., 'user', 'admin'
    createdAt: string;
    updatedAt: string;
    kyc?: {      // Optional, adjust based on your actual data structure
        verified: boolean;
    }
}

// UserDetails Component
const UserDetails: React.FC<{ user: UserType; onBack: () => void; onUpdate: () => void }> = ({ user, onBack, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [localUser, setLocalUser] = useState<UserType>(user);  // State for editable fields
    const initialUser = React.useRef<UserType>(user);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        setLocalUser(user);
        initialUser.current = user;
    }, [user]);

    // Generic function to handle status updates (suspend, pause, activate)
    const handleStatusChange = async (
        statusField: 'active' | 'suspended',
        newValue: boolean,
    ) => {
        try {
            setLoading(true);
            let response;

            if (statusField === 'active') {
                response = await updateUserStatusAdminApi(user._id, newValue);
            } else if (statusField === 'suspended') {
                response = await updateUserStatusAdminApi(user._id, false, newValue); // Pass undefined for active
            } else {
                throw new Error('Invalid status field'); // Handle invalid statusField
            }


            if (response.status !== 200) {
                throw new Error(response.data?.message || `Failed to ${statusField} user`);
            }

            api.success({
                message: 'Success',
                description: `User ${statusField} status updated to ${newValue ? 'Yes' : 'No'}`,
            });

            setLocalUser({ ...response.data.data, [statusField]: newValue }); // Update local state
            onUpdate(); // Refresh user list

        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.message || `Failed to ${statusField} user`,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyUser = async () => {
        try {
            setLoading(true);
            await verifyUserEmailAdminApi(user._id, !localUser.isVerified)

            setLocalUser({ ...localUser, isVerified: !localUser.isVerified });
            onUpdate();
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: 'Failed to update user verification status',
            });
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            //  API to update user details.
            await updateUserAdminApi(user._id, localUser);

            api.success({
                message: 'Success',
                description: 'User details updated',
            });
            setEditMode(false);
            onUpdate();
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.message || 'Failed to update user details',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setLocalUser(initialUser.current);
    };

    return (
        <Section>
            <h1 className="text-3xl font-bold">User Management</h1>

            <div className="bg-white rounded-lg shadow-sm">
                <Button onClick={onBack} className="mb-4">
                    &larr; Back to List
                </Button>

                {contextHolder}

                <Card title={`User Details: ${localUser.name}`}>
                    <Tabs defaultActiveKey="general">
                        <Tabs.TabPane key="general" tab="General">
                            <Descriptions bordered>
                                <Descriptions.Item label="Name">
                                    {editMode ? (
                                        <Input
                                            value={localUser.name}
                                            onChange={(e) => setLocalUser({ ...localUser, name: e.target.value })}
                                        />
                                    ) : (
                                        localUser.name
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label="Email">
                                    {editMode ? (
                                        <Input
                                            value={localUser.email}
                                            onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })}
                                        />
                                    ) : (
                                        localUser.email
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label="Phone">
                                    {editMode ? (
                                        <Input
                                            value={localUser.phone}
                                            onChange={(e) => setLocalUser({ ...localUser, phone: e.target.value })}
                                        />
                                    ) : (
                                        localUser.phone || 'N/A'
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label="Role">{localUser.role}</Descriptions.Item>
                                <Descriptions.Item label="Verified" span={3}>
                                    <Badge
                                        status={localUser.isVerified ? 'success' : 'error'}
                                        text={localUser.isVerified ? 'Yes' : 'No'}
                                    />
                                </Descriptions.Item>
                                <Descriptions.Item label="Active" span={3}>
                                    <Badge
                                        status={localUser.active ? 'success' : 'error'}
                                        text={localUser.active ? 'Yes' : 'No'}
                                    />
                                </Descriptions.Item>
                                <Descriptions.Item label="Suspended" span={3}>
                                    <Badge
                                        status={localUser.suspended ? 'error' : 'success'}
                                        text={localUser.suspended ? 'Yes' : 'No'}
                                    />
                                </Descriptions.Item>
                                <Descriptions.Item label="Created At">{new Date(localUser.createdAt).toLocaleString()}</Descriptions.Item>
                                <Descriptions.Item label="Updated At">{new Date(localUser.updatedAt).toLocaleString()}</Descriptions.Item>
                            </Descriptions>
                            <div className="mt-4 flex gap-2">
                                {!editMode && (
                                    <>
                                        <Button
                                            onClick={() => handleStatusChange('active', true)}
                                            disabled={localUser.active || loading}
                                        >
                                            <CheckCircle /> Activate
                                        </Button>
                                        <Button
                                            onClick={() => handleStatusChange('suspended', true)}
                                            disabled={localUser.suspended || loading}
                                        >
                                            <BanIcon /> Suspend
                                        </Button>
                                        <Button
                                            onClick={() => handleStatusChange('suspended', false)}
                                            disabled={!localUser.suspended || loading}
                                        >
                                            <Check /> Unsuspend
                                        </Button>
                                        <Button onClick={handleVerifyUser} disabled={loading}>
                                            {localUser.isVerified ? <div className='flex space-x-2'><X /> Set Unverified</div> : <div className='flex space-x-2'><Check /> Set Verified</div>}
                                        </Button>
                                        <Button onClick={handleEdit}>
                                            <Edit /> Edit
                                        </Button>
                                    </>
                                )}
                                {editMode && (
                                    <>
                                        <Button onClick={handleSave} disabled={loading}>
                                            <Check /> Save
                                        </Button>
                                        <Button onClick={handleCancel} disabled={loading}>
                                            <X /> Cancel
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="kyc" tab="KYC Info">
                            {localUser.kyc ? (
                                <Descriptions bordered>
                                    <Descriptions.Item label="Verification Status" span={3}>
                                        <Badge
                                            status={localUser.kyc.verified ? 'success' : 'error'}
                                            text={localUser.kyc.verified ? 'Verified' : 'Not Verified'}
                                        />
                                    </Descriptions.Item>
                                    {/* Add other KYC fields if available  */}
                                </Descriptions>
                            ) : (
                                <p>No KYC information available for this user.</p>
                            )}
                        </Tabs.TabPane>
                        {/* Add other tabs as needed (e.g., for orders, etc.) */}
                    </Tabs>
                </Card>
            </div>
        </Section>
    );
};

const UserManager = ({ users, setUsers }: any) => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [activeFilter, setActiveFilter] = useState<boolean | null>(null); // null: all, true: active, false: inactive
    const [verifiedFilter, setVerifiedFilter] = useState<boolean | null>(null); // null: all, true: verified, false: not verified
    const [suspendedFilter, setSuspendedFilter] = useState<boolean | null>(null);
    const [api, contextHolder] = notification.useNotification();

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const queryParams: Record<string, any> = {};

            if (activeFilter !== null) {
                queryParams.active = activeFilter;
            }
            if (verifiedFilter !== null) {
                queryParams.verified = verifiedFilter;
            }
            if (suspendedFilter !== null) {
                queryParams.suspended = suspendedFilter;
            }

            const response = await getAllUsersAdminApi();

            if (response.status !== 200) {
                throw new Error("Failed to fetch users");
            }
            const responseData = response.data;

            let filteredData = responseData;

            if (activeFilter !== null) {
                filteredData = filteredData.filter(user => user.active === activeFilter);
            }
            if (verifiedFilter !== null) {
                filteredData = filteredData.filter(user => user.verified === verifiedFilter);
            }
            if (suspendedFilter !== null) {
                filteredData = filteredData.filter(user => user.suspended === suspendedFilter);
            }

            setUsers(filteredData);

        } catch (error: any) {
            if (error instanceof AxiosError) {
                api.error({
                    message: 'Error',
                    description: error.response?.data?.message || 'Failed to fetch users',
                });
            } else {
                api.error({
                    message: 'Error',
                    description: error.message || 'Failed to fetch users',
                });
            }
        } finally {
            setLoading(false);
        }
    }, [activeFilter, verifiedFilter, suspendedFilter]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const columns: ColumnsType<UserType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => (a.phone ?? '').localeCompare(b.phone ?? ''),
        },
        {
            title: 'Verified',
            dataIndex: 'isVerified',
            render: (verified) => (
                <Badge status={verified ? 'success' : 'error'} text={verified ? 'Yes' : 'No'} />
            ),
            filters: [ // Add filters for the verified column
                { text: 'Verified', value: true },
                { text: 'Not Verified', value: false },
            ],
            onFilter: (value, record) => record.isVerified === (value === true),
        },
        {
            title: 'Active',
            dataIndex: 'active',
            render: (active) => (
                <Badge status={active ? 'success' : 'error'} text={active ? 'Yes' : 'No'} />
            ),
            filters: [ // Add filters for the verified column
                { text: 'Active', value: true },
                { text: 'Suspended', value: false },
            ],
            onFilter: (value, record) => record.active === (value === true),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
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

    const handleViewDetails = (user: UserType) => {
        setSelectedUser(user);
    };

    const handleBackToList = () => {
        setSelectedUser(null);
    };

    const handleUserUpdate = () => {
        fetchUsers();
    };

    const filteredUsers = React.useMemo(() => {
        let result = [...users];
        if (searchText) {
            const searchTermLower = searchText.toLowerCase();
            result = result.filter((user) => {
                return (
                    user.name.toLowerCase().includes(searchTermLower) ||
                    user.email.toLowerCase().includes(searchTermLower) ||
                    user.role.toLowerCase().includes(searchTermLower)
                );
            });
        }
        return result;
    }, [users, searchText]);

    if (selectedUser) {
        return (
            <UserDetails
                user={selectedUser}
                onBack={handleBackToList}
                onUpdate={handleUserUpdate}
            />
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <div className="flex gap-4">
                    <Input.Search
                        placeholder="Search users..."
                        onSearch={handleSearch}
                        className="w-full"
                    />
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="_id"
                loading={loading}
            //pagination={paginationInfo}  Removed Pagination
            //onChange={handleTableChange}  Removed Pagination
            />
        </div>
    );
};

export default UserManager;

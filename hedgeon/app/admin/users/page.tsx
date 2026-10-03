'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Space, Input, notification, Badge, Card, Descriptions, Form, Select, InputNumber, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    CheckCircle,
    BanIcon,
    Check,
    X,
    Edit,
    DollarSign,
    Plus,
    Minus
} from 'lucide-react'; // Import icons
import { getAllUsersAdminApi, updateUserAdminApi, updateUserStatusAdminApi, updateUserWalletAdminApi, verifyUserEmailAdminApi } from '@/app/api/adminApi'; // Adjust the path
import Section from '@/components/admin/Section';
import { AxiosError } from 'axios';
import UserStats from './UsersStats';
import { Grid } from 'antd';
const { useBreakpoint } = Grid;

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
    walletBalance: number
}

interface WalletUpdateFormValues {
    action: 'ADD' | 'SUBTRACT' | 'SET';
    amount: number;
}

// UserDetails Component
const UserDetails: React.FC<{ user: UserType; onBack: () => void; onUpdate: () => void }> = ({ user, onBack, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [localUser, setLocalUser] = useState<UserType>(user);
    const [showWalletModal, setShowWalletModal] = useState(false); // ADDED: Wallet modal state
    const [walletForm] = Form.useForm(); // ADDED: Wallet form
    const initialUser = React.useRef<UserType>(user);

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        setLocalUser(user);
        initialUser.current = user;
    }, [user]);

    // ADDED: Wallet update handler
    const handleWalletUpdate = async (values: WalletUpdateFormValues) => {
        try {
            setLoading(true);
            console.log(user._id)
            await updateUserWalletAdminApi(user._id, values);

            api.success({
                message: 'Success',
                description: 'Wallet updated successfully',
            });

            // Refresh user data
            const updatedUser = (await getAllUsersAdminApi()).data;
            const userData = updatedUser.find((u: UserType) => u._id === user._id);
            if (userData) {
                setLocalUser(userData);
            }

            setShowWalletModal(false);
            onUpdate();
        } catch (error: any) {
            console.log("Error: ", error)
            api.error({
                message: 'Error',
                description: error.message || 'Failed to update wallet',
            });
        } finally {
            setLoading(false);
        }
    };

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

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <Button onClick={onBack} className="mb-4">
                    &larr; Back to List
                </Button>

                {contextHolder}

                <Card title={`User Details: ${localUser.name}`} extra={
                    <Button
                        type="primary"
                        icon={<DollarSign size={16} />}
                        onClick={() => setShowWalletModal(true)}
                    >
                        Update Wallet
                    </Button>
                }
                >
                    <Descriptions bordered>
                        <Descriptions.Item label="Wallet Balance" span={3}>
                            <span className="font-bold text-lg">
                                ${localUser.walletBalance.toFixed(2)}
                            </span>
                        </Descriptions.Item>
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
                </Card>
            </div>

            {/* ADDED: Wallet Update Modal */}
            <Modal
                title={`Update Wallet - ${localUser.name}`}
                open={showWalletModal}
                onCancel={() => setShowWalletModal(false)}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={walletForm}
                    layout="vertical"
                    initialValues={{ action: 'ADD', amount: 0, note: '' }}
                    onFinish={handleWalletUpdate}
                >
                    <Form.Item
                        name="action"
                        label="Action"
                        rules={[{ required: true, message: 'Please select an action' }]}
                    >
                        <Select>
                            <Select.Option value="ADD">
                                <div className="flex items-center text-green-600">
                                    <Plus size={16} className="mr-2" /> Add Funds
                                </div>
                            </Select.Option>
                            <Select.Option value="SUBTRACT">
                                <div className="flex items-center text-red-600">
                                    <Minus size={16} className="mr-2" /> Subtract Funds
                                </div>
                            </Select.Option>
                            <Select.Option value="SET">
                                <div className="flex items-center text-blue-600">
                                    <DollarSign size={16} className="mr-2" /> Set Specific Amount
                                </div>
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[
                            { required: true, message: 'Please enter amount' },
                            {
                                validator: (_, value) =>
                                    value > 0 ? Promise.resolve() : Promise.reject('Amount must be positive')
                            }
                        ]}
                    >
                        <InputNumber
                            min={0.01}
                            step={0.01}
                            precision={2}
                            className="w-full"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full"
                        >
                            Update Wallet
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Section>
    );
};

const UserManager = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const screens = useBreakpoint();
    const [api, contextHolder] = notification.useNotification();


    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);

            const response = await getAllUsersAdminApi();

            if (response.status !== 200) {
                throw new Error("Failed to fetch users");
            }
            const responseData = response.data;

            let filteredData = responseData;

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
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const responsiveColumns: ColumnsType<UserType> = React.useMemo(() => {
        const baseColumns: ColumnsType<UserType> = [
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

        const extendedColumns: ColumnsType<UserType> = [
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
                filters: [
                    { text: 'Verified', value: true },
                    { text: 'Not Verified', value: false },
                ],
                onFilter: (value, record) => record.isVerified === (value === true),
            },
            {
                title: 'Wallet',
                dataIndex: 'walletBalance',
                render: (balance) => (
                    <span className="font-medium">
                        ${balance.toFixed(2)}
                    </span>
                ),
                sorter: (a, b) => a.walletBalance - b.walletBalance,
            },
            {
                title: 'Active',
                dataIndex: 'active',
                render: (active) => (
                    <Badge status={active ? 'success' : 'error'} text={active ? 'Yes' : 'No'} />
                ),
                filters: [
                    { text: 'Active', value: true },
                    { text: 'Suspended', value: false },
                ],
                onFilter: (value, record) => record.active === (value === true),
            },
        ];

        // Show fewer columns on xs screens
        return screens.xs ? baseColumns : [...baseColumns, ...extendedColumns];
    }, [screens]);


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

    const user_stats = () => {
        return (
            <UserStats total={users.length} active={users.filter(user => user.active == true && user.suspended == false).length} verified={users.filter(user => user.isVerified).length} suspended={users.filter(user => user.active == false && user.suspended == true).length} />
        );
    }

    return (
        <Section>
            {user_stats()}

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
                    columns={responsiveColumns}
                    dataSource={filteredUsers}
                    rowKey="_id"
                    loading={loading}
                    scroll={{ x: 'max-content' }}
                />
            </div>
        </Section>
    );
};

export default UserManager;

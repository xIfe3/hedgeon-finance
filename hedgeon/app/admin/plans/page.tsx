'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Space, Input, notification, Badge, Card, Descriptions, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllPlansAdminApi, updatePlanAdminApi } from '@/app/api/adminApi'; // Adjust the path as necessary
import Section from '@/components/admin/Section';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';

interface IPlan {
    _id: string;
    name: string;
    minAmount: number;
    maxAmount: number;
    minDuration: number;
    maxDuration: number;
    durationType: string;
    estimatedROI: number;
    taxOnProfit: number;
    referralBonus: number;
    riskLevel: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
    benefits: string[];
    status: boolean;
    createdAt: Date;
}

interface PlanDetailsProps {
    plan: IPlan;
    onUpdate: (id: string, updatedPlan: Partial<IPlan>) => void; // Add onUpdate prop
    onBack: () => void; // Add onUpdate prop
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ plan, onUpdate, onBack }) => {
    const [editMode, setEditMode] = useState(false);
    const [localPlan, setLocalPlan] = useState<IPlan>(plan);
    const initialPlan = useRef<IPlan>(plan);
    const [loading, setLoading] = useState(false); // Add loading state
    const [api, contextHolder] = notification.useNotification();

    // Initialize localPlan and initialPlan when the plan prop changes
    useEffect(() => {
        setLocalPlan(plan);
        initialPlan.current = plan;
    }, [plan]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true); // Set loading to true before making the API call
            // Prepare the updated plan data
            const updatedPlanData: Partial<IPlan> = {
                name: localPlan.name,
                minAmount: localPlan.minAmount,
                maxAmount: localPlan.maxAmount,
                maxDuration: localPlan.maxDuration,
                minDuration: localPlan.minDuration,
                durationType: localPlan.durationType,
                estimatedROI: localPlan.estimatedROI,
                taxOnProfit: localPlan.taxOnProfit,
                referralBonus: localPlan.referralBonus,
                riskLevel: localPlan.riskLevel,
                benefits: localPlan.benefits,
                status: localPlan.status,
            };

            const response = await updatePlanAdminApi(plan._id, updatedPlanData);
            console.log("Response from update plan", response);

            api.success({
                message: 'Success',
                description: 'Plan details updated successfully!',
            });
            setEditMode(false);
            onUpdate(plan._id, updatedPlanData);
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: `Failed to update plan details: ${error.message}`,
            });
        } finally {
            setLoading(false); // Set loading back to false
        }

    };

    const handleCancel = () => {
        setEditMode(false);
        setLocalPlan(initialPlan.current); // Reset to initial values
    };

    const benefitsOptions = [
        "Benefit 1",
        "Benefit 2",
        "Benefit 3",
        "Benefit 4",
        "Benefit 5",
    ];

    const riskLevelOptions = [
        "CONSERVATIVE",
        "MODERATE",
        "AGGRESSIVE"
    ]

    return (
        <Card
            title={`Plan Details for ${localPlan.name}`}
            className="w-full max-w-fit mx-auto" // Responsive container
        >
            {contextHolder}
            <Descriptions
                bordered
                className="w-full"
                column={{ xs: 1, sm: 2, md: 3 }} // Responsive columns
            >
                {/* Name */}
                <Descriptions.Item label="Name" span={2}>
                    {editMode ? (
                        <Input
                            value={localPlan.name}
                            onChange={(e) => setLocalPlan({ ...localPlan, name: e.target.value })}
                            className="w-full" // Full width on mobile
                        />
                    ) : (
                        <div className="break-words">{localPlan.name}</div>
                    )}
                </Descriptions.Item>

                {/* Min Amount */}
                <Descriptions.Item label="Min Amount">
                    {editMode ? (
                        <Input
                            type="number"
                            value={localPlan.minAmount}
                            onChange={(e) => setLocalPlan({ ...localPlan, minAmount: Number(e.target.value) })}
                            className="w-full"
                        />
                    ) : (
                        localPlan.minAmount
                    )}
                </Descriptions.Item>

                {/* Max Amount */}
                <Descriptions.Item label="Max Amount">
                    {editMode ? (
                        <Input
                            type="number"
                            value={localPlan.maxAmount}
                            onChange={(e) => setLocalPlan({ ...localPlan, maxAmount: Number(e.target.value) })}
                            className="w-full"
                        />
                    ) : (
                        localPlan.maxAmount
                    )}
                </Descriptions.Item>

                {/* Max Duration */}
                <Descriptions.Item label="Max Duration">
                    {editMode ? (
                        <Input
                            type="number"
                            value={localPlan.maxDuration}
                            onChange={(e) => setLocalPlan({ ...localPlan, maxDuration: Number(e.target.value) })}
                            className="w-full"
                        />
                    ) : (
                        localPlan.maxDuration
                    )}
                </Descriptions.Item>

                {/* Min Duration */}
                <Descriptions.Item label="Min Duration">
                    {editMode ? (
                        <Input
                            type="number"
                            value={localPlan.minDuration}
                            onChange={(e) => setLocalPlan({ ...localPlan, minDuration: Number(e.target.value) })}
                            className="w-full"
                        />
                    ) : (
                        localPlan.minDuration
                    )}
                </Descriptions.Item>

                {/* Estimated ROI */}
                <Descriptions.Item label="Estimated ROI">
                    {editMode ? (
                        <Input
                            type="number"
                            value={localPlan.estimatedROI}
                            onChange={(e) => setLocalPlan({ ...localPlan, estimatedROI: Number(e.target.value) })}
                            className="w-full"
                        />
                    ) : (
                        localPlan.estimatedROI
                    )}
                </Descriptions.Item>

                {/* Tax on Profit */}
                <Descriptions.Item label="Tax on Profit">
                    {editMode ? (
                        <Input
                            type="number"
                            value={localPlan.taxOnProfit}
                            onChange={(e) => setLocalPlan({ ...localPlan, taxOnProfit: Number(e.target.value) })}
                            className="w-full"
                        />
                    ) : (
                        localPlan.taxOnProfit
                    )}
                </Descriptions.Item>

                {/* Referral Bonus */}
                <Descriptions.Item label="Referral Bonus">
                    {editMode ? (
                        <Input
                            type="number"
                            value={localPlan.referralBonus}
                            onChange={(e) => setLocalPlan({ ...localPlan, referralBonus: Number(e.target.value) })}
                            className="w-full"
                        />
                    ) : (
                        localPlan.referralBonus
                    )}
                </Descriptions.Item>

                {/* Risk Level */}
                <Descriptions.Item label="Risk Level">
                    {editMode ? (
                        <Select
                            value={localPlan.riskLevel}
                            onChange={(value) => setLocalPlan({ ...localPlan, riskLevel: value as any })}
                            options={riskLevelOptions.map((option) => ({
                                label: option,
                                value: option,
                            }))}
                            className="w-full"
                        />
                    ) : (
                        localPlan.riskLevel
                    )}
                </Descriptions.Item>

                {/* Benefits */}
                <Descriptions.Item label="Benefits" span={2}>
                    {editMode ? (
                        <Select
                            mode="multiple"
                            value={localPlan.benefits}
                            onChange={(values) => setLocalPlan({ ...localPlan, benefits: values })}
                            options={benefitsOptions.map((option) => ({
                                label: option,
                                value: option,
                            }))}
                            className="w-full"
                        />
                    ) : (
                        <div className="flex flex-wrap gap-1">
                            {localPlan.benefits.map((benefit, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                                >
                                    {benefit}
                                </span>
                            ))}
                        </div>
                    )}
                </Descriptions.Item>

                {/* Status */}
                <Descriptions.Item label="Status" span={2}>
                    {editMode ? (
                        <Select
                            value={localPlan.status}
                            onChange={(value) => setLocalPlan({ ...localPlan, status: value })}
                            options={[
                                { label: 'Active', value: true },
                                { label: 'Inactive', value: false },
                            ].map(option => ({ label: option.label, value: option.value }))}
                            className="w-full md:w-auto"
                        />
                    ) : (
                        <Badge
                            status={localPlan.status ? 'success' : 'error'}
                            text={localPlan.status ? 'Active' : 'Inactive'}
                        />
                    )}
                </Descriptions.Item>

                {/* Created At */}
                <Descriptions.Item label="Created At" span={2}>
                    {new Date(localPlan.createdAt).toLocaleString()}
                </Descriptions.Item>
            </Descriptions>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                {editMode ? (
                    <>
                        <Button
                            type="primary"
                            onClick={handleSave}
                            disabled={loading}
                            className="flex-1 sm:flex-initial"
                        >
                            {loading ? 'Saving...' : <><SaveOutlined /> Save</>}
                        </Button>
                        <Button
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex-1 sm:flex-initial"
                        >
                            {loading ? 'Cancelling...' : <><CloseOutlined /> Cancel</>}
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={handleEdit}
                        className="w-full sm:w-auto"
                    >
                        <EditOutlined /> Edit
                    </Button>
                )}
            </div>
        </Card>
    );
};

const PlansManager = () => {
    const [plans, setPLANs] = useState<IPlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedPLAN, setSelectedPLAN] = useState<IPlan | null>(null);
    const [api, contextHolder] = notification.useNotification();

    const fetchPLANs = async () => {
        try {
            setLoading(true);

            const response = await getAllPlansAdminApi()
            const responseData = await response.data;

            setPLANs(responseData); // Adjust based on your API response structure

            console.log("Response", response);
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.message || 'Failed to fetch PLAN submissions',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPLANs();
    }, [])


    const planColumns: ColumnsType<IPlan> = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <strong>{text}</strong>, // Example of custom rendering
        },
        {
            title: 'Min Amount',
            dataIndex: 'minAmount',
            render: (_, value) => `$${formatNumberWithCommas(value.minAmount)}`, // Format as currency
            sorter: (a, b) => a.minAmount - b.minAmount,
        },
        {
            title: 'Max Amount',
            dataIndex: 'maxAmount',
            render: (_, value) => `$${formatNumberWithCommas(value.maxAmount)}`, // Format as currency
            sorter: (a, b) => a.maxAmount - b.maxAmount,
        },
        {
            title: 'Duration (Min & Max)',
            render: (_, record) => `${record.minDuration ?? '-'} - ${record.maxDuration ?? '-'} ${record.durationType}`,
            sorter: (a, b) => (a.minDuration ?? 0) - (b.maxDuration ?? 0),
        },
        {
            title: 'Estimated ROI',
            dataIndex: 'estimatedROI',
            render: (_, value) => `${value.estimatedROI}%`, // Format as percentage
            sorter: (a, b) => a.estimatedROI - b.estimatedROI,
        },
        {
            title: 'Tax on Profit',
            dataIndex: 'taxOnProfit',
            render: (_, value) => `${value.taxOnProfit}%`, // Format as percentage
            sorter: (a, b) => a.taxOnProfit - b.taxOnProfit,
        },
        {
            title: 'Referral Bonus',
            dataIndex: 'referralBonus',
            render: (value) => `$${value.toFixed(2)}`, // Format as currency
            sorter: (a, b) => a.referralBonus - b.referralBonus,
        },
        {
            title: 'Risk Level',
            dataIndex: 'riskLevel',
            filters: [
                { text: 'Conservative', value: 'CONSERVATIVE' },
                { text: 'Moderate', value: 'MODERATE' },
                { text: 'Aggressive', value: 'AGGRESSIVE' },
            ],
            onFilter: (value, record) => record.riskLevel === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <Badge status={status ? 'success' : 'default'} text={status ? 'Active' : 'Inactive'} />
            ),
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (value) => new Date(value).toLocaleDateString(), // Format date
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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

    const handleViewDetails = (plan: IPlan) => {
        setSelectedPLAN(plan);
    };

    const handleBackToList = () => {
        setSelectedPLAN(null);
    };

    const handlePLANUpdate = () => {
        // Refresh the plan list after an update
        fetchPLANs();
    };


    if (selectedPLAN) {
        return (
            <PlanDetails
                plan={selectedPLAN}
                onBack={handleBackToList}
                onUpdate={handlePLANUpdate}
            />
        );
    }

    return (
        <Section>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Plan Management</h2>
                </div>
                {contextHolder}
                <Table
                    columns={planColumns}
                    dataSource={plans}
                    rowKey="_id"
                    loading={loading}
                />
            </div>
        </Section>
    );
};

export default PlansManager;

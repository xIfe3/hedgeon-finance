'use client';

import React, { useEffect, useState } from 'react';
import { Button, Space, Input, notification, Card, Descriptions, Badge } from 'antd';
import {
    CheckCircleOutlined,
    PauseCircleOutlined,
    EditOutlined,
    ArrowLeftOutlined,
    SaveOutlined,
    CloseOutlined
} from '@ant-design/icons';
import {
    updateInvestmentStatusAdminApi,
    updateInvestmentAdminApi, // Import the updateInvestmentAdminApi
} from '@/app/api/adminApi'; // Import the new API functions
import { StopCircleIcon } from 'lucide-react';


const InvestmentDetails: React.FC<{
    investment: any;
    onBack: () => void;
    onUpdate: () => void;
}> = ({ investment, onBack, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [localInvestment, setLocalInvestment] = useState<any>(investment); // State for editable fields
    const initialInvestment = React.useRef<any>(investment); // Store the initial investment data
    const [api, contextHolder] = notification.useNotification();

    // Initialize localInvestment and initialInvestment when the investment prop changes
    useEffect(() => {
        setLocalInvestment(investment);
        initialInvestment.current = investment;
    }, [investment]);

    const handleStatusChange = async (
        newStatus: 'active' | 'paused' | 'completed' | 'cancelled',
    ) => {
        try {
            setLoading(true);
            // Call the appropriate API to update the investment status
            console.log('Updating investment status to:', newStatus);
            const reponse = await updateInvestmentStatusAdminApi(investment._id, newStatus);
            console.log(reponse.data);
            api.success({
                message: 'Success',
                description: `Investment status updated to ${newStatus}`,
            });
            // Update the local state
            setLocalInvestment({ ...localInvestment, status: newStatus });
            onUpdate();
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: `Failed to update investment status: ${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePause = async () => {
        await handleStatusChange('paused');
    };

    const handleResume = async () => {
        await handleStatusChange('active');
    };

    const handleStop = async () => {
        await handleStatusChange('cancelled');
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            // Call the API to update the investment details
            const updatedInvestmentData = {
                amount: localInvestment.amount,
                startDate: localInvestment.startDate,
                endDate: localInvestment.endDate,
                roiAccumulated: localInvestment.roiAccumulated,
                autoReinvest: localInvestment.autoReinvest,
                isReinvestment: localInvestment.isReinvestment,
                profitAccumulated: localInvestment.profitAccumulated,
            };
            const response = await updateInvestmentAdminApi(investment._id, updatedInvestmentData);
            console.log(response.data);

            api.success({
                message: 'Success',
                description: 'Investment details updated',
            });
            setEditMode(false);
            onUpdate(); // Refresh
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: `Failed to update investment details! Session expired!`,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setLocalInvestment(initialInvestment.current); // revert to initial state
    };

    const getStatusBadge = (status: string) => {
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
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <Button onClick={onBack} className="mb-4">
                <ArrowLeftOutlined /> Back to List
            </Button>

            {contextHolder}

            <Card title="Investment Details">
                <Descriptions bordered>
                    <Descriptions.Item label="User">
                        {localInvestment.user?.name} ({localInvestment.user?.email})
                    </Descriptions.Item>
                    <Descriptions.Item label="Plan">{localInvestment.plan.name}</Descriptions.Item>
                    <Descriptions.Item label="Amount">
                        {editMode ? (
                            <Input
                                type="number"
                                value={localInvestment.amount}
                                onChange={(e) =>
                                    setLocalInvestment({
                                        ...localInvestment,
                                        amount: Number(e.target.value),
                                    })
                                }
                            />
                        ) : (
                            localInvestment.amount
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Start Date">
                        {editMode ? (
                            <Input
                                type="date"
                                value={new Date(localInvestment.startDate).toISOString().split('T')[0]}
                                onChange={(e) =>
                                    setLocalInvestment({
                                        ...localInvestment,
                                        startDate: new Date(e.target.value),
                                    })
                                }
                            />
                        ) : (
                            new Date(localInvestment.startDate).toLocaleDateString()
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="End Date">
                        {editMode ? (
                            <Input
                                type="text"
                                value={localInvestment.endDate}
                                onChange={(e) =>
                                    setLocalInvestment({
                                        ...localInvestment,
                                        endDate: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            localInvestment.endDate
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="ROI Accumulated">
                        {editMode ? (
                            <Input
                                type="number"
                                value={localInvestment.roiAccumulated || 0}
                                onChange={(e) =>
                                    setLocalInvestment({
                                        ...localInvestment,
                                        roiAccumulated: Number(e.target.value),
                                    })
                                }
                            />
                        ) : (
                            localInvestment.roiAccumulated
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Auto Reinvest">
                        {editMode ? (
                            <select
                                value={localInvestment.autoReinvest ? 'true' : 'false'}
                                onChange={(e) =>
                                    setLocalInvestment({
                                        ...localInvestment,
                                        autoReinvest: e.target.value === 'true',
                                    })
                                }
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        ) : (
                            localInvestment.autoReinvest ? 'Yes' : 'No'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Is Reinvestment">
                        {editMode ? (
                            <select
                                value={localInvestment.isReinvestment ? 'true' : 'false'}
                                onChange={(e) =>
                                    setLocalInvestment({
                                        ...localInvestment,
                                        isReinvestment: e.target.value === 'true',
                                    })
                                }
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        ) : (
                            localInvestment.isReinvestment ? 'Yes' : 'No'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {getStatusBadge(localInvestment.status)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Profit Accumulated">
                        {editMode ? (
                            <Input
                                type="number"
                                value={localInvestment.profitAccumulated}
                                onChange={(e) =>
                                    setLocalInvestment({
                                        ...localInvestment,
                                        profitAccumulated: Number(e.target.value),
                                    })
                                }
                            />
                        ) : (
                            localInvestment.profitAccumulated
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Currency">{localInvestment.currency}</Descriptions.Item>
                </Descriptions>

                <div className="mt-4 flex gap-4">
                    {!editMode && (
                        <>
                            <Button
                                type="primary"
                                onClick={handleResume}
                                disabled={localInvestment.status === 'active' || loading}
                            >
                                <CheckCircleOutlined /> Activate
                            </Button>
                            <Button
                                type="dashed"
                                color='orange'
                                onClick={handlePause}
                                disabled={localInvestment.status === 'paused' || loading}
                            >
                                <PauseCircleOutlined /> Pause
                            </Button>
                            <Button
                                type="dashed"
                                color='orange'
                                onClick={handleStop}
                                disabled={localInvestment.status === 'cancelled' || loading}
                            >
                                <StopCircleIcon /> Stop
                            </Button>
                            <Button
                                onClick={handleEdit}
                            >
                                <EditOutlined /> Edit
                            </Button>
                        </>
                    )}
                    {editMode && (
                        <>
                            <Button
                                type="primary"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                <SaveOutlined /> Save
                            </Button>
                            <Button
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                <CloseOutlined /> Cancel
                            </Button>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default InvestmentDetails;
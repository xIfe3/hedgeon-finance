'use client';

import { useState } from 'react';
import { applyAsMerchant } from '@/app/api/userApi';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

function MerchantForm() {
    const [formData, setFormData] = useState({
        businessInfo: {
            legalName: '',
            dba: '',
            businessType: '',
            dateOfIncorporation: '',
            stateOfIncorporation: '',
            ein: '',
            registeredAddress: '',
            operatingAddress: '',
        },
        bankInfo: {
            bankName: '',
            accountName: '',
            accountNumber: '',
            iban: '',
            swiftCode: '',
            currency: '',
            bankDocUrl: '',
        },
        beneficialOwners: {
            fullName: '',
            dateOfBirth: '',
            nationality: '',
            residentialAddress: '',
            ssnOrItin: '',
            ownershipPercentage: 0,
            position: '',
            governmentIdUrl: '',
            proofOfAddressUrl: '',
        },
        amlCompliance: {
            msbRegistered: false,
            fincenNumber: '',
            hasInternalPolicy: false,
            amlPolicyUrl: '',
            additionalDocsUrl: '',
        },
        authorizedSignatory: {
            fullName: '',
            signature: '',
            agreed: false,
        },
    });
    const [formError, setFormError] = useState('')
    const [formSuccess, setFormSuccess] = useState(false)

    const handleChange = (section: string, field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await applyAsMerchant(formData);
            console.log("Response applying as mercant", response);
        } catch (error) {
            console.log("Error applying as merchant!")
        }
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-10">
            {/* Business Info */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        ['legalName', 'Legal Name'],
                        ['dba', 'DBA (optional)'],
                        ['businessType', 'Business Type'],
                        ['dateOfIncorporation', 'Date of Incorporation'],
                        ['stateOfIncorporation', 'State of Incorporation'],
                        ['ein', 'EIN'],
                        ['registeredAddress', 'Registered Address'],
                        ['operatingAddress', 'Operating Address (optional)']
                    ].map(([key, label]) => (
                        <input
                            key={key}
                            type="text"
                            value={(formData.businessInfo as any)[key]}
                            onChange={e => handleChange('businessInfo', key, e.target.value)}
                            placeholder={label}
                            className="border rounded-lg p-2 w-full"
                        />
                    ))}
                </div>
            </div>

            {/* Bank Info */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Bank Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        ['bankName', 'Bank Name'],
                        ['accountName', 'Account Name'],
                        ['accountNumber', 'Account Number'],
                        ['iban', 'IBAN (optional)'],
                        ['swiftCode', 'SWIFT Code (optional)'],
                        ['currency', 'Currency'],
                        ['bankDocUrl', 'Bank Document URL']
                    ].map(([key, label]) => (
                        <input
                            key={key}
                            type="text"
                            value={(formData.bankInfo as any)[key]}
                            onChange={e => handleChange('bankInfo', key, e.target.value)}
                            placeholder={label}
                            className="border rounded-lg p-2 w-full"
                        />
                    ))}
                </div>
            </div>

            {/* Beneficial Owners */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Beneficial Owner</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        ['fullName', 'Full Name'],
                        ['dateOfBirth', 'Date of Birth'],
                        ['nationality', 'Nationality'],
                        ['residentialAddress', 'Residential Address'],
                        ['ssnOrItin', 'SSN or ITIN'],
                        ['ownershipPercentage', 'Ownership Percentage'],
                        ['position', 'Position'],
                        ['governmentIdUrl', 'Government ID URL'],
                        ['proofOfAddressUrl', 'Proof of Address URL']
                    ].map(([key, label]) => (
                        <input
                            key={key}
                            type={key === 'ownershipPercentage' ? 'number' : 'text'}
                            value={(formData.beneficialOwners as any)[key]}
                            onChange={e => handleChange('beneficialOwners', key, e.target.value)}
                            placeholder={label}
                            className="border rounded-lg p-2 w-full"
                        />
                    ))}
                </div>
            </div>

            {/* AML Compliance */}
            <div>
                <h2 className="text-2xl font-bold mb-4">AML Compliance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={formData.amlCompliance.msbRegistered}
                            onChange={e => handleChange('amlCompliance', 'msbRegistered', e.target.checked)}
                        />
                        MSB Registered
                    </label>
                    <input
                        type="text"
                        value={formData.amlCompliance.fincenNumber}
                        onChange={e => handleChange('amlCompliance', 'fincenNumber', e.target.value)}
                        placeholder="FinCEN Number (optional)"
                        className="border rounded-lg p-2 w-full"
                    />
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={formData.amlCompliance.hasInternalPolicy}
                            onChange={e => handleChange('amlCompliance', 'hasInternalPolicy', e.target.checked)}
                        />
                        Has Internal AML Policy
                    </label>
                    <input
                        type="text"
                        value={formData.amlCompliance.amlPolicyUrl}
                        onChange={e => handleChange('amlCompliance', 'amlPolicyUrl', e.target.value)}
                        placeholder="AML Policy URL (optional)"
                        className="border rounded-lg p-2 w-full"
                    />
                    <input
                        type="text"
                        value={formData.amlCompliance.additionalDocsUrl}
                        onChange={e => handleChange('amlCompliance', 'additionalDocsUrl', e.target.value)}
                        placeholder="Additional Docs URL (optional)"
                        className="border rounded-lg p-2 w-full"
                    />
                </div>
            </div>

            {/* Authorized Signatory */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Authorized Signatory</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={formData.authorizedSignatory.fullName}
                        onChange={e => handleChange('authorizedSignatory', 'fullName', e.target.value)}
                        placeholder="Full Name"
                        className="border rounded-lg p-2 w-full"
                    />
                    <input
                        type="text"
                        value={formData.authorizedSignatory.signature}
                        onChange={e => handleChange('authorizedSignatory', 'signature', e.target.value)}
                        placeholder="Signature"
                        className="border rounded-lg p-2 w-full"
                    />
                    <label className="flex items-center gap-2 mt-2 w-full">
                        <input
                            type="checkbox"
                            checked={formData.authorizedSignatory.agreed}
                            onChange={e => handleChange('authorizedSignatory', 'agreed', e.target.checked)}
                        />
                        I confirm that the information provided is correct
                    </label>
                </div>
            </div>

            {formError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3 animate-shake"
                >
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {formError}
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}
            {formSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-100 rounded-sm flex items-center space-x-3 animate-shake"
                >
                    <Alert variant="default">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            Merchant application submitted successfully! Redirecting or saving your data...
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}

            <div className="text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Submit Application
                </button>
            </div>
        </form>
    );
}

export default MerchantForm;

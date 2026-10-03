// models/MerchantApplication.ts
import mongoose, { Schema, Document } from 'mongoose';


interface MerchantApplicationDocument extends Document {
    user: Schema.Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
    businessInfo: {
        legalName: string;
        dba?: string;
        businessType: string;
        dateOfIncorporation: Date;
        stateOfIncorporation: string;
        ein: string;
        registeredAddress: string;
        operatingAddress?: string;
    };
    bankInfo: {
        bankName: string;
        accountName: string;
        accountNumber: string;
        iban?: string;
        swiftCode?: string;
        currency: string;
        bankDocUrl: string;
    };
    beneficialOwners: {
        fullName: string;
        dateOfBirth: Date;
        nationality: string;
        residentialAddress: string;
        ssnOrItin: string;
        ownershipPercentage: number;
        position: string;
        governmentIdUrl: string;
        proofOfAddressUrl: string;
    };
    amlCompliance: {
        msbRegistered: boolean;
        fincenNumber?: string;
        hasInternalPolicy: boolean;
        amlPolicyUrl?: string;
        additionalDocsUrl?: string;
    };
    authorizedSignatory: {
        fullName: string;
        signature: string;
        agreed: boolean;
    };
    createdAt: Date;
}

const MerchantApplicationSchema = new Schema<MerchantApplicationDocument>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    businessInfo: {
        legalName: String,
        dba: String,
        businessType: String,
        dateOfIncorporation: Date,
        stateOfIncorporation: String,
        ein: String,
        registeredAddress: String,
        operatingAddress: String
    },
    bankInfo: {
        bankName: String,
        accountName: String,
        accountNumber: String,
        iban: String,
        swiftCode: String,
        currency: String,
        bankDocUrl: String
    },
    beneficialOwners: {
        fullName: String,
        dateOfBirth: Date,
        nationality: String,
        residentialAddress: String,
        ssnOrItin: String,
        ownershipPercentage: Number,
        position: String,
        governmentIdUrl: String,
        proofOfAddressUrl: String,
    },
    amlCompliance: {
        msbRegistered: Boolean,
        fincenNumber: String,
        hasInternalPolicy: Boolean,
        amlPolicyUrl: String,
        additionalDocsUrl: String,
    },
    authorizedSignatory: {
        fullName: String,
        signature: String,
        agreed: Boolean,
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<MerchantApplicationDocument>('MerchantApplication', MerchantApplicationSchema);

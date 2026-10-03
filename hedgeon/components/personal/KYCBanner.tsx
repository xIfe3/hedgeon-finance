"use client";

import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

export const KYCBanner = () => {
    const { user } = useUser();
    const [isVisible, setIsVisible] = useState(true);

    // Hide banner if user is verified or banner is dismissed
    if (!user || !isVisible || user?.kycVerified) {
        return null;
    }

    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 relative" role="alert">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold">Action Required</p>
                    <p>Please verify your identity to access all features and increase your transaction limits.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href="/personal/profile/kyc">
                        <Button
                            variant="outline"
                            className="bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
                        >
                            Verify Identity
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsVisible(false)}
                        className="text-yellow-700 hover:bg-yellow-200"
                    >
                        <X size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
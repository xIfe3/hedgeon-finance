"use client";

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/UserContext"
import Link from "next/link"
import { Check, X } from "lucide-react";

const transactions = [
    { id: 1, amountRecorded: 5000, amountSent: 0, status: "Pending" },
    { id: 2, amountRecorded: 15000, amountSent: 15000, status: "Cleared" },
    { id: 3, amountRecorded: 8000, amountSent: 0, status: "Failed" },
]

const statusColorMap = {
    Pending: "bg-yellow-100 text-yellow-800",
    Cleared: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
}

export default function MerchantDashboard() {
    const { user } = useUser();

    // Check merchant prerequisites
    const hasKYC = user?.kycVerified ?? false;
    const hasActiveInvestment = Array.isArray(user?.currentPlan) && user.currentPlan.length > 0;
    const canApply = hasKYC && hasActiveInvestment;

    if (!user?.isMerchant) {
        return (
            <Card className="mt-6 max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-center text-lg">Become a Merchant</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        To qualify for our merchant program, you must complete KYC verification and maintain an active investment portfolio. As a merchant, you'll gain access to exclusive tools to manage payouts, monitor earnings, and grow your business.
                    </p>

                    {/* Requirement Status Indicators */}
                    <div className="space-y-2 text-left">
                        <div className="flex items-center">
                            {hasKYC ? (
                                <Check className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                                <X className="h-5 w-5 text-red-500 mr-2" />
                            )}
                            <span>KYC Verification {hasKYC ? 'Completed' : 'Pending'}</span>
                        </div>
                        <div className="flex items-center">
                            {hasActiveInvestment ? (
                                <Check className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                                <X className="h-5 w-5 text-red-500 mr-2" />
                            )}
                            <span>Active Investment Plan {hasActiveInvestment ? 'Detected' : 'Required'}</span>
                        </div>
                    </div>

                    {/* Conditionally enabled application button */}
                    {canApply ? (
                        <Link href="/personal/merchant/apply">
                            <Button className="w-full">Apply as a Merchant</Button>
                        </Link>
                    ) : (
                        <Button className="w-full" disabled>
                            Apply as a Merchant
                        </Button>
                    )}

                    {/* Error message if requirements not met */}
                    {!canApply && (
                        <p className="text-red-500 text-sm">
                            {!hasKYC && !hasActiveInvestment
                                ? "Complete KYC verification and activate an investment plan to apply"
                                : !hasKYC
                                    ? "Complete KYC verification to apply"
                                    : "Activate an investment plan to apply"}
                        </p>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Merchant Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Amount Recorded</TableHead>
                            <TableHead>Amount Sent</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell>₦{tx.amountRecorded.toLocaleString()}</TableCell>
                                <TableCell>₦{tx.amountSent.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={statusColorMap[tx.status as keyof typeof statusColorMap]}
                                        variant="outline"
                                    >
                                        {tx.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
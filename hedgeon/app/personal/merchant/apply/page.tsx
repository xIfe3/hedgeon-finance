// pages/merchant/apply.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MerchantForm from "./MerchantForm"

export default function MerchantApplyPage() {
    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Merchant Application</CardTitle>
                </CardHeader>
                <CardContent>
                    <MerchantForm />
                </CardContent>
            </Card>
        </div>
    )
}

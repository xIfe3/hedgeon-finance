import DashboardHeader from "@/components/personal/Header";
import DashboardSidebar from "@/components/personal/Sidebar";
import ProtectedLayout from "../ProtectedLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import TawkToScript from "@/components/public/TawkScript";
import { KYCBanner } from "@/components/personal/KYCBanner"; // New component

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <ProtectedLayout allowedRoles={['user']}>
            <SidebarProvider>
                <DashboardSidebar />
                <main className="flex-1 bg-gray-50 min-h-screen">
                    <DashboardHeader />
                    <KYCBanner />

                    <SidebarTrigger className="sticky top-16 md:hidden block" size={'lg'} />
                    <div className="p-2">
                        {children}
                        <TawkToScript />
                    </div>
                </main>
            </SidebarProvider>
        </ProtectedLayout>
    );
};

export default DashboardLayout;
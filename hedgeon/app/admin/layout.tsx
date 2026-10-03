'use client';

import ProtectedLayout from '../ProtectedLayout';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <ProtectedLayout allowedRoles={['admin']}>
            <SidebarProvider>
                <AdminSidebar />

                <main className="flex-1 bg-gray-50 min-h-screen">
                    <AdminHeader />
                    <SidebarTrigger className="sticky top-16 md:hidden block" size={'lg'} />
                    <div className="p-2">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </ProtectedLayout>
    );
};

export default AdminLayout;
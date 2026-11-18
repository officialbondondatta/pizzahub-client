import React from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar></DashboardSidebar>
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default layout;
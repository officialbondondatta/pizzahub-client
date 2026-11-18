import React from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <DashboardSidebar></DashboardSidebar>
            {children}
        </main>
    );
};

export default layout;
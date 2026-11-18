import { requireRoleFromSession } from '@/app/lib/core/server';
import { ReactNode } from 'react';

const AdminDashboardLayout = async ({ children }: { children: ReactNode }) => {
    await requireRoleFromSession('admin')
    return children
};

export default AdminDashboardLayout;
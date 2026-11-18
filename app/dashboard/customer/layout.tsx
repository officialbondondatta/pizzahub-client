import { requireRoleFromSession } from '@/app/lib/core/server';
import { ReactNode } from 'react';

const CutomerDashboardLayout = async ({ children }: { children: ReactNode }) => {
    await requireRoleFromSession('customer')
    return children
}
export default CutomerDashboardLayout;
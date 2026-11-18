import { requireRoleFromSession } from '@/app/lib/core/server';
import { ReactNode } from 'react';

const VendorLayout = async ({ children }: { children: ReactNode }) => {
    await requireRoleFromSession('vendor')
    return children
};

export default VendorLayout;
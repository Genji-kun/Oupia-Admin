import { Route } from '@/utils/routes';
import Link from 'next/link';
import React from 'react';

const SidebarItem = ({ route }: { route: Route }) => {
    return (
        <div>
            <Link href={route.href}>
                {route.label}
            </Link>
        </div>
    );
};

export default SidebarItem;
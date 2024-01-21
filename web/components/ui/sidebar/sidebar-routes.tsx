import { sideRoutes } from '@/utils/routes';
import React from 'react';
import SidebarItem from './sidebar-item';

const SidebarRoutes = () => {
    return (
        <div className="flex flex-col">
            {sideRoutes.map((route, index) => {
                return (<SidebarItem route={route} key={index} />)
            })}
        </div>
    );
};

export default SidebarRoutes;
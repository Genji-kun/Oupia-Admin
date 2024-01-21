import React from 'react';
import SidebarRoutes from './sidebar-routes';
import { LogOut } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="flex flex-col h-full justify-between py-5 ">
            <SidebarRoutes />
            <div className="flex flex-wrap gap-4 p-5 hover:bg-border">
                <LogOut />
                <span className="font-semibold">Thoát quyền sử dụng</span>
            </div>
        </div >
    );
};

export default Sidebar;
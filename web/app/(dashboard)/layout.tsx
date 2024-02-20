import { Sidebar, SidebarItem } from '@/components/ui/sidebar';
import { PieChart } from 'lucide-react';
import { PiUsers, PiNotePencil } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import React from 'react';
import Navbar from '@/components/ui/navbar/navbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex flex-1">
            <Sidebar>
                <SidebarItem icon={<PieChart />} label={"Bảng điều khiển"} href={"/"} />
                <SidebarItem icon={<PiUsers size={24} />} label={"Quản lý người dùng"} href={"/users"} />
                <SidebarItem icon={<HiOutlineBuildingOffice2 size={24} />} label={"Quản lý bài cho thuê"} href={"/assets"} />
                <SidebarItem icon={<PiNotePencil size={24} />} label={"Quản lý bài viết"} href={"/posts"} />
            </Sidebar>
            <div className="w-full bg-gray-100 dark:bg-background flex flex-col relative sidebar">
                <div className="bg-background ">
                    <Navbar />

                </div>
                <div className="p-4 lg:px-8 lg:py-6 ">
                    {children}
                </div>
            </div>
        </div >
    );
};

export default DashboardLayout;
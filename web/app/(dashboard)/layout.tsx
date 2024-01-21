import Navbar from '@/components/ui/navbar/navbar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import Sidebar from '@/components/ui/sidebar/sidebar';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-h-screen h-screen">
            <Navbar />
            <div className="w-full dashboard">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="w-full">
                    <ResizablePanel defaultSize={18} minSize={9} maxSize={18}>
                        <Sidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={82}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Content</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            {children}
        </div>
    );
};

export default DashboardLayout;
"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { MdOutlineAddHomeWork } from "react-icons/md";
import Link from 'next/link';

import React from 'react';

const AssetToolbar = () => {
    return (
        <>
            {/* <div className="flex items-center justify-between pb-5 border-b border-border">
                <div className="flex items-center gap-5">
                    <h1 className="uppercase font-semibold text-xl">DANH SÁCH CĂN HỘ</h1>
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="account">Chưa được duyệt</TabsTrigger>
                            <TabsTrigger value="account1">Đang hoạt động</TabsTrigger>
                            <TabsTrigger value="password">Đã đóng</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="flex items-center gap-5 justify-end">
                    <Button variant={"outline"} className="space-x-2 ">
                        <Filter className="w-4 h-4 " />
                        <span className="text-sm">Lọc danh sách</span>
                    </Button>
                    <Link href="/assets/add">
                        <Button className="space-x-2 styled-button">
                            <MdOutlineAddHomeWork className="w-4 h-4 " />
                            <span className="text-sm">Tạo mới</span>
                        </Button>
                    </Link>
                </div>
            </div> */}

        </>

    );
};

export default AssetToolbar;
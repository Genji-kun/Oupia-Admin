"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAssetManagementContext } from '@/contexts/asset-management-context';
import Link from 'next/link';
import React from 'react'

function AssetToolbar() {

    const { keyword, setKeyword } = useAssetManagementContext();

    return (
        <div className="w-full flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Input
                    className="min-w-96 max-w-lg"
                    placeholder='Tìm kiếm tên căn hộ...'
                    value={keyword}
                    onChange={(evt) => setKeyword(evt.target.value)}
                />
            </div>
            <div className="flex gap-2 items-center">
                <Link href="/assets/add">
                    <Button className="styled-button font-normal">
                        <span> Thêm căn hộ mới </span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default AssetToolbar;

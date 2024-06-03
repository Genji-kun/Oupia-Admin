"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserManagementContext } from '@/contexts/user-management-context';
import { UserRoundPlusIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function UserToolBar() {

    const {keyword, setKeyword} = useUserManagementContext();

    return (
        <div className="w-full flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Input
                    className="min-w-96 max-w-lg"
                    placeholder='Tìm kiếm tên người dùng...'
                    value={keyword}
                    onChange={(evt) => setKeyword(evt.target.value)}
                />
            </div>
            <div className="flex gap-2 items-center">
                <Link href="/users/add">
                    <Button className="text-white">
                        <UserRoundPlusIcon className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Thêm người dùng</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default UserToolBar;

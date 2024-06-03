"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useUserManagementContext } from '@/contexts/user-management-context';
import { convert } from '@/utils/convertAvatarAlt';
import { format } from 'date-fns';
import React from 'react'
import { toast } from 'sonner';
import ActionButton from './action-button';

function UserDataTable() {

    const { users, isFetching, isError } = useUserManagementContext();

    // const deletePost = async (id: number) => {
    //     try {
    //         const res = await authApi.delete(postEndpoints.deletePost(id));
    //         if (res.status === 200) {
    //             toast.success("Xóa bài viết thành công.")
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    if (isFetching) {
        return <>
            <Skeleton className=" w-full h-96 bg-border dark:bg-oupia-base" />
        </>
    }

    if (isError) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }

    return (
        <Table className="bg-background shadow-lg dark:shadow-none">
            <TableHeader className="dark:bg-oupia-sub uppercase">
                <TableRow>
                    <TableHead className="xl:w-96 font-semibold">Thông tin người dùng</TableHead>
                    <TableHead className="font-semibold">Phân quyền</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Ngày tạo</TableHead>
                    <TableHead className="font-semibold">Username</TableHead>
                    <TableHead className="w-20"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length > 0 ? users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                                <Avatar className='w-12 h-12'>
                                    <AvatarImage src={user.avatar} alt={"User Avatar"} />
                                    <AvatarFallback>{convert(user.fullName)}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold">{user.fullName}</span>
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">
                            {(() => {
                                let roleName = "";
                                switch (user.role) {
                                    case "ROLE_TENANT":
                                        roleName = "Người tìm trọ"
                                        break;
                                    case "ROLE_LANDLORD":
                                        roleName = "Chủ nhà trọ"
                                        break;
                                    case "ROLE_ADMIN":
                                        roleName = "Quản trị viên"
                                        break;
                                    default:
                                        roleName = "Bài viết thường"
                                }
                                return <span className="rounded border border-border px-3 py-1.5 text-xs text-white bg-primary dark:text-primary dark:bg-primary-600/30 text-nowrap">{roleName}</span>
                            })()}
                        </TableCell>
                        <TableCell className="font-medium">
                            {user.email}
                        </TableCell>
                        <TableCell className="font-medium">
                            {format(user.createdAt, "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell className="font-medium">
                            {user.username}
                        </TableCell>
                        <TableCell>
                           <ActionButton user={user}/> 
                        </TableCell>
                    </TableRow>
                )) : <>
                    <TableRow>
                        <TableCell colSpan={7} className="text-center font-medium">
                            Không tìm thấy kết quả.
                        </TableCell>
                    </TableRow>
                </>}
            </TableBody>
        </Table>
    )
}

export default UserDataTable;

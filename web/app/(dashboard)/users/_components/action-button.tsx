"use client"

import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { UserResponse } from '@/interfaces/User'
import React, { useState } from 'react'
import { Check, Edit3, Eye, MoreHorizontalIcon, Trash, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { convert } from '@/utils/convertAvatarAlt';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { useUserManagementContext } from '@/contexts/user-management-context';


function ActionButton({ user }: { user: UserResponse }) {

    const { editMode, setEditMode } = useUserManagementContext();

    const [updatedUser, setUpdatedUser] = useState<any>({

    });

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant={"ghost"} className="w-fit h-fit p-2 rounded-lg">
                    <MoreHorizontalIcon className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side='left' align='start' className="w-72 flex flex-col p-0">
                <h3 className="font-semibold text-lg px-4 py-3">Thao tác</h3>
                <Separator />
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex items-center gap-2 py-2 px-4 hover:bg-border dark:hover:bg-oupia-sub cursor-pointer mt-2">
                            <Eye className="w-4 h-4" />
                            <span className='text-sm'>Xem chi tiểt</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent
                        onInteractOutside={(e) => {
                            e.preventDefault();
                        }}
                        className="sm:max-w-2xl max-h-[calc(100vh-80px)] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle><span className="text-2xl font-montserrat">Thông tin người dùng</span></DialogTitle>
                            {/* <DialogDescription>
                        <span className="text-red-600 underline mr-1">
                            Lưu ý:
                        </span>
                        <span>
                            Bạn không thể sửa đổi hình ảnh trong bài viết.
                        </span>
                    </DialogDescription> */}
                        </DialogHeader>
                        <Separator />
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-col items-center gap-2">
                                <Avatar className='w-20 h-20'>
                                    <AvatarImage src={user.avatar} alt={"User Avatar"} />
                                    <AvatarFallback>{convert(user.fullName)}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-2xl">{user.fullName}</span>
                            </div>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Ngày sinh</TableCell>
                                        <TableCell className="text-right">{user.dob && format(user.dob, "dd-MM-yyyy")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Giới tính</TableCell>
                                        <TableCell className="text-right">
                                            {(() => {
                                                switch (user.gender) {
                                                    case "MALE":
                                                        return "Nam";
                                                    case "FEMALE":
                                                        return "Nữ";
                                                    case "OTHER":
                                                        return "Khác";
                                                }
                                            })()}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Địa chỉ email</TableCell>
                                        <TableCell className="text-right">{user.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Tên người dùng</TableCell>
                                        <TableCell className="text-right">{user.username}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Số điện thoại</TableCell>
                                        <TableCell className="text-right">{user.phoneNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Phân quyền</TableCell>
                                        <TableCell className="text-right">
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
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <DialogFooter>
                            {
                                editMode ? <>
                                    <Button onClick={() => setEditMode(false)} variant={"outline"} className="gap-2 px-3">
                                        <X className="w-4 h-4" />
                                    </Button>
                                    <Button onClick={() => setEditMode(true)} className="styled-button gap-2">
                                        <Check className="w-4 h-4" />
                                        <span className="text-base">Hoàn tất</span>
                                    </Button>
                                </> : <>
                                    <Button onClick={() => setEditMode(true)} className="styled-button gap-2">
                                        <Edit3 className="w-4 h-4" />
                                        <span className="text-base">Chỉnh sửa</span>
                                    </Button>
                                    <Button className="font-semibold bg-destructive/80 hover:bg-destructive text-destructive-foreground gap-2">
                                        <Trash className="w-4 h-4" />
                                        <span className="text-base">Xóa người dùng</span>
                                    </Button>
                                </>
                            }
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <div className="flex items-center gap-2 py-2 px-4 hover:bg-border dark:hover:bg-oupia-sub cursor-pointer">
                    <Edit3 className="w-4 h-4" />
                    <span className='text-sm'>Chỉnh sửa thông tin</span>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className="flex items-center gap-2 py-2 px-4 hover:bg-border dark:hover:bg-oupia-sub cursor-pointer text-red-600 mb-2">
                            <Trash className="w-4 h-4" />
                            <span className='text-sm'>Xóa người dùng</span>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn chắn chắc xóa người dùng này?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Thông báo này cảnh báo bạn trước khi xóa thông tin. Hãy cân nhắc kỹ trước khi thực hiện.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                                // onClick={() => { deletePost(.id) }}
                                className="bg-destructive/80 hover:bg-destructive text-destructive-foreground">Xóa</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </PopoverContent>
        </Popover>
    )
}

export default ActionButton

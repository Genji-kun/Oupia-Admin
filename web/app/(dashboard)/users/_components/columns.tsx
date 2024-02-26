"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, MoreHorizontal, PencilLine, Trash, ChevronsUpDown, CheckCircle2, XCircle } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { format } from "date-fns"
import { vi } from "date-fns/locale"


export type User = {
    id: string
    fullName: string
    gender: "MALE" | "FEMALE" | "ORTHER"
    email: string
    dob: Date
    avatar: string
    role: "TENANT" | "LANDLORD" | "ADMIN"
    isDeleted: boolean
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "fullName",
        header: "Thông tin người dùng",
        cell: ({ row }) => {
            const avatar = row.original.avatar;

            return (
                <div className="flex items-center gap-x-4">
                    <Image src={avatar} alt="avatar" height={500} width={500} className="w-12 aspect-square rounded-full" />
                    <span className="font-semibold">{row.original.fullName}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: "Quyền truy cập",
        cell: ({ row }) => {
            let roleName = "";
            switch (row.original.role) {
                case "TENANT":
                    roleName = "Người thuê";
                    break;
                case "LANDLORD":
                    roleName = "Người cho thuê";
                    break;
                case "ADMIN":
                    roleName = "Quản trị viên";
            }

            return (
                <span className="rounded border border-border px-2 py-1 text-xs">{roleName}</span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Email
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "gender",
        header: "Giới tính",
        cell: ({ row }) => {
            switch (row.original.gender) {
                case "FEMALE":
                    return "Nữ"
                case "MALE":
                    return "Nam"
                default:
                    return "Khác"
            }
        }
    },
    {
        accessorKey: "dob",
        header: "Ngày sinh",
        cell: ({ row }) => {
            return format(row.original.dob, "dd/MM/yyyy");
        }
    },
    {
        accessorKey: "isDeleted",
        header: "Trạng thái",
        cell: ({ row }) => {
            return (
                <>
                    {
                        row.original.isDeleted ?
                            <div className="text-destructive flex gap-1 items-center">
                                <XCircle className="w-4 h-4" />
                                <span className="font-semibold">Đã xóa</span>
                            </div>
                            :
                            <div className="text-lime-500 flex gap-1 items-center">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="font-semibold">Hoạt động</span>
                            </div>
                    }
                </>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                            <div className="flex items-center gap-2">
                                <Copy className="w-4 h-4" />
                                <span className="text-sm">Sao chép ID</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span className="text-sm">Xem thông tin</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                                <PencilLine className="w-4 h-4" />
                                <span className="text-sm">Chỉnh sửa thông tin</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Dialog>
                                <DialogTrigger>
                                    <div className="flex items-center gap-2 text-destructive">
                                        <Trash className="w-4 h-4" />
                                        <span className="text-sm font-semibold">Xóa người dùng</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { Settings2, UserRoundPlus, X } from "lucide-react"
import Link from "next/link"
import { roles } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-fllter"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = (table.getColumn("fullName")?.getFilterValue() as string)?.length > 0 || table.getState().columnFilters.length > 0;


    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Tìm tên người dùng..."
                    value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("fullName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {table.getColumn("role") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("role")}
                        title="Phân quyền"
                        options={roles}
                    />
                )}

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}>
                        Bỏ lọc
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex gap-2 items-center ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Settings2 className="w-4 h-4 mr-2" />
                            Hiển thị
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }>
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/users/add">
                    <Button className="text-white">
                        <UserRoundPlus className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Thêm người dùng</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
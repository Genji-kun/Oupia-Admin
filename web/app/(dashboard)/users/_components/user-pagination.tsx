"use client"

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton";
import { useUserManagementContext } from "@/contexts/user-management-context";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

const UserPagination = () => {

    const { unitsPerPage, setUnitsPerPage, currentPage, setCurrentPage, totalPages, isFetching } = useUserManagementContext();

    if (isFetching) {
        return <>
            <Skeleton className=" w-96 h-12 bg-border dark:bg-oupia-base mx-auto xl:mr-0 xl:ml-auto" />
        </>
    }


    return (
        <div className="flex items-center space-x-6 lg:space-x-8 justify-center xl:justify-end">
            <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Số hàng trên 1 trang</p>
                <Select
                    onValueChange={(value) => setUnitsPerPage(Number(value))}
                    defaultValue={unitsPerPage.toString()}                >
                    <SelectTrigger className="h-8 w-[70px] dark:bg-oupia-sub">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="top" align="center">
                        {[4, 8, 12, 16, 20].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Trang {currentPage} trên {totalPages}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}>
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}>
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}>
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}>
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRightIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default UserPagination;
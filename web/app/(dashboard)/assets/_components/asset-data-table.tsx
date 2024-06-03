"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { assetsEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { useAssetManagementContext } from '@/contexts/asset-management-context';
import { AssetResponse } from '@/interfaces/Asset';
import { formatCurrency } from '@/utils/priceConvert';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Eye, MoreHorizontalIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { toast } from 'sonner';

function AssetDataTable() {

    const { assets, isFetching, isError } = useAssetManagementContext();

    // const mutation = useMutation({
    //     mutationFn: (assetId: number) => {
    //         return authApi.delete(assetsEndpoints.deleteAsset(assetId));
    //     }
    // })

    // if (mutation.isPending) {

    // }

    // if (mutation.isSuccess) {
    //     toast.success("Xóa căn hộ thành công.")
    // }

    // if (mutation.error) {
    //     toast.success("Đã có lỗi xảy ra, vui lòng thử lại.")
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
                    <TableHead className="xl:w-96 font-semibold w-80">Thông tin căn hộ</TableHead>
                    <TableHead className="font-semibold w-96">Giới thiệu</TableHead>
                    <TableHead className="font-semibold">Giá thuê</TableHead>
                    <TableHead className="font-semibold">Diện tích</TableHead>
                    <TableHead className="font-semibold w-64">Phân loại</TableHead>
                    <TableHead className="font-semibold">Ngày đăng</TableHead>
                    <TableHead className="w-20"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    assets.length > 0 ? assets.map((asset: AssetResponse) => (
                        <TableRow key={asset.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Image
                                        width={500}
                                        height={500}
                                        alt="Asset Image"
                                        src={asset.images[0]}
                                        className="w-16 aspect-square object-cover rounded-lg" />
                                    <span className="font-semibold">{asset.assetName}</span>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">
                                <p className="line-clamp-3">
                                    {asset.assetDescription}
                                </p>
                            </TableCell>
                            <TableCell className="font-medium">
                                {formatCurrency(asset.price)}
                            </TableCell>
                            <TableCell className="font-medium">
                                {formatCurrency(asset.area)} m²
                            </TableCell>
                            <TableCell className="font-medium">
                                {(() => {
                                    let assetType = "";
                                    switch (asset.assetType) {
                                        case "BOARDING_HOUSE":
                                            assetType = "Dãy trọ";
                                            break;
                                        case "SHARED_HOUSING_SYSTEM":
                                            assetType = "Hệ thống nhà chung";
                                            break;
                                        case "APARTMENT":
                                            assetType = "Chung cư";
                                            break;
                                        case "DORMIROTY":
                                            assetType = "Ký túc xá";
                                            break;
                                        case "STUDIO_APARTMENT":
                                            assetType = "Căn hộ mini";
                                            break;
                                        case "ENTIRE_HOUSE":
                                            assetType = "Nhà nguyên căn";
                                            break;
                                        default:
                                            assetType = "Nhà trọ"
                                    }
                                    return <span className="rounded border border-border px-3 py-1.5 text-xs text-nowrap text-white bg-primary dark:text-primary dark:bg-primary-600/30">{assetType}</span>
                                })()}
                            </TableCell>
                            <TableCell className="font-medium">
                                {format(asset.createdAt, "dd-MM-yyyy")}
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button variant={"ghost"} className="w-fit h-fit p-2 rounded-lg">
                                            <MoreHorizontalIcon className="w-4 h-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent side='left' align='start' className="w-72 flex flex-col p-0">
                                        <h3 className="font-semibold text-lg px-4 py-3">Thao tác</h3>
                                        <Separator />
                                        <div className="flex items-center gap-2 py-2 px-4 hover:bg-border dark:hover:bg-oupia-sub cursor-pointer mt-2">
                                            <Eye className="w-4 h-4" />
                                            <span className='text-sm'>Xem thông tin chi tiểt</span>
                                        </div>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <div className="flex items-center gap-2 py-2 px-4 hover:bg-border dark:hover:bg-oupia-sub cursor-pointer text-red-600 mb-2">
                                                    <Trash className="w-4 h-4" />
                                                    <span className='text-sm'>Xóa căn hộ</span>
                                                </div>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Bạn chắn chắc xóa căn hộ này?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Thông báo này cảnh báo bạn trước khi xóa thông tin. Hãy cân nhắc kỹ trước khi thực hiện.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        // onClick={() => { mutation.mutate(asset.id) }}
                                                        className="bg-destructive/80 hover:bg-destructive  text-destructive-foreground">Xóa</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    )) : <>
                        <TableRow>
                            <TableCell colSpan={7} className="font-medium text-center">
                                Không tìm thấy dữ liệu.
                            </TableCell>
                        </TableRow>
                    </>
                }
            </TableBody>
        </Table>
    )
}

export default AssetDataTable;

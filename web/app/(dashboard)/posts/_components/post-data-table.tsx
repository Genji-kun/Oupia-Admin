"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { postEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { usePostManagementContext } from '@/contexts/post-management-context';
import { convert } from '@/utils/convertAvatarAlt';
import { format } from 'date-fns';
import { Edit3, Eye, MoreHorizontalIcon, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import ActionButton from './action-button';

function PostDataTable() {

    const { posts, isFetching, isError } = usePostManagementContext();
    const router = useRouter();

    const deletePost = async (id: number) => {
        try {
            const res = await authApi.delete(postEndpoints.deletePost(id));
            if (res.status === 200) {
                toast.success("Xóa bài viết thành công.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (isFetching) {
        return <>
            <Skeleton className=" w-full h-96 bg-border dark:bg-oupia-base" />
        </>
    }

    if (isError) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }

    return (
        <Table className="bg-background shadow-lg dark:shadow-none">
            <TableHeader className="dark:bg-oupia-sub uppercase">
                <TableRow>
                    <TableHead className="xl:w-96 font-semibold">Người đăng</TableHead>
                    <TableHead className="font-semibold">Nội dung bài viểt</TableHead>
                    <TableHead className="font-semibold">Phân loại</TableHead>
                    <TableHead className="font-semibold">Ngày đăng</TableHead>
                    <TableHead className="w-20"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {posts.length > 0 ? posts.map((post) => (
                    <TableRow key={post.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                                <Avatar className='w-12 h-12'>
                                    <AvatarImage src={post.userAvatar} alt={"User Avatar"} />
                                    <AvatarFallback>{convert(post.userFullName)}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold">{post.userFullName}</span>
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">
                            <p className="line-clamp-3">
                                {post.postContent}
                            </p>
                        </TableCell>
                        <TableCell className="font-medium">
                            {(() => {
                                let postType = "";
                                switch (post.postType) {
                                    case "POST_FIND":
                                        postType = "Tin tìm trọ"
                                        break;
                                    case "POST_RENT":
                                        postType = "Tin cho thuê"
                                        break;
                                    default:
                                        postType = "Bài viết thường"
                                }
                                return <span className="rounded border border-border px-3 py-1.5 text-xs text-nowrap text-white bg-primary dark:text-primary dark:bg-primary-600/30">{postType}</span>
                            })()}
                        </TableCell>
                        <TableCell className="font-medium">
                            {format(post.createdAt, "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell>
                           <ActionButton post={post}/>
                        </TableCell>
                    </TableRow>
                )) : <>
                    <TableRow>
                        <TableCell colSpan={5} className="font-medium text-center">
                            Không tìm thấy dữ liệu.
                        </TableCell>
                    </TableRow>
                </>
                }
            </TableBody>
        </Table>
    )
}

export default PostDataTable;

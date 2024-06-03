"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { postEndpoints, searchEndpoints } from '@/configs/axiosEndpoints'
import { authApi } from '@/configs/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from "zod"

const postForm = z.object({
    postContent: z.string({
        required_error: "Nội dung bài viết không được bỏ trống"
    }).min(10, {
        message: "Nội dung phải nhiều hơn 10 ký tự"
    }),
    postType: z.enum(["POST_COMMON", "POST_FIND", "POST_RENT"], {
        required_error: "Loại bài viết không được để trống",
    }),
})

const AddPostForm = () => {

    const [showResults, setShowResult] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>("");
    const [selectedUser, setSelectedUser] = useState<any>();

    const fetchUsers = async ({ queryKey }: any) => {
        const [_key, { keyword }] = queryKey;
        if (keyword) {
            try {
                const res = await authApi.get(searchEndpoints["users"], {
                    params: {
                        keyword: keyword,
                        size: 5,
                    }
                })
                return res.data.content;
            } catch (error) {
                console.error(error);
            }
        }
        return [];
    }

    const { data: users, isFetching } = useQuery({
        queryKey: ["searchUsers", { keyword }],
        queryFn: fetchUsers,
        refetchOnWindowFocus: false,
    })

    const form = useForm<z.infer<typeof postForm>>({
        resolver: zodResolver(postForm),
        defaultValues: {
            postContent: "",
            postType: undefined,
        },
    })


    useEffect(() => {
        if (users)
            setShowResult(users.length > 0);
    }, [users])

    useEffect(() => {
        if (selectedUser)
            setShowResult(false);
    }, [selectedUser])


    async function onSubmit(values: z.infer<typeof postForm>) {
        if (selectedUser) {
            const req = {
                postContent: values.postContent,
                postType: values.postType,
                userId: selectedUser.id
            }
            const form = new FormData();
            form.append("post", new Blob([JSON.stringify(req)], { type: "application/json" }));
            try {
                const res = await authApi.post(postEndpoints["addPost"], form);
                if (res.status === 201) {
                    toast.success("Thêm bài viết thành công");
                }
            }
            catch (error) {
                console.error(error);
            }
        } else {
            toast.error("Chưa chọn người dùng đăng");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 mx-auto lg:w-3/4 xl:w-1/3">
                <div className='flex flex-col gap-4 border rounded-lg dark:bg-oupia-base p-6'>
                    <FormField
                        control={form.control}
                        name="postType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loại bài viết</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="dark:bg-oupia-sub">
                                            <SelectValue placeholder="Bạn đăng bài viết này với mục đích gì?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="POST_COMMON">Đăng bài viết thông thường</SelectItem>
                                            <SelectItem value="POST_FIND">Tìm kiếm căn hộ</SelectItem>
                                            <SelectItem value="POST_RENT">Cho thuê</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postContent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nội dung bài viết</FormLabel>
                                <FormControl>
                                    <Textarea {...field} className="dark:bg-oupia-sub" rows={5} />
                                </FormControl>
                                <FormDescription>
                                    Hãy chia sẻ thông tin của bạn thông qua nội dung này
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='space-y-2'>
                        <label>Người đăng</label>
                        <div className="relative w-full">
                            <Input
                                disabled={selectedUser}
                                value={selectedUser ? selectedUser.fullName : keyword}
                                onChange={(evt) => setKeyword(evt.target.value)}
                                className="dark:bg-oupia-sub" />
                            <>
                                {
                                    showResults &&
                                    <ScrollArea className="absolute z-10 bottom-0 max-h-72 w-full rounded border border-t-0 rounded-t-none py-2">
                                        <div className="flex flex-col px-2">
                                            {users.map((result: any, index: number) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            key={index}
                                                            onClick={() => setSelectedUser(result)}
                                                            className="justify-start">
                                                            {result.fullName}
                                                        </Button>
                                                        <Separator />
                                                    </React.Fragment>

                                                );
                                            })}
                                        </div>
                                    </ScrollArea>
                                }
                            </>
                        </div>
                    </div>
                </div>
                <Button type="submit" className="styled-button">Thêm bài viết</Button>
            </form>
        </Form >
    )
}

export default AddPostForm;

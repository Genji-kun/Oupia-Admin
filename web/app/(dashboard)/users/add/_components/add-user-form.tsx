"use client"

import { Input } from '@/components/ui/input';
import { CalendarIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import defaultAvatar from "@/public/user-avatar.png";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { vi } from "date-fns/locale";
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
    fullName: z.string().min(4,
        { message: "Vui lòng điền họ tên người dùng" }
    ),
    phoneNumber: z.string().min(10,
        { message: "Vui lòng điền số điện thoại" }
    ),
    email: z.string().min(1, {
        message: "Vui lòng điền email người dùng"
    }).email({
        message: "Không đúng định dạng email",
    }),
    gender: z.enum(["MALE", "FEMALE", "ORTHER"], {
        required_error: "Vui lòng chọn thông tin"
    }),
    dob: z.date({
        required_error: "Chưa chọn ngày sinh",
    }),
    role: z.enum(["TENANT", "LANDLORD", "ADMIN"], {
        required_error: "Vui lòng chọn thông tin"
    }),
    avatar: z.instanceof(File).optional(),
    username: z.string({
    }).min(6, {
        message: "Tên tài khoản ít nhất 6 ký tự"
    }),
    password: z.string({
        required_error: "Mật khẩu không được bỏ trống",
    }).min(8,
        { message: "Mật khẩu cần tối thiểu 8 ký tự" }
    ),
    confirm: z.string({
        required_error: "Mật khẩu xác nhận không được bỏ trống",
    }).min(8,
        { message: "Mật khẩu xác nhận cần tối thiểu 8 ký tự" }
    ),
})

const AddUserForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            gender: undefined,
            dob: undefined,
            role: undefined,
            avatar: undefined,
            username: "",
            password: "",
            confirm: "",
        },
    })

    const [avatar, setAvatar] = useState("");
    const [account, setAccount] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    const fileInputRef = useRef(null);
    const handleFileChange = (evt: any) => {
        if (evt.target.files && evt.target.files[0]) {
            const file: File = evt.target.files[0];
            const fileURL = URL.createObjectURL(file);
            setAvatar(fileURL);

        }
    };



    useEffect(() => {
        const subscription = form.watch((values: any) => {
            for (const key in values) {
                if (values[key]) {
                    if (key === "username" || key === "password" || key === "confirm") {
                        setAccount((current: any) => {
                            return { ...current, [key]: values[key] };
                        });
                    }
                }
            }

        });

        return () => {
            subscription.unsubscribe();
        };
    }, [form]);

    useEffect(() => {

    }, [account]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        console.log(values);

    }

    return (
        <div className="flex flex-col gap-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-2 gap-5 h-full">
                    <div className="col-span-2 xl:col-span-1 flex flex-col p-6 xl:p-10 gap-5 border boreder rounded-lg bg-background dark:bg-slate-900">
                        <h1 className="font-semibold text-2xl">Thông tin người dùng</h1>
                        <Separator />
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-base font-semibold text-foreground">Họ tên người dùng</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" disabled={isSubmitting} className="text-base bg-border/40 dark:bg-slate-700" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="text-base font-semibold text-foreground">Giới tính</FormLabel>
                                        <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="dark:bg-slate-700 bg-border/40">
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="dark:bg-slate-700">
                                                <SelectItem value="MALE">Nam</SelectItem>
                                                <SelectItem value="FEMALE">Nữ</SelectItem>
                                                <SelectItem value="ORTHER">Khác</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="text-base font-semibold text-foreground">Ngày sinh</FormLabel>
                                        <FormControl>
                                            <Popover >
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full text-left font-normal dark:bg-slate-700 bg-border/40",
                                                                !field.value && "text-muted-foreground dark:text-foreground"
                                                            )}
                                                            disabled={isSubmitting}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP", { locale: vi })
                                                            ) : (
                                                                <span>Chọn ngày sinh</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        locale={vi}
                                                        mode="single"
                                                        captionLayout="dropdown-buttons"
                                                        fromYear={1960}
                                                        toYear={2030}
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-base font-semibold text-foreground">Tài khoản email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" disabled={isSubmitting} className="text-base bg-border/40 dark:bg-slate-700" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold text-foreground">Số điện thoại</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="phone" disabled={isSubmitting} className="text-base bg-border/40 dark:bg-slate-700" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-base font-semibold text-foreground">Phân quyền truy cập</FormLabel>
                                    <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="dark:bg-slate-700 bg-border/40">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="dark:bg-slate-700">
                                            <SelectItem value="TENANT">Người thuê</SelectItem>
                                            <SelectItem value="LANDLORD">Người cho thuê</SelectItem>
                                            <SelectItem value="ADMIN">Quản trị viên</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className=" col-span-2 xl:col-span-1 flex flex-col p-6 xl:p-10 gap-5 border boreder rounded-lg bg-background  dark:bg-slate-900">
                        <h1 className="font-semibold text-2xl">Thông tin tài khoản</h1>
                        <Separator />
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={() => (
                                <FormItem >
                                    <FormControl>
                                        <div className="flex gap-6 items-center">
                                            <div className="w-24 aspect-square">
                                                <Image
                                                    src={avatar ? avatar : defaultAvatar}
                                                    alt="Avatar"
                                                    height={300}
                                                    width={300}
                                                    className="w-full h-full rounded-full object-cover border border-border"
                                                />
                                            </div>
                                            <div className="w-full space-y-2">
                                                <FormLabel className="text-base font-semibold text-foreground">Ảnh người dùng</FormLabel>
                                                <Input
                                                    type="file"
                                                    accept='image/png, image/jpeg, image/jpg'
                                                    multiple={false}
                                                    disabled={isSubmitting}
                                                    className="text-base bg-border/40 dark:bg-slate-700 mt-2"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange} />
                                                <FormDescription>
                                                    Khuyến khích sử dụng hình ảnh 800x800. Cho phép loại ảnh JPG hoặc PNG.
                                                </FormDescription>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-base font-semibold text-foreground">Tên người dùng</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" disabled={isSubmitting} className="text-base bg-border/40 dark:bg-slate-700" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="text-base font-semibold text-foreground">Mật khẩu</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" disabled={isSubmitting} className="text-base bg-border/40 dark:bg-slate-700" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-semibold text-foreground">Mật khẩu xác nhận</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" disabled={isSubmitting} className="text-base bg-border/40 dark:bg-slate-700" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        {isSubmitting ? <>
                            <Button disabled className=" ml-auto w-fit styled-button flex gap-3 ">
                                <span className="text-base">Đang xử lý</span>
                                <Loader2 className="animate-spin" size={20} />
                            </Button>
                        </> : <>
                            <div className="w-fit flex gap-x-2 items-center ml-auto pt-2">
                                <Button onClick={() => { form.reset(); setAvatar(""); }} type="button" variant={"outline"} className=" w-fit flex gap-2 px-6 py-4">
                                    <span className="text-base">Xóa thông tin nhập</span>
                                </Button>
                                <Button type="submit" className=" w-fit styled-button flex gap-2 px-6 py-4">
                                    <span className="text-base">Thêm người dùng</span>
                                </Button>
                            </div>
                        </>}
                    </div>
                </form>
            </Form>
        </div >
    );
};

export default AddUserForm;
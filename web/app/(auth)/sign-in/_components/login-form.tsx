"use client"

import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button';
import { Loader2, LogIn } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppContext } from '@/contexts/app-context';
import { loginSchema } from '@/lib/schema/AuthSchema';
import { IUserLogin } from '@/types/interfaces';
import { useLogin } from '@/hooks/mutation';


const LoginForm = () => {

    const { currentUser } = useAppContext();
    const router = useRouter();

    const loginForm = useForm<IUserLogin>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const { mutateLogin, isPendingLogin } = useLogin();


    async function onSubmit(values: IUserLogin) {
        await mutateLogin(values);
    }

    if (currentUser) {
        return <>{router.push("/")}</>
    }

    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 px-4 lg:px-10 py-10 justify-center">
            <div>
                <h1 className="font-bold text-3xl text-center lg:text-left mb-2">Hello! Welcome back to Oupia</h1>
                <p className="text-muted-foreground text-center text-sm font-semibold lg:text-left">Đăng nhập vào hệ thống quản lý Oupia</p>
            </div>
            <Separator className="w-1/2 mx-auto lg:mx-0" />
            <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Tên nguời dùng</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPendingLogin} className="text-base py-6 dark:bg-oupia-sub" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} disabled={isPendingLogin} className="text-base py-6 dark:bg-oupia-sub" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-8">
                        {isPendingLogin ? <>
                            <Button disabled type="submit" className="w-full lg:w-1/2 mx-auto styled-button border p-6 flex gap-4 ">
                                <span className="text-normal lg:text-base">Đang xử lý</span>
                                <Loader2 size="22" className="animate-spin" />
                            </Button>
                        </> : <>
                            <Button type="submit" className="w-full lg:w-1/2 mx-auto styled-button p-6 flex gap-2 ">
                                <span className="text-normal lg:text-base">Đăng nhập</span>
                                <LogIn size="24" />
                            </Button>
                        </>}
                    </div>
                </form>
            </Form>
        </motion.div>
    );
};

export default LoginForm;
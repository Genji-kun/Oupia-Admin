"use client"

import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button';
import { Loader2, LogIn } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from "framer-motion";
import Loader from '@/components/ui/loader';

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Tên đăng nhập không được để trống",
    }),
    password: z.string().min(1, {
        message: "Mật khẩu không được để trống"
    })
})

const LoginForm = () => {
    const [isSubmiting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        console.log(values)
    }

    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 px-4 lg:px-10 py-10 justify-center">
            <div>
                <h1 className="font-bold text-3xl text-center lg:text-left mb-2">Hello! Welcome back to Oupia</h1>
                <p className="text-gray-600 dark:text-gray-700 text-center text-sm lg:text-left">Đăng nhập vào hệ thống quản lý Oupia</p>
            </div>
            <Separator className="w-1/2 mx-auto lg:mx-0" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Tên nguời dùng</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isSubmiting} className="text-base py-6" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} disabled={isSubmiting} className="text-base py-6" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-4">
                        {isSubmiting ? <>
                            <Button disabled type="submit" className="w-full lg:w-1/2 mx-auto styled-button border p-6 flex gap-4 ">
                                <span className="text-normal lg:text-base">Đang xử lý</span>
                                <div className="h-4 w-4">
                                    <Loader />
                                </div>
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
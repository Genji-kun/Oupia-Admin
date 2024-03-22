"use client"

import { Input } from '@/components/ui/input';
import { Loader2, UploadCloud, UserPlus2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import FormMapContainer from './form-map-container';
import Image from 'next/image';
import { numberToCurrency } from '@/utils/priceConvert';
import SelectedUserInfo from './selected-user-info';
import { useAssetOwnerContext } from '@/contexts/asset-owner-context';
import { Asset } from '@/interfaces/Asset';

const formSchema = z.object({
    name: z.string({
        required_error: "Chưa điền tên căn hộ.",
    }).min(4,
        { message: "Tên căn hộ phải chứa ít nhất 4 ký tự." }
    ).max(50,
        { message: "Tên căn hộ chỉ được chứa nhiều nhất 50 ký tự." }
    ),
    description: z.string({
        required_error: "Chưa điền thông tin mô tả căn hộ.",
    }).min(30,
        { message: "Nội dung mô tả phải chứa ít nhất 30 ký tự." }
    ).max(3000,
        { message: "Nội dung mô tả chỉ được chứa nhiều nhất 3000 ký tự." }
    ),
    area: z.coerce.number({
        required_error: "Chưa điền diện tích căn hộ",
        invalid_type_error: "Diện tích phải là một số."
    }).min(10, {
        message: "Diện tích phải lớn hơn 10m²."
    }),

    assetType: z.string({
        required_error: "Chưa điền địa chỉ của căn hộ.",
    }),

    price: z.coerce.number({
        required_error: "Chưa có thông tin giá thuê.",
        invalid_type_error: "Giá thuê phải là một số."
    }).min(99999, {
        message: "Giá thuê phải lớn hơn 100 nghìn đồng."
    }).max(10000000000, {
        message: "Giá thuê phải nhỏ hơn 10 tỷ đồng."
    }),

    fullLocation: z.string({
        required_error: "Chưa điền địa chỉ của căn hộ.",
    }),

})

const AddAssetForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: undefined,
            description: undefined,
            area: undefined,
            fullLocation: undefined,
            assetType: undefined,
            price: undefined
        },
    })

    const [imageList, setImageList] = useState<any[]>();
    const [price, setPrice] = useState<number>();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isAddingUser, setIsAddingUser] = useState<boolean>(false);

    const { user } = useAssetOwnerContext();

    const handleFileChange = (evt: any) => {
        const newFiles = Array.prototype.slice.call(evt.target.files);
        setImageList((current: any) => [...(current || []), ...newFiles]);
    }

    const handleDelete = (file: File) => {
        setImageList((imageList) => imageList?.filter((f) => f !== file));
    }

    useEffect(() => {
        const subscription = form.watch((values: any) => {
            for (const key in values) {
                if (key === "price" && values[key] <= 10000000000) {
                    setPrice(values[key]);
                } else {
                    setPrice(undefined);
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        const asset = {
            name: values.name,
            description: values.description,
            location: values.fullLocation,
            price: values.price,
            area: values.area,
            user: user!,
            imageList: imageList,
        };

        try {
            const form = new FormData();
            form.append("asset", JSON.stringify(asset));
            setIsSubmitting(true);
            console.log(asset);
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-2 gap-5 h-full relative">
                <div className="col-span-2 xl:col-span-1 flex flex-col gap-5">
                    <div className="flex flex-col p-6 xl:p-10 gap-5 border rounded-lg bg-background dark:bg-slate-900">
                        <h1 className="font-semibold text-2xl">Thông tin về căn hộ</h1>
                        <Separator />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-base font-semibold text-foreground">Tên căn hộ</FormLabel>
                                    <FormControl>
                                        <Input maxLength={60} {...field} type="text" disabled={isSubmitting} className="text-base bg-border/40 dark:bg-slate-700" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold text-foreground">Nội dung miêu tả</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isSubmitting}
                                            rows={4}
                                            maxLength={3100}
                                            className="text-base bg-border/40 dark:bg-slate-700" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="assetType"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="text-base font-semibold text-foreground">Loại hình căn hộ</FormLabel>
                                        <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="dark:bg-slate-700 bg-border/40">
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="dark:bg-slate-700">
                                                <SelectItem value="MALE">Căn hộ</SelectItem>
                                                <SelectItem value="FEMALE">Nguyên căn</SelectItem>
                                                <SelectItem value="ORTHER">Kí túc xá</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="area"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="text-base font-semibold text-foreground">Diện tích</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    disabled={isSubmitting}
                                                    className="text-base bg-border/40 dark:bg-slate-700 pr-14">
                                                </Input>
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 px-2 z-10 border-l-[1.75px] border-foreground"> m²</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-base font-semibold text-foreground">Giá thuê căn hộ</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                disabled={isSubmitting}
                                                className="text-base bg-border/40 dark:bg-slate-700 pr-20">
                                            </Input>
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 px-2 z-10 border-l-[1.75px] border-foreground"> tháng</span>
                                        </div>
                                    </FormControl>
                                    {price && < FormDescription >Số tiền hiển thị: <span className="text-primary font-bold">{numberToCurrency(Number(price))} VND</span></FormDescription>}
                                    {field.value && !price && < FormDescription >Số tiền không hợp lệ hoặc quá lớn</FormDescription>}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col p-6 xl:p-10 gap-5 border border-border rounded-lg bg-background dark:bg-slate-900">
                        <div className="grid grid-cols-10 gap-2 items-center">
                            <h1 className="font-semibold text-2xl col-span-6">Hình ảnh của căn hộ</h1>
                            {imageList && <h1 className=" col-span-4 text-right text-muted-foreground"> {imageList.length} hình ảnh</h1>}
                        </div>
                        <Separator />
                        <div className="flex w-full justify-center rounded-lg border border-dashed dark:border-muted-foreground border-border px-6 py-10 dark:bg-slate-700">
                            <div className="text-center relative">
                                <UploadCloud className="mx-auto h-12 w-12" aria-hidden="true" />
                                <div className="mt-4 flex text-muted-foreground">
                                    <label
                                        htmlFor="motelImages"
                                        className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary-700"
                                    >
                                        <span>Tải lên file</span>
                                        <Input
                                            id="motelImages"
                                            name="motelImages"
                                            type="file"
                                            multiple
                                            className="sr-only"
                                            accept="image/png, image/jpeg"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="pl-1">hoặc kéo thả từ thư mục</p>
                                </div>
                                <p className="text-sm ">Chỉ nhận ảnh PNG, JPG</p>
                            </div>
                        </div>
                        {imageList?.length !== 0 && (
                            <div className="grid grid-cols-6 gap-5 items-center">
                                {imageList?.map((image, index) => (
                                    <div key={index} className="col-span-1 relative ">
                                        <X className="text-destructive font-bold w-6 h-6 p-1 bg-background hover:bg-border dark:hover:bg-slate-700 dark:bg-slate-800 rounded-full absolute -right-2 -top-2 cursor-pointer" onClick={() => handleDelete(image)} />
                                        <Image width={500} height={500} className="rounded-lg object-cover w-32 aspect-square" src={URL.createObjectURL(image)} alt={image.name} />
                                    </div>
                                ))}
                            </div>)}
                    </div>
                    <div className="flex flex-col p-6 xl:p-10 gap-5 border border-border rounded-lg bg-background dark:bg-slate-900">
                        <div className="grid grid-cols-10 gap-2 items-center">
                            <h1 className="font-semibold text-2xl col-span-6">Người sở hữu</h1>
                            {
                                !user && (!isAddingUser && <Button type="button" onClick={() => setIsAddingUser(true)} className="ml-auto w-fit styled-button flex gap-2 col-span-4">
                                    <UserPlus2 size={20} />
                                    <span className="text-base">Thêm người sở hữu</span>
                                </Button>)
                            }

                        </div>
                        <Separator />

                        {
                            user ? <SelectedUserInfo user={user} /> : (isAddingUser ? <>
                            </> : <>
                                <span className="text-center text-muted-foreground">Chưa có người sở hữu của căn hộ.</span>
                            </>)
                        }

                    </div>
                </div>
                <div className="col-span-2 xl:col-span-1 flex flex-col gap-5 sticky top-5 h-1/2">
                    <div className="h-full flex flex-col p-6 xl:p-10 gap-5 border boreder rounded-lg bg-background dark:bg-slate-900">
                        <h1 className="font-semibold text-2xl">Vị trí căn hộ</h1>
                        <Separator />
                        <FormField
                            control={form.control}
                            name="fullLocation"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-base font-semibold text-foreground">Địa chỉ đầy đủ của căn hộ</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" disabled={isSubmitting} className="text-base bg-border/40 dark:bg-slate-700" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormMapContainer />
                    </div>
                    <div>
                        {isSubmitting ? <>
                            <Button disabled className=" ml-auto w-fit styled-button flex gap-3 ">
                                <span className="text-base">Đang xử lý</span>
                                <Loader2 className="animate-spin" size={20} />
                            </Button>
                        </> : <>
                            <div className="w-fit flex gap-x-2 items-center ml-auto pt-2">
                                <Button onClick={() => { form.unregister(); }} type="button" variant={"outline"} className=" w-fit flex gap-2 px-6 py-4">
                                    <span className="text-base">Xóa thông tin</span>
                                </Button>
                                <Button type="submit" className=" w-fit styled-button flex gap-2 px-6 py-4">
                                    <span className="text-base">Hoàn tất</span>
                                </Button>
                            </div>
                        </>}
                    </div>
                </div>

            </form>
        </Form >
    );
};

export default AddAssetForm;
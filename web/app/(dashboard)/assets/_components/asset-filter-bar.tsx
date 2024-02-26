"use client";

import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { vi } from "date-fns/locale";
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { MdOutlineAddHomeWork } from 'react-icons/md';

const AssetFilterBar = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="grid grid-cols-2 gap-2">
            <Input
                className="col-span-2"
                placeholder="Tìm kiếm tên căn hộ..." />
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full text-left font-normal dark:bg-slate-900 hover:dark:bg-slate-800",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        {selectedDate ? (
                            format(selectedDate, "dd-MM-yyyy")
                        ) : (
                            <span>Ngày đăng</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        locale={vi}
                        mode="single"
                        captionLayout="dropdown-buttons"
                        fromYear={1960}
                        toYear={2030}
                        selected={selectedDate as any}
                        onSelect={(date: any) => setSelectedDate(date)}
                        disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <Link href="/assets/add" className="w-full">
                <Button className="space-x-2 styled-button w-full">
                    <MdOutlineAddHomeWork className="w-5 h-5 " />
                    <span className="text-sm">Thêm căn hộ mới</span>
                </Button>
            </Link>
        </div>
    );
};

export default AssetFilterBar;
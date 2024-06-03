"use client"

import React from 'react';
import { Button } from '../button';
import { Bell, ChevronDown, LogOut, Moon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Switch } from '../switch';
import BreadCumb from '../bread-cumb';
import { useAppContext } from '@/contexts/app-context';
import { Popover, PopoverTrigger } from '../popover';
import { PopoverContent } from '@radix-ui/react-popover';
import { Separator } from '../separator';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { convert } from '@/utils/convertAvatarAlt';
import withAuth from '@/utils/withAuth';

const Navbar = () => {

    const { theme, setTheme } = useTheme();
    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const { currentUser, dispatch } = useAppContext();

     if (!currentUser) {
        return <></>
    }

    return (
        <nav className="h-[80px] flex items-center border-b border-border justify-between p-5 xl:px-8 dark:bg-oupia-base">
            <div className="hidden lg:flex items-center">
                <BreadCumb />
            </div>
            <div className="flex items-center gap-x-2">
                <Button variant="ghost" className="p-2.5 rounded-full ">
                    <Bell size={20}></Bell>
                </Button>
                <Popover>
                <PopoverTrigger asChild>
                    <div className="relative ml-1">
                        <Avatar className='w-12 h-12 cursor-pointer'>
                            <AvatarImage src={currentUser.avatar} alt={"User Avatar"} />
                            <AvatarFallback>{convert(currentUser.fullName)}</AvatarFallback>
                        </Avatar>
                        <Button className="absolute-button text-white"><ChevronDown className="text-white" size={15} /></Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="mt-[0.63rem] p-2 w-80 rounded border bg-background dark:bg-oupia-base flex flex-col gap-1" align='end'>
                        <div className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm cursor-pointer" onClick={(e) => {
                            e.stopPropagation(); changeTheme();
                        }}>
                            <Moon className="mr-2 h-4 w-4" />
                            <span>Chế độ tối</span>
                            <div className="ml-auto">
                                <Switch
                                    checked={theme === "dark"}
                                    onClick={(e) => {
                                        e.stopPropagation(); changeTheme();
                                        
                                    }}
                                />
                            </div>
                        </div>
                    <Separator />
                    <div onClick={() => {
                         dispatch({
                            "type": "logout",
                        });
                    }} className="w-full flex items-center py-1 px-2 hover:bg-accent rounded text-sm">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Đăng xuất</span>
                    </div>
                </PopoverContent>
            </Popover>
            </div>
        </nav>
    );
};

export default withAuth(Navbar);
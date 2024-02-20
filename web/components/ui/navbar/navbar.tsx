"use client"

import React from 'react';
import { Button } from '../button';
import { Bell, LogOut, Moon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Switch } from '../switch';
import BreadCumb from '../bread-cumb';

const Navbar = () => {

    const user = {
        fullName: "Võ Phú Phát",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
        account: {
            username: "phatvo"
        },
        phoneNumber: "0987654321"
    };

    const { theme, setTheme } = useTheme();
    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <nav className="h-[80px] flex items-center border-b border-border justify-between p-5 dark:bg-slate-900">
            <div className="hidden lg:flex items-center">
                <BreadCumb />
            </div>
            <div className="flex items-center gap-x-2">
                <Button variant="ghost" className="p-2.5 rounded-full ">
                    <Bell size={20}></Bell>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="relative h-12 aspect-square">
                            <Image
                                className="rounded-full"
                                width={160}
                                height={160}
                                src={user.avatar}
                                alt="User avatar" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="mt-1 p-2 w-80 dark:bg-slate-900">
                        <DropdownMenuGroup className="mb-2">
                            <DropdownMenuItem>
                                <Link href={`/profile/${user.account?.username}`} className="w-full flex gap-x-4 items-center ">
                                    <Image
                                        className="rounded-full h-12 w-12"
                                        width={160}
                                        height={160}
                                        src={user.avatar}
                                        alt="User avatar" />
                                    <h2 className="font-bold text-base">{user.fullName}</h2>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <div className="flex items-center w-full" onClick={(e) => {
                                    e.stopPropagation(); changeTheme();
                                }}>
                                    <Moon className="mr-2 h-4 w-4" />
                                    <span>Chế độ tối</span>
                                    <div className="ml-auto">
                                        <Switch
                                            checked={theme !== "system" && theme === "dark"}
                                            onClick={(e) => {
                                                e.stopPropagation(); changeTheme();
                                            }}
                                        />
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Đăng xuất</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;
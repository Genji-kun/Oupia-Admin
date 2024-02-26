"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import NavbarLogo from './navbar/navbar-logo';
import { Button } from './button';
import { ChevronFirst, ChevronLast } from 'lucide-react';

const SidebarContext = createContext<boolean | undefined>(undefined);
const Sidebar = ({ children }: { children: React.ReactNode }) => {

    const [expanded, setExpanded] = useState(() => {
        return localStorage.getItem('sidebar') === 'true' ? true : false;
    });

    useEffect(() => {
        localStorage.setItem('sidebar', String(expanded));
    }, [expanded]);

    return (
        <aside className="dark:bg-slate-900 hidden lg:block border-r border-border">
            <div className="p-3 flex items-center justify-center ">
                <div className={cn("overflow-hidden transition-all px-3 w-56", !expanded && "w-0 px-0")}>
                    <NavbarLogo />
                </div>
                <Button variant={"ghost"} className="px-4 py-7" onClick={() => setExpanded(curr => !curr)}>
                    {expanded ? <ChevronFirst /> : <ChevronLast />}
                </Button>
            </div>
            <nav className="h-full flex flex-col shadow-sm">
                <SidebarContext.Provider value={expanded}>
                    <ul className="flex flex-col gap-2 p-3">
                        {children}
                    </ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
};

const SidebarItem = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => {

    const pathname = usePathname();
    const isActive = (pathname === "/" && href === "/") || pathname === href || (pathname !== "/" && pathname?.startsWith(`${href}/`));

    const expanded = useContext(SidebarContext);


    return (
        <li className="relative group">
            <Link href={href} className={cn("flex items-center p-4 rounded hover:bg-border", isActive && "text-primary-500 bg-primary-600/20 hover:bg-primary-600/20 dark:bg-primary-900/40 dark:hover:bg-primary-900/40")}>
                {icon}
                <span className={cn("font-semibold overflow-hidden transition-all text-nowrap", expanded ? "w-52 ml-3" : "w-0")}>{label}</span>
            </Link>
            <>
                {!expanded &&
                    <span
                        className="text-nowrap absolute top-1/2 -translate-y-1/2 font-semibold
                        left-full rounded px-4 py-2 ml-8 bg-border dark:bg-slate-800 text-primary border border-border
                        z-20 opacity-20 -translate-x-3 invisible transition-all 
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                        {label}
                    </span>
                }
            </>
        </li >
    );
}

export { Sidebar, SidebarItem };

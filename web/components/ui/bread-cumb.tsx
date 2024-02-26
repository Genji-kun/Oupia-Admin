"use client";

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BreadCumb = () => {
    const pathname = usePathname();
    const crumbs = pathname.split("/").filter((x) => x);

    const isLast = (index: number) => {
        return index === crumbs.length - 1;
    }

    return (
        <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
                {crumbs.length === 0 ?
                    <li>
                        <span className="text-foreground/50 uppercase font-semibold">
                            Bảng điều khiển
                        </span>
                    </li> : <li className="flex items-center gap-1">

                        <Link href="/" className="text-foreground/50 uppercase font-semibold hover:text-foreground relative after:transition-all after:w-0 after:absolute after:left-0 after:bottom-0 after:bg-foreground after:h-[1px] after:content-[''] hover:after:w-full">
                            Bảng điều khiển
                        </Link>
                        <ChevronRight className="text-foreground/50 w-4 h-4" />
                    </li>

                }
                {crumbs.map((crumb, index) => {
                    const routeTo = `/${crumbs.slice(0, index + 1).join("/")}`;
                    let routeName = "";
                    switch (crumb) {
                        case "add":
                            routeName = "Thêm mới";
                            break;
                        case "users":
                            routeName = "Quản lý người dùng";
                            break;
                        case "assets":
                            routeName = "Quản lý căn hộ cho thuê";
                            break;
                        case "posts":
                            routeName = "Quản lý bài viết";
                            break;

                    }

                    if (isLast(index)) {
                        return <li key={index} className="uppercase font-semibold">
                            {routeName}
                        </li>
                    }
                    return <li key={index} className="flex items-center gap-1">
                        <Link href={routeTo} className="relative after:transition-all after:w-0 after:absolute after:left-0 after:bottom-0 after:bg-foreground after:h-[1px] after:content-[''] hover:after:w-full">
                            <span className="text-foreground/50 uppercase underline-offset-2 hover:text-foreground font-semibold">
                                {routeName}
                            </span>
                        </Link>
                        <ChevronRight className="text-foreground/50 w-4 h-4" />
                    </li>

                })}
            </ol>


        </nav >


    );
};

export default BreadCumb;
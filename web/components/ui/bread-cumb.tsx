"use client";

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
            <ol className="inline-flex items-center space-x-1">
                <>
                    {crumbs.map((crumb, index) => {
                        const disabled = isLast(index);
                        const routeTo = `/${crumbs.slice(0, index + 1).join("/")}`;

                        <li className="inline-flex items-center">

                            <Link href={routeTo} >
                                {crumb}
                            </Link>
                        </li>

                    })}
                </>
            </ol>

            <Link href="/" className="text-foreground/50 text-xl uppercase font-semibold underline-offset-2 hover:underline hover:text-foreground">
                Bảng điều khiển
            </Link>
        </nav>


    );
};

export default BreadCumb;
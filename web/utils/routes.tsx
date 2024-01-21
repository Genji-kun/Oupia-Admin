import { Divide, Hotel, Newspaper, PieChart, UsersRound } from "lucide-react";
import { ReactElement, ReactNode } from "react";

export type Route = { label: ReactNode, href: string }

export const sideRoutes: Route[] = [
    {
        label:
            <div className="flex gap-4 p-12 items-center">
                <PieChart size="24" />
                <span className="font-semibold">Dashboard</span>
            </div>
        ,
        href: "/",

    }, {
        label:
            <div className="flex gap-4 p-12 items-center">
                <UsersRound size="24" />
                <span className="font-semibold">Quản lý người dùng</span>
            </div>
        ,
        href: "/users",
    },
    {
        label:
            <div className="flex gap-4 p-12 items-center">
                <Hotel size="24" />
                <span className="font-semibold">Quản lý tin cho thuê</span>
            </div>
        , href: "/assets",
    },
    {
        label:
            <div className="flex gap-4 p-12 items-center">
                <Newspaper size="24" />
                <span className="font-semibold">Quản lý bài viết</span>
            </div>
        , href: "/posts",
    },
];

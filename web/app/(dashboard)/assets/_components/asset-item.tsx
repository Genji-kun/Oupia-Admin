import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Asset } from '@/interfaces/Asset';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const AssetItem = ({ asset }: { asset: Asset }) => {

    const [isHover, setIsHover] = useState(false);

    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="flex flex-col gap-2 border border-border rounded p-5 bg-background dark:bg-slate-900">
            <div className="grid grid-cols-10 gap-4 items-center">
                <h3 className={cn("font-semibold uppercase text-lg truncate w-max col-span-7 relative after:transition-all after:w-0 after:absolute after:left-0 after:bottom-0 after:bg-foreground after:h-[1px] after:content-[''] ", isHover && "after:w-full")}>{asset.name}</h3>
                <div className="col-start-10 ml-auto">
                    <Button variant={"ghost"} className="aspect-square p-2 rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <p className="pb-2 text-muted-foreground text-xs xl:text-base">
                {asset.description}
            </p>
            <Separator className="my-2" />
            <div className="grid grid-cols-10 gap-4 items-center">
                <div className="col-span-10 md:col-span-7 flex items-center">
                    <Image
                        className="w-10 aspect-square rounded-full object-cover"
                        src={asset.user.avatar}
                        alt='User Image'
                        width={500} height={500} />
                    <span className="text-xs xl:text-sm text-muted-foreground ml-2 text-nowrap">Được đăng bởi
                    </span>
                    <span className="text-foreground font-semibold text-sm xl:text-base ml-1 md:ml-2 text-nowrap truncate">
                        {asset.user.fullName}
                    </span>
                </div>
                <h4 className="col-span-10 md:col-span-3 md:text-right md:px-2 text-xs xl:text-sm text-foreground"><span className="text-muted-foreground ">Ngày đăng:</span> 11-01-2024</h4>
            </div>
        </div >
    );
};

export default AssetItem;
import { Button } from '@/components/ui/button';
import { useAssetOwnerContext } from '@/contexts/asset-owner-context';
import { User } from '@/interfaces/User';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const SelectedUserInfo = ({ user }: { user: User }) => {
    const { setUser } = useAssetOwnerContext();

    return (
        <div className="flex items-center justify-between border border-dashed border-muted-foreground rounded-lg dark:bg-slate-700 p-5">
            <div className="flex items-center gap-5">
                <Image
                    className="w-20 aspect-square rounded-full object-cover"
                    src={user.avatar}
                    alt="User Image"
                    height={500}
                    width={500} />
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold">{user.fullName}</h3>
                    <h3 className="text-sm text-muted-foreground">@{user.account?.username}</h3>
                </div>
            </div>
            <Button onClick={() => setUser(undefined)} type="button" className="px-2 rounded-full bg-destructive">
                <Trash className="text-white w-6 h-6"></Trash>
            </Button>
        </div >
    );
};

export default SelectedUserInfo;
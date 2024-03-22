"use client"

import { User } from '@/interfaces/User';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IAssetOwnerContext {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const AssetOwnerContext = createContext<IAssetOwnerContext | undefined>(undefined);

export const AssetOwnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | undefined>({
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Nguyễn Kim Bảo Ngân",
        gender: "FEMALE",
        email: "nguyenkimbaongan@gmail.com",
        dob: new Date("02-06-2002"),
        role: ["ROLE_ADMIN"],
        account: {
            username: "ngan020602"
        }
    });

    return (
        <AssetOwnerContext.Provider value={{ user, setUser }}>
            {children}
        </AssetOwnerContext.Provider>
    );
};


export const useAssetOwnerContext = (): IAssetOwnerContext => {
    const context = useContext(AssetOwnerContext);
    if (!context) {
        throw new Error('useAssetOwnerContext phải được dùng trong AssetOwnerProvider');
    }
    return context;
};

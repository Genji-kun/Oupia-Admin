"use client"

import { searchEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { UserResponse } from '@/interfaces/User';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IAssetOwnerContext {
    user: UserResponse | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserResponse | undefined>>;
    users: UserResponse[];
    isFetching: boolean;
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const AssetOwnerContext = createContext<IAssetOwnerContext | undefined>(undefined);

export const AssetOwnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const searchUser = async (keyword: string) => {
        const paramsReq = keyword ? { keyword: keyword, size: 5 } : { size: 5 };
        try {
            const res = await authApi.get(searchEndpoints["users"], {
                params: paramsReq
            })
            return res.data.content; 
        } catch(error) {
            console.error(error);
        }
    } 

    const [user, setUser] = useState<UserResponse | undefined>();
    const [keyword, setKeyword] = useState<string>("");

    const { data: users, isFetching } = useQuery({
        queryKey: ["searchUser", keyword],
        queryFn: () => searchUser(keyword),
    })

    useEffect(() => {
        if (keyword) {
            searchUser(keyword);
        }
    }, [keyword])

    return (
        <AssetOwnerContext.Provider value={{ user, setUser, users, isFetching, keyword, setKeyword }}>
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

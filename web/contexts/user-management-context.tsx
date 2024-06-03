"use client"

import { postEndpoints, searchEndpoints, userEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { UserResponse } from '@/interfaces/User';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

interface IUserManagementContext {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    unitsPerPage: number;
    setUnitsPerPage: React.Dispatch<React.SetStateAction<number>>
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    users: UserResponse[];
    isFetching: boolean;
    isError: boolean;

    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserManagementContext = createContext<IUserManagementContext | undefined>(undefined);

export const UserManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [unitsPerPage, setUnitsPerPage] = useState<number>(8);
    const [keyword, setKeyword] = useState<string>("");
    const [totalPages, setTotalPages] = useState<number>(1);

    const [editMode, setEditMode] = useState<boolean>(false);


    const fetchUsersData = async ({ queryKey }: any) => {
        const [_key, { currentPage, unitsPerPage, debounceKw }] = queryKey;
        try {
            const res = await authApi.get(searchEndpoints["users"], {
                params: {
                    page: currentPage,
                    size: unitsPerPage,
                    keyword: debounceKw[0]
                }
            });
            if (res.data.totalPages > 0)
                setTotalPages(res.data.totalPages);
            else
                setTotalPages(1);
            return res.data.content;
        } catch (error) {
            console.error(error);
        }
    }

    const debounceKw = useDebounce(keyword, 1000);

    const { data: users, isFetching, isError } = useQuery({
        queryKey: ['user', { currentPage, unitsPerPage, debounceKw }],
        queryFn: fetchUsersData,
    })


    return (
        <UserManagementContext.Provider value={{ currentPage, setCurrentPage, unitsPerPage, setUnitsPerPage, keyword, setKeyword, users, isFetching, isError, totalPages, setTotalPages, editMode, setEditMode }}>
            {children}
        </UserManagementContext.Provider>
    );
};


export const useUserManagementContext = (): IUserManagementContext => {
    const context = useContext(UserManagementContext);
    if (!context) {
        throw new Error('useUserManagementContext phải được dùng trong UserManagementProvider');
    }
    return context;
};

"use client"

import { postEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { PostResponse } from '@/interfaces/Post';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

interface IPostManagementContext {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    unitsPerPage: number;
    setUnitsPerPage: React.Dispatch<React.SetStateAction<number>>
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>
    posts: PostResponse[];
    isFetching: boolean;
    isError: boolean;

    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostManagementContext = createContext<IPostManagementContext | undefined>(undefined);

export const PostManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [unitsPerPage, setUnitsPerPage] = useState<number>(8);
    const [keyword, setKeyword] = useState<string>("");
    const [totalPages, setTotalPages] = useState<number>(1);

    const [editMode, setEditMode] = useState<boolean>(false);


    const debounceKw = useDebounce(keyword, 1000);

    const fetchPostsData = async ({ queryKey }: any) => {
        const [_key, { currentPage, unitsPerPage, debounceKw }] = queryKey;

        try {
            const res = await authApi.get(postEndpoints["getPosts"], {
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

    const { data: posts, isFetching, isError } = useQuery({
        queryKey: ['posts', { currentPage, unitsPerPage, debounceKw }],
        queryFn: fetchPostsData,
    })

    return (
        <PostManagementContext.Provider value={{ currentPage, setCurrentPage, unitsPerPage, setUnitsPerPage, keyword, setKeyword, posts, isFetching, isError, totalPages, setTotalPages , editMode, setEditMode}}>
            {children}
        </PostManagementContext.Provider>
    );
};


export const usePostManagementContext = (): IPostManagementContext => {
    const context = useContext(PostManagementContext);
    if (!context) {
        throw new Error('usePostManagementContext phải được dùng trong PostManagementProvider');
    }
    return context;
};

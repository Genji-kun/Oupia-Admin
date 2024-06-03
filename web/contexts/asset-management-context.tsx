"use client"

import { assetsEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { AssetResponse } from '@/interfaces/Asset';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import { useDebounce } from 'use-debounce';

interface IAssetManagementContext {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    unitsPerPage: number;
    setUnitsPerPage: React.Dispatch<React.SetStateAction<number>>
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>
    assets: any[];
    isFetching: boolean;
    isError: boolean;
    error: any
}

const AssetManagementContext = createContext<IAssetManagementContext | undefined>(undefined);

export const AssetManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [unitsPerPage, setUnitsPerPage] = useState<number>(4);
    const [keyword, setKeyword] = useState<string>("");
    const [totalPages, setTotalPages] = useState<number>(1);

    const debounceKw = useDebounce(keyword, 1000);

    const fetchAssetsData = async ({ queryKey } : any) => {

        const [_key, { currentPage, unitsPerPage, debounceKw }] = queryKey;
        try {
            const res = await authApi.get(assetsEndpoints["getAssets"], {
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

    const { data: assets, isFetching, isError, error } = useQuery({
        queryKey: ['assets', { currentPage, unitsPerPage, debounceKw }],
        queryFn: fetchAssetsData,
    })

    return (
        <AssetManagementContext.Provider value={{ currentPage, setCurrentPage, unitsPerPage, setUnitsPerPage, keyword, setKeyword, assets, isFetching, isError, error, totalPages, setTotalPages }}>
            {children}
        </AssetManagementContext.Provider>
    );
};


export const useAssetManagementContext = (): IAssetManagementContext => {
    const context = useContext(AssetManagementContext);
    if (!context) {
        throw new Error('useAssetManagementContext phải được dùng trong AssetManagementProvider');
    }
    return context;
};

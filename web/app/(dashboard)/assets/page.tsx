"use client"

import React, { Suspense } from 'react';
import Loading from './loading';
import dynamic from 'next/dynamic';
import withAuth from '@/utils/withAuth';
import { AssetManagementProvider } from '@/contexts/asset-management-context';
import AssetDataTable from './_components/asset-data-table';
import AssetPagination from './_components/asset-pagination';
import AssetToolbar from './_components/asset-toolbar';

const AssetsPage = () => {
    return (
        <AssetManagementProvider>
            <section className="flex flex-col gap-4 w-full">
                <Suspense fallback={<Loading />}>
                    <AssetToolbar />
                    <AssetDataTable />
                    <AssetPagination />
                </Suspense>
            </section>
        </AssetManagementProvider>
    );
};

export default dynamic(() => Promise.resolve(withAuth(AssetsPage)), { ssr: false }); 
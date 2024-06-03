"use client"

import React, { Suspense } from 'react';
import Loading from './loading';
import withAuth from '@/utils/withAuth';
import UserToolBar from './_components/user-toolbar';
import UserDataTable from './_components/user-data-table';
import UserPagination from './_components/user-pagination';
import { UserManagementProvider } from '@/contexts/user-management-context';
import dynamic from 'next/dynamic';
import { useAppContext } from '@/contexts/app-context';

const UsersPage = () => {

    const { currentUser } = useAppContext();

    if (!currentUser) {
        return <></>
    }


    return (
        <UserManagementProvider>
            <section className="flex flex-col gap-4 w-full">
                <Suspense fallback={<Loading />}>
                    <UserToolBar />
                    <UserDataTable />
                    <UserPagination />
                </Suspense>
            </section>
        </UserManagementProvider>

    );
};

export default dynamic(() => Promise.resolve((UsersPage)), { ssr: false });
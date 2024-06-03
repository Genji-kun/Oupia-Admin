"use client"

import React, { Suspense } from 'react';
import Loading from './loading';
import dynamic from 'next/dynamic';
import { PostManagementProvider } from '@/contexts/post-management-context';
import PostDataTable from './_components/post-data-table';
import PostPagination from './_components/post-pagination';
import withAuth from '@/utils/withAuth';
import PostToolbar from './_components/post-toolbar';
import { useAppContext } from '@/contexts/app-context';

const PostsPage = () => {

    const { currentUser } = useAppContext();

    if (!currentUser) {
      return <></>
    }
  
    
    return (
        <PostManagementProvider>
            <section className="flex flex-col gap-4 w-full">
                <Suspense fallback={<Loading />}>
                    <PostToolbar />
                    <PostDataTable />
                    <PostPagination />
                </Suspense>
            </section>
        </PostManagementProvider>
    );
};

export default dynamic(() => Promise.resolve(withAuth(PostsPage)), { ssr: false }); 
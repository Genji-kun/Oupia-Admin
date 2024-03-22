import React, { Suspense } from 'react';

import { columns } from "./_components/columns"
import { DataTable } from './_components/data-table';
import { users } from './data/users';
import Loading from './loading';

const UsersPage = () => {

    return (
        <section className="flex flex-col gap-2 ">
            <div className="lg:py-0 py-5">
                <Suspense fallback={<Loading />}>
                    <DataTable columns={columns} data={users} />
                </Suspense>
            </div>
        </section >
    );
};

export default UsersPage;
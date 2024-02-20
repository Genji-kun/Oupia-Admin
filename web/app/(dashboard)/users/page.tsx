import React from 'react';

import { columns } from "./_components/columns"
import { DataTable } from './_components/data-table';
import { users } from './data/users';

const UsersPage = () => {

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold uppercase">Quản lý người dùng</h1>
            <div className="py-5">
                <DataTable columns={columns} data={users} />
            </div>
        </div>
    );
};

export default UsersPage;
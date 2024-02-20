import React from 'react';
import AddUserForm from './_components/add-user-form';

const AddUserPage = () => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="container text-2xl font-semibold uppercase">Thêm người dùng mới</h1>
            <AddUserForm />
        </div>
    );
};

export default AddUserPage;
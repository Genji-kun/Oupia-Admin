import React from 'react';
import LoginImage from './_components/login-image';
import LoginForm from './_components/login-form';

const LoginPage = () => {
    return (
        <div className="min-h-screen lg:p-16 xl:p-32 items-center flex">
            <div className="w-full h-full border border-border rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2">
                <LoginImage />
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
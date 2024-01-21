import Image from 'next/image';
import React from 'react';
import image from '@/public/login-image.svg';


const LoginImage = () => {
    return (
        <div className="flex items-center justify-center bg-primary-50">
            <Image src={image} alt="Login Image" width="640" height="640" className="object-cover" />
        </div>
    );
};

export default LoginImage;
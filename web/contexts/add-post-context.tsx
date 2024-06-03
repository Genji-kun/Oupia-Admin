"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';


interface IAddPostContext {
    postReq: any;
    setPostReq: any;
}

const AddPostContext = createContext<IAddPostContext | undefined>(undefined);

export const AddPostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [postReq, setPostReq] = useState<any>({});

    return (
        <AddPostContext.Provider value={{ postReq, setPostReq }}>
            {children}
        </AddPostContext.Provider>
    );
};


export const useAddPostContext = (): IAddPostContext => {
    const context = useContext(AddPostContext);
    if (!context) {
        throw new Error('useAddPostContext phải được dùng trong AddPostProvider');
    }
    return context;
};

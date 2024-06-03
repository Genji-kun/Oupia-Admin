"use client"

import { CurrentUser } from '@/interfaces/User';
import UserReducer from '@/reducers/user-reducer';
import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import cookies from "react-cookies";

interface IAppContext {
    currentUser: CurrentUser | null;
    dispatch: any;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [currentUser, dispatch] = useReducer(UserReducer, cookies.load("user") || null);

    return (
        <AppContext.Provider value={{ currentUser, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};


export const useAppContext = (): IAppContext => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext phải được dùng trong AppProvider');
    }
    return context;
};

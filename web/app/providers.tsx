"use client";

import { ThemeProvider } from '@/components/providers/theme-provider';
import { AppProvider } from '@/contexts/app-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const Providers = ({ children }: { children: React.ReactNode }) => {

    const queryClient = new QueryClient()

    useEffect(() => {
        if (!localStorage.getItem("sessionToken")) {
            const token = uuid();
            localStorage.setItem("sessionToken", token);
        }
    }, [])

    return (
        <AppProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <QueryClientProvider client={queryClient}>
                    <main>
                        {children}
                    </main>
                </QueryClientProvider>
            </ThemeProvider>
        </AppProvider>
    );
};

export default Providers;
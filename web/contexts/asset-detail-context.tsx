// "use client"

// import { searchEndpoints } from '@/configs/axiosEndpoints';
// import { authApi } from '@/configs/axiosInstance';
// import { PostResponse } from '@/interfaces/Post';
// import { UserResponse } from '@/interfaces/User';
// import { useQuery } from '@tanstack/react-query';
// import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// interface IPostDetailContext {
//     post: PostResponse | undefined;
//     isFetching: boolean
// }

// const PostDetailContext = createContext<IPostDetailContext | undefined>(undefined);

// export const PostDetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

//     const getPostById = async ({ queryKey }: any) => {
//         const [_key, id] = queryKey;
//         try {
//             const res = await authApi.get()
//             return res.data.content;
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const { data: post, isFetching } = useQuery({
//         queryKey: ["getPostDetail", { id }],
//         queryFn: getPostById,
//     })

//     return (
//         <PostDetailContext.Provider value={{ post, isFetching }}>
//             {children}
//         </PostDetailContext.Provider>
//     );
// };


// export const usePostDetailContext = (): IPostDetailContext => {
//     const context = useContext(PostDetailContext);
//     if (!context) {
//         throw new Error('usePostDetailContext phải được dùng trong PostDetailProvider');
//     }
//     return context;
// };

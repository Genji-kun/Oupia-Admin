// "use client"

// import { assetsEndpoints } from '@/configs/axiosEndpoints';
// import { publicApi } from '@/configs/axiosInstance';
// import { AssetResponse } from '@/interfaces/Asset';
// import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// interface IAssetManagementContext {
//     assets: AssetResponse[];
//     setAssets: React.Dispatch<React.SetStateAction<AssetResponse[]>>;
//     kw: string;
//     setKw: React.Dispatch<React.SetStateAction<string>>;
//     isLoading: boolean;
//     setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//     mapExpanded: boolean;
//     setMapExpanded: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const AssetManagementContext = createContext<IAssetManagementContext | undefined>(undefined);

// export const AssetManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [assets, setAssets] = useState<AssetResponse[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [mapExpanded, setMapExpanded] = useState<boolean>(true);

//     const [kw, setKw] = useState<string>("");

//     const fetchAssets = async (keyword: string) => {
//         try {
//             const res = await publicApi.get(assetsEndpoints["assets"], {
//                 params: {
//                     keyword: keyword,
//                 }
//             });
//             if (res.status === 200)
//                 setAssets(res.data.content);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         fetchAssets("");
//     }, [])

//     useEffect(() => {
//         if (kw) {
//             fetchAssets(kw);
//         }
//     }, [kw])

//     return (
//         <AssetManagementContext.Provider value={{ assets, setAssets, kw, setKw, isLoading, setIsLoading, mapExpanded, setMapExpanded }}>
//             {children}
//         </AssetManagementContext.Provider>
//     );
// };


// export const useAssetManagementContext = (): IAssetManagementContext => {
//     const context = useContext(AssetManagementContext);
//     if (!context) {
//         throw new Error('useAssetManagementContext phải được dùng trong AssetManagementProvider');
//     }
//     return context;
// };

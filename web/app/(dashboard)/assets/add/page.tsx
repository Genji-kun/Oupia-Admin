import React from 'react';
import AddAssetForm from './_components/add-asset-form';
import { AssetOwnerProvider } from '@/contexts/asset-owner-context';

const AddAssetPage = () => {
    return (
        <AssetOwnerProvider>
            <AddAssetForm />
        </AssetOwnerProvider>
    );
};

export default AddAssetPage;
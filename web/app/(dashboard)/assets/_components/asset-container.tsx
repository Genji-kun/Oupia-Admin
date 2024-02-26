import React from 'react';
import AssetList from './asset-list';
import AssetFilterBar from './asset-filter-bar';

const AssetContainer = () => {
    return (
        <>
            <AssetFilterBar />
            <AssetList />
        </>
    );
};

export default AssetContainer;
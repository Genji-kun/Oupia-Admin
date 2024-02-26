import React from 'react';
import MapContainer from './_components/map-container';
import AssetContainer from './_components/asset-container';

const AssetsPage = () => {
    return (
        <div className="grid grid-cols-4 2xl:grid-cols-10 gap-5 h-full relative">
            <div className="col-span-4 space-y-5 h-full overflow-auto">
                <AssetContainer />
            </div>
            <div className="2xl:grid grid-rows-2 gap-5 hidden col-span-6 h-[calc(100vh-150px)] sticky top-5 bottom-5">
                <MapContainer />
            </div>
        </div>
    );
};

export default AssetsPage;
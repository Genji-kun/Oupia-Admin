"use client"

import React, { useEffect, useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';


const FormMapContainer = () => {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 21.02800,
        longitude: 105.83991,
        zoom: 9
    });


    return (
        <div className="map-container h-full w-full overflow-hidden border border-border rounded-lg bg-border/40 dark:bg-slate-700">
            <ReactMapGL
                {...viewport}
                goongApiAccessToken={process.env.NEXT_PUBLIC_GOONG_MAPS_API_KEY}
                onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
            />
        </div>
    );
};

export default FormMapContainer;
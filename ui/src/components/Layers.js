import React from 'react';
import { TileLayer, LayersControl } from 'react-leaflet';

/**
 * Available map layers that can be selected on the map
 * @constant BaseLayer  map base layer component
 * @constant Overlay    map overlay component
 */

const { BaseLayer, Overlay } = LayersControl
export default function Layers(){
    return(
        <>
            <BaseLayer name = "Roads">
                <TileLayer
                    attribution='<a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </BaseLayer>

            <BaseLayer checked={true} name = "Topographical">
                <TileLayer
                    attribution='<a href="https://usgs.gov/">USGS</a>'
                    url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
                    maxNativeZoom= {16}
                    maxZoom= {18}
                />
            </BaseLayer>
            
            <BaseLayer name = "Satellite">
                <TileLayer
                    attribution='USGS'
                    url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"
                    maxNativeZoom= {16}
                    maxZoom= {18}
                />
            </BaseLayer>

            <BaseLayer name = "Satellite + Topographical">
                <TileLayer
                    attribution='USGS'
                    url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}"
                    maxNativeZoom= {16}
                    maxZoom= {18}
                />
            </BaseLayer>

            <Overlay name = "Hydro">
                <TileLayer
                    attribution='USGS'
                    url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/{z}/{y}/{x}"
                    maxNativeZoom= {16}
                    maxZoom= {18}
                />

            </Overlay>
        </>
    )
};


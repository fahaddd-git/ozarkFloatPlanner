import { useState, useEffect, useRef } from "react";
import { MapContainer, LayersControl, FeatureGroup } from "react-leaflet";
import bbox from "@turf/bbox";
import { Browser, canvas } from "leaflet";
import { getRiverData, getStations } from "../utils/callAPI";
// component imports
import Layers from "../components/Layers";
import River from "../components/River";
import Markers from "../components/Markers";
import Dropdown from "../components/Dropdown";
import MapCustomControl from "../utils/MapCustomControl";
import Distances from "../components/Distances";
import Path from "../components/Path";
import Legend from "../components/Legend";
import LoadingSpinner from "../components/LoadingSpinner";
import Stations from "../future_components/Stations";

/*
What needs improvement:
 - implement some logging software (not sure how this works with heroku)
 - add JSdoc airbnb style
 - MapPage is potentially too complicated atm
 - add some branding 
 - Create readme (use elements from old repo if needed)
 - error handling for ui and api
 - Potentially manipulate data in DB for better performance, no need for repetetive calculations
 - Implement Redis or some kind of caching
 - deploy to AWS

*/

const { Overlay } = LayersControl;
const INITIAL_RIVER_ID = "615265d7f7d6c9405d5cf61a";

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState(null);
  const [stationData, setStationData] = useState();
  const [bounds, setBounds] = useState(null);
  const [isMobile, setMobile] = useState(true);

  const [measurements, setMeasurements] = useState([]);
  const [slice, setSlice] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // sets default river by ID
  const [riverID, setRiverID] = useState(INITIAL_RIVER_ID);

  // calculates bounding box for map
  function calculateBounds(riverData) {
    const bboxArray = bbox(riverData);
    const corner1 = [bboxArray[1], bboxArray[0]];
    const corner2 = [bboxArray[3], bboxArray[2]];
    const bounds = [corner2, corner1];
    return bounds;
  }

  // ref to <FeatureGroup>
  const featureGroupRef = useRef();
  // ref to <Stations>'s featureGroup
  const stationsRef = useRef();

  useEffect(() => {
    // determines if mobile user for leaflet-fullscreen
    Browser.mobile ? setMobile(false) : setMobile(true);
  }, []);

  useEffect(() => {
    let abortController = new AbortController();

    try {
      setLoading(true);
      getRiverData(riverID).then((receivedData) => {
        const bounds = calculateBounds(receivedData);

        
        // map set, initial loading complete fly to next selected river
        if (map) {
          map.flyToBounds(bounds);
          // clears user drawn Path and Markers components from FeatureGroup
          let currentLayers = featureGroupRef.current.getLayers();
          // River component always first layer
          let riverLayerId = currentLayers[0]._leaflet_id;
          // clear layers from FeatureGroup except first
          featureGroupRef.current.eachLayer(function (layer) {
            if (layer._leaflet_id !== riverLayerId) {
              featureGroupRef.current.removeLayer(layer);
            }
          });
          stationsRef.current.clearLayers();

          setStationData([]);

          // reset data
          setMarkers([]);
          setMeasurements([]);
          setSlice([]);
        } else {
          // set initial map bounds
          setBounds(bounds);
        }
        // set riverdata when received from api
        setData(receivedData);
        setLoading(false);
        getStations().then((stationInfo) => {
          setStationData(stationInfo);
        });
        // station data (to be implemented)
        // getStations().then((stationInfo) => {
          //   setStationData(stationInfo);
          // });
        });
      } catch (error) {
        console.log(error);
      }
      // cleanup useEffect async functions
      return () => {
      abortController.abort();
    };
  }, [riverID]);

  // initial loading spinner before data and map added to view
  if (bounds === null) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    // sets max bounds of map, zoom level, zoom controls on/off, map bounds, map height
    <>
      {bounds === null || isLoading ? <LoadingSpinner /> : null}

      <MapContainer
        // preferCanvas={true}
        maxBounds={[
          [24.58, -125.68],
          [49.58, -66.48],
        ]}
        zoom={14}
        zoomControl={isMobile}
        // fullscreenControl={isMobile}
        tap={false}
        bounds={bounds}
        whenCreated={setMap}
        renderer={canvas({ padding: 0.1, tolerance: 5 })}
      >
        {/* container for dropdown box, topleft for mobile */}
        <MapCustomControl position={isMobile ? "bottomleft" : "topleft"}>
          <Dropdown riverID={riverID} setRiverID={setRiverID} />
        </MapCustomControl>
        {/* sets layers control box to be collapsed if mobile */}
        <LayersControl bubblingMouseEvents={false} collapsed={!isMobile}>
          {/* adds layers to map */}
          <Layers />

          {/* adds components to monitoring stations overlay group */}
          <Overlay name="Monitoring Stations" checked={true}>
            <FeatureGroup ref={stationsRef}>
              {stationData && <Stations stationData={stationData} setMarkers={setMarkers}/>}
            </FeatureGroup>
          </Overlay>

          {/* adds components to navigation overlay group */}
          <Overlay name="Navigation Overlay" checked={true}>
            {/* creates feature group organization for components */}
            <FeatureGroup ref={featureGroupRef} bubblingMouseEvents={false}>
              {data !== null ? (
                <River data={data} setMarkers={setMarkers} />
              ) : null}
              {markers.length > 0 ? (
                <Markers markers={markers} measurements={measurements} />
              ) : null}
              {markers.length > 1 ? (
                <Distances
                  setMeasurements={setMeasurements}
                  data={data}
                  markers={markers}
                  setSlice={setSlice}
                ></Distances>
              ) : null}
              {slice.length === 0 ? null : <Path slice={slice}></Path>}
            </FeatureGroup>

            {/* distance measurement legend at bottom right */}
            <MapCustomControl position={"bottomright"}>
              {map !== null ? (
                <Legend
                  setSlice={setSlice}
                  setMeasurements={setMeasurements}
                  setMarkers={setMarkers}
                  measurements={measurements}
                  featureGroupRef={featureGroupRef}
                />
              ) : null}
            </MapCustomControl>
          </Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
}

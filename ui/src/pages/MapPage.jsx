import React, { useState, useEffect, useRef } from "react";
import { MapContainer, LayersControl, FeatureGroup, useMapEvents } from "react-leaflet";
import bbox from "@turf/bbox";
import { Browser, canvas } from "leaflet";
import { getRiverData } from "../utils/callAPI";
// fullscreen leaflet imports
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
// core leaflet imports
import "leaflet/dist/leaflet.css";
// component imports
import Layers from "../components/Layers";
import River from "../components/River";
import Markers from "../components/Markers";
// import DistanceLine from "../components/DistanceLine";
// import Legend from "../components/Legend";
import Dropdown from "../components/Dropdown";
import MapCustomControl from "../utils/MapCustomControl";
import Distances from "../components/Distances";
import Path from "../components/Path";
import NewLegend from "../components/NewLegend";

import LoadingSpinner from "../components/LoadingSpinner";
// import Stations from "../components/Stations";

/*
What needs improvement:
 - Create popup or modal for saying how to use the tool
 - change font-weight of "Distance" text, decide modal or offcanvas for instructions, change text size/padding/opacity of river select
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



export default function MapPage() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState(null);
  // const [stationData, setStationData] = useState();
  const [bounds, setBounds] = useState(null);
  const [isMobile, setMobile] = useState(true);

  // put distance measurements here?
  const [measurements, setMeasurements] =  useState([])
  const [slice, setSlice] = useState([])
  const [isLoading, setLoading] = useState(true)
  // const addMeasurement=(measurement) =>{
  //   setMeasurements([...measurements, measurement])
  //   console.log("measurement set in addMeasurement on MapPage")
  //   console.log(measurements)
  // }

  // sets default river by ID
  const [riverID, setRiverID] = useState("615265d7f7d6c9405d5cf61a");

  // resets markers (debatable use of callback)
//  const resetMarkers=useCallback(
//    () => {
//      setMarkers([])
//    },
//    [markers],
//  )
//  const resetMeasurements=useCallback(
//   () => {
//     setMeasurements([])
//   },
//   [measurements],
// )
// const resetSlice=useCallback(
//   () => {
//     setSlice([])
//   },
//   [slice],
// )

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
  // const stationsRef = useRef()

  useEffect(() => {
    // determines if mobile user for leaflet-fullscreen
    Browser.mobile ? setMobile(false) : setMobile(true);
  }, []);

  // shows and flies to user location
  // useEffect(() => {
  //   if (map){
  //     map.locate().on("locationfound", function (e) {
  //     // map.flyTo(e.latlng, map.getZoom());

  //     const circle = L.circle({lat: 37.98533963422239, lng: -91.38153076171875});
  //     circle.addTo(map);
  //   });
  //   map.on("locationerror",(e)=>{
  //     console.log(e.message)
  //   })

  //   ;}
  // }, [map]);

  useEffect(() => {
    let abortController = new AbortController();

    try {
      setLoading(true)
      console.log("loading true")
      getRiverData(riverID).then((receivedData) => {
        const bounds = calculateBounds(receivedData);
        console.log("riverdata received bounds calculated")
        // map set, initial loading complete fly to next selected river
        if (map) {
          map.flyToBounds(bounds);
          // clears legend pane (improve this)
          // document.getElementById("resetButton").click();
          let currentLayers = featureGroupRef.current.getLayers();
          // River component always first layer
          let riverLayerId = currentLayers[0]._leaflet_id;
          //clear layers except first

          featureGroupRef.current.eachLayer(function (layer) {
            if (layer._leaflet_id !== riverLayerId) {
              featureGroupRef.current.removeLayer(layer);
            }
          });
          setMarkers([]);
          setMeasurements([])
          setSlice([])


        } else {
          // set initial map bounds
          setBounds(bounds);
          console.log("initial bounds set")
        }
        // set riverdata when received from api
        setData(receivedData);
        console.log("data set")
        setLoading(false)
        console.log("loading false")
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
    return <LoadingSpinner></LoadingSpinner>
    
  }
  return (
    // sets max bounds of map, zoom level, zoom controls on/off, map bounds, map height
    <>
    {(bounds === null || isLoading)? <LoadingSpinner/> :  null}

    <MapContainer
      // preferCanvas={true}
      maxBounds={[
        [24.58, -125.68],
        [49.58, -66.48],
      ]}
      zoom={14}
      zoomControl={isMobile}
      fullscreenControl={isMobile}
      bounds={bounds}
      whenCreated={setMap}
      renderer={canvas({ padding: .1, tolerance:7})}
    >
      {/* <MyComponent></MyComponent> */}
      {/* container for dropdown box, topleft for mobile */}
      <MapCustomControl position={isMobile? "bottomleft" : "topleft"}>
        <Dropdown riverID={riverID} setRiverID={setRiverID} />
      </MapCustomControl>
      {/* sets layers control box to be collapsed if mobile */}
      <LayersControl bubblingMouseEvents={false} collapsed={!isMobile}>
        {/* adds layers to map */}
        <Layers />
        {/* adds components to monitoring stations overlay group */}
        {/* <Overlay name="Monitoring Stations" checked={true}> */}
          {/* {stationData && <Stations station={stationData} />} */}
        {/* </Overlay> */}
        {/* adds components to navigation overlay group */}
        <Overlay name="Navigation Overlay" checked={true}>
          {/* creates feature group organization for components */}
          <FeatureGroup ref={featureGroupRef} bubblingMouseEvents={false}>
            {data !== null? <River data={data} setMarkers={setMarkers}/> : null}
            {markers.length > 0? <Markers markers={markers}/> : null}
            {/* <DistanceLine data={data} addMeasurement={addMeasurement} markers={markers}></DistanceLine> */}
            {markers.length > 1? <Distances setMeasurements={setMeasurements} data={data} markers={markers} setSlice={setSlice}></Distances> : null}
            {slice.length===0? null: <Path slice={slice}></Path>}
          </FeatureGroup>
          {/* distance measurement legend */}

          <MapCustomControl position={"bottomright"}>
              {map !== null? <NewLegend setSlice={setSlice} setMeasurements={setMeasurements} setMarkers={setMarkers} measurements={measurements}  featureGroupRef={featureGroupRef}/> : null}
          </MapCustomControl>

          {/* <Legend
            resetMarkers={resetMarkers}
            featureGroupRef={featureGroupRef}
            map={map}
          /> */}
        </Overlay>
      </LayersControl>
    </MapContainer>
    </>
  );
}

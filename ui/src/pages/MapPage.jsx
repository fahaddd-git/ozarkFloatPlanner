import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, LayersControl, FeatureGroup } from "react-leaflet";
import bbox from "@turf/bbox";
import { Browser } from "leaflet";
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
import DistanceLine from "../components/DistanceLine";
import Legend from "../components/Legend";
import Dropdown from "../components/Dropdown";
import MapCustomControl from "../utils/MapCustomControl";
import Distances from "../components/Distances";
// import Stations from "../components/Stations";

/*
What needs improvement:
 - Create popup or modal for saying how to use the tool
 - update dependencies. DONE (react-leaflet-control potentially needed still?)
 - implement some logging software (not sure how this works with heroku)
 - add JSdoc airbnb style
 - Legend: needs to be more React-ive, ditch the innerhtml, see how to put the Measurements.jsx inside the legend
 - MapPage is potentially too complicated atm
 - add some branding 
 - Create readme (use elements from old repo if needed)
 - error handling for ui and api
 - add a spinner for loading
 - potentially make the river select box use bootstrap

 - Potentially manipulate data in DB for better performance, no need for repetetive calculations
 - Implement Redis or some kind of caching
 - deploy to AWS

*/

const { Overlay } = LayersControl;

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState();
  // const [stationData, setStationData] = useState();
  const [bounds, setBounds] = useState(null);
  const [isMobile, setMobile] = useState(true);

  // put distance measurements here?
  const [measurements, setMeasurements] =  useState([])
  // const addMeasurement=(measurement) =>{
  //   setMeasurements([...measurements, measurement])
  //   console.log("measurement set in addMeasurement on MapPage")
  //   console.log(measurements)
  // }

  // sets default river by ID
  const [riverID, setRiverID] = useState("615265d7f7d6c9405d5cf61a");

  // resets markers
  const resetMarkers = () => {
    console.log("reset markers")
    setMarkers([]);
  };

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
      getRiverData(riverID).then((receivedData) => {
        const bounds = calculateBounds(receivedData);
        console.log("riverdata received bounds calculated")
        // map set, initial loading complete fly to next selected river
        if (map) {
          map.flyToBounds(bounds);
          // clears legend pane (improve this)
          document.getElementsByClassName("button-class")[0].click();
        } else {
          // set initial map bounds
          setBounds(bounds);
          console.log("initial bounds set")
        }
        // set riverdata when received from api
        setData(receivedData);
        console.log("data set")
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

  // prevents map from loading before data/bounds are found, displays loading spinner
  if (!bounds) {
    return (
      // center spinner in middle of screen
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          {/* added for accessibility */}
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="pt-2">Loading   .  . .</p>
      </div>
    );
  }

  return (
    // sets max bounds of map, zoom level, zoom controls on/off, map bounds, map height
    <MapContainer
      preferCanvas={true}
      maxBounds={[
        [24.58, -125.68],
        [49.58, -66.48],
      ]}
      zoom={14}
      zoomControl={isMobile}
      fullscreenControl={isMobile}
      bounds={bounds}
      whenCreated={setMap}
    >
      {/* container for dropdown box, topleft for mobile */}
      <MapCustomControl position={isMobile? "bottomleft" : "topleft"}>
        <Dropdown riverID={riverID} setRiverID={setRiverID} />
      </MapCustomControl>
      {/* sets layers control box to be collapsed if mobile */}
      <LayersControl bubblingMouseEvents={false} collapsed={!isMobile}>
        {/* adds layers to map */}
        <Layers />
        {/* adds components to monitoring stations overlay group */}
        <Overlay name="Monitoring Stations" checked={true}>
          {/* {stationData && <Stations station={stationData} />} */}
        </Overlay>
        {/* adds components to navigation overlay group */}
        <Overlay name="Navigation Overlay" checked={true}>
          {/* creates feature group organization for components */}
          <FeatureGroup ref={featureGroupRef}>
            <River data={data} setMarkers={setMarkers} />
            <Markers markers={markers}></Markers>
            {/* <DistanceLine data={data} addMeasurement={addMeasurement} markers={markers}></DistanceLine> */}
            <Distances setMeasurements={setMeasurements} data={data} markers={markers}></Distances>
          </FeatureGroup>
          {/* distance measurement legend */}
          <Legend
            resetMarkers={resetMarkers}
            featureGroupRef={featureGroupRef}
            map={map}
          />
        </Overlay>
      </LayersControl>
    </MapContainer>
  );
}

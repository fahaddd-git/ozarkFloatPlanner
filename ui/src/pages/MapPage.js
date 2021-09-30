import React, { useState, useEffect, useRef } from "react";
import { MapContainer, LayersControl, FeatureGroup } from "react-leaflet";
import bbox from "@turf/bbox";
import { Browser } from "leaflet";
//fullscreen leaflet imports
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
// core leaflet imports
import "leaflet/dist/leaflet.css";
// component imports
import Layers from "../components/Layers";
import River from "../components/River";
import Markers from "../components/Markers";
import DistanceLine from "../components/DistanceLine.js";
import Legend from "../components/Legend";
import Dropdown from "../components/Dropdown";
import MapCustomControl from "../utils/MapCustomControl.jsx";

const { BaseLayer, Overlay } = LayersControl;

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState();
  const [bounds, setBounds] = useState(null);
  const [isMobile, setMobile] = useState(true);

  // sets default river by ID
  const [riverID, setRiverID] = useState("615265d7f7d6c9405d5cf61a");

  // resets markers
  const resetMarkers = () => {
    setMarkers([]);
  };

  // ref to <FeatureGroup>
  const featureGroupRef = useRef();

  useEffect(() => {
    // determines if mobile user
    const determineMobile = () => {
      if (Browser.mobile) {
        return false;
      }
      return true;
    };
    // sets mobile state to be T or F
    setMobile(determineMobile());
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
    // fetches the data async from the api async
    const getData = async () => {
      const response = await fetch(`/riverbed/${riverID}`);
      const data = await response.json();
      return data;
    };

    getData()
      .then((receivedData) => {
        // calculates bounding box
        let abortController = new AbortController();
        const bboxArray = bbox(receivedData);
        const corner1 = [bboxArray[1], bboxArray[0]];
        const corner2 = [bboxArray[3], bboxArray[2]];
        const bounds = [corner2, corner1];
        // map set, initial loading complete fly to next selected river
        if (map) {
          map.flyToBounds(bounds);
          // clears legend pane
          document.getElementsByClassName("button-class")[0].click();
        } else {
          // set initial bounds
          setBounds(bounds);
        }
        // set data when received from api
        setData(receivedData);

        // cleanup useEffect
        return () => {
          abortController.abort();
        };
      })
      .catch((error) => console.log("error"));
  }, [riverID]);

  // prevents map from loading before data/bounds are found
  if (!bounds) {
    return <>Loading...</>;
  }

  return (
    // sets max bounds of map, zoom level, zoom controls on/off, map bounds, map heigh
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
      style={{ height: " 100vh", width: "100vw" }}
      whenCreated={setMap}
    >
      {/* container for dropdown box */}
      <MapCustomControl position={"bottomleft"}>
        <Dropdown riverID={riverID} setRiverID={setRiverID} />
      </MapCustomControl>
      {/* sets layers control box to be collapsed if mobile */}
      <LayersControl bubblingMouseEvents={false} collapsed={!isMobile}>
        {/* adds layers to map */}
        <Layers />
        {/* adds components to navigation overlay group */}
        <Overlay name="Navigation Overlay" checked={true}>
          {/* creates feature group organization for components */}
          <FeatureGroup ref={featureGroupRef}>
            <River data={data} markers={markers} setMarkers={setMarkers} />
            <Markers markers={markers}></Markers>
            <DistanceLine data={data} markers={markers}></DistanceLine>
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

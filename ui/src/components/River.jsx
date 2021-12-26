import React, { useState } from "react";
import GeojsonUpdates from "./GeojsonUpdates";
import { canvas } from "leaflet";

/**
 * Draws riverbed on the map
 * @param {GeoJSON}  data        GeoJson LineString of riverbed points
 * @param {Array}    markers     User Selected markers in the form [lat,lng]
 * @param {Function} setMarkers  State setter for user selected markers
 * @returns  <GeoJsonWithUpdates/>
 */

export default function River({ data, setMarkers }) {
  // could potentially put Markers in here
  // click delay handler to fix bug with double click on iOS
  let [lastClick, setLastClick] = useState(0);
  let delay = 200;

  // data not null, return the geojson component
  // if (data) {
    return (
      <GeojsonUpdates
        pathOptions={{ color: "#00daf2", weight: 5, opacity: .99 }}
        data={data}
        bubblingMouseEvents={false}
        eventHandlers={{
          click: (e) => {       
            // prevents double click of polyline
            if (lastClick >= Date.now() - delay) {
              return;
            } else {
              setLastClick(Date.now());
            }
            // update state of markers
            console.log("markers state set in River")
            setMarkers(oldMarkers=> [...oldMarkers, e.latlng])
            
          },
        }}
      />
    );
  } 

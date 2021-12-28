import { useState } from "react";
import GeojsonUpdates from "../utils/GeojsonUpdates";
import { useMapEvents } from "react-leaflet";
import { Browser } from "leaflet";

/**
 * Draws riverbed on the map
 * @param {GeoJSON}  data        GeoJson LineString of riverbed points
 * @param {Array}    markers     User Selected markers in the form [lat,lng]
 * @param {Function} setMarkers  State setter for user selected markers
 * @returns  <GeoJsonWithUpdates/>
 */

export default function River({ data, setMarkers }) {
  // click delay handler to fix bug with double click on iOS
  let [lastClick, setLastClick] = useState(0);
  let delay = 200;

  // disables click on River line when zooming in (mobile)
  function DisableClickOnZoom() {
    useMapEvents({
      zoomstart: (e) => {
        document.getElementsByTagName("body")[0].style.pointerEvents="none"
      },
      zoomend: (e) =>{
        document.getElementsByTagName("body")[0].style.pointerEvents="auto"
      }
    })
    return null}

  // data not null, return the geojson component
    return (
      <>
      {Browser.mobile? <DisableClickOnZoom/> : null}
      <GeojsonUpdates
        pathOptions={{ color: "#00daf2", weight: 5, opacity: .99 }}
        data={data}
        // bubblingMouseEvents={false}
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
      </>
    );
  } 

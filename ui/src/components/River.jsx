import { memo, useState } from "react";
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

// disables ability to click River on touch screen two finger zoom
function DisableClickOnZoom() {
  let body= document.querySelector("body")
  useMapEvents({
    zoomstart: () => {
      body.style.pointerEvents = "none";
    },
    zoomend: () => {
      body.style.pointerEvents = "auto";
    },
  });
  return null;
}

function River({ data, setMarkers }) {
  // click delay handler to fix bug with double click on iOS
  let [lastClick, setLastClick] = useState(0);
  let delay = 200;

  // disables click on River line when zooming in (mobile)
  

  // data not null, return the geojson component
  return (
    <>
      {Browser.mobile ? <DisableClickOnZoom /> : null}
      <GeojsonUpdates
        pathOptions={{ color: "#00daf2", weight: 5 }}
        data={data}
        // bubblingMouseEvents={false}
        eventHandlers={{
          click: (e) => {
            // prevents double click of polyline
            // if (lastClick >= Date.now() - delay) {
            //   return;
            // } else {
            //   setLastClick(Date.now());
            // }
            // update state of markers
            setMarkers((oldMarkers) => [...oldMarkers, e.latlng]);
          },
        }}
      />
    </>
  );
}

export default memo(River)
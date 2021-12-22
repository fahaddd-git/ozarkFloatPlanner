import React from "react";
import { useMap } from "react-leaflet";
import lineSlice from "@turf/line-slice";
import length from "@turf/length";

import GeoJsonWithUpdates from "./GeojsonUpdates";
import Measurements from "./Measurements";

/**
 * Draws multiple riverbed subsection on the map and calculates distance
 * @param {GeoJSON} data      GeoJson LineString of riverbed points
 * @param {Array}   markers   User Selected markers in the form [lat,lng]
 * @param {Number}  index     Current index of marker in markers array
 * @returns  <GeoJsonWithUpdates pathOptions={ {color: "red", weight:6 , opacity:.7} } key= {start} data={slice}>
                <Measurements map={ map } distance= { travelDistance }></Measurements>
            </GeoJsonWithUpdates>
 */

export default function DrawDistance({ data, markers, index }) {
  const map = useMap();
  // determine start and end points of line subsection
  const start = [markers[index].lng, markers[index].lat];
  const end = [markers[index + 1].lng, markers[index + 1].lat];
  // create slice of data from start to end
  const slice = lineSlice(start, end, data);
  // calculate distance along river between start and end
  let travelDistance = length(slice, { units: "miles" });

  return (
    <GeoJsonWithUpdates
      pathOptions={{ color: "red", weight: 6, opacity: 0.7 }}
      key={start}
      data={slice}
    >
      <Measurements map={map} distance={travelDistance}></Measurements>
    </GeoJsonWithUpdates>
  );
}

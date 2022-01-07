import React , {useEffect} from "react";
import { useMap } from "react-leaflet";
import lineSlice from "@turf/line-slice";
import length from "@turf/length";

import GeoJsonWithUpdates from "../utils/GeojsonUpdates";
import Measurements from "./Measurements";
import DistanceTable from "./DistanceTable";

/**
 * Draws multiple riverbed subsection on the map and calculates distance
 * @param {GeoJSON} data      GeoJson LineString of riverbed points
 * @param {Array}   markers   User Selected markers in the form [lat,lng]
 * @param {Number}  index     Current index of marker in markers array
 * @returns  <GeoJsonWithUpdates pathOptions={ {color: "red", weight:6 , opacity:.7} } key= {start} data={slice}>
                <Measurements map={ map } distance= { travelDistance }></Measurements>
            </GeoJsonWithUpdates>
 */

export default function DrawDistance({ data, addMeasurement, markers, index }) {
  const map = useMap();
  // determine start and end points of line subsection
  const start = [markers[index].lng, markers[index].lat];
  const end = [markers[index + 1].lng, markers[index + 1].lat];
  // create slice of data from start to end
  const slice = lineSlice(start, end, data);
  // calculate distance along river between start and end
  let travelDistance = length(slice, { units: "miles" });

  // useEffect(() => {
  //   addMeasurement(travelDistance)

  // }, [travelDistance])
  // console.log("Measurement added in DrawDistance")


  return (
    <GeoJsonWithUpdates
      pathOptions={{ color: "red", weight: 6, opacity: 0.7 }}
      key={start}
      data={slice}
    >
      {/* <DistanceTable data={travelDistance}></DistanceTable> */}
      <Measurements map={map} distance={travelDistance}></Measurements>
    </GeoJsonWithUpdates>
  );
}

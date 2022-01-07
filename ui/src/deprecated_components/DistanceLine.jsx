import React, { useMemo } from "react";
import DrawDistance from "./DrawDistance";

/**
 * Renders <DrawDistance> component indicating selected distance on map
 * @param {GeoJSON} data      GeoJson LineString of riverbed points
 * @param {Array} markers     User Selected markers in the form [lat,lng]
 * @returns <DrawDistance key={position.lng} data={data} markers= {markers} index={index}>
 */

export default function DistanceLine({ data, addMeasurement, markers }) {
  const markersLength = markers.length;

  const riverDistance = useMemo(() => {
    // at least 2 points exist therefore draw a line between them
    if (markersLength >= 2) {
      // create lines between points 2 at a time until last point reached
      return markers.map((position, index) => {
        if (index < markersLength - 1) {
          
          return (
            <DrawDistance
              key={index}
              data={data}
              markers={markers}
              index={index}
              addMeasurement={addMeasurement}
            ></DrawDistance>
          );
        }
      });
    }
  }, [markers, data, markersLength]);

  return <>{riverDistance}</>;
}

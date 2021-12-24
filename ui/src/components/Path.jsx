import React, { useMemo } from "react";
import GeoJsonWithUpdates from "./GeojsonUpdates";

export default function Path({ slice }) {
  console.log(slice.length);
  return(
  useMemo(
    () =>
      slice.map((arr, index) => {
        return (
          <GeoJsonWithUpdates
            pathOptions={{ color: "red", weight: 6, opacity: 0.7 }}
            key={index}
            data={arr}
          />
        );
      }),
    [slice]
  )
  )
}

import React, { memo, useMemo } from "react";
import GeoJsonWithUpdates from "../utils/GeojsonUpdates";

function Path({ slice }) {
  console.log(slice.length);
  return(
//   useMemo(
//     () =>
      slice.map((arr, index) => {
        return (
          <GeoJsonWithUpdates
            pathOptions={{ color: "red", weight: 6, opacity: 0.7 }}
            key={index}
            data={arr}
          />
        );
      })
    // [slice]
  )
    }
// }


export default memo(Path)
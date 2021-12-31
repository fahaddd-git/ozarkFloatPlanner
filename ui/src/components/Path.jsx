import { memo } from "react";
import GeoJsonWithUpdates from "../utils/GeojsonUpdates";

function Path({ slice }) {
  return slice.map((arr, index) => {
    return (
      <GeoJsonWithUpdates
        pathOptions={{ color: "red", weight: 6, opacity: 0.7 }}
        key={index}
        data={arr}
        // changes color of polyline (future implementation use)
        // eventHandlers={{
        //   mouseover: (e) => {
        //     e.layer.setStyle({color:"blue"})
        //   },
        //   mouseout: (e)=>{
        //     e.layer.setStyle({color:"red"})
        //   }
        // }}
      />
    );
  });
}

export default memo(Path);

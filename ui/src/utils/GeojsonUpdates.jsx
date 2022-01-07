import { useEffect, useRef } from "react";
import { GeoJSON } from "react-leaflet";

/**
 * Wrapper for GeoJson Leaflet component that supports updates to data
 * @param {Objects}
 * @returns <GeoJSON {...props} ref={geoJsonLayerRef} />
 */

 export default function GeoJsonWithUpdates(props) {
  const geoJsonLayerRef = useRef(null);

  useEffect(() => {
    // set ref to current layer
    const layer = geoJsonLayerRef.current;
    if (layer) {
      layer.clearLayers().addData(props.data);
      // clearLayers() seems to remove the `pathOptions`, `style` and `interactive` prop as well
      // Reset path options
      if (props.pathOptions) {
        layer.setStyle(props.pathOptions);
      } else if (props.style) {
        layer.setStyle(props.style);
      }
    }
  }, [geoJsonLayerRef, props.data, props.pathOptions, props.style]);

  return <GeoJSON {...props} ref={geoJsonLayerRef} />;
}


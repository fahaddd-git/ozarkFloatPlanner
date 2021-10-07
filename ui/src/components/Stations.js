import React, { useCallback, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import MarkerPopup from "./MarkerPopup";

// import bugged marker shadow
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import GeoJsonWithUpdates from "./GeojsonUpdates";

// set the default icon
let DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

/**
 * Creates marker components on riverbed on user click with popup containing lat/lng coordinates
 * @param {Array} stations Array of stations
 * @returns <Marker>
 *             <Popup/>
 *          </Marker
 */

export default function Stations({ station }) {
  let siteMonitoringPointsStyle = {
    radius: 10,
    fillColor: "#5e0404",
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // console.log(station)

  const pointToLayer = (data, latlng) => {
    console.log(data);
    return L.circleMarker(latlng);
  };

  const onEachFeature = (feature, layer) => {
    console.log(feature);
    const popupContent = ReactDOMServer.renderToString(
      <MarkerPopup feature={feature} />
    );
    layer.bindPopup(popupContent);
    // layer.bindPopup(`${feature.properties.uri}`)
    layer.on("mouseover", function (e) {
      layer.openPopup();
      // layer.bringToFront()
    });
    layer.on("mouseout", function (e) {
      layer.bringToBack();
      sleep(1000).then(() => layer.closePopup());
    });
    layer.on("add", function (e) {
        layer.bringToBack();
        
      });
  };

  return (
    <GeoJsonWithUpdates
      key={station.latlng}
      data={station}
      onEachFeature={onEachFeature}
      style={siteMonitoringPointsStyle}
      pointToLayer={pointToLayer}
    />
  );
}

import React from "react";
import { Marker, Popup } from "react-leaflet";

// set the default marker icon due to bug with Leaflet

import { icon } from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
// L.Marker.prototype.options.icon = DefaultIcon;

/**
 * Creates marker components on riverbed on user click with popup containing lat/lng coordinates
 * @param {Array} markers Array of user selected markers
 * @returns <Marker>
 *             <Popup/>
 *          </Marker
 */

export default function Markers({ markers }) {
  if (markers.length > 0) {
    return markers.map((position, id) => (
      // create markers with popups
      <Marker
        icon={DefaultIcon}
        key={id}
        position={position}
        eventHandlers={{
          // open popup on mouseover
          mouseover: (e) => {
            e.target.openPopup();
          },
          // close popup on mouseout
          mouseout: (e) => {
            e.target.closePopup();
          },
        }}
      >
        <Popup>{`${position.lat},${position.lng}`}</Popup>
      </Marker>
    ));
  }
  return null;
}

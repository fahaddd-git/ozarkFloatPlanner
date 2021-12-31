import { Marker, Popup } from "react-leaflet";
import { round } from "@turf/helpers";

// set the default marker icon due to bug with Leaflet

import { icon } from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Popover } from "react-bootstrap";
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

export default function Markers({ markers, measurements }) {
  return markers.map((position, id) => (
    // create markers with popups
    <Marker
      icon={DefaultIcon}
      key={id}
      position={position}
      eventHandlers={{
        // open popup on mouseover, close on mouseout
        mouseover: (e) => {
          e.target.openPopup();
        },
        // close popup on mouseout
        mouseout: (e) => {
          e.target.closePopup();
        },
      }}
    >
      {/* Popup component expects text nodes and html nodes.  React complains about not closing <br> tag */}
      <Popup>
        <Popover.Header className="text-center p-1">
          Point {id + 1}
        </Popover.Header>
        <Popover.Body className="p-2">
          Latitude:&nbsp; &nbsp;&nbsp; {round(position.lat, 3)}
          <br></br>
          Longitude: {round(position.lng, 3)}
          <br></br>
          {/* find the distance since previous point */}
          <p className="text-muted text-center m-0 p-0">
            {id === 0 ? null : round(measurements[id - 1], 2) + " mi segment"}
          </p>
          {/* find the running total of distance */}
          <p className="text-muted text-center m-0 p-0">
            {id === 0
              ? "Put In"
              : round(
                  measurements.slice(0, id).reduce((total, value) => {
                    return (total += value);
                  }, 0),
                  2
                ) + " mi traveled"}
          </p>
        </Popover.Body>
      </Popup>
    </Marker>
  ));
}

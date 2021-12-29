import { Marker, Popup } from "react-leaflet";
import { round } from "@turf/helpers";

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
  // let clickCount=0
  // if (markers.length > 0) {
    return markers.map((position, id) => (
      // create markers with popups
      <Marker
        icon={DefaultIcon}
        key={id}
        position={position}
        eventHandlers={{
          // click:(e)=>{
          //   clickCount++;
          //   if (clickCount > 1){
          //     clickCount=0
          //     return false
          //   }
          //   console.log(e)
          //   e.target.openPopup()
            
          // },

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
        <Popup>{`${round(position.lat,3)}, ${round(position.lng,3)}`}</Popup>
      </Marker>
    ));
  // }
  // return null;
}

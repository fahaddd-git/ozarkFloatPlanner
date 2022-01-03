// River monitoring stations- TO BE IMPLEMENTED

import React, {useRef, memo } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import { round } from "@turf/helpers";


// import bugged marker shadow
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import GeoJsonWithUpdates from "../utils/GeojsonUpdates"
import MarkerPopup from "./MarkerPopup";
import { CircleMarker, Marker, Popup, Tooltip } from "react-leaflet";
import { Button, Popover } from "react-bootstrap";
// // set the default icon
// let DefaultIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: iconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

/**
 * Creates marker components on riverbed on user click with popup containing lat/lng coordinates
 * @param {Array} stationData Array of stations
 * @returns <Marker>
 *             <Popup/>
 *          </Marker
 */

function Stations({ stationData, setMarkers }) {
  const siteMonitoringPointsStyle = {
    radius: 10,
    fillColor: "#5e0404",
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 1,
    // popupAnchor: [-100,-10],
    // zindex: 2
  };
return stationData.features.map((feature, id)=>{
    const featureLocation = {lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0]}
    return <CircleMarker pathOptions={siteMonitoringPointsStyle} key={id} center={featureLocation} eventHandlers={{
      click:(e)=>{
        // setMarkers((oldMarkers) => [...oldMarkers, e.latlng]);

      },
      mouseover:(e)=>{
        e.target.openPopup()
      },
      mouseout: (e)=>{
        m(e)
      }
    }}>
      <Popup >
      <Popover.Header style={{width:"8rem", fontSize:"12px"}} className="text-center p-1 text-wrap">
          {feature.properties.name}
        </Popover.Header>
        <Popover.Body className="p-2">
          Latitude:&nbsp; &nbsp;&nbsp; {round(featureLocation.lat, 3)}
          <br></br>
          Longitude: {round(featureLocation.lng, 3)}
          <br></br>
          {/* find the distance since previous point */}
          {/* <p className="text-muted text-center m-0 p-0">
            {id === 0 ? null : round(measurements[id - 1], 2) + " mi segment"}
          </p> */}
          {/* find the running total of distance */}
          {/* <p className="text-muted text-center m-0 p-0">
            {id === 0
              ? "Put In"
              : round(
                  measurements.slice(0, id).reduce((total, value) => {
                    return (total += value);
                  }, 0),
                  2
                ) + " mi traveled"}
          </p> */}
          <Button size="sm" className="mx-auto" onClick={(e)=>{
            console.log(e)
              setMarkers((oldMarkers) => [...oldMarkers, featureLocation]);
          }}>
            Add Waypoint
          </Button>
        </Popover.Body>
      </Popup>
       

      </CircleMarker>
  })
  // return null
// console.log(stationData)
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function m(e){
    await sleep(2000)
    e.target.closePopup()
  }
  // console.log(station)



//   const onEachFeature = (feature, layer) => {
//     console.log(feature);
//     const popupContent = ReactDOMServer.renderToString(
//       <MarkerPopup feature={feature} />
//     );
//     layer.bindPopup(popupContent);
//     // layer.bindPopup(`${feature.properties.uri}`)
//     layer.on("mouseover", function (e) {
//       layer.openPopup();
//       layer.bringToFront()
//     });
//     layer.on("mouseout", function (e) {
//       layer.bringToBack();
//       sleep(1000).then(() => layer.closePopup());
//     });
//     layer.on("add", function (e) {
//         layer.bringToBack();
        
//       });
//   };

// return (
//     <GeoJsonWithUpdates
//     // use lodash for key
//         key={stationData.latlng}
//         data={stationData}
//         // onEachFeature={(feature, layer)=>{

//         // }}
//         style={siteMonitoringPointsStyle}
//         pointToLayer={(data, latlng)=>{
//             // console.log(data)
//             // let newMarker= L.circleMarker(latlng)
//             // newMarker.bindPopup(latlng.toString())
//             let newicon= L.divIcon({
//             iconSize:null,
//             html:'<div class="map-label"><div class="map-label-content">'+data.properties.name+'</div><div class="map-label-arrow"></div></div>'
//         //     html: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
//         //     <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
//         //   </svg>`
//           });
//              return L.marker(latlng, {icon:newicon})
//             // return (<Marker position={latlng}></Marker>)
            
//         }}
//       />
//     );
   


}

export default memo(Stations)
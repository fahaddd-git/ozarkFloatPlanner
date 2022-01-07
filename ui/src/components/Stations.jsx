// River monitoring stations- TO BE IMPLEMENTED

import React, { memo } from "react";
import { round } from "@turf/helpers";
import { CircleMarker, Popup } from "react-leaflet";
import { Button, Popover } from "react-bootstrap";
// import bugged marker shadow
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
    fillColor: "#198754",
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  };

return stationData.map((feature, id)=>{
    const featureLocation = {lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0]}
    let mouseoverEvent;
    return <CircleMarker pathOptions={siteMonitoringPointsStyle} key={id} center={featureLocation} eventHandlers={{
      click:(e)=>{
        e.target.openPopup()

      },
      mouseover:(e)=>{
        mouseoverEvent=e
        e.target.openPopup()
      },
      // mouseout: (e)=>{
      //   m(e)
      // }
    }}>
      <Popup>
      <Popover.Header className="text-center px-2 fw-bold text-wrap popover-header-monitoring-stations">
          {feature.properties.name}
        </Popover.Header>
        <Popover.Body className="p-2 text-center">
          <p className=" mt-0 mb-1 text-muted">Monitoring Station</p>
          <Button size="sm" variant="danger" className="btn-mini mb-1" onClick={()=>{
            window.open(feature.properties.uri, '_blank').focus();
            
          }}>Latest Conditions</Button>
          <br></br>
          Latitude:&nbsp; &nbsp;&nbsp; {round(featureLocation.lat, 3)}
          <br></br>
          Longitude: {round(featureLocation.lng, 3)}
          <br></br>

          <Button size="sm" className="mx-auto text-wrap btn-mini my-1" onClick={(e)=>{
            // mouseoverEvent.target.closePopup()
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
  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  // async function delayClosePopup(e){
  //   await sleep(2000)
  //   e.target.closePopup()
  // }
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
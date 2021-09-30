import { useEffect } from "react";
import {DomUtil, Browser, control} from "leaflet";
import "../../src/App.css";


/**
 * 
 * @param {Object}  featureGroupRef  useRef reference to the current FeatureGroup component
 * @param {Object}  map              useRef reference to the current map
 * @param {Function} resetMarkers    state setter function to reset the user selected markers array 
 * @returns 
 */

export default function Legend({ featureGroupRef, map , resetMarkers}) {

  // creates legend frame in bottom right of map
  const legend = control({ position: "bottomright" });



  useEffect(() => {
    if (map) {

      // behavior on adding legend to map
      legend.onAdd = () => {
      
        // creates html in the legend
       
        const div = DomUtil.create("table", "info legend");
        if (Browser.mobile){
          div.className="legend mobile"
        } 
       

        div.innerHTML += '<b>Distance</b>';
        const tableBody=DomUtil.create("tbody", "distanceTableBody", div)

        div.innerHTML += '<span id="totalDistance">Total: 0 miles</span><br>';
        // div.innerHTML += '<button type="button" id="clearButton">Clear</button>'
        let button = DomUtil.create("input", "button-class", div)

        button.type="button"
        button.title="Clear Markers"
        button.value="Reset"

        // click handler for reset button
        button.onclick=()=>{
          let currentLayers=featureGroupRef.current.getLayers()
          // River component always first layer
          let riverLayerId=currentLayers[0]._leaflet_id
            //clear layers except first
           
            featureGroupRef.current.eachLayer(function (layer) {
              if (layer._leaflet_id !== riverLayerId){
                featureGroupRef.current.removeLayer(layer)
              }

            legend.remove()
            legend.addTo(map)
            resetMarkers()
  
          })};
        let about = DomUtil.create("span", "about", div)
        about.innerHTML+='</br><a href="/about">About</a>'



          
          

        return div
       
      };
      
      
      // add/remove legend component
      legend.addTo(map);
      
      
    }
  }, [map]);
  return null;
}
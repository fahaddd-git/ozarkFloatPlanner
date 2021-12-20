import { useEffect } from "react";
import "../../src/App.css";

/**
 * Updates Legend component with current distance and total distance
 * @param {Number} distance calculated distance between two user selected points
 * @returns null
 */

function Measurements({ distance }) {

  useEffect(()=>{
    // round distance to 3 decimal places
    let roundedDistance= Math.round(distance * 1000) / 1000
    // add to table
    let legend=document.getElementsByClassName("distanceTableBody")
    let newRow=legend[0].insertRow(-1)
    let newData=document.createTextNode(roundedDistance)
    newRow.appendChild(newData)

    // get the old total distance
    let totalDistance=document.getElementById("totalDistance")
    let parentNode = totalDistance.parentNode
    // use regex to get the number distance
    let regex = /[+-]?\d+(\.\d+)?/g;
    let prevDistance= totalDistance.innerHTML.match(regex)
    prevDistance = Number(prevDistance[0])
    // calculate new rounded total
    let finalAnswer=Math.round((prevDistance+roundedDistance) * 1000) / 1000
  
    // replace old total with new total
    let clone = totalDistance.cloneNode()
    clone.innerHTML=`Total: ${finalAnswer} miles`
    parentNode.replaceChild(clone, totalDistance)
    
    
  }, [distance])

  return null;
}
export default Measurements
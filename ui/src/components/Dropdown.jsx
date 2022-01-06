import { useEffect, useState } from "react";
import { Browser } from "leaflet";
import { getRivers } from "../utils/callAPI";

/**
 * Dropdown menu which sets which river is selected and fetched from the server
 * @param {String}      riverID     Indicates which river is selected based on database ID
 * @param {Function}    setRiverID  Sets the river to be the selected ID
 * @returns
 */
export default function Dropdown({ riverName, setRiverName }) {
  //  available rivers in the database
  let [availableRivers, setAvailableRivers] = useState();
  // receives river from MapPage
  let [selectedRiver, setSelectedRiver] = useState(riverName);

  // fetches data from the server to determine contents of dropdown box
  useEffect(() => {
    let abortController = new AbortController();
    try { 
      getRivers().then((data)=>{
        console.log(data)
        setAvailableRivers(data)
      });
    } catch (error) {
      console.error(error);
    }

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <select
      className={
        Browser.mobile
          ? "form-select form-select-sm"
          : "form-select form-select-lg"
      }
      name="riverSelect"
      id="rivers"
      onChange={(e) => {
        // set selected river
        setSelectedRiver(e.target.value);
        //update map
        setRiverName(e.target.value);
      }}
      value={selectedRiver}
    >
      {availableRivers
        ? availableRivers.map((riverObj, index) => {
            return (
              <option key={index} value={riverObj.name}>
                {riverObj.name}
              </option>
            );
          })
        : null}
    </select>
  );
}

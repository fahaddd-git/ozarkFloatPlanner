import { useEffect } from "react";
import lineSlice from "@turf/line-slice";
import length from "@turf/length";

// calculates distance from previous marker
export default function Distances({
  setMeasurements,
  markers,
  data,
  setSlice,
}) {
  // let [distance, setDistance] = useState(null)
  useEffect(() => {
    // more than 1 marker exists
    if (markers.length > 1) {
      // calculate the start and end in the markers array
      const markersLength = markers.length;
      const start = [
        markers[markersLength - 2].lng,
        markers[markersLength - 2].lat,
      ];
      const end = [
        markers[markersLength - 1].lng,
        markers[markersLength - 1].lat,
      ];
      // create slice of data from start to end
      const slice = lineSlice(start, end, data);
      // calculate distance along river between start and end
      let travelDistance = length(slice, { units: "miles" });
      // update the states
      setMeasurements((oldMeasurements) => [
        ...oldMeasurements,
        travelDistance,
      ]);
      setSlice((oldSlice) => [...oldSlice, slice]);
      console.log("rerender");
    } else {
      return null;
    }
  }, [markers, data]);

  return (null);
}

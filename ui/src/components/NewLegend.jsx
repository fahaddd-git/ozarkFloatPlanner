import React, { memo } from "react";
import { Table, Button, Container, NavLink } from "react-bootstrap";
import { round } from "@turf/helpers";
import {Browser} from 'leaflet'

function NewLegend({
  measurements,
  setMarkers,
  featureGroupRef,
  setMeasurements,
  setSlice
}) {
  console.log(measurements);

  return (
    <Container id="newLegend" className="text-center mb-3 vstack mx-auto" >
        <b>Distances</b>
      <Table className="mb-2" size="sm" striped variant="primary">
        <tbody>
          {/* <tr className="mt-1">
            <td>Distance</td>
          </tr> */}
          {/* avoid issue with text node by rendering <tr> and <td> */}
          {measurements===[]? null : measurements.map((measurement, index) => {
            return (
              <tr key={index + 1}>
                <td className="text-muted" key={index}>{round(measurement, 2)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
      id="resetButton"
      size={Browser.mobile? "sm" : "md"}
        className="mb-0"
        onClick={() => {
          let currentLayers = featureGroupRef.current.getLayers();
          // River component always first layer
          let riverLayerId = currentLayers[0]._leaflet_id;
          //clear layers except first

          featureGroupRef.current.eachLayer(function (layer) {
            if (layer._leaflet_id !== riverLayerId) {
              featureGroupRef.current.removeLayer(layer);
            }
                        //   layer._leaflet_id !== riverLayerId ? featureGroupRef.current.removeLayer(layer) : null

            // setMarkers([]);
            // setMeasurements([])
            // setSlice([])
          });
          setMarkers([]);
          setMeasurements([])
          setSlice([])
        }
    }
      >Reset</Button>
      <a id="aboutLink" className="mx-auto p-0" href="/about">About</a>
      
    </Container>
  );
}

export default memo(NewLegend)
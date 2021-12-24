import React, { useEffect } from "react";
import { Table, Button, Container, Row } from "react-bootstrap";
import {round} from "@turf/helpers"

export default function NewLegend({
  measurements,
  resetMarkers,
  featureGroupRef,
}) {
  console.log(measurements);

  return (
    <div className="v-stack text-center">
      <Table className="position-relative" size="sm" striped variant="success">
        <tbody>
          <tr>
            <td>Distance</td>
          </tr>
          {/* avoid issue with text node by rendering <tr> and <td> */}
          {measurements.map((measurement, index) => {
            return (
              <tr key={index+1}>
                <td key={index}>{round(measurement, 2)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button className="mb-4" onClick={resetMarkers}>
        Reset
      </Button>
    </div>
  );
}

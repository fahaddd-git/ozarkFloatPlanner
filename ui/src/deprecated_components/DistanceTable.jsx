import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

export default function DistanceTable({ distances }) {
  let [measurements, setMeasurements] = useState([]);
  console.log(distances)
// update the state
// useEffect(() => {
//     setMeasurements(oldMeasurements=>[...oldMeasurements, distances])

// }, [distances])



  return (
    <>
      <Table responsive>
        <thead>
          {measurements.map((measurement, index) => {
            return <tr>{measurement}</tr>
          })}
        </thead>
      </Table>
      <Button>Reset</Button>
    </>
  );
}

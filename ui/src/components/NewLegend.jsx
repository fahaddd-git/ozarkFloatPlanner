import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";

export default function NewLegend({
  measurements,
  resetMarkers,
  featureGroupRef,
}) {
  console.log(measurements);

  return (<>
     <Table/>
     <Button className="mb-4" onClick={resetMarkers}>Reset</Button>
     </>
  );
}

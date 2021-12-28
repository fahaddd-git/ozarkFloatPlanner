import React, { memo, useState } from "react";
import { Table, Button, Container, NavLink, Modal } from "react-bootstrap";
import { round } from "@turf/helpers";
import { Browser } from "leaflet";
import InstructionsModal from "./InstructionsModal";

function NewLegend({
  measurements,
  setMarkers,
  featureGroupRef,
  setMeasurements,
  setSlice,
}) {
  console.log(measurements);
  const [showModal, setShowModal] = useState(true);
  console.log(showModal);

  return (
    <Container id="legend" className="text-center mb-3 vstack mx-auto">
      <h6 className="mt-2">Distance</h6>
      <Table
        className="mb-2"
        size={Browser.mobile ? "sm" : "lg"}
        striped
        variant="light"
      >
        <tbody>
          {/* <tr className="mt-1">
            <td>Distance</td>
          </tr> */}
          {/* avoid issue with text node by rendering <tr> and <td> */}
          {measurements === []
            ? null
            : measurements.map((measurement, index) => {
                return (
                  <tr key={index + 1}>
                    <td className="fw-light" key={index}>
                      {round(measurement, 2)}
                    </td>
                  </tr>
                );
              })}
        </tbody>
        <tfoot>
          <tr>
            <td className="fw-normal">
              {measurements === []
                ? null
                : "Total: " +
                  round(
                    measurements.reduce((total, value) => {
                      return (total += value);
                    }, 0),
                    2
                  ) +
                  " mi"}{" "}
            </td>
          </tr>
        </tfoot>
      </Table>
      <Button
        variant="primary"
        id="resetButton"
        size={Browser.mobile ? "sm" : "md"}
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
          });
          setMarkers([]);
          setMeasurements([]);
          setSlice([]);
        }}
      >
        Reset
      </Button>

      <NavLink id="aboutLink" className="mx-auto py-0 my-0" href="/about">
        About
      </NavLink>
      <NavLink
        id="helpLink"
        className="mx-auto py-0 my-0 link-secondary"
        onClick={() => setShowModal(true)}
      >
        Help
      </NavLink>
      {/* Initial instructions/directions for how to use this tool */}
      {/* <InstructionsModal showModal={showModal} setShowModal={setShowModal} /> */}
    </Container>
  );
}

export default memo(NewLegend);

import { memo } from "react";
import {
  Offcanvas,
  Container,
  Row,
  Col,
  NavLink,
  Figure,
  Button,
} from "react-bootstrap";

// instructional gifs
import instructionsMarkers from "../images/instructionsMarkers.gif";
import instructionsRivers from "../images/instructionsRivers.gif";
import instructionsViews from "../images/instructionsViews.gif";

function InstructionsModal({ showModal, setShowModal }) {
  const imageWidth = "60%";
  return (
    <Offcanvas show={showModal} onHide={() => setShowModal(false)}>

      <Offcanvas.Header className="text-center pb-0" closeButton>
        <Offcanvas.Title className="w-100 fs-3">
          Ozark Float Planner
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column h-100">
        <Container id="offcanvasContainer">
          <Row>
            <Col>
              <h3 className="fs-5">Plan your next paddling adventure...</h3>
              <p>
                ...through the beautiful Missouri Ozarks. Click on the map or
                close this window to get started!
              </p>
            </Col>
          </Row>

          <Row>
            <Col className="vstack gap-2 text-center">
              <Figure>
                <Figure.Image
                  className="mx-auto"
                  src={instructionsMarkers}
                  width={imageWidth}
                ></Figure.Image>
                <Figure.Caption>
                  Click the line to measure distance
                </Figure.Caption>
              </Figure>

              <Figure>
                <Figure.Image
                  className="mx-auto"
                  src={instructionsRivers}
                  width={imageWidth}
                ></Figure.Image>
                <Figure.Caption>
                  Select a river using the dropdown menu
                </Figure.Caption>
              </Figure>

              <Figure>
                <Figure.Image
                  className="mx-auto"
                  src={instructionsViews}
                  width={imageWidth}
                ></Figure.Image>
                <Figure.Caption>
                  Change the map view and overlays
                </Figure.Caption>
              </Figure>
            </Col>
          </Row>
        </Container>

        {/* footer */}
        <Button
          className="mx-auto"
          // variant="success"
          id="closeButton"
          onClick={() => setShowModal(false)}
        >
          Close
        </Button>
        <NavLink className="text-center" href="/about">
          About
        </NavLink>
        <Figure.Caption className="text-muted text-center">
          &copy; 2021 by Fahad Awan
        </Figure.Caption>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default memo(InstructionsModal)
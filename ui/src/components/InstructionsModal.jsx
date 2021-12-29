import {
  Offcanvas,
  Container,
  Row,
  Col,
  NavLink,
  Figure,
  Button
} from "react-bootstrap";
import instructionsMarkers from "../images/instructionsMarkers.gif";
import instructionsRivers from "../images/instructionsRivers.gif";
import instructionsViews from "../images/instructionsViews.gif";
export default function InstructionsModal({ showModal, setShowModal }) {
  const imageWidth = "60%";

  return (
    <Offcanvas show={showModal} onHide={() => setShowModal(false)}>
      <Offcanvas.Header className="text-center pb-1" closeButton>
        <Offcanvas.Title className="w-100 fs-3">Ozark Float Planner</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column h-100">
        <Container id="containerID">
          <Row>
            <Col>
              <h3 className="fs-5">Plan your next adventure . . .</h3>
              <p>through the beautiful Missouri Ozarks.</p>
            </Col>
          </Row>
          <Row>
            <Col className="vstack gap-2 text-center">
              <Figure>
                <Figure.Image
                  className="mx-auto"
                  src={instructionsMarkers}
                  width={imageWidth}
                  // style={{ width: "70%", height: "auto" }}
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
                  // style={{ width: "70%", height: "auto" }}
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
                <Figure.Caption>Change map views and overlays</Figure.Caption>
              </Figure>
            </Col>
          </Row>
        </Container>

      <Button id="closeButton" className="mx-auto" onClick={()=>setShowModal(false)}>Close</Button>
        <NavLink className="text-center" href="/about">
          About
        </NavLink>
        <Figure.Caption className="text-muted text-center">&copy; 2021 by Fahad Awan</Figure.Caption>

      </Offcanvas.Body>
    </Offcanvas>
  );
}

import { useState } from "react";

import { Container, Button, Card, Col, Row, Modal } from "react-bootstrap";
import smallmouthPic from "../images/optimized/smallmouth.jpg";
import canoeingPic from "../images/optimized/canoeing.jpg";

import cavePic from "../images/optimized/cave.jpg";
import groupPic from "../images/optimized/group.jpg";
import springPic from "../images/optimized/spring.jpg";
import riverPic from "../images/optimized/river.jpg";

import "../App.css";

export default function AboutPage() {
  const emailAddress = "ozarkfloatplanner@gmail.com";

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <h1 className="text-center m-3">About</h1>
      <Container className="d-flex justify-content-center text-center pb-5">
        <Row xs={1} sm={2} md={2} lg={3}>
          <Col className="py-3">
            <Card border="success" className="mx-auto h-100">
              <Card.Header className="mb-2">
                <Card.Title>Purpose</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src={springPic} />

              <Card.Body className="d-flex flex-column">
                <Card.Text>
                  Part of a safe river adventure is having an plan of distances to
                  be covered each day on the river. The purpose of this tool is
                  to facilitate planning your next awesome Ozark adventure by accurately
                  measuring river miles. Get out there.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className="py-3">
            <Card border="success" className="mx-auto h-100">
              <Card.Header className="mb-2">
                <Card.Title>Creator</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src={smallmouthPic} />

              <Card.Body className="d-flex flex-column">
                <Card.Text>
                  Fahad Awan, Computer Science student and Ozarks
                  floating/fishing enthusiast. I'm looking for a job!
                </Card.Text>
                <Button
                  target="_top"
                  onClick={() => (window.location = `mailto:${emailAddress}`)}
                  variant="success"
                  className="mt-auto"
                >
                  Contact Me
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col className="py-3">
            <Card border="success" className="mx-auto h-100">
              <Card.Header className="mb-2">
                <Card.Title>Acknowledgements</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src={riverPic} />

              <Card.Body className="d-flex flex-column">
                <Card.Text>
                  Data and maps used for this tool are publicly available and
                  used courtesy of the U.S. Geological Survey.
                </Card.Text>
                <Button
                  className="mt-auto"
                  href="https://usgs.gov"
                  variant="success"
                >
                  Visit the USGS
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col className="py-3">
            <Card border="success" className="mx-auto h-100">
              <Card.Header className="mb-2">
                <Card.Title>Tools Used</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src={groupPic} />

              <Card.Body>
                <Card.Text>
                  This project is created with React, Express, NodeJS and
                  MongoDB. Libraries used are Turf.js, React Leaflet, and
                  Bootstrap.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className="py-3">
            <Card border="success" className="mx-auto h-100">
              <Card.Header className="mb-2">
                <Card.Title>Legal</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src={cavePic} />

              <Card.Body className="d-flex flex-column">
                <Card.Text>Legal agreement for using this software.</Card.Text>
                <Button
                  className="mt-auto"
                  variant="success"
                  onClick={()=>setShowModal(true)}
                >
                  {" "}
                  Read Agreement
                </Button>

                {/* Modal popup for legal agreement */}
                <Modal className="text-center" show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Legal Agreement</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
                    KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                    WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
                    OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                    OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                    OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>

          <Col className="py-3">
            <Card border="success" className="mx-auto h-100">
              <Card.Header className="mb-2">
                <Card.Title>Other Resources</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src={canoeingPic} />

              <Card.Body className="d-flex flex-column">
                <Card.Text>
                  The Missouri Department of Conservation website is another
                  fantastic resource for planning your outdoor adventures. Check
                  them out!
                </Card.Text>
                <Button
                  className="mt-auto"
                  href="https://mdc.mo.gov/"
                  variant="success"
                >
                  Visit the MDC
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* back button */}
      <Container className="text-center pb-2">
        <Button
        href="/"
          variant="outline-success mb-4"
          
        >
          Back
        </Button>
        <p className="text-muted">&copy; 2021 by Fahad Awan</p>
      </Container>
    </>
  );
}

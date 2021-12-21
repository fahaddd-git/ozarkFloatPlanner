import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Container, Button, Card, Col, Row, Modal } from "react-bootstrap";
import smallmouthPic from "../images/smallmouth.jpg";
import canoeingPic from "../images/canoeing.jpg";

import cavePic from "../images/cave.jpg";
import groupPic from "../images/group.jpg";
import springPic from "../images/spring.jpg";
import eaglePic from "../images/eagle.jpg";
import riverPic from "../images/river.jpg";

import "../App.css";

export default function AboutPage() {
  const emailAddress = "ozarkfloatplanner@gmail.com";
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                  Part of a safe float trip is to have an idea of distances to
                  be covered each day on the river. The purpose of this tool is
                  to facilitate planning awesome Ozark adventures by accurately
                  measuring river miles. Get out there!
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
                  This project was created with React, Express, NodeJS and
                  MongoDB. Libraries used were Turf.js, React Leaflet, and
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
                  onClick={handleShow}
                >
                  {" "}
                  Read Agreement
                </Button>

                {/* Modal popup for legal agreement */}
                <Modal className="text-center" show={show} onHide={handleClose}>
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
                  awesome resource for planning your outdoor adventures. Check
                  it out!
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
      <Container className="d-flex justify-content-center pb-5">
        <Button
          variant="outline-success"
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
        >
          Back
        </Button>
      </Container>
    </>
  );
}

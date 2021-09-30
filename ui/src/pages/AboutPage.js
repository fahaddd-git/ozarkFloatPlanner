import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import smallmouthPic from "../images/smallmouth.jpg";
import canoeingPic from "../images/canoeing.jpg";
import "../App.css";

export default function AboutPage() {
  const emailAddress = "ozarkfloatplanner@gmail.com";

  return (
    <div>
      <Container className="center-screen">
        <CardGroup>
          <Col md={1} lg={1}>
            <Col>
              <Card border="light" style={{ padding: "10px", width: "18rem" }}>
                <Card.Title style={{ fontSize: 40 }}>About</Card.Title>
              </Card>
            </Col>

            <Col>
              <Card
                border="success"
                style={{ padding: "10px", width: "18rem" }}
              >
                <Card.Img variant="top" src={smallmouthPic} />
                <Card.Body>
                  <Card.Title>Creator</Card.Title>
                  <Card.Text>
                    Fahad Awan, Computer Science student and Ozarks
                    floating/fishing enthusiast. I'm looking for a job!
                  </Card.Text>

                  <Button
                    target="_top"
                    onClick={() => (window.location = `mailto:${emailAddress}`)}
                    variant="success"
                  >
                    Contact Me
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{ padding: "10px", width: "18rem" }}
                border="success"
              >
                <Card.Img variant="top" src={canoeingPic} />
                <Card.Body>
                  <Card.Title>Acknowledgements</Card.Title>
                  <Card.Text>
                    Data and maps used for this tool are publicly available and
                    used courtesy of the U.S. Geological Survey.
                  </Card.Text>
                  <Button href="https://usgs.gov" variant="success">
                    Visit the USGS
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        </CardGroup>
      </Container>
    </div>
  );
}

import "./styles.scss";
import { forwardRef } from "react";
import { Row, Col } from "reactstrap";
import PortraitCard from "components/Frontend/PortraitCard";
const OrgChartSection = forwardRef(({}, myRef) => {
  return (
    <>
      <div className="orgchart-section" ref={myRef}>
        <div
          className="org-chart"
          style={{ maxWidth: "1300px", margin: "0 auto", padding: "5rem 1rem" }}
        >
          <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
            board of directors
          </h2>
          <Row className="justify-content-center">
            <Col lg={4} sm={6} xs={6} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={4} sm={6} xs={6} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={4} sm={6} xs={6} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={4} sm={6} xs={6} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={4} sm={6} xs={6} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={4} sm={6} xs={6} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={4} sm={6} xs={6} className="px-0">
              <PortraitCard />
            </Col>
          </Row>
        </div>
        <div
          className="org-chart"
          style={{ maxWidth: "1300px", margin: "0 auto", padding: "5rem 1rem" }}
        >
          <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
            Key officers
          </h2>
          <Row className="justify-content-center">
            <Col lg={3} sm={4} xs={4} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={3} sm={4} xs={4} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={3} sm={4} xs={4} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={3} sm={4} xs={4} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={3} sm={4} xs={4} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={3} sm={4} xs={4} className="px-0">
              <PortraitCard />
            </Col>
            <Col lg={3} sm={4} xs={4} className="px-0">
              <PortraitCard />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
});

export default OrgChartSection;

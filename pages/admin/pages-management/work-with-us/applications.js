import React from "react";

import { Col, Row, Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import InternshipApplicationComponentForm from "components/Forms/InternshipApplicationComponentForm/InternshipApplicationComponentForm";
function ApplicationsPage() {
  return (
    <>
      <AlternativeHeader name="Contact Us" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row>
          <Col>
            <InternshipApplicationComponentForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

ApplicationsPage.layout = Admin;

export default ApplicationsPage;

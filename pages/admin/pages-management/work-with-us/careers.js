import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import JobPostingComponentForm from "components/Forms/JobPostingComponentForm";

function CareersPage() {
  return (
    <>
      <AlternativeHeader name="Careers" parentName="Work with us" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="12" md="12">
            <JobPostingComponentForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

CareersPage.layout = Admin;

export default CareersPage;

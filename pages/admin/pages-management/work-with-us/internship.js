import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import InternshipHeroForm from "components/Forms/InternshipHeroForm";
import { HERO_INTERNSHIP } from "constants.js";

function InternshipPage() {
  return (
    <>
      <AlternativeHeader name="Careers" parentName="Work with us" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="12" md="12">
            <InternshipHeroForm
              formTitle="Topfold Management"
              location={HERO_INTERNSHIP}
              fields=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

InternshipPage.layout = Admin;

export default InternshipPage;

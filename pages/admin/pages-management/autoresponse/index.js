import React from "react";

import { Col, Row, Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import AutoResponseConfigComponentForm from "components/Forms/AutoResponseConfigComponentForm/AutoResponseConfigComponentForm";
import InquiryRecipientComponentForm from "components/Forms/InquiryRecipientComponentForm/InquiryRecipientComponentForm";

function AutoResponseConfigPage() {
  return (
    <>
      <AlternativeHeader name="Contact Us" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="4">
            <InquiryRecipientComponentForm />
          </Col>
          <Col className="card-wrapper" lg="8">
            <AutoResponseConfigComponentForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

AutoResponseConfigPage.layout = Admin;

export default AutoResponseConfigPage;

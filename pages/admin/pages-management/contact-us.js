import React from "react";

import { Col, Row, Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import InquiryComponentForm from "components/Forms/InquiryComponentForm/InquiryComponentForm";
import InquiryRecipientComponentForm from "components/Forms/InquiryRecipientComponentForm/InquiryRecipientComponentForm";
function ContactUs() {
  return (
    <>
      <AlternativeHeader name="Contact Us" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="4">
            <InquiryRecipientComponentForm />
          </Col>
          <Col lg="8">
            <InquiryComponentForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

ContactUs.layout = Admin;

export default ContactUs;

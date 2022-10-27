import React from "react";

import { Row, Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

function ContactUs() {
  return (
    <>
      <AlternativeHeader name="Contact Us" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
      <Row className="justify-content-center"></Row>
    </>
  );
}

ContactUs.layout = Admin;

export default ContactUs;

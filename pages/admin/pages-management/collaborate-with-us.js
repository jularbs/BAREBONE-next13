import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function CollaborateWithUs() {
  return (
    <>
      <CardsHeader name="Site Settings" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

CollaborateWithUs.layout = Admin;

export default CollaborateWithUs;

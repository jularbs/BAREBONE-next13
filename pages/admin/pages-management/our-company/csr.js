import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function CSR() {
  return (
    <>
      <CardsHeader name="Corporate Social Responsibility" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

CSR.layout = Admin;

export default CSR;

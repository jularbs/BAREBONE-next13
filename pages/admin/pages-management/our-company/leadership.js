import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function Leadership() {
  return (
    <>
      <CardsHeader name="Leadership" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

Leadership.layout = Admin;

export default Leadership;

import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function Radio() {
  return (
    <>
      <CardsHeader name="Radio" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

Radio.layout = Admin;

export default Radio;

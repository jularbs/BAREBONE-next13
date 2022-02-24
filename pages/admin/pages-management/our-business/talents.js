import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function Talents() {
  return (
    <>
      <CardsHeader name="Talents" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

Talents.layout = Admin;

export default Talents;

import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function Promos() {
  return (
    <>
      <CardsHeader name="Promos" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

Promos.layout = Admin;

export default Promos;

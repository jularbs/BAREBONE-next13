import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function History() {
  return (
    <>
      <CardsHeader name="History" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

History.layout = Admin;

export default History;

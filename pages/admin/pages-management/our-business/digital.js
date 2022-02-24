import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function Digital() {
  return (
    <>
      <CardsHeader name="Digital" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

Digital.layout = Admin;

export default Digital;

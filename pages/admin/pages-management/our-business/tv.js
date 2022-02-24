import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function TV() {
  return (
    <>
      <CardsHeader name="TV" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

TV.layout = Admin;

export default TV;

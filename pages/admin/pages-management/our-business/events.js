import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function Events() {
  return (
    <>
      <CardsHeader name="Events" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

Events.layout = Admin;

export default Events;

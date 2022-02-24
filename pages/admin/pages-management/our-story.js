import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function OurStory() {
  return (
    <>
      <CardsHeader name="Our Story" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

OurStory.layout = Admin;

export default OurStory;

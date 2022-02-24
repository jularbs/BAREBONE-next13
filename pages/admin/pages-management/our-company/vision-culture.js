import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function VisionCulture() {
  return (
    <>
      <CardsHeader name="Vision and Culture" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

VisionCulture.layout = Admin;

export default VisionCulture;

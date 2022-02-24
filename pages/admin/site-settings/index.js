import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function SiteSettings() {
  return (
    <>
      <CardsHeader name="Site Settings" parentName="Home" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

SiteSettings.layout = Admin;

export default SiteSettings;

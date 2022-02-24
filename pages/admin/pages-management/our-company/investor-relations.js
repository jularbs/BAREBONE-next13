import React from "react";

import { Container } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

function InvestorRelations() {
  return (
    <>
      <CardsHeader name="Investor Relations" parentName="Pages" />
      <Container className="mt--6" fluid></Container>
    </>
  );
}

InvestorRelations.layout = Admin;

export default InvestorRelations;

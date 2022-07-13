import React from "react";

import { Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader";
import InvestorRelationsCategoryForm from "components/Forms/InvestorRelationsCategoryForm";

function InvestorRelations() {
  return (
    <>
      <AlternativeHeader name="Investor Relations" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="8">
            <InvestorRelationsCategoryForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

InvestorRelations.layout = Admin;

export default InvestorRelations;

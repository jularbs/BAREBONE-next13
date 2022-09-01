import React from "react";
import { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import SimpleHeroComponentForm from "components/Forms/SimpleHeroComponentForm";
import HistoryComponentForm from "components/Forms/HistoryComponentForm";

import { HERO_HISTORY } from "constants.js";

function History() {
  return (
    <>
      <AlternativeHeader name="Our History" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <SimpleHeroComponentForm location={HERO_HISTORY} formTitle="Topfold Management" />
            <HistoryComponentForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

History.layout = Admin;

export default History;

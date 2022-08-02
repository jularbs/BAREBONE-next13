import React from "react";

import { Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import { useState, useEffect } from "react";
import { HERO_CSR, HERO_TYPE_SAMA_SAMA } from "constants.js";

import SamaSamaHeroComponentForm from "components/Forms/SamaSamaHeroComponentForm";
import { readHeroByTypeLocation } from "actions/hero";

import { OUR_COMPANY_CSR } from "constants.js";
import SideBySideComponentForm from "components/Forms/SideBySideComponentForm";

function CSR() {
  return (
    <>
      <AlternativeHeader
        name="Corporate Social Responsibility"
        parentName="Pages"
      />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <SamaSamaHeroComponentForm
              location={HERO_CSR}
              type={HERO_TYPE_SAMA_SAMA}
            />
            <SideBySideComponentForm
              location={OUR_COMPANY_CSR}
              label={"Corporate Social Responsibility Data"}
              fields=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

CSR.layout = Admin;

export default CSR;

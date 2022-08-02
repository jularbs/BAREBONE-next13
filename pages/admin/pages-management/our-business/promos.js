import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import {
  HERO_PROMOS,
  HERO_TYPE_BRANDING,
  NETWORK_INITIATED_PROMOS,
  CLIENT_INITIATED_PROMOS,
} from "constants.js";

import BrandingHeroComponentForm from "components/Forms/BrandingHeroComponentForm";
import BasicPostComponentForm from "components/Forms/BasicPostComponentForm";

function Promos() {
  return (
    <>
      <AlternativeHeader name="Digital" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <BrandingHeroComponentForm
              location={HERO_PROMOS}
              type={HERO_TYPE_BRANDING}
            />
            <BasicPostComponentForm
              label="Network Initiated Promos Posts"
              location={NETWORK_INITIATED_PROMOS}
            />
            <BasicPostComponentForm
              label="Client Initiated Promos Posts"
              location={CLIENT_INITIATED_PROMOS}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Promos.layout = Admin;

export default Promos;

import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import {
  HERO_EVENTS,
  NETWORK_INITIATED_EVENTS,
  CLIENT_INITIATED_EVENTS,
} from "constants.js";

import BrandingHeroComponentForm from "components/Forms/BrandingHeroComponentForm";
import BasicPostComponentForm from "components/Forms/BasicPostComponentForm";

function Events() {
  return (
    <>
      <AlternativeHeader name="Events" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <BrandingHeroComponentForm
              location={HERO_EVENTS}
              fields="video logo"
              formTitle="Topfold Management"
            />
            <BasicPostComponentForm
              label="Network Initiated Events Posts"
              location={NETWORK_INITIATED_EVENTS}
            />
            <BasicPostComponentForm
              label="Client Initiated Events Posts"
              location={CLIENT_INITIATED_EVENTS}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Events.layout = Admin;

export default Events;

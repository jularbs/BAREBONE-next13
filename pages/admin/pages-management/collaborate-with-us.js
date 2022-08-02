import React from "react";

import { Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import {
  HERO_COLLABORATE_WITH_US,
  HERO_TYPE_BRANDING,
  COLLABORATE_WITH_US,
} from "constants.js";

import BrandingHeroComponentForm from "components/Forms/BrandingHeroComponentForm";
import CollaborationComponentForm from "components/Forms/CollaborationComponentForm";
import SideBySideComponentForm from "components/Forms/SideBySideComponentForm";
function CollaborateWithUs() {
  return (
    <>
      <AlternativeHeader name="Site Settings" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <BrandingHeroComponentForm
              location={HERO_COLLABORATE_WITH_US}
              type={HERO_TYPE_BRANDING}
            />
            <CollaborationComponentForm />
            <SideBySideComponentForm
              label="Collaborate with Us Posts"
              location={COLLABORATE_WITH_US}
              fields="cta"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

CollaborateWithUs.layout = Admin;

export default CollaborateWithUs;

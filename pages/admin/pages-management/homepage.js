import React from "react";
import { Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import { HERO_HOMEPAGE } from "constants.js";

import BrandingHeroComponentForm from "components/Forms/BrandingHeroComponentForm";
import OurBusinessComponentForm from "components/Forms/OurBusinessComponentForm";
import MetricsComponentForm from "components/Forms/MetricsComponentForm";
import LogoShowcaseComponentForm from "components/Forms/LogoShowcaseComponentForm";

function Homepage() {
  return (
    <>
      <AlternativeHeader name="Homepage" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <BrandingHeroComponentForm
              formTitle="Top Fold Component"
              location={HERO_HOMEPAGE}
            />
            <OurBusinessComponentForm />
            <MetricsComponentForm />
            <LogoShowcaseComponentForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Homepage.layout = Admin;

export default Homepage;

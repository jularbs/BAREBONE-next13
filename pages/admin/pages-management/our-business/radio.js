import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import {
  HERO_RADIO,
  HERO_TYPE_BRANDING,
  OUR_BUSINESS_RADIO,
} from "constants.js";

import BrandingHeroComponentForm from "components/Forms/BrandingHeroComponentForm";
import CompanyShowcaseComponentForm from "components/Forms/CompanyShowcaseComponentForm";

function Radio() {
  return (
    <>
      <AlternativeHeader name="Radio" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="12" md="12">
            <BrandingHeroComponentForm
              location={HERO_RADIO}
              type={HERO_TYPE_BRANDING}
            />
            <CompanyShowcaseComponentForm
              label="Company Showcase Component"
              location={OUR_BUSINESS_RADIO}
              fields=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Radio.layout = Admin;

export default Radio;

import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import {
  HERO_DIGITAL,
  HERO_TYPE_BRANDING,
  OUR_BUSINESS_MBC_DIGITAL,
} from "constants.js";

import BrandingHeroComponentForm from "components/Forms/BrandingHeroComponentForm";
import CompanyShowcaseComponentForm from "components/Forms/CompanyShowcaseComponentForm";
import BasicPostComponentForm from "components/Forms/BasicPostComponentForm";

function Digital() {
  return (
    <>
      <AlternativeHeader name="Digital" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <BrandingHeroComponentForm
              location={HERO_DIGITAL}
              fields="video logo"
              formTitle="Topfold Management"
            />
            <CompanyShowcaseComponentForm
              label="Digital Showcase Data"
              location={OUR_BUSINESS_MBC_DIGITAL}
            />
            <BasicPostComponentForm
              label="Digital Posts"
              location={OUR_BUSINESS_MBC_DIGITAL}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Digital.layout = Admin;

export default Digital;

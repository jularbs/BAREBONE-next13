import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import {
  HERO_TV,
  HERO_TYPE_BRANDING,
  OUR_BUSINESS_MBC_TELEVISION,
} from "constants.js";

import BrandingHeroComponentForm from "components/Forms/BrandingHeroComponentForm";
import SideBySideComponentForm from "components/Forms/SideBySideComponentForm";
function TV() {
  return (
    <>
      <AlternativeHeader name="Television" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <BrandingHeroComponentForm
              location={HERO_TV}
              type={HERO_TYPE_BRANDING}
            />
            <SideBySideComponentForm
              label="Television Posts"
              location={OUR_BUSINESS_MBC_TELEVISION}
              fields=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

TV.layout = Admin;

export default TV;

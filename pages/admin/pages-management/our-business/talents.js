import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import { useState, useEffect } from "react";
import {
  HERO_TALENTS,
  HERO_TYPE_BRANDING,
  OUR_BUSINESS_MBC_TALENTS,
} from "constants.js";

import BrandingHeroComponentForm from "components/Forms/BrandingHeroComponentForm";
import BasicPostComponentForm from "components/Forms/BasicPostComponentForm";
import PortraitCardForm from "components/Forms/PortraitCardForm";

import { readHeroByTypeLocation } from "actions/hero";

function Talents() {
  const [heroData, setHeroData] = useState({
    heroLocation: HERO_TALENTS,
    heroType: HERO_TYPE_BRANDING,
    title: "",
    content: "",
    ctaText: "",
    ctaLink: "",
    image: "",
    background: "",
    videoURL: "",
  });

  useEffect(() => {
    const data = { type: heroData.heroType, location: heroData.heroLocation };
    readHeroByTypeLocation(data).then((data) => {
      if (data.data) setHeroData(data.data);
    });
  }, []);
  return (
    <>
      <AlternativeHeader name="Radio" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <BrandingHeroComponentForm
              formValues={heroData}
              setFormValues={setHeroData}
            />
            <PortraitCardForm
              label="MBC Talents Management"
              location={OUR_BUSINESS_MBC_TALENTS}
            />
            <BasicPostComponentForm
              label="MBC Talents Posts"
              location={OUR_BUSINESS_MBC_TALENTS}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Talents.layout = Admin;

export default Talents;

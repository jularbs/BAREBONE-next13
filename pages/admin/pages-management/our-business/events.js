import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import { useState, useEffect } from "react";
import {
  HERO_EVENTS,
  HERO_TYPE_BRANDING,
  NETWORK_INITIATED_EVENTS,
  CLIENT_INITIATED_EVENTS,
} from "constants.js";

import BrandingHeroComponentForm from "components/Forms/BrandingHeroComponentForm";
import BasicPostComponentForm from "components/Forms/BasicPostComponentForm";
import { readHeroByTypeLocation } from "actions/hero";

function Events() {
  const [heroData, setHeroData] = useState({
    heroLocation: HERO_EVENTS,
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
      <AlternativeHeader name="Events" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <BrandingHeroComponentForm
              formValues={heroData}
              setFormValues={setHeroData}
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

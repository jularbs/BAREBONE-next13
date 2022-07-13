import React from "react";
import { useState, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import SimpleHeroComponentForm from "components/Forms/SimpleHeroComponentForm";
import SideBySideComponentForm from "components/Forms/SideBySideComponentForm";
import { readHeroByTypeLocation } from "actions/hero";

import {
  HERO_VISION_CULTURE,
  HERO_TYPE_SIMPLE,
  OUR_BRAND_VISION_AND_CULTURE,
} from "constants.js";

function VisionCulture() {
  const [heroData, setHeroData] = useState({
    heroLocation: HERO_VISION_CULTURE,
    heroType: HERO_TYPE_SIMPLE,
    title: "",
    content: "",
    background: "",
  });

  useEffect(() => {
    const data = { type: heroData.heroType, location: heroData.heroLocation };
    readHeroByTypeLocation(data).then((data) => {
      if (data.data) setHeroData(data.data);
    });
  }, []);
  return (
    <>
      <AlternativeHeader name="Vision and Culture" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <SimpleHeroComponentForm
              formValues={heroData}
              setFormValues={setHeroData}
            />
            <SideBySideComponentForm
              location={OUR_BRAND_VISION_AND_CULTURE}
              label={"Our Vision and Culture Data"}
              fields="header"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

VisionCulture.layout = Admin;

export default VisionCulture;

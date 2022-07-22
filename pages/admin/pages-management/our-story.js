import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import SimpleHeroComponentForm from "components/Forms/SimpleHeroComponentForm";

import { readHeroByTypeLocation } from "actions/hero";

import {
  HERO_OUR_STORY,
  HERO_TYPE_SIMPLE,
  HERO_THEN_VALUES,
  HERO_NOW_VALUES,
} from "constants.js";
import ThenNowHeroComponentForm from "components/Forms/ThenNowHeroComponentForm";

function OurStory() {
  const [heroData, setHeroData] = useState({
    heroLocation: HERO_OUR_STORY,
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
      <AlternativeHeader name="Our Story" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <SimpleHeroComponentForm
              formValues={heroData}
              setFormValues={setHeroData}
            />
            <Row>
              <Col>
                <ThenNowHeroComponentForm
                  label="Then Details"
                  index={HERO_THEN_VALUES}
                />
              </Col>
              <Col>
                <ThenNowHeroComponentForm
                  label="Now Details"
                  index={HERO_NOW_VALUES}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

OurStory.layout = Admin;

export default OurStory;

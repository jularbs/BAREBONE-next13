import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import SimpleHeroComponentForm from "components/Forms/SimpleHeroComponentForm";
import SamaSamaHeroComponentForm from "components/Forms/SamaSamaHeroComponentForm";


import {
  HERO_OUR_STORY,
  HERO_TYPE_SIMPLE,
  HERO_THEN_VALUES,
  HERO_NOW_VALUES,
  HERO_OUR_STORY_SECONDARY,
  HERO_TYPE_SAMA_SAMA,
} from "constants.js";

import ThenNowHeroComponentForm from "components/Forms/ThenNowHeroComponentForm";

function OurStory() {
  return (
    <>
      <AlternativeHeader name="Our Story" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <SimpleHeroComponentForm
              location={HERO_OUR_STORY}
              type={HERO_TYPE_SIMPLE}
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
            <SimpleHeroComponentForm
              location={HERO_OUR_STORY_SECONDARY}
              type={HERO_TYPE_SIMPLE}
            />
            <SamaSamaHeroComponentForm
              location={HERO_OUR_STORY}
              type={HERO_TYPE_SAMA_SAMA}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

OurStory.layout = Admin;

export default OurStory;

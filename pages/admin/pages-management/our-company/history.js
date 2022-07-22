import React from "react";
import { useState, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import SimpleHeroComponentForm from "components/Forms/SimpleHeroComponentForm";
import HistoryComponentForm from "components/Forms/HistoryComponentForm";
import { readHeroByTypeLocation } from "actions/hero";

import { HERO_HISTORY, HERO_TYPE_SIMPLE } from "constants.js";

function History() {
  const [heroData, setHeroData] = useState({
    heroLocation: HERO_HISTORY,
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
      <AlternativeHeader name="Our History" parentName="Pages" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <SimpleHeroComponentForm
              formValues={heroData}
              setFormValues={setHeroData}
            />
            <HistoryComponentForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

History.layout = Admin;

export default History;

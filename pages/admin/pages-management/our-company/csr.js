import React from "react";

import { Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import { useState, useEffect } from "react";
import { HERO_CSR, HERO_TYPE_SAMA_SAMA } from "constants.js";

import SamaSamaHeroComponentForm from "components/Forms/SamaSamaHeroComponentForm";
import { readHeroByTypeLocation } from "actions/hero";

function CSR() {
  const [heroData, setHeroData] = useState({
    heroLocation: HERO_CSR,
    heroType: HERO_TYPE_SAMA_SAMA,
    title: "",
    content: "",
    image: "",
    background: "",
    mobileBackground: "",
  });

  useEffect(() => {
    const data = { type: heroData.heroType, location: heroData.heroLocation };
    readHeroByTypeLocation(data).then((data) => {
      if (data.data) setHeroData(data.data);
    });
  }, []);

  return (
    <>
      <AlternativeHeader
        name="Corporate Social Responsibility"
        parentName="Pages"
      />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <SamaSamaHeroComponentForm
              formValues={heroData}
              setFormValues={setHeroData}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

CSR.layout = Admin;

export default CSR;

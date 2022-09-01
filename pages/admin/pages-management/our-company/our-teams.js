import React from "react";

import { Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import { OUR_COMPANY_OUR_TEAMS, HERO_OUR_TEAMS } from "constants.js";
import SideBySideComponentForm from "components/Forms/SideBySideComponentForm";
import SimpleHeroComponentForm from "components/Forms/SimpleHeroComponentForm";

function OurTeamsPage() {
  return (
    <>
      <AlternativeHeader
        name="Corporate Social Responsibility"
        parentName="Pages"
      />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="9">
            <SimpleHeroComponentForm
              location={HERO_OUR_TEAMS}
              formTitle="Topfold Management"
            />
            <SideBySideComponentForm
              location={OUR_COMPANY_OUR_TEAMS}
              label={"Our Teams Data"}
              fields="contentBG"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

OurTeamsPage.layout = Admin;

export default OurTeamsPage;

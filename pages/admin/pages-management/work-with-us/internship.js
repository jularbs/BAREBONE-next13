import React from "react";

import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import InternshipHeroForm from "components/Forms/InternshipHeroForm";
import HtmlEditorForm from "components/Forms/HtmlEditorForm";
import { readOption } from "actions/option";

import { HERO_INTERNSHIP, INTERNSHIP_REQUIREMENTS } from "constants.js";

function InternshipPage({ requirements }) {
  return (
    <>
      <AlternativeHeader name="Careers" parentName="Work with us" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper" lg="12" md="12">
            <InternshipHeroForm
              formTitle="Topfold Management"
              location={HERO_INTERNSHIP}
              fields=""
            />
            <HtmlEditorForm
              label="Internship Requirements Management"
              index={INTERNSHIP_REQUIREMENTS}
              initValue={requirements}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const requirements = await readOption(INTERNSHIP_REQUIREMENTS);

  // Pass data to the page via props
  return {
    props: {
      requirements: requirements.data?.value ? requirements.data.value : "",
    },
  };
}

InternshipPage.layout = Admin;

export default InternshipPage;

import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import HeroBranding from "components/Frontend/HeroBranding";
import SideBySide from "components/Frontend/SideBySide";
import GenericCard from "components/Frontend/GenericCard";
import OurBusinessesSection from "components/Frontend/Sections/OurBusinessesSection";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";

import { useRef } from "react";

function EventsPage() {
  const beforeAfterRef = useRef(null);
    const data = {
      logoLocation: "/logos/mbc-events-white.svg",
      bgLocation: "/bg/index-branding-bg.svg",
      title: "",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      ctaText: "learn about us",
      ctaLink: "/",
      videoLink: "https://www.youtube.com/watch?v=6fWU0e6W8QY",
    };
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBranding next={beforeAfterRef} data={data}/>
        <OurBusinessesSection />
        <div className="posts-section" style={{ overflowX: "hidden" }}>
          <Row className="px-3">
            <Col lg={3}>
              <GenericCard />
            </Col>
            <Col lg={3}>
              <GenericCard />
            </Col>
            <Col lg={3}>
              <GenericCard />
            </Col>
            <Col lg={3}>
              <GenericCard />
            </Col>
          </Row>
          <Row className="px-3">
            <Col lg={6}>
              <GenericCard />
            </Col>
            <Col lg={6}>
              <GenericCard />
            </Col>
          </Row>
        </div>
        <SideBySide />
        <SideBySide reverse />
        <SideBySide />
        <ContactUsSection />
      </div>
    </>
  );
}

export default EventsPage;

import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import HeroBranding from "components/Frontend/HeroBranding";
import GenericCard from "components/Frontend/GenericCard";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";

import TalentsShowcase from "components/Frontend/TalentsShowcase";

import { useRef } from "react";

function TalentsPage() {
  const ourBusinessRef = useRef(null);
  const carouselRef = useRef(null);
  const data = {
    logoLocation: "/logos/mbc-talents-white.svg",
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
        <HeroBranding next={carouselRef} data={data} />
        <TalentsShowcase ref={carouselRef} next={ourBusinessRef} />
        <div
          className="posts-section"
          ref={ourBusinessRef}
          style={{
            overflowX: "hidden",
            paddingTop: "90px",
            marginTop: "-70px",
          }}
        >
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
        </div>
        <ContactUsSection />
      </div>
    </>
  );
}

export default TalentsPage;

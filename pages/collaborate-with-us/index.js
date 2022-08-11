import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import HeroBranding from "components/Frontend/HeroBranding";
import HeroBasic from "components/Frontend/HeroBasic";
import SideBySide from "components/Frontend/SideBySide";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";
import OrgChartSection from "components/Frontend/Sections/OrgChartSection";
import CollabTilesSection from "components/Frontend/Sections/CollabTilesSection";
import { useRef } from "react";

function cwuPage() {
  const beforeAfterRef = useRef(null);
  const data = {
    bgLocation: "/bg/index-branding-bg.svg",
    title: "Let's collaborate!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    ctaText: "Talk with us",
    ctaLink: "/",
  };

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic data={data} blue black/>
        <CollabTilesSection />
        <OrgChartSection />
        <SideBySide />
        <SideBySide reverse />
        <SideBySide />
        <SideBySide reverse />
        <SideBySide />
        <SideBySide reverse />
        <ContactUsSection />
      </div>
    </>
  );
}

export default cwuPage;

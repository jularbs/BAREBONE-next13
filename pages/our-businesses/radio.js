import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import HeroBranding from "components/Frontend/HeroBranding";
import SideBySide from "components/Frontend/SideBySide";
import GenericCard from "components/Frontend/GenericCard";
import OurBusinessesSection from "components/Frontend/Sections/OurBusinessesSection";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";

import { useRef } from "react";

import {
  HERO_RADIO,
  OUR_BUSINESS_RADIO,
} from "constants.js";


function RadioPage() {
  const stationsRef = useRef(null);

  const data = {
    logoLocation: "/logos/mbc-radio-white.svg",
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
        <HeroBranding next={stationsRef} data={data} />
        <OurBusinessesSection location={OUR_BUSINESS_RADIO} ref={stationsRef} />
        <ContactUsSection />
      </div>
    </>
  );
}

export default RadioPage;

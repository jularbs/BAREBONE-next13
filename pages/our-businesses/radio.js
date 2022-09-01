import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import HeroBranding from "components/Frontend/HeroBranding";
import OurBusinessesSection from "components/Frontend/Sections/OurBusinessesSection";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";

import { useRef, useState } from "react";
import { readByLocation } from "actions/hero";

import { HERO_RADIO, OUR_BUSINESS_RADIO } from "constants.js";
import { getLink } from "actions/media";

const RadioPage = ({ hero }) => {
  const stationsRef = useRef(null);

  const [heroData, setHeroData] = useState({
    logoLocation: getLink(hero.image),
    bgLocation: getLink(hero.background),
    content: hero.content,
    ctaText: hero.ctaText,
    ctaLink: hero.ctaLink,
    videoLink: hero.videoURL,
  });

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBranding next={stationsRef} data={heroData} />
        <OurBusinessesSection location={OUR_BUSINESS_RADIO} ref={stationsRef} />
        <ContactUsSection />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const hero = await readByLocation(HERO_RADIO);

  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
    },
  };
}

export default RadioPage;

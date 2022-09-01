import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import HeroBranding from "components/Frontend/HeroBranding";
import GenericCard from "components/Frontend/GenericCard";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";

import TalentsShowcase from "components/Frontend/TalentsShowcase";

import { useRef, useState } from "react";
import { HERO_TALENTS, OUR_BUSINESS_MBC_TALENTS } from "constants.js";

import { getLink } from "actions/media";
import { readByLocation } from "actions/hero";
import BasicPostViewer from "components/Frontend/BasicPostViewer";

const TalentsPage = ({ hero }) => {
  const ourBusinessRef = useRef(null);
  const carouselRef = useRef(null);

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
        <HeroBranding next={carouselRef} data={heroData} />
        <TalentsShowcase ref={carouselRef} next={ourBusinessRef} />
        <BasicPostViewer
          location={OUR_BUSINESS_MBC_TALENTS}
          xl={3}
          lg={4}
          md={6}
          sm={12}
          header="MBC Talents"
        />
        <ContactUsSection />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const hero = await readByLocation(HERO_TALENTS);
  // const sbsList = await getSideBySideByLocation(OUR_BUSINESS_MBC_TELEVISION);
  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
      // sbsList: sbsList.data,
    },
  };
}

export default TalentsPage;

import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import HeroBranding from "components/Frontend/HeroBranding";
import OurBusinessesSection from "components/Frontend/Sections/OurBusinessesSection";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";

import { useRef, useState } from "react";
import { HERO_DIGITAL, OUR_BUSINESS_MBC_DIGITAL } from "constants.js";
import { getLink } from "actions/media";
import { readByLocation } from "actions/hero";

import BasicPostViewer from "components/Frontend/BasicPostViewer";

const DigitalPage = ({ hero }) => {
  const postsRef = useRef(null);

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
        <HeroBranding next={postsRef} data={heroData} />
        <OurBusinessesSection
          location={OUR_BUSINESS_MBC_DIGITAL}
          ref={postsRef}
        />
        <BasicPostViewer
          location={OUR_BUSINESS_MBC_DIGITAL}
          lg={3}
          md={6}
          sm={12}
        />
        <ContactUsSection />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const hero = await readByLocation(HERO_DIGITAL);
  // const sbsList = await getSideBySideByLocation(OUR_BUSINESS_MBC_TELEVISION);
  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
      // sbsList: sbsList.data,
    },
  };
}

export default DigitalPage;

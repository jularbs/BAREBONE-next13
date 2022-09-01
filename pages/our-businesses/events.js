import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import HeroBranding from "components/Frontend/HeroBranding";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";

import BasicPostViewer from "components/Frontend/BasicPostViewer";
import {
  HERO_EVENTS,
  NETWORK_INITIATED_EVENTS,
  CLIENT_INITIATED_EVENTS,
} from "constants.js";
import { getLink } from "actions/media";
import { readByLocation } from "actions/hero";

import { useRef, useState } from "react";

const EventsPage = ({ hero }) => {
  const beforeAfterRef = useRef(null);
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
        <HeroBranding next={beforeAfterRef} data={heroData} />
        <BasicPostViewer
          location={NETWORK_INITIATED_EVENTS}
          xl={3}
          lg={4}
          md={6}
          sm={12}
          header="Network initiated events"
        />

        <BasicPostViewer
          location={CLIENT_INITIATED_EVENTS}
          lg={6}
          md={6}
          sm={12}
          header="Client initiated events"
        />
        <ContactUsSection />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const hero = await readByLocation(HERO_EVENTS);
  // const sbsList = await getSideBySideByLocation(OUR_BUSINESS_MBC_TELEVISION);
  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
      // sbsList: sbsList.data,
    },
  };
}

export default EventsPage;

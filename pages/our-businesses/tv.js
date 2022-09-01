import React from "react";
import Navigation from "components/Frontend/Navigation";
import HeroBranding from "components/Frontend/HeroBranding";
import SideBySide from "components/Frontend/SideBySide";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";

import { useState, createRef } from "react";
import { readByLocation } from "actions/hero";
import { HERO_TV, OUR_BUSINESS_MBC_TELEVISION } from "constants.js";
import { getLink } from "actions/media";

import { getSideBySideByLocation } from "actions/sideBySide";

const TelevisionPage = ({ hero, sbsList }) => {
  let refs = sbsList.map((item) => createRef());

  const [heroData, setHeroData] = useState({
    logoLocation: getLink(hero.image),
    bgLocation: getLink(hero.background),
    content: hero.content,
    ctaText: hero.ctaText,
    ctaLink: hero.ctaLink,
    videoLink: hero.videoURL,
  });

  const showSideBySide = () => {
    return sbsList.map((item, key) => {
      return (
        <SideBySide
          ref={refs[key]}
          next={refs[key + 1]}
          data={{
            imgLocation: getLink(item.background),
            title: item.header,
            content: item.content,
          }}
          key={key}
          reverse={key % 2 == 0 ? true : false}
        />
      );
    });
  };
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBranding next={refs[0]} data={heroData} />
        {showSideBySide()}
        <ContactUsSection />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const hero = await readByLocation(HERO_TV);
  const sbsList = await getSideBySideByLocation(OUR_BUSINESS_MBC_TELEVISION);
  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
      sbsList: sbsList.data,
    },
  };
}

export default TelevisionPage;

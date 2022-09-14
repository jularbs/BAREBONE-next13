import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";
import CollabTilesSection from "components/Frontend/Sections/CollabTilesSection";
import { useRef, useState, createRef } from "react";

import { HERO_COLLABORATE_WITH_US, COLLABORATE_WITH_US } from "constants.js";

import { getLink } from "actions/media";
import { readByLocation } from "actions/hero";
import { getSideBySideByLocation } from "actions/sideBySide";
import SideBySide from "components/Frontend/SideBySide";

const cwuPage = ({ hero, sideBySide }) => {
  const refs =
    sideBySide.length > 0 ? sideBySide.map((item) => createRef()) : null;
  const tilesRef = useRef(null);

  const [heroData, setHeroData] = useState({
    bgLocation: getLink(hero.background),
    title: hero.title,
    content: hero.content,
    ctaText: hero.ctaText,
    ctaLink: hero.ctaLink,
  });

  const showSideBySide = () => {
    return sideBySide.map((item, key) => {
      return (
        <SideBySide
          ref={refs[key]}
          next={refs[key + 1]}
          data={{
            logoLocation: getLink(item.logo),
            imgLocation: getLink(item.background),
            title: item.header,
            content: item.content,
            ctaLabel: item.ctaText,
            ctaLink: item.ctaLink,
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
        <HeroBasic data={heroData} next={tilesRef} blue black />
        <CollabTilesSection ref={tilesRef} next={refs[0]} />
        {showSideBySide()}
        <ContactUsSection />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const hero = await readByLocation(HERO_COLLABORATE_WITH_US);
  const sbsList = await getSideBySideByLocation(COLLABORATE_WITH_US);
  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
      sideBySide: sbsList.data,
    },
  };
}

export default cwuPage;

import React from "react";

import { useState, useEffect } from "react";
import { getLink } from "actions/media";
import { readByLocation } from "actions/hero";

import Navigation from "components/Frontend/Navigation";
import JobsSection from "components/Frontend/Sections/JobsSection/JobsSection";
import HeroBasic from "components/Frontend/HeroBasic";
import { HERO_CAREERS } from "constants.js";

const CareersPage = ({ hero }) => {
  const [heroData, setHeroData] = useState({
    bgLocation: getLink(hero.background),
    title: hero.title,
    content: hero.content,
    ctaText: hero.ctaText,
    ctaLink: hero.ctaLink,
  });

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic data={heroData} blue black />
        <JobsSection />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const hero = await readByLocation(HERO_CAREERS);
  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
    },
  };
}

export default CareersPage;
